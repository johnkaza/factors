import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from '@mui/material';

interface tableHeaderTypes {
  name: string;
  value: string;
}

const itemValue = (values: Array<string>) => {
  if (Array.isArray(values)) return values.join(', ');

  return values;
};

function App(props: any) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {props.headers.map((header: tableHeaderTypes) => (
                <TableCell key={header.value}>
                  <strong>{header.name}</strong>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props?.list.length > 0 &&
              props?.list.map((item: any, index: number) => (
                <TableRow
                  key={index}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => props.clickRow(item)}
                >
                  {props.headers.map((header: tableHeaderTypes, index: number) => (
                    <TableCell key={index}>{itemValue(item[header.value])}</TableCell>
                  ))}
                </TableRow>
              ))}
            {props?.list.length === 0 && (
              <TableRow>
                <TableCell>No data to display</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {props?.pagination?.count > 0 && (
          <TablePagination
            component="div"
            count={props.pagination.totalPages}
            page={props.page}
            onPageChange={props.handleChangePage}
            rowsPerPage={props.perPage}
            onRowsPerPageChange={props.onRowsPerPageChange}
            rowsPerPageOptions={props.rowsPerPageOptions}
          />
        )}
      </TableContainer>
      {/* <TablePagination rowsPerPageOptions={[10, 50, { value: -1, label: 'All' }]} /> */}
    </>
  );
}

export default App;
