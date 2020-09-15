import React from 'react';
import {
  Table as GrommetTable,
  TableHeader,
  TableCell,
  TableRow,
  TableBody,
  Text,
} from 'grommet';

type Props<T extends Object> = {
  data: T[];
  minWidth?: string;
  config: {
    title: string;
    render: (item: T) => any;
    size?: string;
  }[];
};

const Table = <T extends Object>({ data, config, minWidth }: Props<T>) => {
  return (
    <GrommetTable style={{ width: '100%', minWidth }}>
      <TableHeader>
        <TableRow>
          {config.map(({ title, size }, i) => (
            <TableCell
              key={title}
              scope="col"
              border="bottom"
              margin={{ vertical: 'small' }}
              size={size}
            >
              <Text
                textAlign={i === 0 ? 'start' : 'center'}
                weight={i === 0 ? 'bold' : 'normal'}
              >
                {title}
              </Text>
            </TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, i) => (
          <TableRow key={i}>
            {config.map(({ render, size }, j) => (
              <TableCell
                scope="row"
                margin={{ vertical: 'small' }}
                size={size}
                key={j}
                animation="fadeIn"
              >
                {render(item)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </GrommetTable>
  );
};

export default Table;
