import React from 'react';
import { Table } from 'antd';

const TableComponent = ({data, columns, width, loader}) => {
  
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
         loading={loader}
         scroll={{ x: width }}
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