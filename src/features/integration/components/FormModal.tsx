import React, {useContext, useState} from 'react';
import Modal from 'react-modal';
import {sourceApplications} from "../defaults/DefaultValues";
import {Box, Button, MenuItem, TextField, Typography} from "@mui/material";
import {useHistory} from "react-router-dom";
import {IntegrationContext} from "../../../integrationContext";

function FormModal (){
    let history = useHistory();
    const customStyles = {
        content : {
            width: '40%',
            height: '40%',
            top: '40%',
            left: '40%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#FFFFFF'
        }
    };

    const { destination, sourceApplication, setDestination, setSourceApplication } = useContext(IntegrationContext)

    const [modalIsOpen,setModalIsOpen] = useState(true);

    const cancel = () => {
        history.push({
            pathname: '/',
        })
        setModalIsOpen(false)
    }

    const confirm = () => {
        setModalIsOpen(false)
    }

    return(
        <>
            <Modal isOpen={modalIsOpen} style={customStyles} ariaHideApp={false}>
                <Box sx={{width: '100%'}}>
                    <Typography sx={{mb: 2}}>Velg skjemaleverandør og destinasjon</Typography>
                    <TextField
                        select
                        size="small"
                        sx={{ mb: 3, width: 'inherit' }}
                        value={sourceApplication}
                        label='Skjemaleverandør'
                        onChange={event => setSourceApplication(event.target.value)}
                    >
                        {sourceApplications.map((item: any, index: number) => (
                            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        size="small"
                        sx={{ mb: 3, width: 'inherit' }}
                        value={destination}
                        label='Destinasjon'
                        onChange={event => setDestination(event.target.value)}
                    >
                        {sourceApplications.map((item: any, index: number) => (
                            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        ))}
                    </TextField>
                </Box>
                <div >
                    <Button onClick={cancel} variant="contained">Avbryt</Button>
                    <Button sx={{float: 'right'}} onClick={confirm} variant="contained">Videre</Button>
                </div>


            </Modal>
        </>
    )
}
export default FormModal;