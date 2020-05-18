export const queryParams = params =>
  Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');

export const withCors = url => `https://cors-anywhere.herokuapp.com/${url}`;
