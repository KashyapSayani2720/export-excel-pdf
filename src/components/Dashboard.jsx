import React from "react";
import { Button } from "primereact/button";
import axios from "axios";
import * as XLSX from "xlsx/xlsx.mjs";
import PdfGenerator from "./pdf_generator";

// import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  // const navigate = useNavigate();
  const userData = {
    companyDetails: {
      taxInvoiceDate: "25th Feb, 2024",
      name: "HOBC IMPORT EXPORT PRIVATE LIMITED",
      address: "7F, Snn Raj Pinnacle ,ITPL Main Road Bengaluru",
      gstin: "29AAGCH3941L1Z6",
      stateName: "Karnataka",
      code: "29",
      invoiceNumber: "AOM#1361",
      mode: "",
      buyerOrderNumber: "",
      termsOfDelivery: "",
    },
    userDetails: {
      consigneeDetails: {
        consignee: "Manish Asawa",
        stateName: "Maharashtra",
        code: "27",
      },
      buyerDetails: {
        billTo: "Manish Asawa",
        stateName: "Maharashtra",
        code: "27",
      },
    },
    invoiceDetails: [
      {
        descriptionOfGoods: "",
        hsn: "",
        qty: "",
        rate: "",
        per: "",
        dis: "",
        amount: "",
      },
    ],
  };

  function handleDownloadDayBookExcel() {
    const baseUrl = process.env.REACT_APP_BASE_URL;

    console.log({ baseUrl });

    axios
      .get(`${baseUrl}/v1/excel/day_book`)
      .then((response) => {
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
        const wbout = XLSX.write(workbook, {
          bookType: "xlsx",
          type: "binary",
        });

        // Create a Blob object from the binary string
        const blob = new Blob([s2ab(wbout)], {
          type: "application/octet-stream",
        });

        // Create a temporary URL for the Blob
        const url = window.URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "day_book.xlsx");

        // Append the link to the document body and click it
        document.body.appendChild(link);
        link.click();

        // Cleanup
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  // function checkAccuracyHandler() {
  //    return navigate('/check-accuracy')
  // }

  function handleDownloadSalesExcel() {
    const baseUrl = process.env.REACT_APP_BASE_URL;

    console.log({ baseUrl });

    axios
      .get(`${baseUrl}/v1/excel/sales_register`)
      .then((response) => {
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
        const wbout = XLSX.write(workbook, {
          bookType: "xlsx",
          type: "binary",
        });

        // Create a Blob object from the binary string
        const blob = new Blob([s2ab(wbout)], {
          type: "application/octet-stream",
        });

        // Create a temporary URL for the Blob
        const url = window.URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "sales_register.xlsx");

        // Append the link to the document body and click it
        document.body.appendChild(link);
        link.click();

        // Cleanup
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

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
      IGST: "",
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
    data.forEach((item) => {
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
      "IGST",
    ];

    // Format data with column headers
    const formattedData = [
      headers,
      ...dataArray.map((item) => Object.values(item)),
    ];

    return formattedData;
  }

  // Function to format data with column headers
  function formatDataWithHeadersNew(dataArray) {
    // Define column headers
    const headers = [
      ["Day Book", "", "", "", "", "", "", ""],
      ["1-Apr-23 to 29-Dec-23", "", "", "", "", "", "", ""],
      [
        "Date",
        "Particulars",
        "Vch Type",
        "Vch No.",
        "Debit Amount",
        "Credit Amount",
      ],
      ["", "", "", "", "Inwards Qty", "Outwards Qty"],
    ];

    // Format data with column headers and adjust amounts
    const formattedData = dataArray.map((item) => {
      return [
        item.date,
        item.particulars,
        item.vchType,
        item.vchNo,
        item.debitAmount || "", // Display debit amount if available, otherwise leave empty
        item.creditAmount || "", // Display credit amount if available, otherwise leave empty
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
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }

  const htmlContent = `<!DOCTYPE html
  PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
<html xmlns='http://www.w3.org/1999/xhtml' xml:lang='en' lang='en'>

<head>
  <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
  <title>Accounting Voucher Display</title>
  <meta name='author' content='TallyPrime' />
  <style type='text/css'>
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
  <h1 style='padding-top: 3pt;padding-left: 201pt;text-indent: 0pt;text-align: center;'>Tax Invoice</h1>
  <table style='border-collapse:collapse;margin-left:5.125pt' cellspacing='0'>
      <tr style='height:26pt'>
          <td style='width:234pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'
              colspan='4' rowspan='3'>
              <p class='s1' style='padding-top: 3pt;padding-left: 2pt;text-indent: 0pt;text-align: left;'>HOBC IMPORT
                  EXPORT PRIVATE LIMITED</p>
              <p class='s2'
                  style='padding-top: 1pt;padding-left: 2pt;padding-right: 26pt;text-indent: 0pt;line-height: 112%;text-align: left;'>
                  7F, Snn Raj Pinnacle , ITPL Main Road Bengaluru</p>
              <p class='s2' style='padding-left: 2pt;text-indent: 0pt;text-align: left;'>GSTIN/UIN: 29AAGCH3941L1Z6
              </p>
              <p class='s2'
                  style='padding-top: 1pt;padding-left: 2pt;text-indent: 0pt;line-height: 11pt;text-align: left;'>
                  State Name : Karnataka, Code : 29</p>
          </td>
          <td style='width:116pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'
              colspan='2'>
              <p class='s3' style='padding-top: 1pt;padding-left: 2pt;text-indent: 0pt;text-align: left;'>Invoice No.
              </p>
              <p class='s1' style='padding-left: 2pt;text-indent: 0pt;text-align: left;'>AOM#1361</p>
          </td>
          <td style='width:118pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'
              colspan='2'>
              <p class='s3' style='padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: left;'>Dated</p>
              <p class='s1' style='padding-left: 1pt;text-indent: 0pt;text-align: left;'>25-Feb-24</p>
          </td>
      </tr>
      <tr style='height:25pt'>
          <td style='width:116pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'
              colspan='2'>
              <p style='text-indent: 0pt;text-align: left;'><br /></p>
          </td>
          <td style='width:118pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'
              colspan='2'>
              <p class='s3' style='padding-left: 1pt;text-indent: 0pt;text-align: left;'>Mode/Terms of Payment</p>
          </td>
      </tr>
      <tr style='height:17pt'>
          <td style='width:116pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'
              colspan='2' rowspan='2'>
              <p class='s3' style='padding-left: 2pt;text-indent: 0pt;text-align: left;'>Buyer’s Order No.</p>
          </td>
          <td style='width:118pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'
              colspan='2' rowspan='2'>
              <p class='s3' style='padding-left: 1pt;text-indent: 0pt;text-align: left;'>Dated</p>
          </td>
      </tr>
      <tr style='height:8pt'>
          <td style='width:234pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'
              colspan='4' rowspan='2'>
              <p class='s3' style='padding-top: 1pt;padding-left: 2pt;text-indent: 0pt;text-align: left;'>Consignee
                  (Ship to)</p>
              <p class='s1' style='padding-top: 3pt;padding-left: 2pt;text-indent: 0pt;text-align: left;'>manish asawa
              </p>
              <p class='s2'
                  style='padding-top: 1pt;padding-left: 2pt;text-indent: 0pt;line-height: 11pt;text-align: left;'>
                  State Name : Maharashtra, Code : 27</p>
          </td>
      </tr>
      <tr style='height:33pt'>
          <td style='width:234pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'
              colspan='4' rowspan='2'>
              <p class='s3' style='padding-left: 2pt;text-indent: 0pt;text-align: left;'>Terms of Delivery</p>
          </td>
      </tr>
      <tr style='height:48pt'>
          <td style='width:234pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'
              colspan='4'>
              <p class='s3' style='padding-top: 1pt;padding-left: 2pt;text-indent: 0pt;text-align: left;'>Buyer (Bill
                  to)</p>
              <p class='s1' style='padding-top: 3pt;padding-left: 2pt;text-indent: 0pt;text-align: left;'>manish asawa
              </p>
              <p class='s2' style='padding-top: 1pt;padding-left: 2pt;text-indent: 0pt;text-align: left;'>State Name :
                  Maharashtra, Code : 27</p>
          </td>
      </tr>
      <tr style='height:30pt'>
          <td
              style='width:13pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'>
              <p class='s2'
                  style='padding-top: 2pt;padding-left: 2pt;text-indent: 0pt;line-height: 13pt;text-align: left;'>Sl
                  No.</p>
          </td>
          <td
              style='width:160pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'>
              <p class='s3' style='padding-top: 3pt;padding-left: 33pt;text-indent: 0pt;text-align: left;'>Description
                  of Goods</p>
          </td>
          <td
              style='width:53pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'>
              <p class='s3' style='padding-top: 3pt;padding-right: 10pt;text-indent: 0pt;text-align: right;'>HSN/SAC
              </p>
          </td>
          <td
              style='width:53pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'>
              <p class='s3' style='padding-top: 3pt;padding-left: 7pt;text-indent: 0pt;text-align: left;'>Quantity</p>
          </td>
          <td
              style='width:53pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'>
              <p class='s3' style='padding-top: 3pt;padding-left: 15pt;text-indent: 0pt;text-align: left;'>Rate</p>
          </td>
          <td
              style='width:18pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'>
              <p class='s3' style='padding-top: 3pt;padding-left: 1pt;text-indent: 0pt;text-align: center;'>per</p>
          </td>
          <td
              style='width:39pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'>
              <p class='s3' style='padding-top: 3pt;padding-left: 5pt;text-indent: 0pt;text-align: left;'>Disc. %</p>
          </td>
          <td
              style='width:79pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'>
              <p class='s3' style='padding-top: 3pt;padding-left: 22pt;text-indent: 0pt;text-align: left;'>Amount</p>
          </td>
      </tr>
      <tr style='height:301pt'>
          <td
              style='width:13pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'>
              <p class='s2' style='padding-top: 6pt;padding-left: 2pt;text-indent: 0pt;text-align: left;'>1</p>
          </td>
          <td
              style='width:160pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'>
              <p class='s1' style='padding-top: 5pt;padding-left: 1pt;text-indent: 0pt;text-align: left;'>
                  PEACOCK_COLOR</p>
              <p style='text-indent: 0pt;text-align: left;'><br /></p>
              <p class='s4' style='padding-left: 1pt;text-indent: 0pt;text-align: left;'>Less : <span
                      class='s5'>Discount</span></p>
              <p class='s5' style='padding-right: 4pt;text-indent: 0pt;text-align: right;'>IGST</p>
          </td>
          <td
              style='width:53pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'>
              <p class='s3' style='padding-top: 6pt;padding-right: 13pt;text-indent: 0pt;text-align: right;'>71171100
              </p>
          </td>
          <td
              style='width:53pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'>
              <p class='s1' style='padding-top: 5pt;padding-left: 19pt;text-indent: 0pt;text-align: left;'>1 NOS</p>
          </td>
          <td
              style='width:53pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'>
              <p class='s3' style='padding-top: 6pt;padding-left: 14pt;text-indent: 0pt;text-align: left;'>3,923.30
              </p>
          </td>
          <td
              style='width:18pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'>
              <p class='s3' style='padding-top: 6pt;padding-left: 1pt;text-indent: 0pt;text-align: center;'>NOS</p>
          </td>
          <td
              style='width:39pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'>
              <p style='text-indent: 0pt;text-align: left;'><br /></p>
          </td>
          <td
              style='width:79pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'>
              <p class='s1' style='padding-top: 5pt;padding-right: 8pt;text-indent: 0pt;text-align: right;'>3,923.30
              </p>
              <p style='text-indent: 0pt;text-align: left;'><br /></p>
              <p class='s1' style='padding-right: 8pt;text-indent: 0pt;text-align: right;'>(-)1,700.00</p>
              <p class='s1' style='padding-top: 1pt;padding-right: 6pt;text-indent: 0pt;text-align: right;'>66.70</p>
          </td>
      </tr>
      <tr style='height:17pt'>
          <td
              style='width:13pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'>
              <p style='text-indent: 0pt;text-align: left;'><br /></p>
          </td>
          <td
              style='width:160pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'>
              <p class='s3' style='padding-top: 1pt;padding-right: 3pt;text-indent: 0pt;text-align: right;'>Total</p>
          </td>
          <td
              style='width:53pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'>
              <p style='text-indent: 0pt;text-align: left;'><br /></p>
          </td>
          <td
              style='width:53pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'>
              <p class='s1' style='padding-left: 19pt;text-indent: 0pt;text-align: left;'>1 NOS</p>
          </td>
          <td
              style='width:53pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'>
              <p style='text-indent: 0pt;text-align: left;'><br /></p>
          </td>
          <td
              style='width:18pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'>
              <p style='text-indent: 0pt;text-align: left;'><br /></p>
          </td>
          <td
              style='width:39pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'>
              <p style='text-indent: 0pt;text-align: left;'><br /></p>
          </td>
          <td
              style='width:79pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'>
              <p class='s6'
                  style='padding-top: 2pt;padding-left: 17pt;text-indent: 0pt;line-height: 14pt;text-align: left;'>₹
                  <b>2,290.00</b></p>
          </td>
      </tr>
      <tr style='height:30pt'>
          <td style='width:468pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'
              colspan='8'>
              <p class='s3' style='padding-left: 2pt;text-indent: 0pt;text-align: left;'>Amount Chargeable (in words)
                  <i>E. &amp; O.E</i></p>
              <p class='s1' style='padding-top: 3pt;padding-left: 2pt;text-indent: 0pt;text-align: left;'>INR Two
                  Thousand Two Hundred Ninety Only</p>
          </td>
      </tr>
      <tr style='height:14pt'>
          <td style='width:311pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'
              colspan='5' rowspan='2'>
              <p class='s3' style='padding-top: 1pt;padding-right: 15pt;text-indent: 0pt;text-align: right;'>Taxable
              </p>
              <p class='s3' style='padding-top: 2pt;padding-right: 19pt;text-indent: 0pt;text-align: right;'>Value</p>
          </td>
          <td style='width:96pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'
              colspan='3'>
              <p class='s3'
                  style='padding-top: 1pt;padding-left: 35pt;padding-right: 37pt;text-indent: 0pt;text-align: center;'>
                  IGST</p>
          </td>
          <td style='width:61pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'
              rowspan='2'>
              <p class='s3'
                  style='padding-top: 1pt;padding-left: 2pt;padding-right: 4pt;text-indent: 0pt;text-align: center;'>
                  Total</p>
              <p class='s3'
                  style='padding-top: 2pt;padding-left: 2pt;padding-right: 8pt;text-indent: 0pt;text-align: center;'>
                  Tax Amount</p>
          </td>
      </tr>
      <tr style='height:14pt'>
          <td
              style='width:39pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'>
              <p class='s3' style='padding-left: 7pt;text-indent: 0pt;text-align: left;'>Rate</p>
          </td>
          <td style='width:57pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'
              colspan='2'>
              <p class='s3' style='padding-left: 10pt;text-indent: 0pt;text-align: left;'>Amount</p>
          </td>
      </tr>
      <tr style='height:12pt'>
          <td style='width:311pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'
              colspan='5'>
              <p class='s3' style='padding-right: 4pt;text-indent: 0pt;line-height: 10pt;text-align: right;'>2,223.30
              </p>
          </td>
          <td
              style='width:39pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'>
              <p class='s3' style='padding-left: 20pt;text-indent: 0pt;line-height: 10pt;text-align: left;'>3%</p>
          </td>
          <td style='width:57pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'
              colspan='2'>
              <p class='s3' style='padding-left: 31pt;text-indent: 0pt;line-height: 10pt;text-align: left;'>66.70</p>
          </td>
          <td
              style='width:61pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'>
              <p class='s3' style='padding-right: 4pt;text-indent: 0pt;line-height: 10pt;text-align: right;'>66.70</p>
          </td>
      </tr>
      <tr style='height:14pt'>
          <td style='width:311pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'
              colspan='5'>
              <p class='s9' style='padding-top: 1pt;padding-right: 4pt;text-indent: 0pt;text-align: right;'>Total:
                  2,223.30</p>
          </td>
          <td
              style='width:39pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'>
              <p style='text-indent: 0pt;text-align: left;'><br /></p>
          </td>
          <td style='width:57pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'
              colspan='2'>
              <p class='s9' style='padding-top: 1pt;padding-left: 31pt;text-indent: 0pt;text-align: left;'>66.70</p>
          </td>
          <td
              style='width:61pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'>
              <p class='s9' style='padding-top: 1pt;padding-right: 4pt;text-indent: 0pt;text-align: right;'>66.70</p>
          </td>
      </tr>
      <tr style='height:18pt'>
          <td style='width:468pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt'
              colspan='8'>
              <p class='s3'
                  style='padding-top: 5pt;padding-left: 2pt;text-indent: 0pt;line-height: 11pt;text-align: left;'>Tax
                  Amount (in words) : <span class='s1'>INR Sixty Six and Seventy paise Only</span></p>
          </td>
      </tr>
      <tr style='height:43pt'>
          <td style='width:234pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'
              colspan='4'>
              <p class='s10' style='padding-top: 1pt;padding-left: 2pt;text-indent: 0pt;text-align: left;'>Declaration
              </p>
              <p style='padding-left: 2pt;text-indent: 0pt;line-height: 1pt;text-align: left;' />
              <p class='s11'
                  style='padding-left: 2pt;padding-right: 26pt;text-indent: 0pt;line-height: 109%;text-align: left;'>
                  We declare that this invoice shows the actual price of the goods described and that all particulars
                  are true and correct.</p>
          </td>
          <td style='width:234pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt'
              colspan='4'>
              <p class='s9' style='padding-left: 50pt;text-indent: 0pt;text-align: left;'>for HOBC IMPORT EXPORT
                  PRIVATE LIMITED</p>
              <p style='text-indent: 0pt;text-align: left;'><br /></p>
              <p class='s3' style='padding-top: 8pt;padding-left: 153pt;text-indent: 0pt;text-align: left;'>Authorised
                  Signatory</p>
          </td>
      </tr>
  </table>
  <p style='padding-top: 6pt;padding-left: 158pt;text-indent: 0pt;text-align: left;'>This is a Computer Generated
      Invoice</p>
</body>

</html>`;

  const printhandler = () => {
    const printWindow = window.open(null, "_self", "width=50,height=1000");
    printWindow?.document?.write("<html><head>");
    printWindow.document.write(
      "<style>table { border-collapse: collapse }</style>"
    );
    printWindow?.document?.write("</head><body>");
    // const url = logo;
    printWindow?.document?.write(
      '<div style="display:flex; justify-content:space-between;">'
    );
    printWindow?.document?.write(
      `<div style="display:flex"><div style="width:5%; height:50px"></div><div  style="height:50px; font-size:22px; margin-left: 40px;"></div></div>`
    );
    userData?.companyName &&
      printWindow?.document?.write(
        `<div style="font-size:14px; margin-right: 1%; padding-top: 1%"><span style="font-weight:700"></span>:</div>`
      );
    printWindow?.document?.write("</div>");

    printWindow?.document?.write(`<div>`);
    printWindow?.document?.write(
      `<div style="display:flex; flex-wrap: wrap;">`
    );
    printWindow?.document?.write(`<div style="width:30vw">`);
    printWindow?.document?.write(
      `<div style="margin-bottom:20px; display:flex"><span style="font-size:14px; font-weight:700; display:block;"></span><span style="word-wrap: break-word; font-size: 14px; width: 75%; margin-left: 5%;"></span></div>`
    );
    printWindow?.document?.write("</div>");
    printWindow?.document?.write(
      `<div style="width:30vw; margin-left: 20px;">`
    );
    printWindow?.document?.write(
      `<div style="margin-bottom:20px; display:flex"><span style="font-size:14px; font-weight:700; display:block;"></span><span style="word-wrap: break-word; font-size: 14px; width: 75%; margin-left: 5%;"></span></div>`
    );
    printWindow?.document?.write("</div>");
    printWindow?.document?.write(
      `<div style="width:30vw; margin-left: 20px;">`
    );
    printWindow?.document?.write(
      `<div style="margin-bottom:20px; display:flex"><span style="font-size:14px; font-weight:700; display:block;"></span><span style="word-wrap: break-word; font-size: 14px; width: 75%; margin-left: 5%;"></span></div>`
    );
    printWindow?.document?.write("</div>");
    printWindow?.document?.write(`<div style="width:30vw">`);
    printWindow?.document?.write(
      `<div style="margin-bottom:20px; display:flex"><span style="font-size:14px; font-weight:700; display:block;"></span><span style="word-wrap: break-word; font-size: 14px; width: 75%; margin-left: 5%;"></span></div>`
    );
    printWindow?.document?.write("</div>");
    printWindow?.document?.write(
      `<div style="width:30vw; margin-left: 20px;">`
    );
    printWindow?.document?.write(
      `<div style="margin-bottom:20px; display:flex"><span style="font-size:14px; font-weight:700; display:block;"></span><span style="word-wrap: break-word; font-size: 14px; width: 75%; margin-left: 5%;"></span></div>`
    );
    printWindow?.document?.write("</div>");
    printWindow?.document?.write(`<div style="width:30vw;margin-left: 20px;">`);
    printWindow?.document?.write(
      `<div style="margin-bottom:20px; display:flex"><span style="font-size:14px; font-weight:700; display:block;"></span><span style="word-wrap: break-word; font-size: 14px; width: 75%; margin-left: 5%;"></span></div>`
    );
    printWindow?.document?.write("</div>");
    printWindow?.document?.write(`<div style="width:30vw">`);
    printWindow?.document?.write(
      `<div style="margin-bottom:20px; display:flex"><span style="font-size:14px; font-weight:700; display:block;"></span><span style="word-wrap: break-word; font-size: 14px; width: 75%; margin-left: 5%;"></span></div>`
    );
    printWindow?.document?.write("</div>");
    printWindow?.document?.write(
      `<div style="width:30vw; margin-left: 20px;">`
    );
    printWindow?.document?.write(
      `<div style="margin-bottom:20px; display:flex"><span style="font-size:14px; font-weight:700; display:block;"></span><span style="word-wrap: break-word; font-size: 14px; width: 75%; margin-left: 5%;"></span></div>`
    );
    printWindow?.document?.write("</div>");
    printWindow?.document?.write(
      `<div style="width:30vw; margin-left: 20px;">`
    );
    printWindow?.document?.write(
      `<div style="margin-bottom:20px; display:flex"><span style="font-size:14px; font-weight:700; display:block;"></span><span style="word-wrap: break-word; font-size: 14px; width: 75%; margin-left: 5%;"></span></div>`
    );
    printWindow?.document?.write("</div>");
    printWindow?.document?.write(`<div style="width:30vw;">`);
    printWindow?.document?.write(
      `<div style="margin-bottom:20px; display:flex"><span style="font-size:14px; font-weight:700; display:block;"></span><span style="word-wrap: break-word; font-size: 14px; width: 75%; margin-left: 5%;"></span></div>`
    );
    printWindow?.document?.write("</div>");
    printWindow?.document?.write(
      `<div style="width:30vw; margin-left: 20px;">`
    );
    printWindow?.document?.write(
      `<div style="margin-bottom:20px; display:flex"><span style="font-size:14px; font-weight:700; display:block;"></span><span style="word-wrap: break-word; font-size: 14px; width: 75%; margin-left: 5%;"></span></div>`
    );
    printWindow?.document?.write("</div>");

    printWindow?.document?.write("</div>");
    printWindow?.document?.write("</div>");
    printWindow?.document
      ?.write(`<table id="html-data-table" style="border:2px solid black; width: 100%;" cellspacing="0"><tr><th style="border:1px solid black;border-bottom:2px solid black">No</th><th style="border:1px solid black;border-bottom:2px solid black">Delivery</th><th style="border:1px solid black;border-bottom:2px solid black">Company</th>
        <th style="border:1px solid black;border-bottom:2px solid black">Sender</th><th style="border:1px solid black;border-bottom:2px solid black">Recipient</th><th style="border:1px solid black;border-bottom:2px solid black">Creation Date</th>
        <th style="border:1px solid black;border-bottom:2px solid black">Lending Type</th><th style="border:1px solid black;border-bottom:2px solid black">Lending Status</th><th style="border:1px solid black;border-bottom:2px solid black">Res.Date & Time</th>
        <th style="border:1px solid black;border-bottom:2px solid black">Exr.Date & Time</th></tr>
    </table>`);
    const mytable = printWindow?.document.getElementById("html-data-table");
    userData?.invoiceDetails &&
      userData?.invoiceDetails?.map((data) => {
        const newRow = printWindow?.document.createElement("tr");

        const srNo = printWindow?.document.createElement("td");
        srNo.style.textAlign = "center";
        srNo.style.border = "1px solid black";

        const descriptionOfGoods = printWindow?.document.createElement("td");
        descriptionOfGoods.style.textAlign = "center";
        descriptionOfGoods.style.border = "1px solid black";

        const hsn = printWindow?.document.createElement("td");
        hsn.style.textAlign = "center";
        hsn.style.border = "1px solid black";

        const qty = printWindow?.document.createElement("td");
        qty.style.textAlign = "center";
        qty.style.border = "1px solid black";

        const rate = printWindow?.document.createElement("td");
        rate.style.textAlign = "center";
        rate.style.border = "1px solid black";

        const per = printWindow?.document.createElement("td");
        per.style.textAlign = "center";
        per.style.border = "1px solid black";

        const disc = printWindow?.document.createElement("td");
        disc.style.textAlign = "center";
        disc.style.border = "1px solid black";

        const amount = printWindow?.document.createElement("td");
        amount.style.textAlign = "center";
        amount.style.border = "1px solid black";

        srNo.innerText = data?.srNo;
        descriptionOfGoods.innerText = data?.descriptionOfGoods;
        hsn.innerText = data?.hsn;
        qty.innerText = data?.qty;
        rate.innerText = data?.rate;
        per.innerText = data?.per;
        disc.innerText = data?.disc;
        amount.innerText = data?.amount;
        const rowarray = [];
        rowarray.push(
          srNo,
          descriptionOfGoods,
          hsn,
          qty,
          rate,
          per,
          disc,
          amount
        );

        rowarray && rowarray?.map((row) => newRow?.appendChild(row));
        newRow.style.border = "1px solid black";

        mytable?.appendChild(newRow);
      });

    printWindow?.document?.write("</body></html>");
  };

  const htmlContent2 = `<!DOCTYPE html
   PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
 <html xmlns='http://www.w3.org/1999/xhtml' xml:lang='en' lang='en'>
 
 <head>
   <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
   <title>Accounting Voucher Display</title>
   <meta name='author' content='TallyPrime' />
   <style type='text/css'>
   *{
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
#header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 10px 10px 10px;
}

#header .left,
#header .right {
    display: flex;
    align-items: center;
    gap: 10px;
}

#header .title{
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-size: 25px;
}
#header .date{
    font-size: 10px;
    font-weight: bold;
    background-color: orange;
    border-radius: 30px;
    padding: 5px;
}
#viewer {
    background-color: white;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
}
.persondetail.main{
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-color: #e9ecef;
    margin: 10px;
    padding: 8px;
    border-radius: 8px;
    width:calc(100% - 20px);
}
table{
    border-collapse: collapse;
}
.persondetail.main table {
    table-layout: fixed;
    background-color: #fff;
    border-radius: 6px;
    margin: 5px 0px;
    padding: 10px;
    font-size: small;
}
.persondetail.main table tr td:nth-child(3) {
    max-width:  200px;
    word-wrap: break-word;

}
.persondetail.main table tr td:nth-child(2) , .persondetail.main table tr td:nth-child(5) {
    font-weight: bold;
    word-wrap: break-word;

}
.billing{
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 10px;
    padding: 0px 40px;
}
.billing table {
    table-layout: fixed;
    background-color: #fff;
    border-radius: 6px;
    margin: 5px 0px;
    padding: 10px;
    font-size: small;
    text-align: center;
}
.billing table thead{
    font-weight: 500;
}
.billing table td{

    border-bottom: 1px solid rgba(168, 168, 168, 0.371);
}
   </style>
 </head>
 
 <body>
 <div id="viewer">
 <div id="header">
     <div class="left">
         <div class="logo"><img src="" alt="Logo" srcset=""></div>
         <div class="title"><span>Tax Invoice</span></div>
         <div class="date"><span>25th Feb 2024</span></div>
     </div>
     <div class="right">
         <div class="icon download"><span><i class="fa-solid fa-download"></i></span></div>
         <div class="icon print"><span><i class="fa-solid fa-print"></i></span></div>
     </div>
 </div>
 <div class="persondetail main">
     <table>
         <tr>
             <td><span><i class="fa-solid fa-user"></i></span></td>
             <td><span>Name</span></td>
             <td><span>HOBC IMPORT EXPORT PRIVATE LIMITED</span></td>
             <td><span></span></td>
             <td><span>Invoice No.</span></td>
             <td><span>AOM#1361</span></td>
         </tr>
         <tr>
             <td><span><i class="fa-regular fa-address-card"></i></span></td>
             <td><span>Address</span></td>
             <td><span>7F, Snn Raj Pinnacle , ITPL Main Road Bengaluru</span></td>
             <td><span></span></td>
             <td><span>Buyer’s Order No.</span></td>
             <td><span></span></td>
         </tr>
         <tr>
             <td><span><i class="fa-solid fa-weight-scale"></i></span></td>
             <td><span>GSTIN/UIN</span></td>
             <td><span>29AAGCH3941L1Z6</span></td>
             <td><span></span></td>
             <td><span>Terms of Delivery</span></td>
             <td><span></span></td>
         </tr>
         <tr>
             <td><span><i class="fa-solid fa-map"></i></span></td>
             <td><span>State Name </span></td>
             <td><span>Karnataka</span></td>
             <td><span></span></td>
             <td colspan="2" rowspan="2"><span></span></td>
         </tr>
         <tr>
             <td><span><i class="fa-solid fa-code"></i></span></td>
             <td><span>Code</span></td>
             <td><span>29</span></td>
             <td><span></span></td>
         </tr>

     </table>
     <table>
         <tr>
             <td><span><i class="fa-solid fa-user"></i></span></td>
             <td><span>Consignee</span></td>
             <td><span>Manish Asawa</span></td>
             <td><span><i class="fa-solid fa-user"></i></span></td>
             <td><span>Invoice No.</span></td>
             <td><span>AOM#1361</span></td>
         </tr>
         <tr>
             <td><span><i class="fa-solid fa-address-card"></i></span></td>
             <td><span>Address</span></td>
             <td><span>7F, Snn Raj Pinnacle , ITPL Main Road Bengaluru</span></td>
             <td><span><i class="fa-solid fa-map"></i></span></td>
             <td><span>Buyer’s Order No.</span></td>
             <td><span></span></td>
         </tr>
         <tr>
             <td><span><i class="fa-solid fa-map"></i></span></td>
             <td><span>GSTIN/UIN</span></td>
             <td><span>29AAGCH3941L1Z6</span></td>
             <td><span><i class="fa-solid fa-user"></i></span></td>
             <td><span>Terms of Delivery</span></td>
             <td><span></span></td>
         </tr>
         <tr>
             <td><span><i class="fa-solid fa-code"></i></span></td>
             <td><span>State Name </span></td>
             <td><span>Karnataka</span></td>
         </tr>
     </table>
 </div>
 <div class="billing">
     <table>
         <thead>
             <td><span>SI No.</span></td>
             <td><span>Description of Goods</span></td>
             <td><span>HAS/SAC</span></td>
             <td><span>Qty.</span></td>
             <td><span>Rate</span></td>
             <td><span>per</span></td>
             <td><span>Disc. %</span></td>
             <td><span>Amount</span></td>
         </thead>
         <tbody>
             <!-- loop start -->
             <tr>
                 <td><span>1</span></td>
                 <td><span>1</span></td>
                 <td><span>71171100</span></td>
                 <td><span>1 NOS</span></td>
                 <td><span>$3923.30</span></td>
                 <td><span>NOS</span></td>
                 <td><span></span></td>
                 <td><span>$3923.30</span></td>
             </tr>
             <tr>
                 <td><span>1</span></td>
                 <td><span>1</span></td>
                 <td><span>71171100</span></td>
                 <td><span>1 NOS</span></td>
                 <td><span>$3923.30</span></td>
                 <td><span>NOS</span></td>
                 <td><span></span></td>
                 <td><span>$3923.30</span></td>
             </tr>
             <tr>
                 <td><span>1</span></td>
                 <td><span>1</span></td>
                 <td><span>71171100</span></td>
                 <td><span>1 NOS</span></td>
                 <td><span>$3923.30</span></td>
                 <td><span>NOS</span></td>
                 <td><span></span></td>
                 <td><span>$3923.30</span></td>
             </tr>
             <!-- loop-end -->
             <tr>
                 <td rowspan="3" colspan="5"><span></span></td>
                 <td><span>Subtotal</span></td>
                 <td></td>
                 <td><span>$1233</span></td>
             </tr>
             <tr>
                 <td><span>Discount</span></td>
                 <td></td>
                 <td><span>$1233</span></td>
             </tr>
             <tr>
                 <td><span>IGST</span></td>
                 <td></td>
                 <td><span>$1233</span></td>
             </tr>
             <tr>
                 <td colspan="3"></td>
                 <td><span>4 NOS</span></td>
                 <td></td>
                 <td><span>Total</span></td>
                 <td></td>
                 <td><span>$1233</span></td>
             </tr>
             <tr>
                 <td colspan="4"><span>Amount Chargeable (in words)  E. & O.E.</span></td>
                 <td colspan="4"><span>something somthind</span></td>
             </tr>
             <tr>
                 <td colspan="4"><span>Tax Amounts in words</span></td>
                 <td colspan="4"><span>something somthind</span></td>
             </tr>
         </tbody>
     </table>
 </div>
</div>
 </body>
 
 </html>`;

  return (
    <div className="container">
      <div className="row pt-3">
        <div className="col-3">
          <Button
            label="Download Sales Excel Sheet"
            onClick={handleDownloadSalesExcel}
          />
        </div>
        <div className="col-3">
          <Button
            label="Download Daybook Excel Sheet"
            onClick={handleDownloadDayBookExcel}
          />
        </div>
        <div className="col-3">
          <PdfGenerator htmlContent={htmlContent2} />
        </div>
        <div className="col-3">
          {/* <Button label='Check Accuracy' onClick={checkAccuracyHandler} /> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
