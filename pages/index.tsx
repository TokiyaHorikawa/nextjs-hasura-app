import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { graphqlClient } from '../graphql/client';
import { useTodosQuery } from '../graphql/graphql';
import Layout from '../components/Layout';
import React from 'react';

const Home: NextPage = () => {
  const { data: dataTodos } = useTodosQuery(graphqlClient);

  return (
    <Layout title='ホーム'>
      <h1 className={styles.title}>
        Welcome to <a href='https://nextjs.org'>Next.js!</a>
      </h1>

      <div>
        <Link href='/user'>
          <a className={styles.link}>ユーザー一覧</a>
        </Link>
        <div>
          <p>TODO</p>
          {dataTodos?.todos.map((todo) => (
            <span key={todo.id}>{todo.title} / </span>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
