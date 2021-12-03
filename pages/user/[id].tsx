import { useMemo } from 'react';
import styles from '../../styles/Home.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  useUserQuery,
  useInsertTodosByIdMutation,
  useDeleteTodosByIdMutation,
  Todos_Insert_Input,
} from '../../graphql/graphql';
import { useForm } from 'react-hook-form';
import { graphqlClient } from '../../graphql/client';
import Layout from '../../components/Layout';
import { DeleteIcon } from '../../components/DeleteIcon';

type Form = Pick<Todos_Insert_Input, 'title'>;

const title = 'ユーザー詳細ページ';
const UserShowPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const variables = { id: Number(id) };
  const { data: dataUser, refetch } = useUserQuery(graphqlClient, variables);
  const { mutate: addTodo } = useInsertTodosByIdMutation(graphqlClient, {
    // FIXME: 無駄なレンダリングの原因になってそう
    onSuccess: () => refetch(),
  });
  const { mutate: deleteTodo } = useDeleteTodosByIdMutation(graphqlClient, {
    onSuccess: () => refetch(),
  });

  const [user, todos] = useMemo(
    () => [dataUser?.user, dataUser?.user?.todos],
    [dataUser]
  );

  const { register, handleSubmit } = useForm<Form>();

  const onSubmit = async ({ title }: Form) => {
    if (!user) return;
    addTodo({ input: { title, user_id: user.id } });
  };

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
            ? todos.map((todo) => (
                <li key={todo.id}>
                  {todo.title}
                  <DeleteIcon onClick={() => deleteTodo({ id: todo.id })} />
                </li>
              ))
            : 'TODOなし'}
        </ul>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('title')}
            type='text'
            placeholder='タスクを入力してください'
          />
          <input type='submit' />
        </form>
      </div>
      <div>
        <Link href='/user'>
          <a className={styles.link}>ユーザー一覧に戻る</a>
        </Link>
      </div>
    </Layout>
  );
};

export default UserShowPage;
