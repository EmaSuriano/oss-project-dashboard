import styled, { css } from 'styled-components';

type Position = 'top' | 'left' | 'right' | 'bottom';

const positionToCss = (position: Position) => {
  switch (position) {
    case 'top':
      return css`
        top: 0;
        left: 0;
      `;
    case 'left':
      return css`
        top: 0;
        left: 0;
      `;
    case 'right':
      return css`
        top: 0;
        right: 0;
      `;
    case 'bottom':
      return css`
        bottom: 0;
        right: 0;
      `;
  }
};

export const Fixed = styled.div<{ position: Position }>`
  position: fixed;
  ${(props) => positionToCss(props.position)}
`;
