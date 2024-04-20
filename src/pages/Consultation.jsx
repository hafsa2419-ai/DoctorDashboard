/*import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const Consultation = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post('/consultation', values);
            message.success(response.data.message);
            form.resetFields();
        } catch (error) {
            message.error('Error submitting consultation. Please try again.');
            console.error('Error submitting consultation:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Consultation Page</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Patient ID"
                    name="patientId"
                    rules={[{ required: true, message: 'Please enter patient ID' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Doctor ID"
                    name="doctorId"
                    rules={[{ required: true, message: 'Please enter doctor ID' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Consultation Notes"
                    name="notes"
                    rules={[{ required: true, message: 'Please enter consultation notes' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit Consultation
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Consultation;*/
/*
import React from 'react';
import { Flex, Typography, Menu } from 'antd';
import { useLocation, Link } from 'react-router-dom';

const Consultation = () => {
    const location = useLocation();
    const { n_dossier, nom, prenom } = location.state || {};
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
    return (
      <div>

        <Flex align='center' justify='space-between' style={{marginTop:0}}>
          <Typography.Title level={3} type='secondary'>
              N° Dossier: {n_dossier} 
              <span style={{ marginLeft: '50px' }}>Patient: {capitalizeFirstLetter(nom)} {capitalizeFirstLetter(prenom)}</span>
          </Typography.Title>
        </Flex>

        <Menu mode="horizontal">
          <Menu.Item key="antecedents"><Link to={`/consultation/${n_dossier}/antecedents`}>Antécédents</Link></Menu.Item>
          <Menu.Item key="consultation"><Link to={`/consultation/${n_dossier}/consultation`}>Consultation</Link></Menu.Item>
          <Menu.Item key="ordonnance"><Link to={`/consultation/${n_dossier}/ordonnance`}>Ordonnance</Link></Menu.Item>
          <Menu.Item key="compte_rendu"><Link to={`/consultation/${n_dossier}/compte_rendu`}>Compte Rendu</Link></Menu.Item>
          <Menu.Item key="conduite_a_tenir"><Link to={`/consultation/${n_dossier}/conduite_a_tenir`}>Conduite à Tenir</Link></Menu.Item>
          <Menu.Item key="certificat"><Link to={`/consultation/${n_dossier}/certificat`}>Certificat</Link></Menu.Item>
          <Menu.Item key="courrier"><Link to={`/consultation/${n_dossier}/courrier`}>Courrier</Link></Menu.Item>
        </Menu>

      </div>

  );
  
};

export default Consultation;*/

