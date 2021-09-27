import PendingTable from "../components/PendingTable";
import { getTableHeadCells, getTableRows } from "../utils/tables";

const DashboardPage = () => {
  const headCells = getTableHeadCells();
  const rows = getTableRows();
  return (
    <div>
      <PendingTable headCells={headCells} rows={rows} />
    </div>
  );
};

export default DashboardPage;
