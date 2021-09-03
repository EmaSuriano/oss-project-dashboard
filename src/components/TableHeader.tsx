import { useContext, createContext, ReactNode } from 'react';
import { TableItem, TableRow } from './Table';
import { ChevronDownIcon, ChevronUpIcon } from '@primer/octicons-react';
import { StyledOcticon, BoxProps, Box } from '@primer/components';
import { Order } from '../types';

const HeaderContext = createContext({
  sort: '',
  order: Order.ASC,
  onSort: (_: string): void => {
    throw new Error('TableHeader wrapper not rendered ...');
  },
});

type TableHeaderProps = {
  onChange: (sort: string, order: Order) => void;
  children: ReactNode;
  sort: string;
  order: Order;
};

export const TableHeader = ({
  onChange,
  sort,
  order,
  children,
}: TableHeaderProps) => {
  const onSort = (newSort: string) => {
    const newOrder =
      newSort === sort && order === Order.ASC ? Order.DESC : Order.ASC;

    console.log(newSort, newOrder);
    onChange(newSort, newOrder);
  };

  return (
    <HeaderContext.Provider value={{ sort, order, onSort }}>
      <TableRow header>{children}</TableRow>
    </HeaderContext.Provider>
  );
};

type TableHeaderItemProps = BoxProps & {
  label: string;
  name: string;
};

export const TableHeaderItem = ({
  name,
  label,
  ...rest
}: TableHeaderItemProps) => {
  const { sort, order, onSort } = useContext(HeaderContext);

  const sorted = sort === name;
  const orderIcon = order === Order.ASC ? ChevronDownIcon : ChevronUpIcon;

  return (
    <TableItem {...rest} as="th" onClick={() => onSort(name)} sorted={sorted}>
      {label}
      {sorted ? (
        <StyledOcticon icon={orderIcon} size={24} ml={2} />
      ) : (
        <Box size={24} ml={2} />
      )}
    </TableItem>
  );
};
