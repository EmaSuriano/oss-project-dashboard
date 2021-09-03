import { Box, Spinner } from '@primer/components';
import styled from 'styled-components';

export const LoadingRow = () => (
  <TableRow>
    <TableItem>
      <Spinner />
    </TableItem>
  </TableRow>
);

export const TableRow = styled(Box).attrs({
  as: 'tr',
  p: 3,
  display: 'flex',
  flexWrap: 'nowrap',
})<{
  header: boolean;
  sorted: boolean;
}>`
  background: ${({ theme, header }) =>
    header ? theme.colors.bg.secondary : theme.colors.bg.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.bg.secondary};
  }
`;

export const TableItem = styled(Box).attrs({
  display: 'flex',
  flexWrap: 'nowrap',
})`
  flex-flow: row nowrap;
  flex-grow: ${(props) => props.flexGrow || 1};
  justify-content: ${(props) => (props.flexGrow ? 'left' : 'center')};
  flex-basis: 0;
  word-break: break-word;
  color: ${({ sorted, theme }) => sorted && theme.colors.label.info.text};
`;