/*import React from 'react';
import { Flex, Typography } from 'antd';
import { useLocation } from 'react-router-dom';

const Consultation = () => {
    const location = useLocation();
    const { n_dossier, nom, prenom } = location.state || {};
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
    return (
      <Flex align='center' justify='space-between' style={{marginTop:0}}>
          <Typography.Title level={3} type='secondary'>
              N° Dossier: {n_dossier} 
              <span style={{ marginLeft: '50px' }}>Patient: {capitalizeFirstLetter(nom)} {capitalizeFirstLetter(prenom)}</span>
          </Typography.Title>
      </Flex>

      
  );
  
};

export default Consultation;
*/
/*
import React, { useState } from 'react'; // Import useState hook
import { useLocation } from 'react-router-dom';
import { Layout, Menu, Typography, Button, Drawer } from 'antd';
import { Flex } from 'antd';
import ConsultationHeader from '../components/ConsultationHeader';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'; // Import Route from react-router-dom
//import {Antecedents} from './Antecedents';
//import {ConsultationPage} from './ConsultationPage';
//import {CompteRendu} from './CompteRendu';
//import {ConduiteATenir} from './ConduiteATenir'
//import {Certificat} from './Certificat'


const { Header, Content } = Layout;

const Consultation = () => {
  const location = useLocation();
  const { state } = location;
  const { n_dossier, nom, prenom } = state || {};
  const [showHistory, setShowHistory] = useState(false); // Define showHistory state variable


  const capitalizeNom = (nom) => {
    if (typeof nom === 'string' && nom.length > 0) {
      return nom.charAt(0).toUpperCase() + nom.slice(1);
    } else {
      return ''; // or handle the case when nom is undefined
    }
  };

  const capitalizedNom = capitalizeNom(nom);

  
  const capitalizePrenom = (prenom) => {
    if (typeof prenom === 'string' && prenom.length > 0) {
      return prenom.charAt(0).toUpperCase() + prenom.slice(1);
    } else {
      return ''; // or handle the case when nom is undefined
    }
  };
  const capitalizedPrenom = capitalizePrenom(prenom);

  
  


  const [historique, setHistorique] = useState([]);

  const fetchHistorique = async () => {
    // Fetch historical information for the patient based on n_dossier
    // Example: const response = await fetch(`/api/historique/${n_dossier}`);
    // const data = await response.json();
    // setHistorique(data);
  };

  const handleHistoriqueClick = () => {
    fetchHistorique();
    // You can implement logic to show historical information in a modal or other UI component
  };

  const showHistoryDrawer = () => {
    setShowHistory(true);
  };

  const closeHistoryDrawer = () => {
    setShowHistory(false);
  };

  const { path, url } = useRouteMatch();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      
      <Content style={{ padding: '10px', minHeight: 100 }}>
        <Flex align='center' justify='space-between' style={{ marginTop: 0}}>
          <Typography.Title level={3} type='secondary'>
            N° Dossier: {n_dossier} 
            <span style={{ marginLeft: '50px' }}>Patient: {capitalizedNom} {capitalizedPrenom}</span>
          </Typography.Title>
          <Button type="primary" onClick={showHistoryDrawer}>Historique</Button>
        </Flex>
      </Content>

      <Drawer
        title="Historique"
        placement="right"
        closable={true}
        onClose={closeHistoryDrawer}
        visible={showHistory}
        width={400}
        
      >*/
        {/* Content for the patient's history */}
        {/* You can fetch and display the patient's history here */}
        {/* For example, you can render a list of historical records */}
       /* 
      </Drawer>
      
    
      <Layout>
          <Header style={{marginTop:0}}>
            <ConsultationHeader/>
          </Header>
          
          <Content>
          <Switch>
              <Route exact path={`${path}/antecedents`} component={() => import('./Antecedents')} />
              <Route exact path={`${path}/consultationPage`} component={() => import('./ConsultationPage')} />
              <Route exact path={`${path}/compte_rendu`} component={() => import('./CompteRendu')} />
              <Route exact path={`${path}/conduite_a_tenir`} component={() => import('./ConduiteATenir')} />
              <Route exact path={`${path}/certificat`} component={() => import('./Certificat')} />
            </Switch>
          </Content>
      </Layout>
    
    </Layout>
  );
};

export default Consultation;
*/

import React, { useState } from 'react'; // Import useState hook
import { useLocation } from 'react-router-dom';
import { Layout, Typography, Button, Drawer, Menu, Dropdown } from 'antd';
import { Flex } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
//import { Select, MenuItem } from '@mui/material'; // Import Material-UI components for dropdown
import Antecedents from './Antecedents';
import ConsultationPage from './ConsultationPage';
import CompteRendu from './CompteRendu';
import ConduiteATenir from './ConduiteATenir'
import Certificat from './Certificat';
import Ordonnance from './Ordonnance';
import "./consultation.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

const { Header, Content } = Layout;

