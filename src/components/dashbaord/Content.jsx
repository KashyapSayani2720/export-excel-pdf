import React from 'react';
import { Breadcrumb, DatePicker, Button } from 'antd';
import TableComponent from '../../common/TableComponent';
import { DownloadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const items = [
    {
        title: 'Home',
    },
    {
        title: <a href="">List</a>,
    },
    {
        title: <a href="">Reporting</a>,
    },
    {
        title: 'ABC Reporting',
    },
    ]
const Content = () => {
  return (
    <div className='content-container'>
        <div className='breadcrum-box'>
            <div>
                <Breadcrumb items={items} />
            </div>
            <div className='active-breadcrum'>
                ABC Reporting
            </div>
        </div>
        <div className='content-box'>
           <TableComponent/>
        </div>
        <div className='content-footer'>
            <div>
              <DatePicker 
               defaultValue={dayjs('02/06/2024', 'DD-MM-YYYY')} 
               format={['DD-MM-YYYY']} 
               className='custom-datepicker'
               />
            </div>
            <div>
              <DatePicker 
               defaultValue={dayjs('02/06/2024', 'DD-MM-YYYY')} 
               format={['DD-MM-YYYY']} 
               className='custom-datepicker'
               />
            </div>
            <div>
              <Button type="primary" icon={<DownloadOutlined />}>Generate Excel Report</Button>
            </div>
        </div>
    </div>
  )
}

export default Content