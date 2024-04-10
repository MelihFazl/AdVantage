import React from "react";
import jsPDF from 'jspdf';


export const PDFPage = () => {
  function generatePDF() {
    const doc = new jsPDF();
  
    const date = "2024-04-07";
    const reportId = "123456789";
    const reportTitle = "Example Report Title";
    const advertisementText = "This is an example advertisement text.";
    const reportPredictions = "Prediction 1: Positive, Prediction 2: Neutral, Prediction 3: Negative";
    // Set font size and type for the text
    doc.setFontSize(12); // Set font size to 12 points
    doc.setFont('times', 'normal'); // Set font type to Times
  
    //here there will be variables come from APIs
    const content = [
      { text: `Date: ${date}` },
      { text: `Report ID: ${reportId}` },
      { text: `Report Title: ${reportTitle}` },
      { text: `Advertisement Text: ${advertisementText}` },
      { text: `Report Predictions: ${reportPredictions}` }
    ];
  
    let yOffset = 20; // Initial y offset
  
    // Add content to the PDF
    content.forEach(({ text }) => {
      const textLines = doc.splitTextToSize(text, doc.internal.pageSize.width - 20);
      const textHeight = textLines.length * 7; // Calculate height of text block
  
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
  return (
  
    <div>
    <button onClick={generatePDF}>Export as PDF</button>
  </div>

  );
};

export default PDFPage;