import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout, Typography, Button, Drawer, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Antecedents from './Antecedents';
import ConsultationPage from './ConsultationPage';
import CompteRendu from './CompteRendu';
import ConduiteATenir from './ConduiteATenir';
import Certificat from './Certificat';
import Ordonnance from './Ordonnance';
import ArretDeTravail from './ArretDeTravail';
import CertificatMedical from './CertificatMedical';
import "./consultation.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

const { Content } = Layout;

const Consultation = () => {
  const location = useLocation();
  const { state } = location;
  const { n_dossier, nom, prenom } = state || {};
  const [showHistory, setShowHistory] = useState(false);
  const [value, setValue] = useState(0);
  const [selectedCertificatItem, setSelectedCertificatItem] = useState(null);
  const theme = useTheme();

  const capitalize = (str) => {
    return typeof str === 'string' && str.length > 0 ? str.charAt(0).toUpperCase() + str.slice(1) : '';
  };

  const capitalizedNom = capitalize(nom);
  const capitalizedPrenom = capitalize(prenom);

  const fetchHistorique = async () => {
    // Fetch historical information for the patient based on n_dossier
  };

  const handleHistoriqueClick = () => {
    fetchHistorique();
    // Show historical information
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

  const certificatMenuItems = [
    { key: 'arrêt-de-travail', label: 'arrêt de travail' },
    { key: 'certificat-médical', label: 'certificat médical' },
  ];

  const handleCertificatMenuClick = ({ key }) => {
    setSelectedCertificatItem(key);
    setValue(5); // Switch to the Certificat tab
  };

  const certificatMenu = (
    <Menu onClick={handleCertificatMenuClick} items={certificatMenuItems} />
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '10px', minHeight: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 0 }}>
          <Typography.Title level={3} type='secondary'>
            N° Dossier: {n_dossier}
            <span style={{ marginLeft: '50px' }}>Patient: {capitalizedNom} {capitalizedPrenom}</span>
          </Typography.Title>
          <Button type="secondary" onClick={showHistoryDrawer}>Historique</Button>
        </div>
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
      </Drawer>

      <AppBar style={{ backgroundColor: '#45c1b3', color: '#fff', textAlign: 'center', padding: '10px 0' , borderTopRightRadius: '12px' , borderTopLeftRadius:'12px', display: 'flex', height:'50px'}} position="static" >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor='#fff'
          variant="fullWidth"
          aria-label="full width tabs example"
          sx={{ bgcolor: '#45c1b3' }}
        >
          <Tab label="Antecedent" 
            sx={{
              '&.Mui-selected': { 
                color: '#2e3790', 
              },
            }}
          />
          <Tab label="Consultation" 
            sx={{
              '&.Mui-selected': { 
                color: '#2e3790', 
              },
            }}
          />
          <Tab label="Ordonnance" 
            sx={{
              '&.Mui-selected': { 
                color: '#2e3790', 
              },
            }}
          />
          <Tab label="Compte rendu" 
            sx={{
              '&.Mui-selected': { 
                color: '#2e3790', 
              },
            }}
          />
          <Tab label="Conduite a tenir" 
            sx={{
              '&.Mui-selected': { 
                color: '#2e3790', 
              },
            }}
          />
          <Dropdown overlay={certificatMenu} trigger={['click']}>
            <Tab label={
              <div>
                Certificat
                <FontAwesomeIcon icon={faSortDown} style={{ marginLeft: 8 }} />
              </div>
            } 
            sx={{
              '&.Mui-selected': { 
                color: selectedCertificatItem ? '#2e3790' : '#fff', // Set text color to blue if an item is selected, otherwise white
              },
            }}/>
          </Dropdown>
        </Tabs>
      </AppBar>

      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
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
          {value === 0 && <Antecedents nDossier={n_dossier}/>}
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
          {value === 1 && <ConsultationPage nDossier={n_dossier}/>}
        </Box>
        <Box
          role="tabpanel"
          hidden={value !== 2}
          id={`full-width-tabpanel-2`}
          aria-labelledby={`full-width-tab-2`}
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
          id={`full-width-tabpanel-3`}
          aria-labelledby={`full-width-tab-3`}
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
          id={`full-width-tabpanel-4`}
          aria-labelledby={`full-width-tab-4`}
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
          id={`full-width-tabpanel-5`}
          aria-labelledby={`full-width-tab-5`}
          sx={{
            bgcolor: '#fff',
            height: 'calc(100vh - 64px)',
            overflow: 'auto',
            display: value === 5 ? 'block' : 'none',
          }}
        >
          {value === 5 && (
            selectedCertificatItem === 'arrêt-de-travail' ? <ArretDeTravail /> :
            selectedCertificatItem === 'certificat-médical' ? <CertificatMedical /> :
            <Certificat />
          )}
        </Box>
      </SwipeableViews>
    </Layout>
  );
};

export default Consultation;

