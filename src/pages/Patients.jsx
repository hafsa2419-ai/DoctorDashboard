/*

import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, Popconfirm, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router-dom';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Patients = () => {
    const history = useHistory();
    const params = useParams();

    const [patients, setPatients] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await fetch("http://localhost:5000/patient");
            if (response.ok) {
                const data = await response.json();
                setPatients(data);
            } else {
                console.error('Failed to fetch patients:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to fetch patients:', error.message);
        }
    };

    const handleConsulation = (n_dossier, nom, prenom) => {
        history.push(`/consultation/${n_dossier}`, { n_dossier, nom, prenom });
    };

    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        form.resetFields();
        setSelectedPatient(null);
    };

    const calculateAge = (dateOfBirth) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const onFinish = async (values) => {
        let { date_naissance } = values;

        // Vérifiez si la date est uniquement une année
        if (/^\d{4}$/.test(date_naissance)) {
            date_naissance = `${date_naissance}-01-01`; // Complétez avec le 1er janvier
        }

        const age = calculateAge(date_naissance);
        values.date_naissance = date_naissance;
        values.age = age;

        try {
            let response;
            if (selectedPatient) {
                response = await fetch(`http://localhost:5000/patient/${selectedPatient.n_dossier}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values)
                });
            } else {
                response = await fetch("http://localhost:5000/patient", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values)
                });
            }
            if (response.ok) {
                const updatedPatient = await response.json();
                if (selectedPatient) {
                    const updatedPatients = patients.map(patient => {
                        if (patient.n_dossier === updatedPatient.n_dossier) {
                            return updatedPatient;
                        } else {
                            return patient;
                        }
                    });
                    setPatients(updatedPatients);
                } else {
                    setPatients([...patients, updatedPatient]);
                }
                closeModal();
            } else {
                console.error('Failed to add/update patient:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to add/update patient:', error.message);
        }
    };

    const handleEditPatient = (patient) => {
        setSelectedPatient(patient);
        setIsModalVisible(true);
        form.setFieldsValue(patient);
    };

    const handleDeletePatient = async (n_dossier) => {
        try {
            const response = await fetch(`http://localhost:5000/patient/${n_dossier}?confirmDeletion=true`, {
                method: "DELETE"
            });
            if (response.ok) {
                fetchPatients();
                message.success('Patient supprimé avec succès');
            } else {
                console.error('Échec de la suppression du patient:', response.statusText);
                message.error('Échec de la suppression du patient:');
            }
        } catch (error) {
            console.error('Échec de la suppression du patient:', error.message);
            message.error('Échec de la suppression du patient:');
        }
    };

    const filteredPatients = patients.filter(patient =>
        patient.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.prenom.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const columns = [
        { title: 'N_dossier', dataIndex: 'n_dossier', key: 'n_dossier', align: 'center' },
        { title: 'Nom', dataIndex: 'nom', key: 'nom', align: 'center' },
        { title: 'Prénom', dataIndex: 'prenom', key: 'prenom', align: 'center' },
        { title: 'Date de Naissance', dataIndex: 'date_naissance', key: 'date_naissance', align: 'center' ,render: (text) => new Date(text).toLocaleDateString() },
        { title: 'Âge', dataIndex: 'age', key: 'age', align: 'center' },
        { title: 'Sexe', dataIndex: 'sexe', key: 'sexe', align: 'center' },
        { title: 'Téléphone', dataIndex: 'telephone', key: 'telephone', align: 'center' },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            align: 'center',
            render: (_, record) => (
                <>
                    <Button icon={<FontAwesomeIcon icon={faStethoscope} />} style={{ marginRight: 10 }} onClick={() => handleConsulation(record.n_dossier, record.nom, record.prenom)}>Consulter</Button>
                    <Button icon={<EditOutlined />} style={{ marginRight: 10 }} onClick={() => handleEditPatient(record)}>Modifier</Button>
                    <Popconfirm
                        title="Êtes-vous sûr de vouloir supprimer ce patient ?"
                        onConfirm={() => handleDeletePatient(record.n_dossier)}
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
        <div>
            <Input.Search
                placeholder="Rechercher par nom ou prénom"
                allowClear
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: 300, marginBottom: 16, marginRight: 100 }}
            />
            <Button type="primary" icon={<PlusOutlined />} onClick={openModal}>Ajouter Patient</Button>
            <Table dataSource={filteredPatients} columns={columns} rowKey="n_dossier" />
            <Modal
                title={selectedPatient ? "Modifier Patient" : "Ajouter Nouveau Patient"}
                visible={isModalVisible}
                onCancel={closeModal}
                footer={null}
            >
                <Form form={form} onFinish={onFinish} initialValues={selectedPatient}>
                    <Form.Item label="Nom" name="nom" rules={[{ required: true, message: 'Veuillez entrer le nom du patient!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Prénom" name="prenom" rules={[{ required: true, message: 'Veuillez entrer le prénom du patient!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Date de Naissance" name="date_naissance" rules={[{ required: true, message: 'Veuillez entrer la date de naissance du patient!' }]}>
                        <Input placeholder="YYYY or YYYY-MM-DD" />
                    </Form.Item>
                    <Form.Item label="Sexe" name="sexe" rules={[{ required: true, message: 'Veuillez sélectionner le sexe du patient!' }]}>
                        <Select>
                            <Select.Option value="male">Male</Select.Option>
                            <Select.Option value="female">Female</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Téléphone" name="telephone" rules={[{ required: true, message: 'Veuillez entrer le numéro de téléphone du patient!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button type="primary" htmlType="submit">Valider</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Patients;*/

