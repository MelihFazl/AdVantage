import jsPDF from "jspdf";
import { toPng } from "html-to-image";
import { BarChart } from "@mui/x-charts/BarChart";

export async function generatePDF(report) {
  const reportObj = report.report;
  const doc = new jsPDF();
  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Use 24-hour format
  };
  const date = new Date(reportObj?.createdAt);

  // Set font size and type for the text
  doc.setFontSize(12); // Set font size to 12 points
  doc.setFont("times", "normal"); // Set font type to Times

  //here there will be variables come from APIs
  const content = [
    { text: `Date: ${date.toLocaleString("en-US", options)}` },
    { text: `Report Title: ${reportObj?.title}` },
    {
      text: `Uploded by: ${reportObj?.uploader?.name} ${reportObj?.uploader?.surname}`,
    },
  ];

  if (report?.type === "SingleAdAnalysisReport") {
    content.push({ text: `Advertisement Text: ${report?.advertisementText}` });
    content.push({ text: `Impression: ${reportObj?.successPrediction}` });
    content.push({ text: `Age Distribution Plot:` });
  } else if (report?.type === "MultipleAdAnalysisReport") {
    var textComparisions = JSON.parse(reportObj?.comparison);
    report?.advertisementTexts?.map((element, index) => {
      content.push({
        text: `Advertisement Text of Ad ${index + 1}: ${element}`,
      });
    });
    textComparisions.map((element, index) => {
      content.push({
        text: `Impression ${index + 1}: ${element.prediction}`,
      });
    });
    content.push({ text: `Age Distribution Plot:` });
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

  if (report?.type === "SingleAdAnalysisReport") {
    const plotBox = document.querySelector('[name="PlotBox"]');
    const barChartImage = await toPng(plotBox);
    if (yOffset + 90 > doc.internal.pageSize.height) {
      doc.addPage(); // Add a new page if text exceeds page height
      yOffset = 20; // Reset yOffset
    }
    doc.addImage(barChartImage, "PNG", 11, yOffset, 170, 90);
    yOffset += 90 + 1;
    const pieBox = document.querySelector('[name="GenderBox"]');
    const pieChartImage = await toPng(pieBox);
    if (yOffset + pieChartImage.height > doc.internal.pageSize.height) {
      doc.addPage(); // Add a new page if text exceeds page height
      yOffset = 20; // Reset yOffset
    }
    addText("Gender Distribution Plot:", yOffset, doc);
    doc.addImage(pieChartImage, "PNG", 11, yOffset + 6);
    yOffset += 50 + 10;
    addText(`Overview: \n ${reportObj.overview}`, yOffset, doc);
  } else if (report?.type === "MultipleAdAnalysisReport") {
    const plotBox = document.querySelector('[name="AgeBox"]');
    const barChartImage = await toPng(plotBox);
    if (yOffset + 90 > doc.internal.pageSize.height) {
      doc.addPage(); // Add a new page if text exceeds page height
      yOffset = 20; // Reset yOffset
    }
    doc.addImage(barChartImage, "PNG", 11, yOffset, 170, 90);
    yOffset += 90 + 1;
    const pieBox = document.querySelector('[name="GenderBox"]');
    const pieChartImage = await toPng(pieBox);
    if (yOffset + pieChartImage.height > doc.internal.pageSize.height) {
      doc.addPage(); // Add a new page if text exceeds page height
      yOffset = 20; // Reset yOffset
    }
    yOffset = addText("Gender Distribution Plot:", yOffset, doc);
    doc.addImage(pieChartImage, "PNG", 11, yOffset + 6, 170, 90);
    yOffset += 90 + 10;
    var textComparisions = JSON.parse(reportObj?.comparison);
    textComparisions.map((element, index) => {
      yOffset = addText(
        `Recommendation for Ad ${index}: \n ${element.textRecommendation}`,
        yOffset,
        doc
      );
    });
  }

  // Save the PDF
  doc.save(`${reportObj?.title}.pdf`);
}

function addText(text, yOffset, doc) {
  const textLines = doc.splitTextToSize(text, doc.internal.pageSize.width - 20);
  const textHeight = textLines.length * 7; // Calculate height of text block

  // Check if text will exceed the page height
  if (yOffset + textHeight > doc.internal.pageSize.height) {
    doc.addPage(); // Add a new page if text exceeds page height
    yOffset = 20; // Reset yOffset
  }

  doc.text(textLines, 10, yOffset); // Add text to PDF
  yOffset += textHeight + 1; // Update yOffset for next text block
  return yOffset;
}
