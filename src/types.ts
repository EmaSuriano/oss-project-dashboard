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
