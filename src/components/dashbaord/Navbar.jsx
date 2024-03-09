import React from 'react';
import Logo from '../../common/assets/images/logo.png';
import Search from '../../common/assets/svgs/search.svg';
import Doubt from '../../common/assets/svgs/doubt.svg';
import Bell from '../../common/assets/svgs/bell.svg';
import UserName from '../../common/assets/svgs/username.svg';
import User from '../../common/assets/images/user.png';

const Navbar = () => {
  return (
    <div className='narbar-container'>
        <div className='narbar-left-container'>
            <div><img src={Logo} alt="logo" /></div>
            <div className='navbar-title'>Ant Design Pro</div>
        </div>
        <div className='navbar-right-container'>
            <div className='navbar-icons-box'>
                <div><img src={Search} alt="search" /></div>
                <div><img src={Doubt} alt="question" /></div>
                <div><img src={Bell} alt="bell" /></div>
            </div>
            <div className='navbar-right-box'>
                <div><img src={User} alt="user" /></div>
                <div>Serati Ma</div>
            </div>
            <div><img src={UserName} alt="user" /></div>
        </div>
    </div>
  )
}

export default Navbar