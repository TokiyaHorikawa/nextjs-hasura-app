import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import { useUsersQuery } from "../../graphql/graphql";
import { graphqlClient } from "../../graphql/client";

const title = "User Index";
const UserPage = () => {
  const { data: dataUsers } = useUsersQuery(graphqlClient);

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
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
      </main>
    </div>
  );
};

export default UserPage;
