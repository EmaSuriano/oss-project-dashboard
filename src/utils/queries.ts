import { QueryResult } from '@apollo/react-common';

export const isQueryReady = (query: QueryResult<any>) =>
  !(query.loading || query.error) && query.data;

export const errorsFromQueries = (...queries: QueryResult<any>[]) =>
  queries.find(({ error }) => error);

export const loadingFromQueries = (...queries: QueryResult<any>[]) =>
  queries.some(({ loading }) => loading);
