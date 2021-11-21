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
  const { data: dataUser } = useUserQuery(graphqlClient, { id: Number(id) });

  return (
    <Layout title={title}>
      <h1 className={styles.title}>{title}</h1>
      <div>
        {dataUser && (
          <ul>
            <li>ID: {dataUser.user?.id}</li>
            <li>名前: {dataUser.user?.name}</li>
          </ul>
        )}
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
