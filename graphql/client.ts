import { GraphQLClient } from 'graphql-request';

const url = 'http://localhost:8080/v1/graphql';
export const graphqlClient = new GraphQLClient(url);
