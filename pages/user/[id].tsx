import { useMemo } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Text } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';

import styles from '../../styles/Home.module.css';
import {
  useUserQuery,
  useInsertTodosByIdMutation,
  useDeleteTodosByIdMutation,
  Todos_Insert_Input,
} from '../../graphql/graphql';
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
        <Heading as='h4' size='md'>
          タスク一覧
        </Heading>
        {todos
          ? todos.map((todo) => (
              <Text key={todo.id}>
                {todo.title}
                <DeleteIcon onClick={() => deleteTodo({ id: todo.id })} />
              </Text>
            ))
          : 'TODOなし'}
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputGroup size='md'>
            <Input
              {...register('title')}
              pr='4.5rem'
              type='text'
              placeholder='タスクを入力してください'
            />
            <InputRightElement width='4.5rem'>
              <Button type='submit' h='1.75rem' size='xs'>
                送信
              </Button>
            </InputRightElement>
          </InputGroup>
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
