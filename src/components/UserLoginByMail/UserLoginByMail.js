/*HOOKS*/
import React,{ useState, useContext, useEffect } from 'react'
import LoginContext from '../../context/LoginContext'
import { useNavigate } from 'react-router-dom';

/*Firebase*/
import db,{ app } from '../../utils/firebase';
import { signInWithEmailAndPassword, getAuth,  } from 'firebase/auth'
import { where, query, collection, getDocs } from 'firebase/firestore';


/*Material UI*/
import { Button, Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const UserLoginByMail = ({setLoged}) => {

    const navigate = useNavigate()

    const { userProvider, setUserProvider } = useContext(LoginContext);

    const [ inputValue, setInputValue ] = useState({
        name:'',
        mail:'',
        image:'',
        password:''
    });

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
    

    const userLoginByMail    = (e) => {

        e.preventDefault();

        const email = inputValue.mail;
        const password = inputValue.password;

        const auth = getAuth(app);

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
            // Signed in
            userExist( email ) 

            setAlertContent({
                content:'¡Registro exitoso!',
                severity:'success',
            })

            setLoged(true);

        })
        .catch((error) => {
            console.log(error.code)
            console.log(error.message)
            });
    }



    const userExist = async( id ) =>{
        const usersColl = collection(db,'users')
        const q = query(usersColl, where('mail', '==', id));
        const getUsers = await getDocs( q );
        
        
        getUsers.docs.map(( user )=>{

            if (user.id == id ){
                setUserProvider({
                    name:user.data().name,
                    mail:user.data().mail
                })

                setAlertContent({
                    content:'¡Registro exitoso!',
                    severity:'success',
                })


            }
        })
    }

    const inputEnter = (e) => {
        const { name, value } = e.target;
        setInputValue({
          ...inputValue,
          [name]:value,
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
    
    

return (
    <>
    <form onSubmit={ userLoginByMail } >
        <input type='email' placeholder='Mail' name='mail' onChange={inputEnter} value={inputValue.mail} required />
        <input type='password' placeholder='Password' name='password' onChange={inputEnter} value={inputValue.password} required />
        <Button type='submit'>
            Iniciar Sesión
        </Button>
        
    </form>

    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
    <Alert onClose={handleClose} severity={alertContent.severity} sx={{ width: '100%' }}>
        {alertContent.content}
    </Alert>
    </Snackbar>
    </>
)
}

export default UserLoginByMail