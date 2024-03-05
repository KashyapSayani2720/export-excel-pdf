import './App.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Button } from 'primereact/button';
import axios from 'axios';
import * as XLSX from 'xlsx/xlsx.mjs';
import PdfGenerator from './components/pdf_generator';

function App() {

    function handleDownloadDayBookExcel() {

        const baseUrl = process.env.REACT_APP_BASE_URL;

        console.log({ baseUrl })

        axios.get(`${baseUrl}/v1/excel/day_book`)
            .then(response => {
                // Process the response data
                const data = response.data;

                // Calculate grand total
                // const grandTotal = calculateGrandTotal(data);

                // Add grand total to the data array
                const dataArray = data;

                // Format data with column headers
                const formattedData = formatDataWithHeadersNew(dataArray);

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
                link.setAttribute('download', 'day_book.xlsx');

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

    function handleDownloadSalesExcel() {

        const baseUrl = process.env.REACT_APP_BASE_URL;

        console.log({ baseUrl })

        axios.get(`${baseUrl}/v1/excel/sales_register`)
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
                link.setAttribute('download', 'sales_register.xlsx');

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
        grandTotal.Quantity = quantityTotal + " NOS";
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

    // Function to format data with column headers
    function formatDataWithHeadersNew(dataArray) {
       // Define column headers
    const headers = [
        ["Day Book", "", "", "", "", "", "", ""],
        ["1-Apr-23 to 29-Dec-23", "", "", "", "", "", "", ""],
        ["Date", "Particulars", "Vch Type", "Vch No.", "Debit Amount", "Credit Amount"],
        ["", "", "", "", "Inwards Qty", "Outwards Qty"]
    ];

    // Format data with column headers and adjust amounts
    const formattedData = dataArray.map(item => {
        return [
            item.date,
            item.particulars,
            item.vchType,
            item.vchNo,
            item.debitAmount || '', // Display debit amount if available, otherwise leave empty
            item.creditAmount || '' // Display credit amount if available, otherwise leave empty
        ];
    });

    // Insert headers at the beginning of the array
    formattedData.unshift(...headers);

    return formattedData;
    }

    // Convert a string to an ArrayBuffer
    function s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    const htmlContent = `<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Accounting Voucher Display</title>
  <meta name="author" content="TallyPrime" />
  <style type="text/css">
      * {
          margin: 0;
          padding: 0;
          text-indent: 0;
      }

      h1 {
          color: black;
          font-family: Arial, sans-serif;
          font-style: normal;
          font-weight: bold;
          text-decoration: none;
          font-size: 12pt;
      }

      .s1 {
          color: black;
          font-family: Arial, sans-serif;
          font-style: normal;
          font-weight: bold;
          text-decoration: none;
          font-size: 10pt;
      }

      .s2 {
          color: black;
          font-family: Arial, sans-serif;
          font-style: normal;
          font-weight: normal;
          text-decoration: none;
          font-size: 10pt;
      }

      .s3 {
          color: black;
          font-family: Arial, sans-serif;
          font-style: normal;
          font-weight: normal;
          text-decoration: none;
          font-size: 9pt;
      }

      .s4 {
          color: black;
          font-family: Arial, sans-serif;
          font-style: italic;
          font-weight: normal;
          text-decoration: none;
          font-size: 9pt;
          vertical-align: -1pt;
      }

      .s5 {
          color: black;
          font-family: Arial, sans-serif;
          font-style: italic;
          font-weight: bold;
          text-decoration: none;
          font-size: 10pt;
      }

      .s6 {
          color: black;
          font-family: Arial, sans-serif;
          font-style: normal;
          font-weight: normal;
          text-decoration: none;
          font-size: 12pt;
      }

      .s9 {
          color: black;
          font-family: Arial, sans-serif;
          font-style: normal;
          font-weight: bold;
          text-decoration: none;
          font-size: 9pt;
      }

      .s10 {
          color: black;
          font-family: Arial, sans-serif;
          font-style: normal;
          font-weight: normal;
          text-decoration: none;
          font-size: 7pt;
      }

      .s11 {
          color: black;
          font-family: Arial, sans-serif;
          font-style: normal;
          font-weight: normal;
          text-decoration: none;
          font-size: 8pt;
      }

      p {
          color: black;
          font-family: Arial, sans-serif;
          font-style: normal;
          font-weight: normal;
          text-decoration: none;
          font-size: 9pt;
          margin: 0pt;
      }

      table,
      tbody {
          vertical-align: top;
          overflow: visible;
      }
  </style>
</head>

<body>
  <h1 style="padding-top: 3pt;padding-left: 201pt;text-indent: 0pt;text-align: center;">Tax Invoice</h1>
  <table style="border-collapse:collapse;margin-left:5.125pt" cellspacing="0">
      <tr style="height:26pt">
          <td style="width:234pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
              colspan="4" rowspan="3">
              <p class="s1" style="padding-top: 3pt;padding-left: 2pt;text-indent: 0pt;text-align: left;">HOBC IMPORT
                  EXPORT PRIVATE LIMITED</p>
              <p class="s2"
                  style="padding-top: 1pt;padding-left: 2pt;padding-right: 26pt;text-indent: 0pt;line-height: 112%;text-align: left;">
                  7F, Snn Raj Pinnacle , ITPL Main Road Bengaluru</p>
              <p class="s2" style="padding-left: 2pt;text-indent: 0pt;text-align: left;">GSTIN/UIN: 29AAGCH3941L1Z6
              </p>
              <p class="s2"
                  style="padding-top: 1pt;padding-left: 2pt;text-indent: 0pt;line-height: 11pt;text-align: left;">
                  State Name : Karnataka, Code : 29</p>
          </td>
          <td style="width:116pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
              colspan="2">
              <p class="s3" style="padding-top: 1pt;padding-left: 2pt;text-indent: 0pt;text-align: left;">Invoice No.
              </p>
              <p class="s1" style="padding-left: 2pt;text-indent: 0pt;text-align: left;">AOM#1361</p>
          </td>
          <td style="width:118pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
              colspan="2">
              <p class="s3" style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: left;">Dated</p>
              <p class="s1" style="padding-left: 1pt;text-indent: 0pt;text-align: left;">25-Feb-24</p>
          </td>
      </tr>
      <tr style="height:25pt">
          <td style="width:116pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
              colspan="2">
              <p style="text-indent: 0pt;text-align: left;"><br /></p>
          </td>
          <td style="width:118pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
              colspan="2">
              <p class="s3" style="padding-left: 1pt;text-indent: 0pt;text-align: left;">Mode/Terms of Payment</p>
          </td>
      </tr>
      <tr style="height:17pt">
          <td style="width:116pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
              colspan="2" rowspan="2">
              <p class="s3" style="padding-left: 2pt;text-indent: 0pt;text-align: left;">Buyer’s Order No.</p>
          </td>
          <td style="width:118pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
              colspan="2" rowspan="2">
              <p class="s3" style="padding-left: 1pt;text-indent: 0pt;text-align: left;">Dated</p>
          </td>
      </tr>
      <tr style="height:8pt">
          <td style="width:234pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
              colspan="4" rowspan="2">
              <p class="s3" style="padding-top: 1pt;padding-left: 2pt;text-indent: 0pt;text-align: left;">Consignee
                  (Ship to)</p>
              <p class="s1" style="padding-top: 3pt;padding-left: 2pt;text-indent: 0pt;text-align: left;">manish asawa
              </p>
              <p class="s2"
                  style="padding-top: 1pt;padding-left: 2pt;text-indent: 0pt;line-height: 11pt;text-align: left;">
                  State Name : Maharashtra, Code : 27</p>
          </td>
      </tr>
      <tr style="height:33pt">
          <td style="width:234pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
              colspan="4" rowspan="2">
              <p class="s3" style="padding-left: 2pt;text-indent: 0pt;text-align: left;">Terms of Delivery</p>
          </td>
      </tr>
      <tr style="height:48pt">
          <td style="width:234pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
              colspan="4">
              <p class="s3" style="padding-top: 1pt;padding-left: 2pt;text-indent: 0pt;text-align: left;">Buyer (Bill
                  to)</p>
              <p class="s1" style="padding-top: 3pt;padding-left: 2pt;text-indent: 0pt;text-align: left;">manish asawa
              </p>
              <p class="s2" style="padding-top: 1pt;padding-left: 2pt;text-indent: 0pt;text-align: left;">State Name :
                  Maharashtra, Code : 27</p>
          </td>
      </tr>
      <tr style="height:30pt">
          <td
              style="width:13pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
              <p class="s2"
                  style="padding-top: 2pt;padding-left: 2pt;text-indent: 0pt;line-height: 13pt;text-align: left;">Sl
                  No.</p>
          </td>
          <td
              style="width:160pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
              <p class="s3" style="padding-top: 3pt;padding-left: 33pt;text-indent: 0pt;text-align: left;">Description
                  of Goods</p>
          </td>
          <td
              style="width:53pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
              <p class="s3" style="padding-top: 3pt;padding-right: 10pt;text-indent: 0pt;text-align: right;">HSN/SAC
              </p>
          </td>
          <td
              style="width:53pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
              <p class="s3" style="padding-top: 3pt;padding-left: 7pt;text-indent: 0pt;text-align: left;">Quantity</p>
          </td>
          <td
              style="width:53pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
              <p class="s3" style="padding-top: 3pt;padding-left: 15pt;text-indent: 0pt;text-align: left;">Rate</p>
          </td>
          <td
              style="width:18pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
              <p class="s3" style="padding-top: 3pt;padding-left: 1pt;text-indent: 0pt;text-align: center;">per</p>
          </td>
          <td
              style="width:39pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
              <p class="s3" style="padding-top: 3pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">Disc. %</p>
          </td>
          <td
              style="width:79pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
              <p class="s3" style="padding-top: 3pt;padding-left: 22pt;text-indent: 0pt;text-align: left;">Amount</p>
          </td>
      </tr>
      <tr style="height:301pt">
          <td
              style="width:13pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
              <p class="s2" style="padding-top: 6pt;padding-left: 2pt;text-indent: 0pt;text-align: left;">1</p>
          </td>
          <td
              style="width:160pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
              <p class="s1" style="padding-top: 5pt;padding-left: 1pt;text-indent: 0pt;text-align: left;">
                  PEACOCK_COLOR</p>
              <p style="text-indent: 0pt;text-align: left;"><br /></p>
              <p class="s4" style="padding-left: 1pt;text-indent: 0pt;text-align: left;">Less : <span
                      class="s5">Discount</span></p>
              <p class="s5" style="padding-right: 4pt;text-indent: 0pt;text-align: right;">IGST</p>
          </td>
          <td
              style="width:53pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
              <p class="s3" style="padding-top: 6pt;padding-right: 13pt;text-indent: 0pt;text-align: right;">71171100
              </p>
          </td>
          <td
              style="width:53pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
              <p class="s1" style="padding-top: 5pt;padding-left: 19pt;text-indent: 0pt;text-align: left;">1 NOS</p>
          </td>
          <td
              style="width:53pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
              <p class="s3" style="padding-top: 6pt;padding-left: 14pt;text-indent: 0pt;text-align: left;">3,923.30
              </p>
          </td>
          <td
              style="width:18pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
              <p class="s3" style="padding-top: 6pt;padding-left: 1pt;text-indent: 0pt;text-align: center;">NOS</p>
          </td>
          <td
              style="width:39pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
              <p style="text-indent: 0pt;text-align: left;"><br /></p>
          </td>
          <td
              style="width:79pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
              <p class="s1" style="padding-top: 5pt;padding-right: 8pt;text-indent: 0pt;text-align: right;">3,923.30
              </p>
              <p style="text-indent: 0pt;text-align: left;"><br /></p>
              <p class="s1" style="padding-right: 8pt;text-indent: 0pt;text-align: right;">(-)1,700.00</p>
              <p class="s1" style="padding-top: 1pt;padding-right: 6pt;text-indent: 0pt;text-align: right;">66.70</p>
          </td>
      </tr>
      <tr style="height:17pt">
          <td
              style="width:13pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
              <p style="text-indent: 0pt;text-align: left;"><br /></p>
          </td>
          <td
              style="width:160pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
              <p class="s3" style="padding-top: 1pt;padding-right: 3pt;text-indent: 0pt;text-align: right;">Total</p>
          </td>
          <td
              style="width:53pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
              <p style="text-indent: 0pt;text-align: left;"><br /></p>
          </td>
          <td
              style="width:53pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
              <p class="s1" style="padding-left: 19pt;text-indent: 0pt;text-align: left;">1 NOS</p>
          </td>
          <td
              style="width:53pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
              <p style="text-indent: 0pt;text-align: left;"><br /></p>
          </td>
          <td
              style="width:18pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
              <p style="text-indent: 0pt;text-align: left;"><br /></p>
          </td>
          <td
              style="width:39pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
              <p style="text-indent: 0pt;text-align: left;"><br /></p>
          </td>
          <td
              style="width:79pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
              <p class="s6"
                  style="padding-top: 2pt;padding-left: 17pt;text-indent: 0pt;line-height: 14pt;text-align: left;">₹
                  <b>2,290.00</b></p>
          </td>
      </tr>
      <tr style="height:30pt">
          <td style="width:468pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
              colspan="8">
              <p class="s3" style="padding-left: 2pt;text-indent: 0pt;text-align: left;">Amount Chargeable (in words)
                  <i>E. &amp; O.E</i></p>
              <p class="s1" style="padding-top: 3pt;padding-left: 2pt;text-indent: 0pt;text-align: left;">INR Two
                  Thousand Two Hundred Ninety Only</p>
          </td>
      </tr>
      <tr style="height:14pt">
          <td style="width:311pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
              colspan="5" rowspan="2">
              <p class="s3" style="padding-top: 1pt;padding-right: 15pt;text-indent: 0pt;text-align: right;">Taxable
              </p>
              <p class="s3" style="padding-top: 2pt;padding-right: 19pt;text-indent: 0pt;text-align: right;">Value</p>
          </td>
          <td style="width:96pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
              colspan="3">
              <p class="s3"
                  style="padding-top: 1pt;padding-left: 35pt;padding-right: 37pt;text-indent: 0pt;text-align: center;">
                  IGST</p>
          </td>
          <td style="width:61pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
              rowspan="2">
              <p class="s3"
                  style="padding-top: 1pt;padding-left: 2pt;padding-right: 4pt;text-indent: 0pt;text-align: center;">
                  Total</p>
              <p class="s3"
                  style="padding-top: 2pt;padding-left: 2pt;padding-right: 8pt;text-indent: 0pt;text-align: center;">
                  Tax Amount</p>
          </td>
      </tr>
      <tr style="height:14pt">
          <td
              style="width:39pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
              <p class="s3" style="padding-left: 7pt;text-indent: 0pt;text-align: left;">Rate</p>
          </td>
          <td style="width:57pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
              colspan="2">
              <p class="s3" style="padding-left: 10pt;text-indent: 0pt;text-align: left;">Amount</p>
          </td>
      </tr>
      <tr style="height:12pt">
          <td style="width:311pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
              colspan="5">
              <p class="s3" style="padding-right: 4pt;text-indent: 0pt;line-height: 10pt;text-align: right;">2,223.30
              </p>
          </td>
          <td
              style="width:39pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
              <p class="s3" style="padding-left: 20pt;text-indent: 0pt;line-height: 10pt;text-align: left;">3%</p>
          </td>
          <td style="width:57pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
              colspan="2">
              <p class="s3" style="padding-left: 31pt;text-indent: 0pt;line-height: 10pt;text-align: left;">66.70</p>
          </td>
          <td
              style="width:61pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
              <p class="s3" style="padding-right: 4pt;text-indent: 0pt;line-height: 10pt;text-align: right;">66.70</p>
          </td>
      </tr>
      <tr style="height:14pt">
          <td style="width:311pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
              colspan="5">
              <p class="s9" style="padding-top: 1pt;padding-right: 4pt;text-indent: 0pt;text-align: right;">Total:
                  2,223.30</p>
          </td>
          <td
              style="width:39pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
              <p style="text-indent: 0pt;text-align: left;"><br /></p>
          </td>
          <td style="width:57pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
              colspan="2">
              <p class="s9" style="padding-top: 1pt;padding-left: 31pt;text-indent: 0pt;text-align: left;">66.70</p>
          </td>
          <td
              style="width:61pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
              <p class="s9" style="padding-top: 1pt;padding-right: 4pt;text-indent: 0pt;text-align: right;">66.70</p>
          </td>
      </tr>
      <tr style="height:18pt">
          <td style="width:468pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt"
              colspan="8">
              <p class="s3"
                  style="padding-top: 5pt;padding-left: 2pt;text-indent: 0pt;line-height: 11pt;text-align: left;">Tax
                  Amount (in words) : <span class="s1">INR Sixty Six and Seventy paise Only</span></p>
          </td>
      </tr>
      <tr style="height:43pt">
          <td style="width:234pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
              colspan="4">
              <p class="s10" style="padding-top: 1pt;padding-left: 2pt;text-indent: 0pt;text-align: left;">Declaration
              </p>
              <p style="padding-left: 2pt;text-indent: 0pt;line-height: 1pt;text-align: left;" />
              <p class="s11"
                  style="padding-left: 2pt;padding-right: 26pt;text-indent: 0pt;line-height: 109%;text-align: left;">
                  We declare that this invoice shows the actual price of the goods described and that all particulars
                  are true and correct.</p>
          </td>
          <td style="width:234pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
              colspan="4">
              <p class="s9" style="padding-left: 50pt;text-indent: 0pt;text-align: left;">for HOBC IMPORT EXPORT
                  PRIVATE LIMITED</p>
              <p style="text-indent: 0pt;text-align: left;"><br /></p>
              <p class="s3" style="padding-top: 8pt;padding-left: 153pt;text-indent: 0pt;text-align: left;">Authorised
                  Signatory</p>
          </td>
      </tr>
  </table>
  <p style="padding-top: 6pt;padding-left: 158pt;text-indent: 0pt;text-align: left;">This is a Computer Generated
      Invoice</p>
</body>

</html>`;

    return (
        <>
            <div className='container-fluid'>
                <div className='row pt-4'>
                    <div className="col-2">
                        <Button label="Download Sales Excel Sheet" onClick={handleDownloadSalesExcel} />
                    </div>
                    <div className="col-2">
                        <Button label="Download Daybook Excel Sheet" onClick={handleDownloadDayBookExcel} />
                    </div>
                    <div className="col-2">
                        <PdfGenerator htmlContent={htmlContent} />
                    </div>
                </div>
            </div>

        </>
    );
}

export default App;
