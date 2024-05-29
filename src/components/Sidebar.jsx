/*import { Flex, Menu } from 'antd';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse , faFlask, faUser, faCreditCard, faUsers, faStethoscope, faChartLine, faSignOutAlt, faPills, faChartPie} from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/clinique1.png'; 
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <>
            <Flex align='center' justify='center'>
                <div className='logo'>
                <img src={logo} alt="Clinique Logo" style={{ width: '100px', height: 'auto' }} /> 
                </div>
            </Flex>


            <Menu mode='inline' defaultSelectedKeys={['1']} className='menu-bar' items={[
                {
                  key :'1',
                  icon :<FontAwesomeIcon icon={faHouse} />,
                  label:'Acceil',
                },
                {
                    key :'2',
                    icon :<FontAwesomeIcon icon={faUser} />,
                    label:'Patient',
                  },
                  {
                    key :'3',
                    icon :<FontAwesomeIcon icon={faUsers} />,

                    label:'File D\'attente',
                  },
                  {
                    key :'4',
                    icon :<FontAwesomeIcon icon={faStethoscope} />,
                    label:'Consultation',
                  },
                  {
                    key :'5',
                    icon :<FontAwesomeIcon icon={faFlask} />,
                    label:'Bilan',
                  },
                  {
                    key :'6',
                    icon :<FontAwesomeIcon icon={faPills} />,
                    label:'Medicament',
                  },
                  {
                    key :'7',
                    icon :<FontAwesomeIcon icon={faChartLine} />,
                    label:'Statistiques',
                  },
                  {
                    key :'8',
                    icon : <FontAwesomeIcon icon={faCreditCard} />,
                    label:'Paiment',
                  },
                  {
                    key :'9',
                    icon :<FontAwesomeIcon icon={faSignOutAlt} />,
                    label:'LogOut',
                  },
            ]}/>
        </>
    );
};

export default Sidebar;*/
//////////////////////////////

import { Flex, Menu } from 'antd';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faFlask, faUser, faCreditCard, faUsers, faStethoscope, faChartLine, faSignOutAlt, faPills, faChartPie } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/clinique1.png';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <>
            <Flex align='center' justify='center'>
                <div className='logo'>
                    <img src={logo} alt="Clinique Logo" style={{ width: '100px', height: 'auto' }} />
                </div>
            </Flex>

            <Menu mode='inline' defaultSelectedKeys={['1']} className='menu-bar'>
                <Menu.Item key='1' icon={<FontAwesomeIcon icon={faHouse} />}>
                    <Link to="/">Acceil</Link>
                </Menu.Item>
                <Menu.Item key='2' icon={<FontAwesomeIcon icon={faUser} />}>
                    <Link to="/patients">Patient</Link>
                </Menu.Item>
                <Menu.Item key='3' icon={<FontAwesomeIcon icon={faUsers} />}>
                    <Link to="/waiting-list">File D'attente</Link>
                </Menu.Item>
                <Menu.Item key='4' icon={<FontAwesomeIcon icon={faStethoscope} />}>
                    <Link to="/consultation">Consultation</Link>
                </Menu.Item>
                <Menu.Item key='5' icon={<FontAwesomeIcon icon={faFlask} />}>
                    <Link to="/bilan">Bilan</Link>
                </Menu.Item>
                <Menu.Item key='6' icon={<FontAwesomeIcon icon={faPills} />}>
                    <Link to="/medicament">Medicament</Link>
                </Menu.Item>
                <Menu.Item key='7' icon={<FontAwesomeIcon icon={faChartLine} />}>
                    <Link to="/statistiques">Statistiques</Link>
                </Menu.Item>
                <Menu.Item key='8' icon={<FontAwesomeIcon icon={faCreditCard} />}>
                    <Link to="/paiement">Paiment</Link>
                </Menu.Item>
                <Menu.Item key='9' icon={<FontAwesomeIcon icon={faSignOutAlt} />}>
                    <Link to="/logout">LogOut</Link>
                </Menu.Item>
            </Menu>
        </>
    );
};

export default Sidebar;




