import React, { ReactNode } from 'react';
import { Box, BoxProps, Heading } from 'grommet';
import styled, { keyframes, css } from 'styled-components';

export type Props = BoxProps & {
  title: string;
  children: ReactNode;
  loading?: boolean;
};

const Section = ({ title, children, ...rest }: Props) => {
  return (
    <LoadingBox round pad="medium" background="white" {...rest}>
      <Heading level="2" margin={{ bottom: 'small', top: 'none' }}>
        {title}
      </Heading>
      <Box direction="row" justify="between">
        {children}
      </Box>
    </LoadingBox>
  );
};

const fade = keyframes`
  from {
    opacity: 0;
  }
`;

const animation = (duration: number) =>
  css`
    ${fade} ${duration}s infinite alternate;
  `;

export const LoadingBox = styled(Box)<{ loading?: boolean }>`
  animation: ${(props) => animation(props.loading ? 1 : 0)};

  & > * {
    transition: opacity 1s ease;
    opacity: ${(props) => (props.loading ? '0' : '1')};
  }
`;

export default Section;
