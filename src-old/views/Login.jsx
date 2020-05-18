import React, { useEffect, useState } from 'react';
import { Button, Card, CardHeader, Col } from 'reactstrap';
import { Redirect } from 'react-router';
import queryString from 'query-string';
import auth, { buildAccessTokenLink, authLink } from '../auth';

const Login = props => {
  const [accessToken, setAccessToken] = useState(auth.getCredentials());
  const [signing, setSigning] = useState(false);
  const params = queryString.parse(props.location.search);

  useEffect(() => {
    const fetchGithubAuth = async code => {
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

    if (params.code) fetchGithubAuth(params.code);
  }, [params.code]);

  if (accessToken) {
    auth.signIn(accessToken);
    return <Redirect to="/admin" />;
  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>{signing ? 'Sign in ...' : 'Sign in with'}</small>
            </div>

            <div
              className="btn-wrapper text-center"
              style={{ justifyContent: 'center', display: 'flex' }}
            >
              {signing ? (
                <div className="loading" />
              ) : (
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href={authLink}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require('assets/img/icons/common/github.svg')}
                    />
                  </span>
                  <span className="btn-inner--text">Github</span>
                </Button>
              )}
            </div>
          </CardHeader>
        </Card>
      </Col>
    </>
  );
};

export default Login;