// Sidebar.jsx
/*import React from 'react';
import { Menu , Flex } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faUsers, faStethoscope, faFlask, faPills, faSignOutAlt, faCreditCard, faChartLine  } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/clinique1.png';

const Sidebar = () => {
    
    return (
<>
        <Flex align='center' justify='center'>
        <div className='logo'>
            <img src={logo} alt="Clinique Logo" style={{ width: '100px', height: 'auto' }} />
        </div>
    </Flex>


        <Menu mode='inline' defaultSelectedKeys={['1']} className='menu-bar'>
            <Menu.Item key='1' icon={<FontAwesomeIcon icon={faHouse} />}>
                <Link to="/MainContent">Acceuil</Link>
            </Menu.Item>
            <Menu.Item key='2' icon={<FontAwesomeIcon icon={faUser} />}>
                <Link to="/patients">Patient</Link>
            </Menu.Item>
            <Menu.Item key='3' icon={<FontAwesomeIcon icon={faUsers} />}>
                <Link to="/waiting-list">File d'attente</Link>
            </Menu.Item>
            <Menu.Item key='4' icon={<FontAwesomeIcon icon={faStethoscope} />}>
                <Link to="/consultation">Consultation</Link>
            </Menu.Item>
            <Menu.Item key='5' icon={<FontAwesomeIcon icon={faFlask} />}>
                <Link to="/bilan">Bilan</Link>
            </Menu.Item>
            <Menu.Item key='6' icon={<FontAwesomeIcon icon={faPills} />}>
                    <Link to="/medicament">Medicament</Link>
                </Menu.Item>
                <Menu.Item key='7' icon={<FontAwesomeIcon icon={faChartLine} />}>
                    <Link to="/statistiques">Statistiques</Link>
                </Menu.Item>
                <Menu.Item key='8' icon={<FontAwesomeIcon icon={faCreditCard} />}>
                    <Link to="/paiement">Paiment</Link>
                </Menu.Item>
                <Menu.Item key='9' icon={<FontAwesomeIcon icon={faSignOutAlt} />}>
                    <Link to="/logout">LogOut</Link>
                </Menu.Item>
            
        </Menu>
        </>
    );
};

export default Sidebar;*/
/*
import React from 'react';
import { Menu, Flex, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faUsers, faStethoscope, faFlask, faPills, faSignOutAlt, faCreditCard, faChartLine } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/clinique1.png';

const Sidebar = () => {
    

    return (
        <>
            <Flex align='center' justify='center'>
                <div className='logo'>
                    <img src={logo} alt="Clinique Logo" style={{ width: '100px', height: 'auto' }} />
                </div>
            </Flex>

            <Menu mode='inline' defaultSelectedKeys={['1']} className='menu-bar' >
                <Menu.Item key='1' icon={<FontAwesomeIcon icon={faHouse} />}>
                    <Link to="/MainContent">Acceuil</Link>
                </Menu.Item>
                <Menu.Item key='2' icon={<FontAwesomeIcon icon={faUser} />}>
                    <Link to="/patients">Patient</Link>
                </Menu.Item>
                <Menu.Item key='3' icon={<FontAwesomeIcon icon={faUsers} />}>
                    <Link to="/waiting-list">File d'attente</Link>
                </Menu.Item>
                <Menu.Item key='4' icon={<FontAwesomeIcon icon={faStethoscope} />}>
                <Link to="/consultation">Consultation</Link>
                </Menu.Item>
                <Menu.Item key='5' icon={<FontAwesomeIcon icon={faFlask} />}>
                    <Link to="/bilan">Bilan</Link>
                </Menu.Item>
                <Menu.Item key='6' icon={<FontAwesomeIcon icon={faPills} />}>
                    <Link to="/medicament">Medicament</Link>
                </Menu.Item>
                <Menu.Item key='7' icon={<FontAwesomeIcon icon={faChartLine} />}>
                    <Link to="/statistiques">Statistiques</Link>
                </Menu.Item>
                <Menu.Item key='8' icon={<FontAwesomeIcon icon={faCreditCard} />}>
                    <Link to="/paiement">Paiment</Link>
                </Menu.Item>
                <Menu.Item key='9' icon={<FontAwesomeIcon icon={faSignOutAlt} />}>
                    <Link to="/logout">LogOut</Link>
                </Menu.Item>
            </Menu>
        </>
    );
};

export default Sidebar;
*/
/*
import React from 'react';
import { Menu, Flex } from 'antd';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faUsers, faStethoscope, faFlask, faPills, faSignOutAlt, faCreditCard, faChartLine } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/clinique1.png';

const Sidebar = () => {
    return (
        <>
            <Flex align='center' justify='center'>
                <div className='logo'>
                    <img src={logo} alt="Clinique Logo" style={{ width: '100px', height: 'auto' }} />
                </div>
            </Flex>

            <Menu mode='inline' defaultSelectedKeys={['1']} className='menu-bar' >
                <Menu.Item key='1' icon={<FontAwesomeIcon icon={faHouse} />}>
                    <NavLink exact to="/MainContent">Acceuil</NavLink>
                </Menu.Item>
                <Menu.Item key='2' icon={<FontAwesomeIcon icon={faUser} />}>
                    <NavLink to="/patients">Patient</NavLink>
                </Menu.Item>
                <Menu.Item key='3' icon={<FontAwesomeIcon icon={faUsers} />}>
                    <NavLink to="/waiting-list">File d'attente</NavLink>
                </Menu.Item>
                <Menu.Item key='4' icon={<FontAwesomeIcon icon={faStethoscope} />}>
                    <NavLink to="/consultation">Consultation</NavLink>
                </Menu.Item>
                <Menu.Item key='5' icon={<FontAwesomeIcon icon={faFlask} />}>
                    <NavLink to="/bilan">Bilan</NavLink>
                </Menu.Item>
                <Menu.Item key='6' icon={<FontAwesomeIcon icon={faPills} />}>
                    <NavLink to="/medicament">Medicament</NavLink>
                </Menu.Item>
                <Menu.Item key='7' icon={<FontAwesomeIcon icon={faChartLine} />}>
                    <NavLink to="/statistiques">Statistiques</NavLink>
                </Menu.Item>
                <Menu.Item key='8' icon={<FontAwesomeIcon icon={faCreditCard} />}>
                    <NavLink to="/paiement">Paiment</NavLink>
                </Menu.Item>
                <Menu.Item key='9' icon={<FontAwesomeIcon icon={faSignOutAlt} />}>
                    <NavLink to="/logout">LogOut</NavLink>
                </Menu.Item>
            </Menu>
        </>
    );
};

export default Sidebar;
*/
/*
import React, { useState } from 'react';
import { Menu, Flex } from 'antd';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faUsers, faStethoscope, faFlask, faPills, faSignOutAlt, faCreditCard, faChartLine } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/clinique1.png';

const Sidebar = () => {
    const [activeKey, setActiveKey] = useState('1');

    const handleSetActiveKey = (key) => {
        setActiveKey(key);
    };

    return (
        <>
            <Flex align='center' justify='center'>
                <div className='logo'>
                    <img src={logo} alt="Clinique Logo" style={{ width: '100px', height: 'auto' }} />
                </div>
            </Flex>

            <Menu mode='inline' selectedKeys={[activeKey]} className='menu-bar'>
                <Menu.Item key='1' icon={<FontAwesomeIcon icon={faHouse} />}>
                    <NavLink exact to="/MainContent">Acceuil</NavLink>
                </Menu.Item>
                <Menu.Item key='2' icon={<FontAwesomeIcon icon={faUser} />}>
                    <NavLink to="/patients">Patient</NavLink>
                </Menu.Item>
                <Menu.Item key='3' icon={<FontAwesomeIcon icon={faUsers} />}>
                    <NavLink to="/waiting-list">File d'attente</NavLink>
                </Menu.Item>
                <Menu.Item key='4' icon={<FontAwesomeIcon icon={faStethoscope} />}>
                    <NavLink to="/consultation">Consultation</NavLink>
                </Menu.Item>
                <Menu.Item key='5' icon={<FontAwesomeIcon icon={faFlask} />}>
                    <NavLink to="/bilan">Bilan</NavLink>
                </Menu.Item>
                <Menu.Item key='6' icon={<FontAwesomeIcon icon={faPills} />}>
                    <NavLink to="/medicament">Medicament</NavLink>
                </Menu.Item>
                <Menu.Item key='7' icon={<FontAwesomeIcon icon={faChartLine} />}>
                    <NavLink to="/statistiques">Statistiques</NavLink>
                </Menu.Item>
                <Menu.Item key='8' icon={<FontAwesomeIcon icon={faCreditCard} />}>
                    <NavLink to="/paiement">Paiment</NavLink>
                </Menu.Item>
                <Menu.Item key='9' icon={<FontAwesomeIcon icon={faSignOutAlt} />}>
                    <NavLink to="/logout">LogOut</NavLink>
                </Menu.Item>
            </Menu>
        </>
    );
};

export default Sidebar;*/



