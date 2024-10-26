import React, { useState, useEffect, useRef } from "react";
import { Document, Page } from "react-pdf"; // Import from react-pdf
import "react-pdf/dist/esm/Page/AnnotationLayer.css"; // Add necessary styles
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();


const PdfImageDisplay: React.FC<{ file: File }> = ({ file }) => {
  const [pageImages, setPageImages] = useState<string[]>([]);
  useEffect(() => {
    const loadPdf = async () => {
      const pdfData = await file.arrayBuffer(); // Convert file to array buffer
      const pdf = await pdfjs.getDocument(pdfData).promise;
      const pages:string[] = [];

      for (let pageIndex = 1; pageIndex <= pdf.numPages; pageIndex++) {
        const page = await pdf.getPage(pageIndex);
        const viewport = page.getViewport({ scale: 1.5 });

        // Create canvas element to render the PDF page
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
          console.error("Failed to get canvas context");
          continue; // Skip if context is null
        }

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render the page into the canvas
        const renderContext = {
          canvasContext: context, // Use non-null context
          viewport: viewport,
        };

        await page.render(renderContext).promise;

        // Convert canvas to image URL
        const imgUrl = canvas.toDataURL("image/png");
        pages.push(imgUrl);
      }

      setPageImages(pages); // Set the base64 image URLs to state
    };

    loadPdf();
  }, [file]);

  return (
    <div className="grid grid-cols-4 gap-4">
      {pageImages.map((imgUrl, index) => (
        <img key={index} src={imgUrl} alt={`Page ${index + 1}`} width={130} height={130} className="border" />
      ))}
    </div>
  );
};


export default PdfImageDisplay;
