import React, { forwardRef } from 'react';
import { Row, Col } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const PrintableBilan = forwardRef(({ patientInfo, bilanValues }, ref) => {
  const today = dayjs().format('DD/MM/YYYY');

  const allBilanItems = [
    'Groupage', 'FNS', 'Glycémie', 'Créatininémie', 'Urée', 'Sérologie', 'TCK - TP - INR', 
    'Fibrinogène', 'Ionogramme sanguin', 'Bilan hépatite', 'LDH', 'Bilan lipidique', 
    'Lipasémie', 'Calcémie', 'Phosphorémie', 'TSH', 'T3 - T4', 'Thyrocalcitonine', 
    'Ac anti-thyroglobuline', 'PSA', 'Marqueur tumoral', 'CRP - VS', 'Fer sérique', 
    'Ferritine', 'Troponines', 'Bilan protidine', 'FSH - LH', 'Taux de prolactine', 
    'Progestérone', 'Oestrogènes', 'Testostérone', 'Beta HCG', 'Vitamine D', 
    'Chimie des urines', 'ECBU', 'Bilan inflammatoire', 'HBAIC', 'D-Dimêtres', 'Acide urique', 
    'Autre'
  ];

  const chunkArray = (array, size) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  };

  const bilansGrouped = chunkArray(allBilanItems, 3);

  return (
    <div ref={ref} style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <EnvironmentOutlined style={{ marginRight: '5px' }} />
          <span>Hay En Nasr Radar Zone 11 N 973-CHLEF</span>
          <PhoneOutlined style={{ marginLeft: '20px', marginRight: '5px' }} />
          <span>027778383</span>
          <MailOutlined style={{ marginLeft: '20px', marginRight: '5px' }} />
          <span>clinique.ennasr.chlef@gmail.com</span>
        </div>
        <div style={{ marginTop: '10px' }}>
          <strong>Date:</strong> {today}
        </div>
      </div>

 

      <h3 style={{ textAlign: 'center' }}>DEMANDE DE BILAN BIOLOGIQUE</h3>

      {bilansGrouped.map((bilanGroup, index) => (
        <Row gutter={[16, 16]} key={index}>
          {bilanGroup.map((item, itemIndex) => (
            <Col span={8} key={itemIndex}>
              <li>
                <input
                  type="checkbox"
                  checked={bilanValues[item.toLowerCase().replace(/ /g, '_')]}
                  disabled
                />
                <label style={{ marginLeft: '5px' }}>{item}</label>
              </li>
            </Col>
          ))}
        </Row>
      ))}

      {bilanValues.autre && (
        <>
          <h3>Autre</h3>
          <p>{bilanValues.autre}</p>
        </>
      )}
    </div>
  );
});

export default PrintableBilan;