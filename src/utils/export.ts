import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { SurveyData } from '../types/survey';

export const exportToPDF = (data: SurveyData[]) => {
  const doc = new jsPDF();
  
  doc.text('Survey Report', 20, 10);
  
  let yPos = 30;
  data.forEach((item) => {
    doc.text(`Date: ${item.date}`, 20, yPos);
    doc.text(`Very Bad: ${item.ratings.veryBad}`, 30, yPos + 10);
    doc.text(`Bad: ${item.ratings.bad}`, 30, yPos + 20);
    doc.text(`Average: ${item.ratings.average}`, 30, yPos + 30);
    doc.text(`Good: ${item.ratings.good}`, 30, yPos + 40);
    doc.text(`Very Good: ${item.ratings.veryGood}`, 30, yPos + 50);
    yPos += 70;
    
    if (yPos > 250) {
      doc.addPage();
      yPos = 30;
    }
  });
  
  doc.save('survey-report.pdf');
};

export const exportToExcel = (data: SurveyData[]) => {
  const worksheet = XLSX.utils.json_to_sheet(
    data.map((item) => ({
      Date: item.date,
      'Very Bad': item.ratings.veryBad,
      'Bad': item.ratings.bad,
      'Average': item.ratings.average,
      'Good': item.ratings.good,
      'Very Good': item.ratings.veryGood,
    }))
  );
  
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Survey Report');
  XLSX.writeFile(workbook, 'survey-report.xlsx');
};