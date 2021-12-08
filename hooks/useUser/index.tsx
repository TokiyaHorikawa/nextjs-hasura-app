import { useMemo } from 'react';
import {
  useUserQuery,
  useInsertTodosByIdMutation,
  useDeleteTodosByIdMutation,
} from '../../graphql/graphql';
import { graphqlClient } from '../../graphql/client';

type Props = {
  id: number;
};

export function useUser({ id }: Props) {
  const variables = { id };
  const { data: dataUser, refetch } = useUserQuery(graphqlClient, variables);

  const mutatedOptions = {
    onSuccess: () => refetch(),
  };
  const { mutate: addTodo } = useInsertTodosByIdMutation(
    graphqlClient,
    mutatedOptions
  );
  const { mutate: deleteTodo } = useDeleteTodosByIdMutation(
    graphqlClient,
    mutatedOptions
  );

  const [user, todos] = useMemo(
    () => [dataUser?.user, dataUser?.user?.todos],
    [dataUser]
  );

  return {
    user,
    todos,
    addTodo,
    deleteTodo,
  };
}