import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, Popconfirm, message, Tooltip, Row , Col } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UserAddOutlined, FileTextOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { Layout } from 'antd';
const { Header, Content } = Layout;

const Patients = () => {
    const history = useHistory();

    const [patients, setPatients] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await fetch("http://localhost:5000/patient");
            if (response.ok) {
                const data = await response.json();
                setPatients(data);
            } else {
                console.error('Échec de la récupération des patients:', response.statusText);
            }
        } catch (error) {
            console.error('Échec de la récupération des patients:', error.message);
        }
    };

    const handleConsultation = (n_dossier, nom, prenom) => {
        history.push(`/consultation/${n_dossier}`, { n_dossier, nom, prenom });
    };

    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        form.resetFields();
        setSelectedPatient(null);
    };

    const calculateAge = (dateOfBirth) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const onFinish = async (values) => {
        let { date_naissance } = values;

        if (/^\d{4}$/.test(date_naissance)) {
            date_naissance = `${date_naissance}-01-01`;
        }

        const age = calculateAge(date_naissance);
        values.date_naissance = date_naissance;

        if (selectedPatient) {
            const updatedPatient = { ...selectedPatient, ...values, age };

            try {
                const response = await fetch(`http://localhost:5000/patient/${selectedPatient.n_dossier}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedPatient),
                });

                if (response.ok) {
                    setPatients((prevPatients) =>
                        prevPatients.map((patient) =>
                            patient.n_dossier === selectedPatient.n_dossier ? updatedPatient : patient
                        )
                    );
                    closeModal();
                    message.success('Patient mis à jour avec succès');
                } else {
                    console.error('Échec de la mise à jour du patient:', response.statusText);
                    message.error('Échec de la mise à jour du patient');
                }
            } catch (error) {
                console.error('Échec de la mise à jour du patient:', error.message);
                message.error('Échec de la mise à jour du patient');
            }
        } else {
            try {
                const response = await fetch('http://localhost:5000/patient', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (response.ok) {
                    const newPatient = await response.json();
                    newPatient.age = age;
                    setPatients((prevPatients) => [...prevPatients, newPatient]);
                    closeModal();
                    message.success('Patient ajouté avec succès');
                } else {
                    console.error('Échec de l\'ajout du patient:', response.statusText);
                    message.error('Échec de l\'ajout du patient');
                }
            } catch (error) {
                console.error('Échec de l\'ajout du patient:', error.message);
                message.error('Échec de l\'ajout du patient');
            }
        }
    };

    const onEdit = (patient) => {
        setSelectedPatient(patient);
        form.setFieldsValue({
            ...patient,
            date_naissance: patient.date_naissance.split('T')[0],
        });
        openModal();
    };

    const onDelete = async (n_dossier) => {
        try {
            const response = await fetch(`http://localhost:5000/patient/${n_dossier}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setPatients((prevPatients) =>
                    prevPatients.filter((patient) => patient.n_dossier !== n_dossier)
                );
                message.success('Patient supprimé avec succès');
            } else {
                console.error('Échec de la suppression du patient:', response.statusText);
                message.error('Échec de la suppression du patient');
            }
        } catch (error) {
            console.error('Échec de la suppression du patient:', error.message);
            message.error('Échec de la suppression du patient');
        }
    };

    const onSearch = (value) => {
        setSearchQuery(value);
    };

    const filteredPatients = patients.filter((patient) =>
        Object.values(patient).some(
            (val) =>
                val &&
                val.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    const handleAddToWaitingList = async (n_dossier) => {
        try {
            const response = await fetch("http://localhost:5000/waiting-list", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ n_dossier })
            });

            if (response.ok) {
                message.success('Patient ajouté à la liste d\'attente');
            } else {
                console.error('Échec de l\'ajout du patient à la liste d\'attente:', response.statusText);
                message.error('Échec de l\'ajout du patient à la liste d\'attente');
            }
        } catch (error) {
            console.error('Échec de l\'ajout du patient à la liste d\'attente:', error.message);
            message.error('Échec de l\'ajout du patient à la liste d\'attente');
        }
    };

    const columns = [
        { title: 'N_dossier', dataIndex: 'n_dossier', key: 'n_dossier', align: 'center' },
        { title: 'Nom', dataIndex: 'nom', key: 'nom', align: 'center' },
        { title: 'Prénom', dataIndex: 'prenom', key: 'prenom', align: 'center' },
        { title: 'Date de Naissance', dataIndex: 'date_naissance', key: 'date_naissance', align: 'center', render: (text) => new Date(text).toLocaleDateString() },
        { title: 'Âge', dataIndex: 'age', key: 'age', align: 'center' },
        { title: 'Sexe', dataIndex: 'sexe', key: 'sexe', align: 'center' },
        { title: 'Téléphone', dataIndex: 'telephone', key: 'telephone', align: 'center' },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            align: 'center',
            render: (_, record) => (
                <span>
                    <Tooltip title="Consulter">
                        <Button icon={<FontAwesomeIcon icon={faStethoscope} onClick={() => handleConsultation(record.n_dossier, record.nom, record.prenom)} />} />
                    </Tooltip>
                    <Tooltip title="Ajouter à la liste d'attente">
                        <Button icon={<UserAddOutlined />} onClick={() => handleAddToWaitingList(record.n_dossier)} style={{ marginLeft: 5 }} />
                    </Tooltip>
                    <Tooltip title="Modifier">
                        <Button icon={<EditOutlined />} onClick={() => onEdit(record)} style={{ marginLeft: 5 }} />
                    </Tooltip>
                    <Tooltip title="Supprimer">
                        <Popconfirm
                            title="Êtes-vous sûr de vouloir supprimer ce patient?"
                            onConfirm={() => onDelete(record.n_dossier)}
                            okText="Oui"
                            cancelText="Non"
                        >
                            <Button icon={<DeleteOutlined />} danger style={{ marginLeft: 5 }} />
                        </Popconfirm>
                    </Tooltip>
                    
                    
                </span>
            )
        }
    ];

    return (
        <Layout>
            <Header style={{ backgroundColor: '#45c1b3', color: '#fff', textAlign: 'center', padding: '10px 0', borderTopRightRadius: '12px', borderTopLeftRadius: '12px', display: 'flex', alignItems: 'center', height: '50px' }}>
                <h1 style={{ margin: '0 auto' }}>Liste des patients</h1>
            </Header>

            <Content style={{ padding: '20px', background: '#fff' }}>
            <Row gutter={16} justify="start">
                    <Col>
                        <Input.Search
                            placeholder="Rechercher des patients..."
                            onSearch={onSearch}
                            style={{ marginBottom: 16, width: 300 }}
                        />
                    </Col>
                    <Col>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={openModal}
                            style={{ marginBottom: 16 }}
                        >
                            Ajouter Patient
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            type="default"
                            onClick={() => history.push('/waiting-list')}
                            style={{ marginBottom: 16 , marginLeft:575}}
                        >
                            Voir Liste d'Attente
                        </Button>
                    </Col>
                </Row>
    
                    <Table dataSource={filteredPatients} columns={columns} rowKey="n_dossier" />
    
                    <Modal
                        title={selectedPatient ? 'Modifier Patient' : 'Ajouter Patient'}
                        visible={isModalVisible}
                        onCancel={closeModal}
                        footer={[
                            <Button key="cancel" onClick={closeModal}>
                                Annuler
                            </Button>,
                            <Button key="submit" type="primary" onClick={() => form.submit()}>
                                Enregistrer
                            </Button>
                        ]}
                    >
                        <Form form={form} onFinish={onFinish} layout="vertical">
                            <Form.Item name="nom" label="Nom" rules={[{ required: true, message: 'Veuillez entrer le nom du patient' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="prenom" label="Prénom" rules={[{ required: true, message: 'Veuillez entrer le prénom du patient' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="date_naissance" label="Date de Naissance" rules={[{ required: true, message: 'Veuillez entrer la date de naissance du patient' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="sexe" label="Sexe" rules={[{ required: true, message: 'Veuillez sélectionner le sexe du patient' }]}>
                                <Select>
                                    <Select.Option value="male">male</Select.Option>
                                    <Select.Option value="female">female</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name="telephone" label="Téléphone" rules={[{ required: true, message: 'Veuillez entrer le numéro de téléphone du patient' }]}>
                                <Input />
                            </Form.Item>
                        </Form>
                    </Modal>
                </Content>
            </Layout>
        );
    };
    
    export default Patients;


