export type Stargazer = {
  id: string;
  name: string | null;
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
  stargazers: Countable & {
    nodes: Stargazer[];
  };
};

export default Project;
