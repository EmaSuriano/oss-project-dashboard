export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
