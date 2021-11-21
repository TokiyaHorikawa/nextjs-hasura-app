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
        <div>
          {dataUsers &&
            dataUsers.users.map((user) => (
              <span key={user.id}>{user.name} / </span>
            ))}
        </div>
        <div>
          <Link href="/">
            <a className={styles.link}>戻る</a>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default UserPage;
