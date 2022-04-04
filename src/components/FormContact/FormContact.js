import React,{ useEffect } from 'react'
import TextField from '@mui/material/TextField';

import { Button } from '@mui/material';

const FormContact = () => {


  return (
    <div className='formContact-container'>
        <form>


            <TextField id="outlined-nombre-input" label="Nombre" type="text" autoComplete="current-name" required />
            <TextField id="outlined-apellido-input" label="Apellido" type="text" autoComplete="current-apellido" />
            <TextField id="outlined-asunto-input" label="Asunto" type="text" required />
            <TextField id="outlined-email-input" label="Mail" type="email" autoComplete="current-email" required />
            <TextField id="outlined-asunto-input" label="Asunto" type="text" required />
            <Button type='submit'>Enviar </Button>
            
        </form>
    </div>
  )
}

export default FormContact