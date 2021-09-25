import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { Button } from "@mui/material";
import moment from "moment";
import "moment/locale/es";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function createData(code, type, userName, dni, createdAt) {
  return {
    code,
    type,
    userName,
    dni,
    createdAt,
  };
}

const rows = [
  createData(
    "lic_conducir-0001",
    "Licencia de conducir",
    "Test Uno",
    "12345678",
    "2021-08-10T03:52:40.000Z"
  ),
  createData(
    "lic_conducir-0002",
    "Licencia de conducir",
    "Test Uno",
    "12345678",
    "2021-08-11T03:52:40.000Z"
  ),
  createData(
    "lic_conducir-0003",
    "Licencia de conducir",
    "Test Uno",
    "12345678",
    "2021-08-12T03:52:40.000Z"
  ),
  createData(
    "lic_conducir-0004",
    "Licencia de conducir",
    "Test Uno",
    "12345678",
    "2021-08-13T03:52:40.000Z"
  ),
  createData(
    "lic_conducir-0005",
    "Licencia de conducir",
    "Test Uno",
    "12345678",
    "2021-08-14T03:52:40.000Z"
  ),
  createData(
    "lic_conducir-0006",
    "Licencia de conducir",
    "Test Uno",
    "12345678",
    "2021-08-15T03:52:40.000Z"
  ),
  createData(
    "lic_conducir-0007",
    "Licencia de conducir",
    "Test Uno",
    "12345678",
    "2021-08-16T03:52:40.000Z"
  ),
  createData(
    "lic_conducir-0008",
    "Licencia de conducir",
    "Test Uno",
    "12345678",
    "2021-08-17T03:52:40.000Z"
  ),
  createData(
    "lic_conducir-0009",
    "Licencia de conducir",
    "Test Uno",
    "12345678",
    "2021-08-18T03:52:40.000Z"
  ),
  createData(
    "lic_conducir-0008",
    "Licencia de conducir",
    "Test Uno",
    "12345678",
    "2021-08-19T03:52:40.000Z"
  ),
  createData(
    "lic_conducir-0010",
    "Licencia de conducir",
    "Test Uno",
    "12345678",
    "2021-08-20T03:52:40.000Z"
  ),
  createData(
    "lic_conducir-0011",
    "Licencia de conducir",
    "Test Uno",
    "12345678",
    "2021-08-21T03:52:40.000Z"
  ),
  createData(
    "lic_conducir-0012",
    "Licencia de conducir",
    "Test Uno",
    "12345678",
    "2021-08-22T03:52:40.000Z"
  ),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "code",
    numeric: true,
    disablePadding: false,
    label: "Código",
  },
  {
    id: "type",
    numeric: true,
    disablePadding: false,
    label: "Tipo",
  },
  {
    id: "userName",
    numeric: true,
    disablePadding: false,
    label: "Usuario",
  },
  {
    id: "dni",
    numeric: true,
    disablePadding: false,
    label: "DNI",
  },
  {
    id: "createdAt",
    numeric: true,
    disablePadding: false,
    label: "Fecha de inicio",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            padding={"normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell padding="checkbox"></TableCell>
        <TableCell padding="checkbox"></TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function PendingTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  let history = useHistory();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEvaluar = (code) => {
    // TODO asignar el caso al usuario
    history.push(`/in-progress/${code}`);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"small"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow tabIndex={-1} key={row.name}>
                      <TableCell align="left">{row.code}</TableCell>
                      <TableCell align="left">{row.type}</TableCell>
                      <TableCell align="left">{row.userName}</TableCell>
                      <TableCell align="left">{row.dni}</TableCell>
                      <TableCell align="left">
                        {moment(row.createdAt).locale("es").format("L")}
                      </TableCell>
                      <TableCell padding="normal" align="right">
                        <Button
                          color="secondary"
                          size="small"
                          //   onClick={() => console.log("ver detalle")}
                          sx={{ width: "max-content" }}
                          component={Link}
                          to={`/detail/${row.code}`}
                        >
                          Ver Detalle
                        </Button>
                      </TableCell>
                      <TableCell padding="normal" align="right">
                        <Button
                          color="secondary"
                          size="small"
                          variant="contained"
                          onClick={() => handleEvaluar(row.code)}
                        >
                          Evaluar
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
