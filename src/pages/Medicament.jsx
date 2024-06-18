import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Popconfirm, message, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
const { Header, Content } = Layout;

const { Option } = Select;

const Medicament = () => {
    const [medicaments, setMedicaments] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [selectedMedicament, setSelectedMedicament] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchMedicaments();
    }, []);

    const fetchMedicaments = async () => {
        try {
            const response = await fetch("http://localhost:5000/medicament");
            if (response.ok) {
                const data = await response.json();
                setMedicaments(data);
            } else {
                console.error('Failed to fetch medicaments:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to fetch medicaments:', error.message);
        }
    };

    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        form.resetFields();
        setSelectedMedicament(null);
    };

    const onFinish = async (values) => {
        try {
            let response;
            if (selectedMedicament) {
                response = await fetch(`http://localhost:5000/medicament/${selectedMedicament.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values)
                });
            } else {
                response = await fetch("http://localhost:5000/medicament", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values)
                });
            }
            if (response.ok) {
                fetchMedicaments();
                closeModal();
            } else {
                console.error('Failed to add/update medicament:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to add/update medicament:', error.message);
        }
    };

    const handleEditMedicament = (medicament) => {
        setSelectedMedicament(medicament);
        setIsModalVisible(true);
        form.setFieldsValue(medicament);
    };

    const handleDeleteMedicament = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/medicament/${id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                fetchMedicaments();
                message.success('Médicament supprimé avec succès');
            } else {
                console.error('Échec de la suppression du médicament:', response.statusText);
                message.error('Échec de la suppression du médicament');
            }
        } catch (error) {
            console.error('Échec de la suppression du médicament:', error.message);
            message.error('Échec de la suppression du médicament');
        }
    };

    const filteredMedicaments = medicaments.filter(medicament =>
        medicament.designation.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Désignation', dataIndex: 'designation', key: 'designation' },
        { title: 'Dosage', dataIndex: 'dosage', key: 'dosage' },
        { title: 'Forme', dataIndex: 'forme', key: 'forme' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button icon={<EditOutlined />} style={{ marginRight: 10 }} onClick={() => handleEditMedicament(record)}>Modifier</Button>
                    <Popconfirm
                        title="Êtes-vous sûr de vouloir supprimer ce médicament ?"
                        onConfirm={() => handleDeleteMedicament(record.id)}
                        okText="Oui"
                        cancelText="Non"
                    >
                        <Button icon={<DeleteOutlined />} danger>Supprimer</Button>
                    </Popconfirm>
                </>
            )
        }
    ];

    return (
        <Layout>
            <Header style={{ backgroundColor: '#45c1b3', color: '#fff', textAlign: 'center', padding: '10px 0', borderTopRightRadius: '12px', borderTopLeftRadius: '12px', display: 'flex', alignItems: 'center', height: '50px' }}>
                <h1 style={{ margin: '0 auto' }}>Gestion des Médicaments</h1>
            </Header> 
            <Content style={{ padding: '20px', background: '#fff' }}>          
                <Input.Search
                    placeholder="Rechercher par désignation"
                    allowClear
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: 300, marginBottom: 16 , marginRight:100}}
                />
                <Button type="primary" icon={<PlusOutlined />} onClick={openModal}>Ajouter Médicament</Button>
                <Table dataSource={filteredMedicaments} columns={columns} rowKey="id" />
                <Modal
                title={selectedMedicament ? "Modifier Médicament" : "Ajouter Nouveau Médicament"}
                visible={isModalVisible}
                onCancel={closeModal}
                footer={null}
                >
                <Form form={form} onFinish={onFinish} initialValues={selectedMedicament}>
                    <Form.Item label="Désignation" name="designation" rules={[{ required: true, message: 'Veuillez entrer la désignation du médicament!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Dosage" name="dosage" rules={[{ required: true, message: 'Veuillez entrer le dosage du médicament!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Forme" name="forme" rules={[{ required: true, message: 'Veuillez sélectionner la forme du médicament!' }]}>
                        <Select placeholder="Sélectionnez la forme">
                            <Option value="Capsule">Capsule</Option>
                            <Option value="Comprimé">Comprimé</Option>
                            <Option value="Crème">Crème</Option>
                            <Option value="Gel">Gel</Option>
                            <Option value="Gélule">Gélule</Option>
                            <Option value="Gouttes auriculaires">Gouttes auriculaires</Option>
                            <Option value="Gouttes nasales">Gouttes nasales</Option>
                            <Option value="Gouttes oculaires">Gouttes oculaires</Option>
                            <Option value="Granules">Granules</Option>
                            <Option value="Implant">Implant</Option>
                            <Option value="Lotion">Lotion</Option>
                            <Option value="Patch">Patch</Option>
                            <Option value="Pastille">Pastille</Option>
                            <Option value="Pommade">Pommade</Option>
                            <Option value="Poudre">Poudre</Option>
                            <Option value="Sirop">Sirop</Option>
                            <Option value="Solution">Solution</Option>
                            <Option value="Suspension">Suspension</Option>
                            <Option value="Suppositoire">Suppositoire</Option>
                            <Option value="Élixir">Élixir</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Description" name="description" rules={[{ required: false, message: 'Veuillez entrer la description du médicament!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button type="primary" htmlType="submit">Valider</Button>
                    </Form.Item>
                </Form>
                </Modal>
            </Content>
        </Layout>
    );
};

export default Medicament;
