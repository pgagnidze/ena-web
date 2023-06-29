import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from "./answer.module.css";

export const Answer = ({ text, headline }) => {
  return (
    <div className={styles.fadeIn}>
      <h2 className={styles.headline}>{headline}</h2>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {text}
      </ReactMarkdown>
    </div>
  );
};
