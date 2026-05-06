import { Box } from 'components/Box/Box';
import { Code } from 'components/Code/Code';
import { Text } from 'components/Text/Text';
import { regionWrapper, table, td, th } from './Table.css';

type HeaderDef = string[];
type DataDef = string[];
type DataTypes = 'string' | 'code';

function TableRow({
  data,
  dataTypes,
  key,
}: {
  data: DataDef;
  dataTypes: DataTypes[];
  key: string;
}) {
  return (
    <Box as="tr" key={key}>
      {data.map((value, i) => (
        <Box as="td" className={td} key={`${dataTypes[i]}-${value}`}>
          {dataTypes[i] === 'code' ? (
            <Code>{value}</Code>
          ) : (
            <Text as="p" color="labelSecondary" style={{ fontWeight: 500 }}>
              {value}
            </Text>
          )}
        </Box>
      ))}
    </Box>
  );
}

export function Table({
  'aria-label': ariaLabel,
  header,
  dataTypes,
  data,
}: {
  header: HeaderDef;
  dataTypes: DataTypes[];
  data: DataDef[];
  'aria-label'?: string;
}) {
  return (
    <Box
      aria-label={ariaLabel}
      className={regionWrapper}
      marginBottom="9"
      role="region"
      tabIndex={0}
    >
      <Box as="table" className={table}>
        <Box as="thead">
          <Box as="tr">
            {header.map((headerName) => (
              <Box as="th" className={th} key={headerName}>
                {headerName}
              </Box>
            ))}
          </Box>
        </Box>
        <Box as="tbody">
          {data.map((props) => (
            <TableRow
              data={props}
              dataTypes={dataTypes}
              key={props.join('-')}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
