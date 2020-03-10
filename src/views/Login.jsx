import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  Col
} from "reactstrap";
import { Redirect } from 'react-router';
import queryString from 'query-string';
import auth from "../auth";

const AUTHORIZE_URL = "https://github.com/login/oauth/authorize";
const ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token";
const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
const REDIRECT_URL = 'http://localhost:3000/auth'

const authorizeParams = { client_id: CLIENT_ID, redirect_uri: REDIRECT_URL, scope: 'user' }

const queryParams = (params) => Object.keys(params)
  .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
  .join('&');



const Login = (props) => {
  const [accessToken, setAccessToken] = useState(null);
  const params = queryString.parse(props.location.search)

  useEffect(() => {
    const fetchGithubAuth = async (code) => {
      const params = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      }
      const accessTokenUrl = `https://cors-anywhere.herokuapp.com/${ACCESS_TOKEN_URL}?${queryParams(params)}`
      const result = await
        fetch(accessTokenUrl, {
          method: 'POST',
          headers: {
            Accept: 'application/json'
          }
        });
      const { access_token } = await result.json();
      setAccessToken(access_token);
    }

    fetchGithubAuth(params.code)
  }, [params.code])

  if (accessToken) {
    auth.signIn(accessToken);
    return <Redirect to="/admin" />
  }

  const redirectLink = `${AUTHORIZE_URL}?${queryParams(authorizeParams)}`;

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in with</small>
            </div>
            <div className="btn-wrapper text-center">
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href={redirectLink}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={require("assets/img/icons/common/github.svg")}
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
            </div>
          </CardHeader>
        </Card>

      </Col>
    </>
  );
}


export default Login;
