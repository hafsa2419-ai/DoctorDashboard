/*import React from 'react';
import { Button, Flex, Layout } from 'antd';
import {MenuUnfoldOutlined , MenuFoldOutlined} from '@ant-design/icons'
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import CustomHeader from './components/Header';
import MainContent from './components/MainContent';
import SideContent from './components/SideContent';
import './App.css';

const {Sider , Header , Content} = Layout;
const App = () => {
  const [collapsed,setCollepsed]=useState(false);
  return  (
    <Layout>
      <Sider theme='light' trigger={null} collapsible collapsed={collapsed} className='sider'>
        <Sidebar/>

        <Button type='text' icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
        onClick={() => setCollepsed(!collapsed)}
        className='triger-btn'
        />
      </Sider>
      <Layout>
        <Header className='header'> <CustomHeader/></Header>
        <Content className='content'>
          <Flex gap='large'>
            <MainContent/>
            <SideContent/>
          </Flex>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;*/
/////////////////////////////////////////////////


import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import Sidebar from './components/Sidebar';
import CustomHeader from './components/Header';
import MainContent from './components/MainContent';
import Patients from './pages/Patients';
import WaitingList from './pages/WaitingList';
import Consultation from './pages/Consultation';
import Bilan from './pages/Bilan';
import Medicament from './pages/Medicament';
import Statistiques from './pages/Statistics';
import Paiement from './pages/Paiment';
import Logout from './pages/Logout';
import './App.css';


const { Sider, Header, Content } = Layout;

const App = () => {
  return (
    <Router>
      <Layout>
        <Sider theme='light' trigger={null} collapsible collapsed={false} className='sider'>
          <Sidebar />
        </Sider>
        <Layout>
          <Header className='header'>
            <CustomHeader />
          </Header>
          <Content className='content'>
            <Switch>
              <Route exact path="/MainContent" component={MainContent} />
              <Route path="/patients" component={Patients} />
              <Route path="/waiting-list" component={WaitingList} />
              <Route path="/consultation" component={Consultation } />  
              <Route path="/bilan" component={Bilan} />
              <Route path="/medicament" component={Medicament} />
              <Route path="/statistiques" component={Statistiques} />
              <Route path="/paiement" component={Paiement} />
              <Route path="/logout" component={Logout} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;

// App.jsx
// App.jsx
/*
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Sidebar from './components/Sidebar';
import CustomHeader from './components/Header';
import MainContent from './components/MainContent';
import Home from './pages/Home';
import Consultation from './pages/Consultation';
import Bilan from './pages/Bilan';
import Medicament from './pages/Medicament';
import Statistiques from './pages/Statistics';
import Paiement from './pages/Paiment';
import Logout from './pages/Logout';
import WaitingList from './pages/WaitingList';
import './App.css';
import Patients from './pages/Patients';

const { Sider, Header, Content } = Layout;

const App = () => {
  return (
    <Router>
      <Layout>
        <Sider theme='light' collapsible>
          <Sidebar />
        </Sider>
        <Layout>
          <Header className='header'>
          <CustomHeader/>
          </Header>
          <Content className='content'>
            <Routes> {}
              <Route path="/MainContent" element={<MainContent/>} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/waiting-list" element={<WaitingList />} />
              <Route path="/consultation/:n_dossier" element={<Consultation />} />  
              <Route path="/bilan" element={<Bilan />} />
              <Route path="/medicament" element={<Medicament />} />
              <Route path="/statistiques" element={<Statistiques />} />
              <Route path="/paiement" element={<Paiement />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;*/

// this code i can add the logic of my login code 
/*
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import Sidebar from './components/Sidebar';
import CustomHeader from './components/Header';
import MainContent from './components/MainContent';
import Consultation from './pages/Consultation';
import Bilan from './pages/Bilan';
import Medicament from './pages/Medicament';
import Statistiques from './pages/Statistics';
import Paiement from './pages/Paiment';
import Logout from './pages/Logout';
import WaitingList from './pages/WaitingList';
import Patients from './pages/Patients';
import Login from './pages/Login';
import './App.css';

const { Sider, Header, Content } = Layout;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // You can implement your login logic here
    // For now, let's assume login is successful
    setIsLoggedIn(true);
  };

 return (
    <Router>
      <Layout>
        {isLoggedIn && (
          <>
            <Sider theme='light' collapsible>
              <Sidebar />
            </Sider>
            <Layout>
              <Header className='header'>
                <CustomHeader/>
              </Header>
              <Content className='content'>
                <Routes>
                  <Route path="/MainContent" element={<MainContent/>} />
                  <Route path="/patients" element={<Patients />} />
                  <Route path="/waiting-list" element={<WaitingList />} />
                  <Route path="/consultation" element={<Consultation />} />
                  <Route path="/bilan" element={<Bilan />} />
                  <Route path="/medicament" element={<Medicament />} />
                  <Route path="/statistiques" element={<Statistiques />} />
                  <Route path="/paiement" element={<Paiement />} />
                  <Route path="/logout" element={<Logout />} />
                </Routes>
              </Content>
            </Layout>
          </>
        )}
        {!isLoggedIn && (
          <Login onLogin={handleLogin} />
        )}
      </Layout>
    </Router>
  );
};

export default App;

*/


