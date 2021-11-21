import { useMemo } from "react";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUserQuery } from "../../graphql/graphql";
import { graphqlClient } from "../../graphql/client";
import Layout from "../../components/Layout";

const title = "ユーザー詳細ページ";
const UserShowPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const variables = { id: Number(id) };
  const { data: dataUser } = useUserQuery(graphqlClient, variables);

  const user = useMemo(() => dataUser?.user, [dataUser]);
  const todos = useMemo(() => dataUser?.user?.todos, [dataUser]);

  return (
    <Layout title={title}>
      <h1 className={styles.title}>{title}</h1>
      <div>
        {user?.name}（ID: {user?.id}）
      </div>
      <div>
        <h3>タスク一覧</h3>
        <ul>
          {todos
            ? todos.map((todo) => <li key={todo.id}>{todo.title}</li>)
            : "TODOなし"}
        </ul>
      </div>
      <div>
        <Link href="/user">
          <a className={styles.link}>ユーザー一覧に戻る</a>
        </Link>
      </div>
    </Layout>
  );
};

export default UserShowPage;
