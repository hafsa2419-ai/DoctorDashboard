import React from 'react';
import TextField from '@mui/material/TextField';

const Antecedents = () => {
    return (
        <form noValidate autoComplete="off">
            <div style={{ display: 'flex', gap: '10px' }}>
                <TextField style={{marginTop :'20px' , marginLeft:'10px'}}
                    label="Familiaux"
                    variant="outlined"
                    fullWidth
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
                    InputProps={{
                        style: {
                            height: '200px', // Increased height to allow more content
                            padding: '15px', // Adjust padding to center text vertically
                        },
                    }}
                />
            </div>
        </form>
    );
};

export default Antecedents;

