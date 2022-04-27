import React, { useState, useEffect } from 'react'
import { getAuth, signOut } from 'firebase/auth'
import '../../utils/firebase';
import MuiAlert from '@mui/material/Alert';
import { Button, Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

const UserLogOut = () => {

    /*Guardo lo que voy a escribir en la alerta*/
    const [ alertContent, setAlertContent ] = useState({
        content:'',
        severity:'success',
    })

    useEffect(()=>{
        if(alertContent.content.length>1){
            setOpen(true);
        }
    },[alertContent])

    const userSignOut =  () => {
        const auth = getAuth()
        signOut(auth).then(()=>{
            setAlertContent({
                content:'¡Usted ha cerrado sesión!',
                severity:'warning',
            })

        }).catch(( error ) => {
            setAlertContent({
                content:error,
                severity:'warning',
            })
        })
      }

    /*Alerta del boton 'agregar al carrito'*/
    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };
    
    const asd = ( ) =>{
        setOpen(true)
    }

  return (
    <div className='userSignOut-container'>
        <Button onClick={ userSignOut } > 
            Salir
        </Button>
        
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertContent.severity} sx={{ width: '100%' }}>
            {alertContent.content}
        </Alert>
        </Snackbar>
    </div>
  )
}

export default UserLogOut