import React, { forwardRef } from "react";
import styles from "./PageStatus.module.css";

const PageStatus = forwardRef(function PageStatus(
  { variant = "compact", eyebrow, title, copy, className = "", children },
  ref,
) {
  return (
    <section
      ref={ref}
      className={`${styles.panel} ${styles[variant]} ${className}`.trim()}
    >
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      {title ? <h2 className={styles.title}>{title}</h2> : null}
      {copy ? <p className={styles.copy}>{copy}</p> : null}
      {children}
    </section>
  );
});

export default PageStatus;
