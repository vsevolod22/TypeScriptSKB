import { Link } from "react-router-dom";
import styles from "./BlockHeading.module.scss";

// Пропсы для компонента BlockHeading
interface BlockHeadingProps {
  heading: string;
  link?: string;
  linkText?: string;
}

function BlockHeading({ heading, link, linkText }: BlockHeadingProps) {
  return (
    <div className={styles.heading}>
      <h1>{heading}</h1>
      {link && linkText && <Link to={link}>{linkText}</Link>}
    </div>
  );
}

export default BlockHeading;
