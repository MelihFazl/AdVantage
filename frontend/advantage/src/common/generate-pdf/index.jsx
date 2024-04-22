import jsPDF from "jspdf";

export function generatePDF(report) {
  const reportObj = report.report;
  const doc = new jsPDF();

  // Set font size and type for the text
  doc.setFontSize(12); // Set font size to 12 points
  doc.setFont("times", "normal"); // Set font type to Times

  //here there will be variables come from APIs
  const content = [
    { text: `Date: ${reportObj?.createdAt.substring(0, 10)}` },
    { text: `Report Title: ${reportObj?.title}` },
    {
      text: `Uploded by: ${reportObj?.uploader?.name} ${reportObj?.uploader?.surname}`,
    },
  ];

  if (reportObj?.type === "SingleAdAnalysisReport") {
    content.push({ text: `Advertisement Text: ${report?.advertisementText}` });
    content.push({ text: `CPI of Ad: ${reportObj?.successPrediction}` });
  } else {
    report?.advertisementTexts?.map((element, index) => {
      content.push({
        text: `Advertisement Text of Ad ${index + 1}: ${element}`,
      });
    });
    report?.comparison?.split(" ")?.map((element, index) => {
      content.push({ text: `CPI of Ad ${index + 1}: ${element}` });
    });
  }
  let yOffset = 20; // Initial y offset

  // Add content to the PDF
  content.forEach(({ text }) => {
    const textLines = doc.splitTextToSize(
      text,
      doc.internal.pageSize.width - 20
    );
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
  doc.save(`${reportObj?.title}.pdf`);
}
