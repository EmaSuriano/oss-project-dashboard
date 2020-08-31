export const projectNameToParts = (projectName: string) => {
  const [user, name] = projectName.split('/');
  const key = name.replace(/-/g, '');

  return {
    user,
    name,
    key,
  };
};
