import React, { useState, useEffect } from "react";
import { Breadcrumb, DatePicker, Button } from "antd";
import TableComponent from "../../common/TableComponent";
import { DownloadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import axios from "axios";
import * as XLSX from "xlsx/xlsx.mjs";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import html2pdf from "html2pdf.js";
import { htmlContentEditor } from "../../common/htmlContentEditor";

const items = [
  {
    title: "Home",
  },
  {
    title: <a href="">List</a>,
  },
  {
    title: "Daybook Reporting",
  },
];

const DaybookReport = () => {
  const baseUrl = "https://express-api-ten-gilt.vercel.app";
  const [salesReport, setDaybookReport] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    axios
      .get(`${baseUrl}/api/v1/excel/day_book`)
      .then((response) => {
        if (response?.status == 200) {
          setDaybookReport(response?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  function handleDownloadSalesExcel() {
    const grandTotal = calculateGrandTotal(salesReport);
    const dataArray = [...salesReport, grandTotal];
    const formattedData = formatDataWithHeaders(dataArray);
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
    link.setAttribute("download", "daybook_report.xlsx");

    // Append the link to the document body and click it
    document.body.appendChild(link);
    link.click();

    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
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

  // Convert a string to an ArrayBuffer
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }

  const vchNoHandler = (item) => {
    let element = htmlContentEditor(item);
    html2pdf(element, {
      filename: "generated.pdf",
      image: { type: "jpeg", quality: 2 },
      html2canvas: { dpi: 192000, letterRendering: true },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    });
    element = null;
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      width: "80px",
      render: (text) => <span className="color-blue">{text}</span>,
    },
    {
      title: "Particular",
      dataIndex: "particulars",
      width: "110px",
    },
    {
      title: "Vch Type",
      dataIndex: "vchType",
      width: "100px",
    },
    {
      title: "Vch No.",
      dataIndex: "vchNo",
      width: "100px",
      render: (text, item) => (
        <span
          className="color-blue hover-cursor"
          onClick={() => {
            vchNoHandler(item);
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Debit Amount",
      dataIndex: "debitAmount",
      width: "70px",
    },
    {
      title: "Credit Amount",
      dataIndex: "creditAmount",
      width: "70px",
    },
  ];

  return (
    <div>
      <div className="dashboard-content-box">
        <div className="content-container">
          <div className="breadcrum-box">
            <div>
              <Breadcrumb items={items} />
            </div>
            <div className="active-breadcrum">Daybook Reporting</div>
          </div>
          <div className="content-box">
            <TableComponent
              data={salesReport}
              columns={columns}
              width={500}
              loader={loader}
            />
          </div>
          {!loader && salesReport.length > 0 && (
            <div className="content-footer">
              <div>
                <DatePicker
                  defaultValue={dayjs("02/06/2024", "DD-MM-YYYY")}
                  format={["DD-MM-YYYY"]}
                  className="custom-datepicker"
                />
              </div>
              <div>
                <DatePicker
                  defaultValue={dayjs("02/06/2024", "DD-MM-YYYY")}
                  format={["DD-MM-YYYY"]}
                  className="custom-datepicker"
                />
              </div>
              <div>
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  onClick={handleDownloadSalesExcel}
                >
                  Generate Excel Report
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DaybookReport;
