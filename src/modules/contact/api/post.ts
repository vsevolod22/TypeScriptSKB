import { skbEndpoint } from "@/shared/api/wp-client";

export const submitContactForm = async (data: App.ContactFormData) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    value && formData.append(key, value);
  });

  const response = await fetch(`${skbEndpoint}/sendcontactform`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Form submission failed");
  return response;
};
