export type Status = 'error' | 'warning' | 'ok';

export const limitToStatus = (count: number, limit?: number): Status => {
  if (!limit) return 'ok';
  if (count >= limit) return 'error';
  return count > limit - limit / 4 ? 'warning' : 'ok';
};

export const statusToDescription = (status: Status) => {
  switch (status) {
    case 'error':
      return 'The expected Threshold is being overpassed, please take action.';
    case 'warning':
      return 'The expected Threshold is soon to be overpassed ...';
    case 'ok':
      return 'All your projects are under the expected Threshold!';
    default:
      return 'Status not found ...';
  }
};
