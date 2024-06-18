import React, { useRef, useState } from 'react';
import { Form, Button, Checkbox, Row, Col, Layout, Input, message } from 'antd';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import PrintableBilan from '../components/PrintableBilan';

const { Header, Content } = Layout;

const Bilan = ({ nDossier, patientInfo = { nom: '', prenom: '', n_dossier: '' } }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const printRef = useRef();
  const [bilanValues, setBilanValues] = useState({});

  const handleCheckboxChange = (item, checked) => {
    setBilanValues(prevValues => ({
      ...prevValues,
      [item.toLowerCase().replace(/ /g, '_')]: checked
    }));
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/bilan', {
        ...values,
        n_dossier: nDossier,
      });
      message.success('Bilan enregistré avec succès');
      form.resetFields();
      setBilanValues(values); // Set bilan values after successful save
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du bilan:', error.message);
      message.error('Échec de l\'enregistrement du bilan');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const bilanItems = [
    'Groupage', 'FNS', 'Glycémie', 'Créatininémie', 'Urée', 'Sérologie', 'TCK - TP - INR', 
    'Fibrinogène', 'Ionogramme sanguin', 'Bilan hépatite', 'LDH', 'Bilan lipidique', 
    'Lipasémie', 'Calcémie', 'Phosphorémie', 'TSH', 'T3 - T4', 'Thyrocalcitonine', 
    'Ac anti-thyroglobuline', 'PSA', 'Marqueur tumoral', 'CRP - VS', 'Fer sérique', 
    'Ferritine', 'Troponines', 'Bilan protidine', 'FSH - LH', 'Taux de prolactine', 
    'Progestérone', 'Oestrogènes', 'Testostérone', 'Beta HCG', 'Vitamine D', 
    'Chimie des urines', 'ECBU', 'Bilan inflammatoire', 'HBAIC', 'D-Dimêtres', 'Acide urique', 
    'Autre'
  ];

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <Layout>
      <Header style={{ backgroundColor: '#45c1b3', color: '#fff', textAlign: 'center', padding: '10px 0' , borderTopRightRadius: '12px' , borderTopLeftRadius:'12px', display: 'flex', alignItems: 'center', height:'50px'}}>
        <h1 style={{ margin: '0 auto' }}>Bilan Médical</h1>
      </Header>
      <Content style={{ padding: '20px', background: '#fff' }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          {...layout}
        >
          <Row >
            {bilanItems.map((item, index) => (
              <Col span={6} key={index}>
                <Form.Item
                  name={item.toLowerCase().replace(/ /g, '_')}
                  valuePropName="checked"
                >
                  <Checkbox onChange={(e) => handleCheckboxChange(item, e.target.checked)}>{item}</Checkbox>
                </Form.Item>
              </Col>
            ))}
            <Col span={24}>
              <Form.Item name="autre">
                <Input.TextArea placeholder="Autre" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ backgroundColor: '#45c1b3', borderColor: '#45c1b3' }}
            >
              Enregistrer
            </Button>
            <Button
              type="default"
              onClick={handlePrint}
              style={{ marginLeft: '10px' }}
            >
              Imprimer
            </Button>
          </Form.Item>
        </Form>

        <div style={{ display: 'none' }}>
          <PrintableBilan ref={printRef} patientInfo={patientInfo} bilanValues={bilanValues} allBilanItems={bilanItems} />
        </div>
      </Content>
    </Layout>
  );
};

export default Bilan;