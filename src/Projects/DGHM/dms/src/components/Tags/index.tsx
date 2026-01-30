import React from 'react';
import styles from './styles.module.css';

interface TagsProps {
  tags?: string[];
  keywords?: string[];
  className?: string;
}

export default function Tags({ tags, keywords, className }: TagsProps) {
  // 處理 tags 和 keywords（可能是陣列或字串）
  const tagsArray = Array.isArray(tags) ? tags : tags ? [tags] : [];
  const keywordsArray = Array.isArray(keywords) ? keywords : keywords ? [keywords] : [];
  
  // 合併 tags 和 keywords，並去重
  const allTags = [...new Set([...tagsArray, ...keywordsArray])];
  
  if (allTags.length === 0) {
    return null;
  }

  return (
    <div className={`${styles.tagsContainer} ${className || ''}`}>
      {allTags.map((tag, index) => (
        <span key={index} className={styles.tag}>
          #{tag}
        </span>
      ))}
    </div>
  );
}

