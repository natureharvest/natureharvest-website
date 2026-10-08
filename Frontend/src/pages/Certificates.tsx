import { useState } from "react";
import {
  Minus,
  Plus,
  RotateCcw,
  Download,
  Printer,
  FileText,
} from "lucide-react";

import Breadcrumb from "../components/Breadcrub";

type PDFDocument = {
  id: number;
  url: string;
  downloadUrl: string;
  title: string;
};

const pdfDocuments: PDFDocument[] = [
  {
    id: 1,
    url: "/pdfs/certificate-7.pdf",
    downloadUrl: "/pdfs/certificate-7.pdf",
    title: "Certificate Page 1",
  },
  {
    id: 2,
    url: "/pdfs/certificate-8.pdf",
    downloadUrl: "/pdfs/certificate-8.pdf",
    title: "Certificate Page 2",
  },
  {
    id: 3,
    url: "/pdfs/certificate-9.pdf",
    downloadUrl: "/pdfs/certificate-9.pdf",
    title: "Certificate Page 3",
  },
  {
    id: 4,
    url: "/pdfs/certificate-10.pdf",
    downloadUrl: "/pdfs/certificate-10.pdf",
    title: "Certificate Page 4",
  },
  {
    id: 5,
    url: "/pdfs/certificate-11.pdf",
    downloadUrl: "/pdfs/certificate-11.pdf",
    title: "Certificate Page 5",
  },
  {
    id: 6,
    url: "/pdfs/certificate-12.pdf",
    downloadUrl: "/pdfs/certificate-12.pdf",
    title: "Certificate Page 6",
  },
  {
    id: 7,
    url: "/pdfs/certificate-13.pdf",
    downloadUrl: "/pdfs/certificate-13.pdf",
    title: "Certificate Page 7",
  },
];

const Certificates = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Breadcrumb
        title="Certificates"
        backgroundImage="/images/breadcrumb.jpg"
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {pdfDocuments.map((pdf) => (
            <CertificateCard key={pdf.id} pdf={pdf} />
          ))}
        </div>
      </div>
    </div>
  );
};

type CertificateCardProps = {
  pdf: PDFDocument;
};

const CertificateCard = ({ pdf }: CertificateCardProps) => {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  const MAX_ZOOM = 200;
  const MIN_ZOOM = 50;
  const ZOOM_STEP = 10;

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - ZOOM_STEP, MIN_ZOOM));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleDownload = () => {
    const link = document.createElement("a");

    link.href = pdf.downloadUrl;
    link.download = `${pdf.title}.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    const printWindow = window.open(pdf.url, "_blank");

    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Card Header */}
      <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-5 py-4">
        <h3 className="font-semibold text-gray-800">
          {pdf.title}
        </h3>

        <div className="flex items-center gap-2">
          {/* Download */}
          <button
            type="button"
            onClick={handleDownload}
            className="
              flex h-8 w-8 items-center justify-center
              rounded-md border border-gray-200 bg-white
              text-gray-600 shadow-sm
              transition-colors
              hover:bg-gray-100 hover:text-green-600
            "
            title="Download"
            aria-label={`Download ${pdf.title}`}
          >
            <Download className="h-4 w-4" />
          </button>

          {/* Print */}
          <button
            type="button"
            onClick={handlePrint}
            className="
              flex h-8 w-8 items-center justify-center
              rounded-md border border-gray-200 bg-white
              text-gray-600 shadow-sm
              transition-colors
              hover:bg-gray-100 hover:text-green-600
            "
            title="Print"
            aria-label={`Print ${pdf.title}`}
          >
            <Printer className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* PDF Toolbar */}
      <div className="flex h-12 items-center justify-center gap-1 bg-[#2d2d2d] px-4 text-white">
        <button
          type="button"
          onClick={handleZoomOut}
          disabled={zoom <= MIN_ZOOM}
          className="
            flex h-8 w-8 items-center justify-center
            rounded transition
            hover:bg-white/10
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
          title="Zoom out"
          aria-label="Zoom out"
        >
          <Minus className="h-4 w-4" />
        </button>

        <span className="w-12 text-center text-xs font-medium text-gray-300">
          {zoom}%
        </span>

        <button
          type="button"
          onClick={handleZoomIn}
          disabled={zoom >= MAX_ZOOM}
          className="
            flex h-8 w-8 items-center justify-center
            rounded transition
            hover:bg-white/10
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
          title="Zoom in"
          aria-label="Zoom in"
        >
          <Plus className="h-4 w-4" />
        </button>

        <div className="mx-2 h-5 w-px bg-gray-600" />

        <button
          type="button"
          onClick={handleRotate}
          className="
            flex h-8 w-8 items-center justify-center
            rounded transition
            hover:bg-white/10
          "
          title="Rotate 90 degrees"
          aria-label="Rotate 90 degrees"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      {/* PDF Viewer */}
      <div className="relative h-[550px] w-full overflow-auto bg-[#525659]">
        <div
          className="flex min-h-full min-w-max items-center justify-center p-6 transition-transform duration-300 ease-out"
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: "center center",
          }}
        >
          <div
            className="
              relative flex h-[842px] w-[595px] shrink-0
              items-center justify-center
              bg-white shadow-2xl
              transition-transform duration-300 ease-out
            "
            style={{
              transform: `rotate(${rotation}deg)`,
            }}
          >
            <object
              data={pdf.url}
              type="application/pdf"
              className="pointer-events-none h-full w-full border-0"
              title={pdf.title}
            >
              <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                <FileText className="mb-4 h-10 w-10 text-gray-400" />

                <p className="mb-2 text-sm text-gray-600">
                  Preview not available in this browser.
                </p>

                <a
                  href={pdf.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-[#075657] hover:text-[#f2a318]"
                >
                  Open PDF
                </a>
              </div>
            </object>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificates;