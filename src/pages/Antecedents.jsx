import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { Button, message } from 'antd';
import axios from 'axios';

const Antecedents = () => {
    const [Familiaux, setFamiliaux] = useState('');
    const [Chirurgicaux, setChirurgicaux] = useState('');
    const [Medicaux, setMedicaux] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/type-antecedents', {
                Familiaux,
                Chirurgicaux,
                Medicaux
            });
            message.success('Antécédents enregistrés avec succès');
            setFamiliaux('');
            setChirurgicaux('');
            setMedicaux('');
            console.log('Antécédents enregistrés avec succès');
        } catch (error) {
            console.error('Error saving antecedents:', error);
            message.error('Une erreur s\'est produite lors de l\'enregistrement des antécédents');
        }
    };

    return (
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <div style={{ display: 'flex', gap: '10px' }}>
                <TextField style={{marginTop :'20px' , marginLeft:'10px'}}
                    label="Familiaux"
                    variant="outlined"
                    fullWidth
                    multiline
                    value={Familiaux}
                    onChange={(e) => setFamiliaux(e.target.value)}
                    InputProps={{
                        style: {
                            height: '200px', // Increased height to allow more content
                            padding: '15px', // Adjust padding to center text vertically
                        },
                    }}
                />

                <TextField style={{marginTop :'20px'}}
                    label="Chirurgicaux"
                    variant="outlined"
                    fullWidth
                    multiline
                    value={Chirurgicaux}
                    onChange={(e) => setChirurgicaux(e.target.value)}
                    InputProps={{
                        style: {
                            height: '200px', // Increased height to allow more content
                            padding: '15px', // Adjust padding to center text vertically
                        },
                    }}
                />

                <TextField style={{marginTop :'20px', marginRight:'10px'}}
                    label="Médicaux"
                    variant="outlined"
                    fullWidth
                    multiline
                    value={Medicaux}
                    onChange={(e) => setMedicaux(e.target.value)}
                    InputProps={{
                        style: {
                            height: '200px', // Increased height to allow more content
                            padding: '15px', // Adjust padding to center text vertically
                        },
                    }}
                />
            </div>
            <Button type="primary" htmlType="submit" style={{marginTop :'20px', marginLeft:'1050px'}}>Enregistrer</Button>
        </form>
    );
};

export default Antecedents;