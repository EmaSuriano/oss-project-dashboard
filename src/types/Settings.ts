export type Settings = {
  projects: string[];
  threshold?: {
    pullRequests?: number;
    issues?: number;
  };
};

export default Settings;
