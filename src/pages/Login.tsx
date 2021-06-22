import React, { useEffect, useState } from 'react';
import { Redirect, RouteChildrenProps } from 'react-router';
import auth, { buildAccessTokenLink, authLink } from '../helpers/auth';
import queryString from 'query-string';
import {
  Box,
  Button,
  ButtonPrimary,
  Flex,
  Link,
  StyledOcticon,
  Text,
} from '@primer/components';
import { TopWrapper } from '../components/TopWrapper';
import { MarkGithubIcon } from '@primer/octicons-react';

type RouteParams = { code: string };
type Props = RouteChildrenProps<RouteParams>;

export const Login = ({ location }: Props) => {
  const [accessToken, setAccessToken] = useState(auth.getCredentials());
  const [signing, setSigning] = useState(false);

  const { code } = queryString.parse(location.search) as RouteParams;

  useEffect(() => {
    const fetchGithubAuth = async (code: string) => {
      setSigning(true);
      const result = await fetch(buildAccessTokenLink(code), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      });

      const { access_token } = await result.json();
      setAccessToken(access_token);
    };

    if (code) fetchGithubAuth(code);
  }, [code]);

  if (accessToken) {
    auth.signIn(accessToken);
    return <Redirect to="/" />;
  }

  return (
    <TopWrapper>
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        width="500px"
        margin="auto"
      >
        <StyledOcticon icon={MarkGithubIcon} size={80} mt={8} />
        <Text as="h1">Open Source Dashboard</Text>
        <Text as="p" textAlign="center">
          Quick overview of all your Open Sources projects in Github{' '}
          <span role="img" aria-label="sparkles">
            ✨
          </span>
        </Text>
        <Box my={2}>
          <ButtonPrimary as="a" href={authLink} css={{}} mr={2}>
            {signing ? 'Logging ... ' : 'Log in with Github'}
          </ButtonPrimary>

          <Button as="a" href="https://oss.emasuriano.com/" css={{}}>
            Check Demo
          </Button>
        </Box>
        <Text as="p">
          Develop with{' '}
          <span role="img" aria-label="love">
            ❤️
          </span>{' '}
          by <Link href="http://emasuriano.com/">Ema Suriano</Link>
        </Text>
      </Flex>
    </TopWrapper>
  );
};
