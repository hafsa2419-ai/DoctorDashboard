import { Avatar, Flex, Typography } from 'antd'
import Search from 'antd/es/transfer/search'
import React from 'react'
import {MessageOutlined ,NotificationOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserDoctor ,faBell} from '@fortawesome/free-solid-svg-icons';

const CustomHeader = () => {
  return (
    <Flex align='center' justify='space-between'>
        <Typography.Title level={3} type='secondary'>
          Welcome Doctor    
        </Typography.Title>
        <Flex align='center' gap='3rem'>
            <Search placeholder='Search Dashboard' allowClear/>
            <Flex align='center' gap='10px'>
                <FontAwesomeIcon icon={faBell}  className='header-icon'/>
                <Avatar icon ={<FontAwesomeIcon icon={faUserDoctor} className='user-doctor'/>}/>
            </Flex>
        </Flex>
        
        </Flex>
  )
}

export default CustomHeader