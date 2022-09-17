import React, {useState} from 'react'
import {Outlet, useLocation, Link, useNavigate, Navigate} from "react-router-dom";
import { UserAuth } from '../../contexts/authcontext';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';

const { Header, Content, Footer, Sider } = Layout;




const ProjectManager = () => {

  const [currentProject, setCurrentProject] = useState({key:'', title:''});
  const navigate = useNavigate();
  const {user, logout} = UserAuth()
  let location = useLocation();

  const handleLogout = async () => {
    try {
         await logout();
         navigate('/login');
         console.log('you are logged out');
    } catch (e) {
        console.log(e.message)
    }
};
  
const [collapsed, setCollapsed] = useState(false);
if (location.pathname === '/app/' || location.pathname === '/app') return <Navigate to='/app/dashboard' />; 
return (
  <Layout className="layout">
    <Header>
      <a><h2 onClick={handleLogout} style={{color:"white"}}>Logout</h2></a>
  
    </Header>
    <Content
      style={{
        padding: '0 50px',
      }}
    >
     <Outlet context={[currentProject, setCurrentProject]} />
    </Content>
    <Footer
      style={{
        textAlign: 'center',
      }}
    >
      Zekha Post ©2018 Created by Demotic    </Footer>
  </Layout>
);
}

export default ProjectManager