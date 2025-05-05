"use client";

import { useRouter } from "next/navigation";

export default function FormPage() {
  const router = useRouter();

  const handleDownloadPdf = (pdfBlob) => {
    const blobUrl = URL.createObjectURL(pdfBlob);
    sessionStorage.setItem("pdfBlobUrl", blobUrl);
    router.push("/pdf-page");
  };

  const simulatePdfBlob = () => {
    const dummyBlob = new Blob(["This is sample content"], { type: "application/pdf" });
    handleDownloadPdf(dummyBlob);
  };

  return (
    <div className="p-4">
      <button
        onClick={simulatePdfBlob}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Download as PDF (Redirect)
      </button>
    </div>
  );
}
