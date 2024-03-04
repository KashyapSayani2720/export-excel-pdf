import './App.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Button } from 'primereact/button';
import axios from 'axios';
import * as XLSX from 'xlsx/xlsx.mjs';

function App() {

  function handleDownloadExcel() {

    axios.get('https://express-api-ten-gilt.vercel.app/api/v1/excel/data')
      .then(response => {
        // Process the response data
        const data = response.data;

        // Calculate grand total
        const grandTotal = calculateGrandTotal(data);

        // Add grand total to the data array
        const dataArray = [...data, grandTotal];

        // Format data with column headers
        const formattedData = formatDataWithHeaders(dataArray);

        // Create a new workbook
        const workbook = XLSX.utils.book_new();
        const sheet = XLSX.utils.aoa_to_sheet(formattedData);

        // Add the sheet to the workbook
        XLSX.utils.book_append_sheet(workbook, sheet, "Sheet1");

        // Convert the workbook to a binary string
        const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

        // Create a Blob object from the binary string
        const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });

        // Create a temporary URL for the Blob
        const url = window.URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.xlsx');

        // Append the link to the document body and click it
        document.body.appendChild(link);
        link.click();

        // Cleanup
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

  };

  // Function to calculate grand total
  function calculateGrandTotal(data) {
    const grandTotal = {
      Date: "",
      Particulars: "Grand Total",
      "Voucher Type": "",
      "Voucher No.": "",
      "GSTIN/UIN": "",
      Quantity: "",
      Rate: "",
      Value: "",
      "Gross Total": "",
      Sales: "",
      Discount: "",
      CGST: "",
      SGST: "",
      IGST: ""
    };

    // Initialize totals to zero
    let quantityTotal = 0;
    let valueTotal = 0;
    let grossTotal = 0;
    let salesTotal = 0;
    let discountTotal = 0;
    let cgstTotal = 0;
    let sgstTotal = 0;
    let igstTotal = 0;

    // Calculate totals from data array
  data.forEach(item => {
    quantityTotal += parseFloat(item.Quantity) || 0;
    valueTotal += parseFloat(item.Value) || 0;
    grossTotal += parseFloat(item["Gross Total"]) || 0;
    salesTotal += parseFloat(item.Sales) || 0;
    discountTotal += parseFloat(item.Discount) || 0;
    cgstTotal += parseFloat(item.CGST) || 0;
    sgstTotal += parseFloat(item.SGST) || 0;
    igstTotal += parseFloat(item.IGST) || 0;
  });

    // Assign totals to grandTotal object
    grandTotal.Quantity = quantityTotal.toFixed(2);
    grandTotal.Value = valueTotal.toFixed(2);
    grandTotal["Gross Total"] = grossTotal.toFixed(2);
    grandTotal.Sales = salesTotal.toFixed(2);
    grandTotal.Discount = discountTotal.toFixed(2);
    grandTotal.CGST = cgstTotal.toFixed(2);
    grandTotal.SGST = sgstTotal.toFixed(2);
    grandTotal.IGST = igstTotal.toFixed(2);

    return grandTotal;
  }

  // Function to format data with column headers
  function formatDataWithHeaders(dataArray) {
    // Define column headers
    const headers = [
      "Date",
      "Particulars",
      "Voucher Type",
      "Voucher No.",
      "GSTIN/UIN",
      "Quantity",
      "Rate",
      "Value",
      "Gross Total",
      "Sales",
      "Discount",
      "CGST",
      "SGST",
      "IGST"
    ];

    // Format data with column headers
    const formattedData = [headers, ...dataArray.map(item => Object.values(item))];

    return formattedData;
  }

  // Convert a string to an ArrayBuffer
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }


  return (
    <div className="offset-4 col-2 m-4 card">
      <Button label="Download Excel Sheet" onClick={handleDownloadExcel} />
    </div>
  );
}

export default App;
