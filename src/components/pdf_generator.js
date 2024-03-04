import React from 'react';
import html2pdf from 'html2pdf.js';
import { Button } from 'primereact/button';

const PdfGenerator = ({ htmlContent }) => {
  const generatePdf = () => {
    let element = htmlContent;

    html2pdf(element, {
      filename:     'generated.pdf',
      image:        { type: 'jpeg', quality: 2 },
      html2canvas:  { dpi: 192000, letterRendering: true },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    });

    element = null;
  };

  return (
      <Button label="Generate PDF Bill" onClick={generatePdf} />
  );
};

export default PdfGenerator;
