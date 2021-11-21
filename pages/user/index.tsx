import styles from "../../styles/Home.module.css";
import Link from "next/link";
import { useUsersQuery } from "../../graphql/graphql";
import { graphqlClient } from "../../graphql/client";
import Layout from "../../components/Layout";

const title = "ユーザー一覧ページ";
const UserPage = () => {
  const { data: dataUsers } = useUsersQuery(graphqlClient);

  return (
    <Layout title={title}>
      <h1 className={styles.title}>{title}</h1>
      <ul>
        {dataUsers &&
          dataUsers.users.map((user) => <li key={user.id}>{user.name} </li>)}
      </ul>
      <div>
        <Link href="/">
          <a className={styles.link}>ホームに戻る</a>
        </Link>
      </div>
    </Layout>
  );
};

export default UserPage;
