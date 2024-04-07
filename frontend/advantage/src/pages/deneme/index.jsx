import React from "react";
import jsPDF from 'jspdf';
import { useNavigate } from "react-router-dom";

function generatePDF() {
  const doc = new jsPDF();

  // Set font size and type for the text
  doc.setFontSize(12); // Set font size to 12 points
  doc.setFont('times', 'normal'); // Set font type to Times

  const content = [
    { text: 'Date: 2024-04-07' },
    { text: 'Report ID: 123456789' },
    { text: 'Report Title: Example Report Title' },
    { text: 'Ad Text: This is an example advertisement text.Ad Text:Ad Text: This is an example advertisement text.Ad Text: This is an example advertisement text. This is an example advertisement text.Ad Text: This is an example advertisement text.Ad Text: This is an example advertisement text.Ad Text: This is an example advertisement text.Ad Text: This is an example advertisement text.Ad Text: This is an example advertisement text.Ad Text: This is an example advertisement text.Ad Text: This is an example advertisement text.Ad Text: This is an example advertisement text.Ad Text: This is an example advertisement text.Ad Text: This is an example advertisement text.' },
    { text: 'Report Predictions: Prediction 1: Positive, Prediction 2: Neutral, Prediction 3: Negative' }
  ];

  let yOffset = 20; // Initial y offset

  // Add content to the PDF
  content.forEach(({ text }) => {
    const textLines = doc.splitTextToSize(text, doc.internal.pageSize.width - 20);
    const textHeight = textLines.length * 8; // Calculate height of text block

    // Check if text will exceed the page height
    if (yOffset + textHeight > doc.internal.pageSize.height) {
      doc.addPage(); // Add a new page if text exceeds page height
      yOffset = 20; // Reset yOffset
    }

    doc.text(textLines, 10, yOffset); // Add text to PDF
    yOffset += textHeight + 1; // Update yOffset for next text block
  });
  // Save the PDF
  doc.save("report.pdf");
}
export const DenemePage = () => {

  return (
  
    <div>
    <button onClick={generatePDF}>Export as PDF</button>
  </div>

  );
};

export default DenemePage;