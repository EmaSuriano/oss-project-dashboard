export const isQueryReady = query =>
  !(query.loading || query.error) && query.data;

export const edgesToArray = data => data.edges.map(edge => edge.node);
