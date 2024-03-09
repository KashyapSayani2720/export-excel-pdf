import React from 'react';
import { Table } from 'antd';
import html2pdf from 'html2pdf.js';
import {htmlContent} from '../common/PdfData';

const vchNoHandler = () => {
    let element = htmlContent;

    html2pdf(element, {
      filename:     'generated.pdf',
      image:        { type: 'jpeg', quality: 2 },
      html2canvas:  { dpi: 192000, letterRendering: true },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    });

     element = null;
    };

    const columns = [
        {
        title: 'Date',
        dataIndex: 'date',
        width: "120px",
        render: (text) => <span className='color-blue'>{text}</span>
        },
        {
        title: 'Particular',
        dataIndex: 'particular',
        width: "150px" 
        },
        {
        title: 'Vch Type',
        dataIndex: 'vchType',
        width: "150px"  
        },
        {
        title: 'Vch No.',
        dataIndex: 'vchNo',
        width: "100px",
        render: (text) => <span className='color-blue hover-cursor' onClick={()=> {vchNoHandler(text)}}>{text}</span>
        },
        {
            title: 'GSTIN/UIN',
            dataIndex: 'gstin',
            width: "70px"  
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            width: "70px"  
        },
        {
            title: 'Rates',
            dataIndex: 'rates',
            width: 100
        },
        {
            title: 'Value',
            dataIndex: 'value',
            width: 100
        },
        {
            title: 'Gross Total',
            dataIndex: 'grossTotal',
            width: "150px"  
        },
        {
            title: 'Sales',
            dataIndex: 'sales',
            width: 100
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            width: 100
        },
        {
            title: 'CGST',
            dataIndex: 'cgst',
            width: 100
        },
        {
            title: 'SGST',
            dataIndex: 'sgst',
            width: 100
        },
        {
            title: 'IGST',
            dataIndex: 'igst',
            width: 100
        },
    ];

    const data = [];
    for (let i = 0; i < 46; i++) {
    data.push({
    key: i,
    date: `01-Oct-23`,
    particular: "Piyush Savaliya",
    vchType: `Credit Note`,
    vchNo: `AOM#1225`,
    gstin: "",
    quantity: "1 NOS",
    rates: `3502.91/NOS`,
    value: `3502.91`,
    grossTotal: "2989.99",
    sales:'2989.99',
    discount: "-3600",
    cgst: "43.54",
    sgst: "43.54",
    igst: "43.54"
    });
    }

const TableComponent = () => {
  
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
        }
    };

  return (
    <div>
      <Table 
         rowSelection={rowSelection} 
         columns={columns} 
         dataSource={data} 
         scroll={{ x: 1500 }}
         pagination={{ 
            defaultPageSize: 10, 
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30'],
            showTotal: (total, range) => (
                <span>
                  {range[0]}-{range[1]} of {total} items
                </span>
              ),
        }}
      />
    </div>
  )
}

export default TableComponent