import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Popconfirm, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
//import { useNavigate } from 'react-router-dom';
import { useHistory, useParams } from 'react-router-dom';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Patients = () => {
    //const navigate = useNavigate();
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

   /* const handleConsulation = (n_dossier, nom, prenom) => {
        // Navigate to the patient's consultation page
        navigate(`/consultation/${n_dossier}`, { state: { nom, prenom, n_dossier } });
    };*/


    const handleConsulation = (n_dossier, nom, prenom) => {
        // Navigate to the patient's consultation page and pass patient details in state
        history.push(`/consultation/${n_dossier}`, { n_dossier, nom, prenom });
    };
    
    
    
    

    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };


     // Function to handle form submission
     const onFinish = async (values) => {
        try {
            let response;
            if (selectedPatient) {
                // If selectedPatient is not null, it means we are editing an existing patient
                response = await fetch(`http://localhost:5000/patient/${selectedPatient.n_dossier}`, {
                    method: "PUT", // Use PUT method for updating existing patient
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values)
                });
            } else {
                // If selectedPatient is null, it means we are adding a new patient
                response = await fetch("http://localhost:5000/patient", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values)
                });
            }
            if (response.ok) {
                const updatedPatient = await response.json();
                if (selectedPatient) {
                    // If editing existing patient, update the patients array with the modified patient
                    const updatedPatients = patients.map(patient => {
                        if (patient.n_dossier === updatedPatient.n_dossier) {
                            return updatedPatient;
                        } else {
                            return patient;
                        }
                    });
                    setPatients(updatedPatients);
                } else {
                    // If adding new patient, append the new patient to the patients array
                    setPatients([...patients, updatedPatient]);
                }
                closeModal(); // Close modal after successful submission
            } else {
                console.error('Failed to add/update patient:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to add/update patient:', error.message);
        }
    };
    



    // Function to calculate age based on date of birth
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

    // Function to handle edit patient
    const handleEditPatient = (patient) => {
        setSelectedPatient(patient);
        setIsModalVisible(true);
        form.setFieldsValue(patient);
    };

    // Function to handle delete patient
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
        { title: 'N_dossier', dataIndex: 'n_dossier', key: 'n_dossier' },
        { title: 'Nom', dataIndex: 'nom', key: 'nom' },
        { title: 'Prénom', dataIndex: 'prenom', key: 'prenom' },
        { title: 'Âge', dataIndex: 'age', key: 'age' },
        { title: 'Téléphone', dataIndex: 'telephone', key: 'telephone' },
        { 
            title: 'Actions', 
            dataIndex: 'actions', 
            key: 'actions', 
            render: (_, record) => (
                <>
                                        
                    <Button icon={<FontAwesomeIcon icon={faStethoscope} />} style={{marginRight:10}} onClick={() => handleConsulation(record.n_dossier, record.nom , record.prenom)}>Consulter</Button>
                    <Button icon={<EditOutlined />} style={{marginRight:10}} onClick={() => handleEditPatient(record)}>Modifier</Button>
                    <Popconfirm
                        title="Êtes-vous sûr de vouloir supprimer ce patient ?"
                        onConfirm={() => handleDeletePatient(record.n_dossier)}
                        okText="Oui"
                        cancelText="Non"
                    >
                        <Button icon={<DeleteOutlined />} danger >Supprimer</Button>
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
                style={{ width: 300, marginBottom: 16 , marginRight:100}}
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
                    <Form.Item label="Âge" name="age" rules={[{ required: true, message: 'Veuillez entrer l\'age du patient!' }]}>
                        <Input type='number'/> 
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

export default Patients;
