// pages/Login.jsx
/*
import React, { useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css'; // Import your CSS file for styling

const Login = ({ history }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    console.log('Received values:', values);
    setLoading(true);
    
    try {
      // Send login request to backend
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      if (response.ok) {
        // Call the handleLogin function passed as a prop to set the isLoggedIn state to true
        handleLogin(); // Assuming you passed handleLogin as a prop to the Login component
  
        // Navigate to the main content page after successful login
        history.push('/MainContent');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card" title="Login">
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;*/

import React, { useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css'; // Import your CSS file for styling

const Login = ({ history }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    console.log('Received values:', values);
    setLoading(true);
    
    try {
      // Send login request to backend
      const response = await fetch('http://localhost:5000/login', { 
        // Change the endpoint to '/login'
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }
  
      // Navigate to the main content page after successful login
      history.push('/MainContent');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="login-container">
      <Card className="login-card" title="Login">
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;


