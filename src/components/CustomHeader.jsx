import { Avatar, Flex, Typography } from 'antd'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserDoctor ,faBell} from '@fortawesome/free-solid-svg-icons';

const CustomHeader = () => {
  return (
    <Flex align='center' justify='space-between'>
        <Flex align='center' gap='3rem'>
            <Flex align='center' gap='10px'>
                <FontAwesomeIcon icon={faBell}  className='header-icon'/>
                <Avatar icon ={<FontAwesomeIcon icon={faUserDoctor} className='user-doctor'/>}/>
            </Flex>
        </Flex>
        
        </Flex>
  )
}

export default CustomHeader