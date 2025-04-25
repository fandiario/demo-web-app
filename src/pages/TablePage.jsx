import { tableData } from "../data/tableData";
import DataTable from "../components/DataTable";

export default function TablePage() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Data Table</h2>
      <DataTable data={tableData} />
    </div>
  );
}
