import 'cross-fetch/polyfill';
import ApolloClient from 'apollo-boost';
import {
  Query as GistNameQuery,
  QueryData as GistQueryData,
} from '../queries/GistNameQuery';
import {
  Query as ProjectQuery,
  QueryData as ProjectQueryData,
} from '../queries/ProjectQuery';
import {
  Query as RepositoriesQuery,
  QueryData as RepositoriesQueryData,
} from '../queries/RepositoriesQuery';

import { projectNameToParts } from '../utils/string';
import { PROJECT_FILE_NAME } from '../utils/constant';
import { createTransport } from 'nodemailer';

const macaw = require('macaw');
// const sendgrid = require('@macaw-email/provider-sendgrid');

const {
  REACT_APP_GITHUB_ACCESS_TOKEN: accessToken,
  SMTP_USER,
  SMTP_PASS,
} = process.env;

const emailTransporter = createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

type MailInfo = { email: string; name: string };

type MailData = { subject: string };

type ProviderSend = {
  to: MailInfo;
  from: MailInfo;
  data: MailData;
  html: string;
};

const mailer = macaw({
  // provider: sendgrid({ apiKey: 'aaaaa-bbbbbbb-ccccccc-ddddddd' }),
  provider: {
    send: ({ to, data, from, html }: ProviderSend) => {
      return emailTransporter.sendMail({
        from: `"${from.name}" <${from.email}`,
        to: `"${to.name}" <${to.email}`,
        subject: data.subject,
        html,
      });
    },
  },
});

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: (operation) => {
    operation.setContext(() => ({
      headers: {
        authorization: `token ${accessToken}`,
      },
    }));
  },
});

const main = async () => {
  const gistQuery = await client.query<GistQueryData>({ query: GistNameQuery });
  const gist = gistQuery.data.viewer.gists.nodes.find(({ files }) =>
    files.find(({ name }) => name === PROJECT_FILE_NAME),
  );
  const { name } = gist || {};

  const projectsQuery = await client.query<ProjectQueryData>({
    query: ProjectQuery,
    variables: { name },
  });
  const gistFiles = projectsQuery.data.viewer.gist.files;
  const { projects } = JSON.parse(gistFiles[0].text) as { projects: string[] };

  const repositoriesQuery = await client.query<RepositoriesQueryData>({
    query: RepositoriesQuery(projects),
  });
  const projectsWithData = projects
    .map((projectName) => {
      const { key } = projectNameToParts(projectName);
      return repositoriesQuery.data![key];
    })
    .filter(Boolean);

  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const template = await mailer.template('monthly-newsletter', {
    customerName: 'Example Business',
    greeting: 'Hi, Thomas!',
    projects: projectsWithData,
    subtitle: `Report of ${date}`,
  });

  await template.send({
    to: {
      name: 'Ema',
      email: 'emanuel.suriano@gmail.com',
    },
    from: {
      name: 'OSS',
      email: 'no-reply@oss-reporter.com',
    },
  });
};

main();
