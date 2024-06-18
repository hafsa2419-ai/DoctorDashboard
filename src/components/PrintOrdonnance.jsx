import React from 'react';
import { Typography, List, Row, Col } from 'antd';

const { Title } = Typography;

const PrintOrdonnance = ({ patientInfo, medications }) => {
  return (
    <div className="printable-content">
      <Title level={2}>Ordonnance</Title>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <div>
            <p><strong>Nom: </strong>{patientInfo.nom}</p>
            <p><strong>Prénom: </strong>{patientInfo.prenom}</p>
            <p><strong>Date de naissance: </strong>{patientInfo.dateNaissance}</p>
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
        <Col span={24}>
          <List
            header={<Title level={4}>Médicaments</Title>}
            dataSource={medications}
            renderItem={(item, index) => (
              <List.Item key={index}>
                <List.Item.Meta
                  title={`Médicament ${index + 1}`}
                  description={
                    <>
                      <div>Type: {item.type}</div>
                      <div>Utilisation: {item.utilisation}</div>
                      <div>Durée: {item.duree}</div>
                      <div>Fréquence: {item.frequence}</div>
                      <div>Heure: {item.heure}</div>
                      <div>Note: {item.note}</div>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
};

export default PrintOrdonnance;