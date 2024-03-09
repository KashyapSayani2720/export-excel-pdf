import React from "react";
import { Button } from "primereact/button";
import axios from "axios";
import * as XLSX from "xlsx/xlsx.mjs";
import PdfGenerator from "./pdf_generator";
import {htmlContent} from '../common/PdfData';

const Dashboard = () => {
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
          <PdfGenerator htmlContent={htmlContent} />
        </div>
        <div className="col-3">
          {/* <Button label='Check Accuracy' onClick={checkAccuracyHandler} /> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
