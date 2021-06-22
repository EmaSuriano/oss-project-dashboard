export const queryParams = (params: Object) =>
  Object.entries(params)
    .map(
      ([key, value]) =>
        encodeURIComponent(key) + '=' + encodeURIComponent(value),
    )
    .join('&');

export const withCors = (url: string) =>
  `https://cors-anywhere.herokuapp.com/${url}`;
