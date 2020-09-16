import React, { useContext, useEffect, useState } from 'react';
import { Redirect, RouteChildrenProps } from 'react-router';
import auth, { buildAccessTokenLink, authLink } from '../utils/auth';
import {
  Button,
  Heading,
  Paragraph,
  Main,
  Box,
  ResponsiveContext,
} from 'grommet';
import { Github, Globe } from 'grommet-icons';
import queryString from 'query-string';
// @ts-ignore-start
import Tilt from 'react-tilt'; // @ts-ignore line
// @ts-ignore-end

import { Footer } from '../components/Footer';
import styled, { keyframes } from 'styled-components';
import Overview from '../components/Overview';
import { MOCKED_PROJECTS } from '../mocks/projects';
import { Fixed } from '../components/Fixed';

type RouteParams = { code: string };
type Props = RouteChildrenProps<RouteParams>;

const Login = ({ location }: Props) => {
  const size = useContext(ResponsiveContext);
  const [accessToken, setAccessToken] = useState(auth.getCredentials());
  const [signing, setSigning] = useState(false);

  const { code } = queryString.parse(location.search) as RouteParams;
  const isDesktop = size === 'large';

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
    <MainWithBackground
      pad="large"
      align="center"
      justify="center"
      direction={isDesktop ? 'row' : 'column'}
      gap="large"
    >
      <Box gap="medium" align="center">
        <Heading textAlign="center" color="white">
          Open Source Dashboard
        </Heading>
        <Paragraph
          margin={{ top: 'none' }}
          color="white"
          textAlign="center"
          size="xlarge"
        >
          A Dashboard to have a quick overview of Open Sources projects in your
          Github account{' '}
          <span role="img" aria-label="sparkles">
            ✨
          </span>
        </Paragraph>
        <Box direction="row" gap="medium">
          <Button
            label={signing ? 'Logging ... ' : 'Log in with Github'}
            primary
            disabled={signing}
            icon={<Github />}
            href={authLink}
          />

          <Button
            color="accent-1"
            label="Check Demo"
            icon={<Globe color="white" />}
            href="https://oss.emasuriano.com/"
          />
        </Box>
      </Box>
      <Box animation="fadeIn">
        <Tilt className="Tilt" options={{ max: 10, scale: 1 }}>
          <Overview loading={false} projects={MOCKED_PROJECTS} />
        </Tilt>
      </Box>

      <Fixed position="bottom">
        <Footer background />
      </Fixed>
    </MainWithBackground>
  );
};

const gradient = keyframes`
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
`;

const MainWithBackground = styled(Main)`
  background-image: linear-gradient(
    to right top,
    #7d4cdb,
    #6a3cc9,
    #572bb6,
    #431aa5,
    #2d0693
  );
  background-size: 400% 400%;
  animation: ${gradient} 5s ease infinite;
`;

export default Login;
