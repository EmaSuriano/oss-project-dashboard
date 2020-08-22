export type File = {
  name: string;
  text: string;
};

export type Gist = {
  name: string;
  files: File[];
};

export default Gist;
