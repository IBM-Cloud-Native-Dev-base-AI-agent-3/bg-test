import styles from "./PageContainer.module.css";

function PageContainer({ children, className = "" }) {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
}

export default PageContainer;
