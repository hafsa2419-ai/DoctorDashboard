/*import React, { useState, useEffect } from 'react';
import { Select, Space, Button, message } from 'antd';
import axios from 'axios';

const Antecedents = ({ nDossier }) => {
    const [familiaux, setFamiliaux] = useState([]);
    const [chirurgicaux, setChirurgicaux] = useState([]);
    const [medicaux, setMedicaux] = useState([]);
    const [selectedFamiliaux, setSelectedFamiliaux] = useState([]);
    const [selectedChirurgicaux, setSelectedChirurgicaux] = useState([]);
    const [selectedMedicaux, setSelectedMedicaux] = useState([]);

    useEffect(() => {
        fetchFamiliaux();
        fetchChirurgicaux();
        fetchMedicaux();
    }, []);

    const fetchFamiliaux = async () => {
        try {
            const response = await axios.get('http://localhost:5000/familiaux');
            setFamiliaux(response.data);
        } catch (error) {
            console.error('Failed to fetch familiaux:', error.message);
        }
    };

    const fetchChirurgicaux = async () => {
        try {
            const response = await axios.get('http://localhost:5000/chirurgicaux');
            setChirurgicaux(response.data);
        } catch (error) {
            console.error('Failed to fetch chirurgicaux:', error.message);
        }
    };

    const fetchMedicaux = async () => {
        try {
            const response = await axios.get('http://localhost:5000/medicaux');
            setMedicaux(response.data);
        } catch (error) {
            console.error('Failed to fetch medicaux:', error.message);
        }
    };

    const handleAntecedentSave = async () => {
    // Combine selected antecedents from all categories
    const selectedAntecedents = [
        ...selectedFamiliaux,
        ...selectedChirurgicaux,
        ...selectedMedicaux
    ];

    console.log('nDossier:', nDossier);
    console.log('Selected Antecedents:', selectedAntecedents);


    try {
        // Check if there are no selected antecedents and no patient dossier number
        if (selectedAntecedents.length === 0 && !nDossier) {
            message.warning('Please select at least one antecedent or ensure the patient dossier number is set');
            return; // Exit early if no antecedents are selected and no dossier number
        }

        // If there are selected antecedents, save them
        if (selectedAntecedents.length > 0) {
            await axios.post('http://localhost:5000/antecedents', {
                n_dossier: nDossier,
                antecedent_ids: selectedAntecedents,
            });
            message.success('Antecedents saved successfully');
        } else {
            message.warning('No antecedents selected');
        }
    } catch (error) {
        console.error('Failed to save antecedents:', error.message);
        message.error('Failed to save antecedents');
    }
};


    const convertToOptions = (data) => data.map(item => ({
        label: item.nom_antecedent,
        value: item.antecedent_id
    }));

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder=" Familiaux"
                options={convertToOptions(familiaux)}
                onChange={(value) => setSelectedFamiliaux(value)}
                maxTagCount="responsive"
            />
            <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder=" Chirurgicaux"
                options={convertToOptions(chirurgicaux)}
                onChange={(value) => setSelectedChirurgicaux(value)}
                maxTagCount="responsive"
            />
            <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder=" Medicaux"
                options={convertToOptions(medicaux)}
                onChange={(value) => setSelectedMedicaux(value)}
                maxTagCount="responsive"
            />
            <Button type="primary" onClick={handleAntecedentSave}>
                Enregistrer Antecedents
            </Button>
        </Space>
    );
};

export default Antecedents;*/
import React, { useState, useEffect } from 'react';
import { Select, Space, Button, message } from 'antd';
import axios from 'axios';

const Antecedents = ({ nDossier }) => {
    const [familiaux, setFamiliaux] = useState([]);
    const [chirurgicaux, setChirurgicaux] = useState([]);
    const [medicaux, setMedicaux] = useState([]);
    const [selectedFamiliaux, setSelectedFamiliaux] = useState([]);
    const [selectedChirurgicaux, setSelectedChirurgicaux] = useState([]);
    const [selectedMedicaux, setSelectedMedicaux] = useState([]);

    useEffect(() => {
        fetchFamiliaux();
        fetchChirurgicaux();
        fetchMedicaux();
    }, []);

    const fetchFamiliaux = async () => {
        try {
            const response = await axios.get('http://localhost:5000/familiaux');
            setFamiliaux(response.data);
        } catch (error) {
            console.error('Failed to fetch familiaux:', error.message);
        }
    };

    const fetchChirurgicaux = async () => {
        try {
            const response = await axios.get('http://localhost:5000/chirurgicaux');
            setChirurgicaux(response.data);
        } catch (error) {
            console.error('Failed to fetch chirurgicaux:', error.message);
        }
    };

    const fetchMedicaux = async () => {
        try {
            const response = await axios.get('http://localhost:5000/medicaux');
            setMedicaux(response.data);
        } catch (error) {
            console.error('Failed to fetch medicaux:', error.message);
        }
    };

    const handleAntecedentSave = async () => {
        // Combine selected antecedents from all categories
        const selectedAntecedents = [
            ...selectedFamiliaux,
            ...selectedChirurgicaux,
            ...selectedMedicaux
        ];

        console.log('nDossier:', nDossier);
        console.log('Selected Antecedents:', selectedAntecedents);

        try {
            // Check if there are no selected antecedents and no patient dossier number
            if (selectedAntecedents.length === 0 && !nDossier) {
                message.warning('Please select at least one antecedent or ensure the patient dossier number is set');
                return; // Exit early if no antecedents are selected and no dossier number
            }

            // If there are selected antecedents, save them
            if (selectedAntecedents.length > 0) {
                await axios.post('http://localhost:5000/antecedents', {
                    n_dossier: nDossier,
                    antecedent_ids: selectedAntecedents,
                });
                message.success('Antecedents saved successfully');
            } else {
                message.warning('No antecedents selected');
            }
        } catch (error) {
            console.error('Failed to save antecedents:', error.message);
            message.error('Failed to save antecedents');
        }
    };

    const handleReset = () => {
        setSelectedFamiliaux([]);
        setSelectedChirurgicaux([]);
        setSelectedMedicaux([]);
    };

    const convertToOptions = (data) => data.map(item => ({
        label: item.nom_antecedent,
        value: item.antecedent_id
    }));

    return (
        <Space direction="vertical" style={{ width: '100%', padding: '20px' }}>
            <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Familiaux"
                options={convertToOptions(familiaux)}
                onChange={(value) => setSelectedFamiliaux(value)}
                value={selectedFamiliaux}
                maxTagCount="responsive"
            />
            <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Chirurgicaux"
                options={convertToOptions(chirurgicaux)}
                onChange={(value) => setSelectedChirurgicaux(value)}
                value={selectedChirurgicaux}
                maxTagCount="responsive"
            />
            <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Medicaux"
                options={convertToOptions(medicaux)}
                onChange={(value) => setSelectedMedicaux(value)}
                value={selectedMedicaux}
                maxTagCount="responsive"
            />
            <Space>
                <Button type="primary" onClick={handleAntecedentSave}>
                    Enregistrer
                </Button>
                <Button onClick={handleReset}>
                    réinitialiser
                </Button>
            </Space>
        </Space>
    );
};

export default Antecedents;

