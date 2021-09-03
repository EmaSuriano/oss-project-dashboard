import { Label, SubNav } from '@primer/components';
import { useLocation } from 'react-router-dom';
import { STATUS_TO_COLOR, ThresholdStatus, VIEWS } from '../constants';
import { useProjectsQuery } from '../queries/useProjectsQuery';
import { useSettingsQuery } from '../queries/useSettingsQuery';
import { Project, TabId, Threshold } from '../types';

export const limitToStatus = (count: number, limit?: number) => {
  if (!limit) return ThresholdStatus.None;
  if (count >= limit) return ThresholdStatus.Bad;
  return count > limit - limit / 4 ? ThresholdStatus.Warn : ThresholdStatus.Ok;
};

type TabProps = {
  type: TabId;
  projects: Project[];
  threshold?: Threshold;
  selected: string;
};

const Tab = ({ type, projects, threshold, selected }: TabProps) => {
  const view = VIEWS[type];
  const isSelected = selected === view;

  if (type === 'all') {
    return (
      <SubNav.Link href={`#${view}`} selected={isSelected}>
        All
      </SubNav.Link>
    );
  }

  const count = projects.reduce((acc, p) => acc + p[type].totalCount, 0);
  const color = STATUS_TO_COLOR[limitToStatus(count, threshold?.[type])];
  const title = view
    .split('-')
    .map((tab) => tab[0].toUpperCase() + tab.substring(1))
    .join(' ');

  return (
    <SubNav.Link href={`#${view}`} selected={isSelected}>
      {title}
      <Label ml={1} bg={color}>
        {count}
      </Label>
    </SubNav.Link>
  );
};

export const Summary = () => {
  const location = useLocation();
  const settingsQuery = useSettingsQuery();
  const projectsQuery = useProjectsQuery();

  return (
    <SubNav aria-label="Main">
      <SubNav.Links>
        {Object.keys(VIEWS).map((view) => (
          <Tab
            type={view as TabId}
            projects={projectsQuery.data || []}
            threshold={settingsQuery.data?.threshold}
            key={view}
            selected={location.hash.replace('#', '')}
          />
        ))}
      </SubNav.Links>
    </SubNav>
  );
};
