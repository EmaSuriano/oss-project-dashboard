import { TabId } from './types';

export const VIEWS: Record<TabId, string> = {
  all: '#',
  issues: '#issues',
  vulnerabilityAlerts: '#vulnerabilities',
  pullRequests: '#pull-requests',
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
