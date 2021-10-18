import { TabId } from './types';

export const PROJECT_FILE_NAME = 'oss-projects.json';

export const VIEWS: Record<TabId, string> = {
  all: '',
  issues: 'issues',
  vulnerabilityAlerts: 'vulnerabilities',
  pullRequests: 'pull-requests',
};

export enum ThresholdStatus {
  None,
  Ok,
  Warn,
  Bad,
}

export const STATUS_TO_COLOR = {
  [ThresholdStatus.None]: 'label.primary.border',
  [ThresholdStatus.Ok]: 'label.success.border',
  [ThresholdStatus.Warn]: 'label.warning.border',
  [ThresholdStatus.Bad]: 'label.danger.border',
};

export const ERRORS = {
  GIST_NOT_FOUND_ERROR: `No "${PROJECT_FILE_NAME}" file found inside your Github Gists.`,
  PARSING_GIST_ERROR: `There was a problem while parsing "${PROJECT_FILE_NAME}" content ...`,
  INVALID_SETTINGS_ERROR: `Invalid Settings inside "${PROJECT_FILE_NAME}" file ...`,
  INVALID_PROJECTS_ERROR: `There was a problem while parsing your Projects ...`,
};
