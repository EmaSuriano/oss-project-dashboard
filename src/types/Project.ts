export type Stargazer = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type Countable = {
  totalCount: number;
};

export type Project = {
  id: string;
  url: string;
  name: string;
  pullRequests: Countable;
  vulnerabilityAlerts: Countable;
  issues: Countable;
  stargazers: {
    totalCount: number;
    nodes: Stargazer[];
  };
};

export default Project;