const Consultation = () => {
  const location = useLocation();
  const { state } = location;
  const { n_dossier, nom, prenom } = state || {};
  const [showHistory, setShowHistory] = useState(false); // Define showHistory state variable
  const [value, setValue] = useState(0); // Define value state variable for tabs

  const capitalize = (str) => {
    return typeof str === 'string' && str.length > 0 ? str.charAt(0).toUpperCase() + str.slice(1) : '';
  };

  const capitalizedNom = capitalize(nom);
  const capitalizedPrenom = capitalize(prenom);

  const fetchHistorique = async () => {
    // Fetch historical information for the patient based on n_dossier
    // Example: const response = await fetch(`/api/historique/${n_dossier}`);
    // const data = await response.json();
    // setHistorique(data);
  };

  const handleHistoriqueClick = () => {
    fetchHistorique();
    // You can implement logic to show historical information in a modal or other UI component
  };

  const showHistoryDrawer = () => {
    setShowHistory(true);
  };

  const closeHistoryDrawer = () => {
    setShowHistory(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleConsultationMenuClick = (event) => {
    // Handle clicks on consultation menu items
    // For now, just log the clicked item
    console.log(event.key);
  };

  const consultationMenu = (
    <Menu onClick={handleConsultationMenuClick}>
      <Menu.Item key="interrogatoire">Interrogatoire</Menu.Item>
      <Menu.Item key="examen-clinique">Examen clinique</Menu.Item>
      <Menu.Item key="examen-paraclinique">Examen paraclinique</Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      
      <Content style={{ padding: '10px', minHeight: 100 }}>
        <Flex align='center' justify='space-between' style={{ marginTop: 0}}>
          <Typography.Title level={3} type='secondary'>
            N° Dossier: {n_dossier} 
            <span style={{ marginLeft: '50px' }}>Patient: {capitalizedNom} {capitalizedPrenom}</span>
          </Typography.Title>
          <Button type="primary" onClick={showHistoryDrawer}>Historique</Button>
        </Flex>
      </Content>

      <Drawer
        title="Historique"
        placement="right"
        closable={true}
        onClose={closeHistoryDrawer}
        visible={showHistory}
        width={400}
      >
        {/* Content for the patient's history */}
        {/* You can fetch and display the patient's history here */}
        {/* For example, you can render a list of historical records */}
      </Drawer>
      
      <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            textColor='#fff'
            variant="fullWidth"
            aria-label="full width tabs example"
            sx={{ bgcolor: '#b6b5b5' }}
          >
            <Tab label="Antecedent" 
            sx={{
              '&.Mui-selected': { // Apply styles when tab is selected
                color: '#2e3790', // Set text color to blue when selected
              },
            }}/>
            <Tab label={
                <div>
                  Consultation
                  <Dropdown overlay={consultationMenu} placement="bottomLeft">
                    <Button style={{ marginLeft: 8 }} icon={<FontAwesomeIcon icon={faSortDown} />} />
                  </Dropdown>
                </div>
              }
            sx={{
              '&.Mui-selected': { // Apply styles when tab is selected
                color: '#2e3790', // Set text color to blue when selected
                position: 'relative',
              },
            }}/> 
            <Tab label="ordonnance" 
            sx={{
              '&.Mui-selected': { // Apply styles when tab is selected
                color: '#2e3790', // Set text color to blue when selected
              },
            }}/>
            <Tab label="compte rendu" 
            sx={{
              '&.Mui-selected': { // Apply styles when tab is selected
                color: '#2e3790', // Set text color to blue when selected
              },
            }}/>
            <Tab label="conduite a tenir " 
            sx={{
              '&.Mui-selected': { // Apply styles when tab is selected
                color: '#2e3790', // Set text color to blue when selected
              },
            }}/>
            <Tab label="certificat" 
            sx={{
              '&.Mui-selected': { // Apply styles when tab is selected
                color: '#2e3790', // Set text color to blue when selected
              },
            }}/>
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={useTheme().direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <Box
            role="tabpanel"
            hidden={value !== 0}
            id={`full-width-tabpanel-0`}
            aria-labelledby={`full-width-tab-0`}
            sx={{
              bgcolor: '#fff',
              height: 'calc(100vh - 64px)',
              overflow: 'auto',
              display: value === 0 ? 'block' : 'none',
            }}
          >
            {value === 0 && <Antecedents/>}
          </Box>
          <Box
            role="tabpanel"
            hidden={value !== 1}
            id={`full-width-tabpanel-1`}
            aria-labelledby={`full-width-tab-1`}
            sx={{
              bgcolor: '#fff',
              height: 'calc(100vh - 64px)',
              overflow: 'auto',
              display: value === 1 ? 'block' : 'none',
            }}
          >
            {value === 1 && <ConsultationPage />}
          </Box>
          <Box
            role="tabpanel"
            hidden={value !== 2}
            id={`full-width-tabpanel-1`}
            aria-labelledby={`full-width-tab-1`}
            sx={{
              bgcolor: '#fff',
              height: 'calc(100vh - 64px)',
              overflow: 'auto',
              display: value === 2 ? 'block' : 'none',
            }}
          >
            {value === 2 && <Ordonnance />}
          </Box>
          <Box
            role="tabpanel"
            hidden={value !== 3}
            id={`full-width-tabpanel-0`}
            aria-labelledby={`full-width-tab-0`}
            sx={{
              bgcolor: '#fff',
              height: 'calc(100vh - 64px)',
              overflow: 'auto',
              display: value === 3 ? 'block' : 'none',
            }}
          >
            {value === 3 && <CompteRendu />}
          </Box>
          <Box
            role="tabpanel"
            hidden={value !== 4}
            id={`full-width-tabpanel-0`}
            aria-labelledby={`full-width-tab-0`}
            sx={{
              bgcolor: '#fff',
              height: 'calc(100vh - 64px)',
              overflow: 'auto',
              display: value === 4 ? 'block' : 'none',
            }}
          >
            {value === 4 && <ConduiteATenir />}
          </Box>
          <Box
            role="tabpanel"
            hidden={value !== 5}
            id={`full-width-tabpanel-2`}
            aria-labelledby={`full-width-tab-2`}
            sx={{
              bgcolor: '#fff',
              height: 'calc(100vh - 64px)',
              overflow: 'auto',
              display: value === 5 ? 'block' : 'none',
            }}
          >
            {value === 5 && <Certificat />}
          </Box>
        </SwipeableViews>
      
    
    </Layout>
  );
};

export default Consultation;
