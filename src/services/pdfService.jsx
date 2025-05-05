import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generatePdfFromTable(data) {
  const doc = new jsPDF();

  if (data.length === 0) {
    doc.text("No data to display", 10, 10);
    doc.save("table.pdf");
    return;
  }

  const headers = Object.keys(data[0]);
  const rows = data.map(row => headers.map(header => row[header]));

  autoTable(doc, {
    head: [headers],
    body: rows,
  });

  doc.save("table.pdf");
}
