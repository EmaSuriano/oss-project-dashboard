import React, { useEffect, useState } from 'react';
import { Redirect, RouteChildrenProps } from 'react-router';
import auth, { buildAccessTokenLink, authLink } from '../utils/auth';
import { Button, Heading, Paragraph, Main } from 'grommet';
import { Github } from 'grommet-icons';
import queryString from 'query-string';
import { Footer } from '../components/Footer';
import styled from 'styled-components';

type RouteParams = { code: string };
type Props = RouteChildrenProps<RouteParams>;

const Login = ({ location }: Props) => {
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
    <Main pad="large" gap="medium" justify="center" align="center" wrap>
      <Heading textAlign="center">Open Source Dashboard</Heading>
      <Paragraph margin={{ top: 'none' }} textAlign="center" size="xxlarge">
        A Dashboard to have a quick overview of Open Sources projects in your
        Github account{' '}
        <span role="img" aria-label="sparkles">
          ✨
        </span>
      </Paragraph>
      {signing ? (
        'Loadinggg'
      ) : (
        <Button
          label="Log in with Github"
          primary
          icon={<Github />}
          href={authLink}
        />
      )}

      <ForceFooter>
        <Footer />
      </ForceFooter>
    </Main>
  );
};

const ForceFooter = styled.div`
  bottom: 0;
  position: absolute;
  right: 0;
`;

export default Login;
