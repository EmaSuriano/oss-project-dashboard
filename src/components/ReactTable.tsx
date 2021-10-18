import {
  useTable,
  useSortBy,
  TableOptions,
  usePagination,
  TableInstance,
  UsePaginationInstanceProps,
  UsePaginationState,
} from 'react-table';
import styled from 'styled-components';
import { Box, StyledOcticon, Spinner, Pagination } from '@primer/components';
import { ChevronDownIcon, ChevronUpIcon } from '@primer/octicons-react';
import { QueryStatus } from 'react-query';

type Props<D extends object> = TableOptions<D> & { status: QueryStatus };

const LoadingRow = () => (
  <TableRow>
    <TableItem>
      <Spinner />
    </TableItem>
  </TableRow>
);

const TableRow = styled(Box).attrs({
  as: 'tr',
  p: 3,
  display: 'flex',
})<{
  header: boolean;
}>`
  background: ${({ theme, header }) =>
    header ? theme.colors.bg.secondary : theme.colors.bg.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.bg.secondary};
  }
`;

const TableItem = styled(Box)`
  flex-flow: row nowrap;
  flex-grow: 1;
  flex-basis: 0;
  color: ${({ sorted, theme }) => sorted && theme.colors.label.info.text};
`;

type TableInstanceProps<T extends object> = TableInstance<T> &
  UsePaginationInstanceProps<T> & { state: UsePaginationState<T> };

export const ReactTable = <T extends object>({
  status,
  ...tableProps
}: Props<T>) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    gotoPage,
    pageCount,
    state: { pageIndex },
  } = useTable(tableProps, useSortBy, usePagination) as TableInstanceProps<T>;

  return (
    <>
      <Box
        as="table"
        width="100%"
        borderWidth="1px"
        borderStyle="solid"
        borderColor="border.primary"
        borderRadius={2}
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <TableRow header {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <TableItem
                  as="th"
                  sorted={column.isSorted}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                  {column.isSorted ? (
                    <StyledOcticon
                      icon={
                        column.isSortedDesc ? ChevronDownIcon : ChevronUpIcon
                      }
                      ml={2}
                    />
                  ) : (
                    <Box ml={2} as="span" />
                  )}
                </TableItem>
              ))}
            </TableRow>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {status === 'success' ? (
            page.map((row) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <TableItem as="td" {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </TableItem>
                    );
                  })}
                </TableRow>
              );
            })
          ) : (
            <LoadingRow />
          )}
        </tbody>
      </Box>
      {pageCount > 1 && (
        <Pagination
          pageCount={pageCount}
          currentPage={pageIndex + 1}
          onPageChange={(e, p) => {
            e.preventDefault();
            gotoPage(p - 1);
          }}
        />
      )}
    </>
  );
};
