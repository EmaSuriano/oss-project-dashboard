import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Box } from 'grommet';

export const LoadingSection = ({ ...rest }) => (
  <AnimationBox background="white" round {...rest} />
);

const fade = keyframes`
  from {
    opacity: 0;
  }
`;

export const AnimationBox = styled(Box)`
  animation: ${fade} 1s infinite alternate;
`;

export default LoadingSection;
