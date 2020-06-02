export const isQueryReady = (query) =>
  !(query.loading || query.error) && query.data;

export const errorsFromQueries = (...queries) =>
  queries.find(({ error }) => error);

export const loadingFromQueries = (...queries) =>
  queries.some(({ loading }) => loading);
