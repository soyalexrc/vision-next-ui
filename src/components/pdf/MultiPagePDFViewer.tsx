'use client';
import { Document, Page, pdfjs } from 'react-pdf';
import { useEffect, useState } from 'react';

const url =
  'http://100.42.69.119:3000/api/v1/files/genericStaticFileAsset/servicio-inmobiliario+propiedades+VINM-001+documentos+Ficha_Te%C3%8C%C2%81cnica_Visio%C3%8C%C2%81n_Inmobiliaria_VINM_2023-09-26T04:21:05.pdf';

export default function MultiPagePDFViewer() {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [pageNumber, setPageNumber] = useState(1);

  // const { pdfUrl } = props;
  const [numPages, setNumPages] = useState(0);

  useEffect(() => {
    document.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });
  }, []);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <>
      <Document file={url} options={{}} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <div>
        <div className="pagec">
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </div>
        <div className="buttonc">
          <button type="button" disabled={pageNumber <= 1} onClick={previousPage} className="Pre">
            Previous
          </button>
          <button type="button" disabled={pageNumber >= numPages} onClick={nextPage}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}
