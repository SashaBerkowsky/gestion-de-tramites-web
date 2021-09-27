function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
export function stableSort(array, comparator) {
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

export const getTableHeadCells = () => {
  const headCells = [
    {
      id: "code",
      label: "Código",
    },
    {
      id: "type",
      label: "Tipo",
    },
    {
      id: "userName",
      label: "Usuario",
    },
    {
      id: "dni",
      label: "DNI",
    },
    {
      id: "createdAt",
      label: "Fecha de inicio",
    },
  ];

  return headCells;
};

function createData(code, type, userName, dni, createdAt) {
  return {
    code,
    type,
    userName,
    dni,
    createdAt,
  };
}

export const getTableRows = () => {
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

  return rows;
};
