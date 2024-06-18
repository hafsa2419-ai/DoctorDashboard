import React, { useState, useEffect } from 'react';
import { Form, InputNumber, Button, Row, Col, Table, Checkbox } from 'antd';

const Paiment = () => {
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [montantAPayer, setMontantAPayer] = useState(0);
  const [versment, setVersment] = useState(0);
  const [resteAPayer, setResteAPayer] = useState(0);
  const [dettes, setDettes] = useState(0);

  // Options de consultation, suivis et tests avec leurs prix
  const options = [
    { key: '1', label: 'Consultation', value: 2000 },
    { key: '2', label: 'Suivis', value: 2000 },
    { key: '3', label: 'Tests', value: 1800 },
    { key: '4', label: 'plàtre', value: 1800 },
  ];

  // Calculer le montant total à payer et le reste à payer
  useEffect(() => {
    const total = selectedKeys.reduce((acc, key) => {
      const option = options.find(option => option.key === key);
      return acc + (option ? option.value : 0);
    }, 0);
    setMontantAPayer(total);
    setResteAPayer(total - versment);
  }, [selectedKeys, versment]);

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (values) => {
    console.log('Form submitted:', values);
  };

  const columns = [
    {
      title: 'Option',
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: 'Prix',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Sélectionner',
      dataIndex: 'select',
      key: 'select',
      render: (_, record) => (
        <Checkbox
          checked={selectedKeys.includes(record.key)}
          onChange={(e) => {
            const { checked } = e.target;
            setSelectedKeys((prevSelectedKeys) => {
              if (checked) {
                return [...prevSelectedKeys, record.key];
              }
              return prevSelectedKeys.filter(key => key !== record.key);
            });
          }}
        />
      ),
    },
  ];

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={16}>
            <Table
              dataSource={options}
              columns={columns}
              pagination={false}
              rowKey="key"
            />
          </Col>
          <Col span={8}>
            <Form.Item label="Montant à payer">
              <InputNumber
                value={montantAPayer}
                disabled
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item label="Versement">
              <InputNumber
                value={versment}
                onChange={(value) => setVersment(value)}
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item label="Reste à payer">
              <InputNumber
                value={resteAPayer}
                disabled
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item label="Dettes">
              <InputNumber
                value={dettes}
                onChange={(value) => setDettes(value)}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end">
          <Col>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Enregistrer
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Paiment;