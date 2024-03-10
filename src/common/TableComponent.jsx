import React from 'react';
import { Table } from 'antd';
import html2pdf from 'html2pdf.js';
import {htmlContentEditor} from './htmlContentEditor';


const vchNoHandler = (item) => {
    let element = htmlContentEditor(item);
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
        dataIndex: 'Date',
        width: "120px",
        render: (text) => <span className='color-blue'>{text}</span>
        },
        {
        title: 'Particular',
        dataIndex: 'Particulars',
        width: "150px" 
        },
        {
        title: 'Vch Type',
        dataIndex: 'Voucher Type',
        width: "150px"  
        },
        {
        title: 'Vch No.',
        dataIndex: 'Voucher No.',
        width: "100px",
        render: (text, item) => <span className='color-blue hover-cursor' onClick={()=> {vchNoHandler(item)}}>{text}</span>
        },
        {
            title: 'GSTIN/UIN',
            dataIndex: 'gstin',
            width: "70px"  
        },
        {
            title: 'Quantity',
            dataIndex: 'Quantity',
            width: "70px"  
        },
        {
            title: 'Rates',
            dataIndex: 'Rate',
            width: 100
        },
        {
            title: 'Value',
            dataIndex: 'Value',
            width: 100
        },
        {
            title: 'Gross Total',
            dataIndex: 'Gross Total',
            width: "150px"  
        },
        {
            title: 'Sales',
            dataIndex: 'Sales',
            width: 100
        },
        {
            title: 'Discount',
            dataIndex: 'Discount',
            width: 100
        },
        {
            title: 'CGST',
            dataIndex: 'CGST',
            width: 100
        },
        {
            title: 'SGST',
            dataIndex: 'SGST',
            width: 100
        },
        {
            title: 'IGST',
            dataIndex: 'IGST',
            width: 100
        },
    ];

const TableComponent = ({data}) => {
  
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