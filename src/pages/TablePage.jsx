// import { tableData } from "../data/tableData";
// import DataTable from "../components/DataTable";

// export default function TablePage() {
//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Data Table</h2>
//       <DataTable data={tableData} />
//     </div>
//   );
// }
"use client";

import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function TablePage() {
  const [tableData, setTableData] = useState([]);
  const tableRef = useRef();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      setTableData(json);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDownloadPdf = () => {
    if (tableData.length === 0) return;

    const doc = new jsPDF();
    const headers = Object.keys(tableData[0]);
    const rows = tableData.map((row) => headers.map((h) => row[h]));

    autoTable(doc, {
      head: [headers],
      body: rows,
    });

    doc.save("table-preview.pdf");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Data Table</h2>

      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="mb-4"
      />

      {tableData.length > 0 ? (
        <>
          <div ref={tableRef} className="overflow-auto border rounded mb-4">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  {Object.keys(tableData[0]).map((key) => (
                    <th key={key} className="border px-4 py-2 text-left">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, i) => (
                  <tr key={i} className="even:bg-gray-50">
                    {Object.values(row).map((val, j) => (
                      <td key={j} className="border px-4 py-2">
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={handleDownloadPdf}
            className="px-4 py-2 btn btn-secondary"
          >
            Download as PDF
          </button>
        </>
      ) : (
        <p className="text-gray-500">Upload an Excel file to preview and download.</p>
      )}
    </div>
  );
}





