import PendingTable from "../components/PendingTable";
import { getTableHeadCells, getTableRows } from "../utils/tables";

const PendingPage = () => {
  const headCells = getTableHeadCells();
  const rows = getTableRows();
  return <PendingTable headCells={headCells} rows={rows} />;
};

export default PendingPage;
