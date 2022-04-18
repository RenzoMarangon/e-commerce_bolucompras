import React,{ useEffect } from 'react'
import TextField from '@mui/material/TextField';

import { Button } from '@mui/material';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FormContact = () => {


  return (
    <div className='formContact-container'>
        <form>
            <TextField className='formContact-container__input' id="outlined-nombre-input" label="Nombre" type="text" autoComplete="current-name" required />
            <TextField className='formContact-container__input' id="outlined-apellido-input" label="Apellido" type="text" autoComplete="current-apellido" />
            <TextField className='formContact-container__input' id="outlined-asunto-input" label="Asunto" type="text" required />
            <TextField className='formContact-container__input' id="outlined-email-input" label="Mail" type="email" autoComplete="current-email" required />
            <TextField className='formContact-container__input' id="outlined-asunto-input" label="Asunto" type="text" required />
            <Button startIcon={ <FontAwesomeIcon icon={ faPaperPlane } /> }  className='formContact-container__input' type='submit'>Enviar </Button>
            
        </form>
    </div>
  )
}

export default FormContact