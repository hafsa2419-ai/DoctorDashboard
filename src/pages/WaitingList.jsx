import React, { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
const { Header, Content } = Layout;

const WaitingList = () => {
    const [waitingList, setWaitingList] = useState([]);

    useEffect(() => {
        fetchWaitingList();
    }, []);

    const fetchWaitingList = async () => {
        try {
            const response = await fetch("http://localhost:5000/waiting-list");
            if (response.ok) {
                const data = await response.json();
                setWaitingList(data);
            } else {
                console.error("Échec de la récupération de la liste d'attente :", response.statusText);
            }
        } catch (error) {
            console.error("Échec de la récupération de la liste d'attente :", error.message);
        }
    };

    const handleRemoveFromWaitingList = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/waiting-list/${id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                fetchWaitingList();
                message.success("Patient retiré de la liste d'attente");
            } else {
                console.error("Échec de la suppression du patient de la liste d'attente", response.statusText);
                message.error("Échec de la suppression du patient de la liste d'attente");
            }
        } catch (error) {
            console.error("Échec de la suppression du patient de la liste d'attente", error.message);
            message.error("Échec de la suppression du patient de la liste d'attente");
        }
    };

    const columns = [
        { title: 'N_dossier', dataIndex: 'n_dossier', key: 'n_dossier', align: 'center' },
        { title: 'Nom', dataIndex: 'nom', key: 'nom', align: 'center' },
        { title: 'Prénom', dataIndex: 'prenom', key: 'prenom', align: 'center' },
        { title: 'Date de Naissance', dataIndex: 'date_naissance', key: 'date_naissance', align: 'center', render: (text) => new Date(text).toLocaleDateString() },
        { title: 'Sexe', dataIndex: 'sexe', key: 'sexe', align: 'center' },
        { title: 'Téléphone', dataIndex: 'telephone', key: 'telephone', align: 'center' },
        { title: 'Date d\'ajout', dataIndex: 'added_date', key: 'added_date', align: 'center', render: (text) => new Date(text).toLocaleString() },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            align: 'center',
            render: (_, record) => (
                <Popconfirm
                    title="Êtes-vous sûr de vouloir retirer ce patient de la liste d'attente ?"
                    onConfirm={() => handleRemoveFromWaitingList(record.id)}
                    okText="Oui"
                    cancelText="Non"
                >
                    <Button icon={<DeleteOutlined />} danger>Retirer</Button>
                </Popconfirm>
            )
        }
    ];

    return (
        <Layout>
            <Header style={{ backgroundColor: '#45c1b3', color: '#fff', textAlign: 'center', padding: '10px 0', borderTopRightRadius: '12px', borderTopLeftRadius: '12px', display: 'flex', alignItems: 'center', height: '50px' }}>
                <h1 style={{ margin: '0 auto' }}>Liste d'attente</h1>
            </Header> 
            <Content style={{ padding: '20px', background: '#fff' }}>          
             <Table dataSource={waitingList} columns={columns} rowKey="id" />
            </Content> 
        </Layout>
    );
};

export default WaitingList;

