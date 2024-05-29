
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





