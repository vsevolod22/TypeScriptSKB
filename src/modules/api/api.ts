import WPAPI from "wpapi";
import { flatten } from "lodash";

import Parse from "html-react-parser";

const wp = new WPAPI({
  endpoint: "https://test.skbkit.ru/index.php?rest_route=",

  username: "admin",
  password: "admin",
});

const skbEndpoint = `${wp._options.endpoint}`;
//@ts-ignore
function parseContent(str) {
  if (typeof str !== "string") return str;
  const content = Parse(str);

  let result = [];
  let temp = [];
  //@ts-ignore
  for (let i = 0; i < content.length; i++) {
    //@ts-ignore
    const current = content[i];

    if (typeof current === "string") continue;

    if (current.type === "figure") {
      temp.push(current.props.children.props.src); // Добавляем элемент в temp
    } else {
      if (temp.length !== 0) {
        result.push({ type: "mediablock", value: temp });
        temp = []; // Очищаем временный массив
      }

      result.push(current); // Добавляем текущий элемент в результат
    }
  }

  if (temp.length !== 0) {
    result.push({ type: "mediablock", value: temp });
  }

  return result;
}
//@ts-ignore
async function getAllContent(request) {
  //@ts-ignore
  return request.then(function (response) {
    if (!response._paging || !response._paging.next) {
      return response;
    }
    // Запрос к следующей странице и возврат ответов одной коллекцией
    return Promise.all([response, getAllContent(response._paging.next)]).then(
      function (responses) {
        return flatten(responses);
      }
    );
  });
}

// Функция загрузки медиабиблиотеки и сортировки по категориям
async function loadMedia() {
  const response = await getAllContent(wp.media());

  // Нам потребуется id, категория и url
  const result = [];

  for (let { id, source_url: src, alt_text } of response) {
    const [category, name] = alt_text.split("_");
    // Добавляем медиа в массив нужной категории
    result.push({ id, src, category, name });
  }

  return result;
}

const mediaLibrary = await loadMedia();
console.log("mediaLibrary", mediaLibrary);

async function loadPosts() {
  // Получаем рубрики
  const responseCategories = await getAllContent(wp.categories());
  const categories = {};

  for (let { id, name } of responseCategories) {
    //@ts-ignore
    categories[id] = name;
  }

  // Получаем метки
  const responseTags = await getAllContent(wp.tags());
  const tags = {};

  for (let { id, name } of responseTags) {
    //@ts-ignore
    tags[id] = name;
  }

  // Получаем записи
  const responsePosts = await getAllContent(wp.posts());

  // К проектам и лабораториям обращение по id, поэтому для быстроты чтения они - объекты
  // Остальные посты (other) ищутся по категориям, это проще делать по массиву
  const result = {
    projects: {},
    labs: {},
    other: [],
  };

  for (let post of responsePosts) {
    const image = mediaLibrary.find((item) => item.id === post.featured_media);
    const newPost = {
      id: post.id,
      name: post.title.rendered,
      //@ts-ignore
      categories: post.categories.map((el) => categories[el]),
      //@ts-ignore
      tag: post.tags.map((el) => tags[el])[0],
      content: parseContent(post.content.rendered),
      preview: image ? image.src : null,
      lab: null,
    };

    if (newPost.categories.includes("projects")) {
      //@ts-ignore
      newPost.lab = newPost.categories.filter((el) => el !== "projects")[0];
      //@ts-ignore
      result.projects[post.id] = newPost;
    } else if (newPost.categories.includes("labs")) {
      //@ts-ignore
      newPost.previewText = Parse(post.excerpt.rendered)[0].props.children;
      //@ts-ignore
      result.labs[post.id] = newPost;
    } else {
      //@ts-ignore
      result.other.push(newPost);
    }
  }

  return result;
}
const posts = await loadPosts();
console.log("posts", posts);
//@ts-ignore
export async function getPosts(category) {
  try {
    if (category) {
      //@ts-ignore
      return posts.other.filter((post) => post.categories.includes(category));
    }

    return posts;
  } catch (error) {
    console.error(error);
    return [];
  }
}
//@ts-ignore
export async function getMedia(category, target = false) {
  try {
    const mediaFiltered = mediaLibrary.filter((el) => el.category === category);

    if (target) {
      for (let media of mediaFiltered) {
        //@ts-ignore
        target[media.name].src = media.src;
        //@ts-ignore
        target[media.name].id = media.id;
      }

      return target;
    }

    return mediaFiltered;
  } catch (error) {
    console.log(error);
    return [];
  }
}
//@ts-ignore
export async function getProjectByID(id) {
  try {
    if (typeof id != "undefined") {
      //@ts-ignore
      return posts.projects[id];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}
//@ts-ignore
export async function getProjects(lab) {
  try {
    if (typeof lab != "undefined") {
      return Object.values(posts.projects).filter(
        //@ts-ignore
        (project) => project.lab === lab
      );
    }

    return posts.projects;
  } catch (error) {
    console.log(error);
    return [];
  }
}
//@ts-ignore
export async function getLabByID(id) {
  try {
    if (typeof id != "undefined") {
      //@ts-ignore
      return posts.labs[id];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getLabs() {
  try {
    return posts.labs;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export const vkWallUrl = "https://vk.com/skbkit?w=wall-172789021";

export async function getNews(count = 0, offset = 0) {
  try {
    const response = await fetch(
      `${skbEndpoint}/getnews?count=${count}&offset=${offset}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      //@ts-ignore
      throw new Error("Ошибка сети", response);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Получения новостей (api):", error);
  }
}
//@ts-ignore
export async function getNewsByID(newsID) {
  try {
    const response = await fetch(`${skbEndpoint}/getnewsbyid?id=${newsID}`, {
      method: "GET",
    });

    if (!response.ok) {
      //@ts-ignore
      throw new Error("Ошибка сети", response);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Получения новостей (api):", error);
  }
}
//@ts-ignore
export async function sendContactForm(formData) {
  console.log("Форма отправляется");
  for (let el of formData.entries()) {
    console.log(el[0] + ": " + el[1]);
  }
  try {
    const response = await fetch(`${skbEndpoint}/sendcontactform`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      //@ts-ignore
      throw new Error("Ошибка сети", response);
    }

    return response;
  } catch (error) {
    console.error("Ошибка отправки формы (api):", error);
  }
}
