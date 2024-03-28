import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

const Patients = () => {
    const [patients, setPatients] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Function to handle adding a new patient
    const handleAddPatient = (values) => {
        const dateNaissance = values.dateNaissance.format('YYYY-MM-DD');
        const age = moment().diff(dateNaissance, 'years');
        const newPatient = { id: patients.length + 1, age, ...values };
        setPatients([...patients, newPatient]);
        setIsModalVisible(false);
    };

    // Function to handle removing a patient
    const handleRemovePatient = (id) => {
        setPatients(patients.filter(patient => patient.id !== id));
    };

    // Columns configuration for the table
    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Nom', dataIndex: 'nom', key: 'nom' },
        { title: 'Prénom', dataIndex: 'prenom', key: 'prenom' },
        { title: 'Âge', dataIndex: 'age', key: 'age' },
        { title: 'Actions', dataIndex: 'actions', key: 'actions', render: (_, record) => (
            <>
                <Button icon={<EditOutlined />} onClick={() => handleEditPatient(record)}>Modifier</Button>
                <Button icon={<DeleteOutlined />} onClick={() => handleRemovePatient(record.id)} danger>Supprimer</Button>
            </>
        )}
    ];

    // Form layout
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };

    return (
        <div>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>Ajouter Patient</Button>
            <Table dataSource={patients} columns={columns} />

            <Modal
                title="Ajouter Nouveau Patient"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form {...layout} onFinish={handleAddPatient}>
                    <Form.Item label="Nom" name="nom" rules={[{ required: true, message: 'Veuillez entrer le nom du patient!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Prénom" name="prenom" rules={[{ required: true, message: 'Veuillez entrer le prénom du patient!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Date de Naissance" name="dateNaissance" rules={[{ required: true, message: 'Veuillez entrer la date de naissance du patient!' }]}>
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button type="primary" htmlType="submit">Ajouter Patient</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Patients;



