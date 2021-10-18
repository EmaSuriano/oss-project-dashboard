export type Threshold = {
  pullRequests?: number;
  issues?: number;
  vulnerabilityAlerts?: number;
};

export type Settings = {
  projects: string[];
  threshold?: Threshold;
};

export type TabId = keyof Threshold | 'all';

export enum Order {
  ASC,
  DESC,
}

type File = {
  name: string;
  text: string;
};

export type Gist = {
  name: string;
  files: File[];
};

type Stargazer = {
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

export type PullRequest = {
  id: string;
  author: {
    login: string;
    avatarUrl: string;
  };
  repository: {
    url: string;
    name: string;
  };
  title: string;
  project: string;
  url: string;
  createdAt: string;
};
