export type Threshold = {
  pullRequests?: number;
  issues?: number;
  vulnerabilityAlerts?: number;
};

export type Settings = {
  projects: string[];
  threshold?: Threshold;
};

export default Settings;
