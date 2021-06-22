import {
  Header as PrimerHeader,
  Dropdown,
  Box,
  Avatar,
  StyledOcticon,
} from '@primer/components';
import { MarkGithubIcon } from '@primer/octicons-react';
import { useUserQuery } from '../queries/useUserQuery';

export const Header = () => {
  const { data } = useUserQuery();

  return (
    <>
      <PrimerHeader>
        <PrimerHeader.Item>
          <PrimerHeader.Link href="/" fontSize={2}>
            <StyledOcticon icon={MarkGithubIcon} size={32} mr={2} />
            <span>Open Source Dashboard</span>
          </PrimerHeader.Link>
        </PrimerHeader.Item>
        <PrimerHeader.Item full />
        <PrimerHeader.Item mr={0}>
          <Dropdown css={{}}>
            <Box as="summary" sx={{ cursor: 'pointer' }}>
              <Avatar src={data?.viewer.avatarUrl} alt={data?.viewer.login} />
              <Dropdown.Caret />
            </Box>
            <Dropdown.Menu direction="sw" mt={2}>
              <Box as="li" color="text.primary" px={3}>
                Signed in as <br />
                <b>{data?.viewer.login}</b>
              </Box>
              <Box bg="border.primary" height="1px" my={2} />
              <Dropdown.Item>
                <a href={data?.viewer.url}>Your Profile</a>
              </Dropdown.Item>
              <Dropdown.Item>
                <a href="/logout">Sign out</a>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </PrimerHeader.Item>
      </PrimerHeader>
    </>
  );
};
