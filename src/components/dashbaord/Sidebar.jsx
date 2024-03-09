import React from 'react';
import { Menu } from 'antd';
import { FileAddOutlined,DashboardOutlined, CheckCircleOutlined, TableOutlined,ProfileOutlined , SettingOutlined, UserOutlined, WarningOutlined, HighlightOutlined } from '@ant-design/icons';

function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
}

const items = [
    getItem('Dashboard', '1', <DashboardOutlined />),
    getItem('Form', '2', <FileAddOutlined />),
    getItem('List', 'sub1', <TableOutlined />, [
      getItem('Search List', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')]),
      getItem('Data Here', 'g2', null),
      getItem('Basic List', 'g3', null),
      getItem('Card List', 'g4', null),
    ]),
  
    getItem('Profile', 'sub2', <ProfileOutlined />, [
      getItem('Option 1', '3'),
      getItem('Option 2', '4')
    ]),
  
    getItem('Result', 'sub3', <CheckCircleOutlined />, [
        getItem('Option 1', '5'),
        getItem('Option 2', '6')
    ]),

    getItem('Exception', 'sub4', <WarningOutlined />, [
        getItem('Option 1', '7'),
        getItem('Option 2', '8')
    ]),

    getItem('Account', 'sub5', <UserOutlined />, [
        getItem('Option 1', '9'),
        getItem('Option 2', '10')
    ]),

    getItem('Graphic Editor', 'sub6', <HighlightOutlined />, [
        getItem('Option 1', '11'),
        getItem('Option 2', '12')
    ])
];
const Sidebar = () => {
    const onClick = (e) => {
        console.log('click ', e);
      };
      
  return (
    <div>
        <Menu
        onClick={onClick}
        style={{ width: 256 }}
        className='sidebar-container'
        defaultSelectedKeys={['g2']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
        />
    </div>
  )
}

export default Sidebar