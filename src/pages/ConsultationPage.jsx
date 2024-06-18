import React, { useState } from 'react';
import { Input, Button, Form, message, Row, Col } from 'antd';
import axios from 'axios';

const ConsultationPage = ({ nDossier, onConsultationSaved }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:5174/consultation', {
                ...values,
                n_dossier: nDossier,
            });
            message.success('Consultation enregistrée avec succès');
            form.resetFields();
            // Pass the consultation ID back to the parent component
            if (response.data && response.data.consultationId) {
                onConsultationSaved(response.data.consultationId);
            }
        } catch (error) {
            console.error('Erreur lors de l\'enregistrement de la consultation:', error.message);
            message.error('Échec de l\'enregistrement de la consultation');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            style={{ padding: '20px', background: '#fff', borderRadius: '8px' }}
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label="Motif De consultation"
                        name="motif_consultation"
                    >
                        <Input placeholder="Motif De consultation" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="État général"
                        name="etat_general"
                    >
                        <Input placeholder="État général" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label="Taille"
                        name="taille"
                    >
                        <Input placeholder="Taille" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Poids"
                        name="poids"
                    >
                        <Input placeholder="Poids" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label="Pression Artérielle"
                        name="pression_arterielle"
                    >
                        <Input placeholder="Pression Artérielle" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Abdominal"
                        name="abdominal"
                    >
                        <Input placeholder="Abdominal" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>  
                <Col span={12}>
                    <Form.Item
                        label="Glycémie"
                        name="glycemie"
                    >
                        <Input placeholder="Glycémie" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Urée"
                        name="uree"
                    >
                        <Input placeholder="Urée" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label="Créatinine"
                        name="crea"
                    >
                        <Input placeholder="Créatinine" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="FNS"
                        name="fns"
                    >
                        <Input placeholder="FNS" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>  
                <Col span={12}>
                    <Form.Item
                        label="CRP"
                        name="crp"
                    >
                        <Input placeholder="CRP" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Échographie"
                        name="echographie"
                    >
                        <Input placeholder="Échographie" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label="TDM"
                        name="tdm"
                    >
                        <Input placeholder="TDM" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="IRM"
                        name="irm"
                    >
                        <Input placeholder="IRM" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label="Autres"
                        name="autres"
                    >
                        <Input.TextArea placeholder="Autres" />
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
            </Form.Item>
        </Form>
    );
};

export default ConsultationPage;