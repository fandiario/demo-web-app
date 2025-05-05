"use client";

import { useEffect, useState } from "react";
import PdfPreviewer from "../components/PdfReviewer";

export default function PdfPage() {
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    const blobUrl = sessionStorage.getItem("pdfBlobUrl");
    if (blobUrl) {
      setFileUrl(blobUrl);

      // Auto download after a short delay
      const timer = setTimeout(() => {
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = "downloaded.pdf";
        link.click();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">PDF Preview and Download</h2>

      {fileUrl ? (
        <PdfPreviewer fileUrl={fileUrl} />
      ) : (
        <p className="text-gray-500">No PDF available for preview.</p>
      )}
    </div>
  );
}
