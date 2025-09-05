'use client';

import React from 'react';
import styles from './TestLayout.module.css';

interface TestLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const TestLayout = ({ children, title }: TestLayoutProps) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
      </header>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
};