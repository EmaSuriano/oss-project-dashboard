import React from 'react';
import Project from '../types/Project';
import { Threshold } from '../types/Settings';
import { Notification } from './Notification';
import { limitToStatus, Status, statusToDescription } from '../utils/status';
import { EMPTY_THRESHOLD } from '../utils/constant';

interface Props {
  projects: Project[];
  threshold?: Threshold;
}

const STATUS_PRIORITY: Status[] = ['error', 'warning', 'ok'];

const HealthStatus = ({ projects, threshold = EMPTY_THRESHOLD }: Props) => {
  const issuesCount = projects.reduce(
    (acc, { issues }) => acc + issues.totalCount,
    0,
  );

  const pullsCount = projects.reduce(
    (acc, { pullRequests }) => acc + pullRequests.totalCount,
    0,
  );

  const statusIssues = limitToStatus(issuesCount, threshold.issues);
  const statusPulls = limitToStatus(pullsCount, threshold.pullRequests);

  const status = [statusIssues, statusPulls].reduce((acc, curr) => {
    if (STATUS_PRIORITY.indexOf(curr) <= STATUS_PRIORITY.indexOf(acc))
      return curr;

    return acc;
  }, 'ok');

  return (
    <Notification
      title="Health Status"
      message={statusToDescription(status)}
      status={status}
      closable
    />
  );
};

export default HealthStatus;
