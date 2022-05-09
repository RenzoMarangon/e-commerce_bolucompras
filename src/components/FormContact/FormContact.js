/*Hooks*/
import React,{ useEffect } from 'react'

/*Material UI*/
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

/*Font Awesome*/
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const FormContact = () => {
    /*Alerta del boton 'agregar al carrito'*/
    const [open, setOpen] = React.useState(false);
    
    const handleOpen = (e) =>{
      e.preventDefault();
      setOpen(true)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
        
    };


  return (
    <div className='formContact-container'>
        
        <form onSubmit={handleOpen}>
            <h2>Envianos un mail</h2>
            <TextField className='formContact-container__input' id="outlined-nombre-input" label="Nombre" type="text" autoComplete="current-name" required />
            <TextField className='formContact-container__input' id="outlined-email-input" label="Mail" type="email" autoComplete="current-email" required />
            <TextField className='formContact-container__input' id="outlined-asunto-input" label="Asunto" type="text" required />
            <TextField className='formContact-container__input' id="outlined-asunto-input" label="Mensaje" type="text" required />
            <Button className='formContact-container__button'  startIcon={ <FontAwesomeIcon icon={ faPaperPlane } /> }  type='submit'>Enviar </Button>
        </form>

        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={'success'} sx={{ width: '100%' }}>
                Se ha enviado el email correctamente
            </Alert>
        </Snackbar>
    </div>
  )
}

export default FormContact