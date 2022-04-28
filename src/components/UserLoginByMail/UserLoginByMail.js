/*HOOKS*/
import React,{ useState, useContext, useEffect } from 'react'
import LoginContext from '../../context/LoginContext'
import { useNavigate, Link } from 'react-router-dom';

/*Firebase*/
import db,{ app } from '../../utils/firebase';
import { signInWithEmailAndPassword, getAuth,  } from 'firebase/auth'
import { where, query, collection, getDocs } from 'firebase/firestore';


/*Material UI*/
import { Button, Alert, TextField, Divider } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';


const UserLoginByMail = ({setLoged}) => {


    const [errorMsg, setErrorMsg] = useState(false)

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

            setUserProvider()

        })
        .catch((error) => {
            setErrorMsg(true);
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
                    mail:user.data().mail,
                    image:user.data().image
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

        console.log(inputValue)
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
        <form className='userLogin-form' onSubmit={ userLoginByMail } >
            <TextField className='userLogin-form__input' label="Mail" type="email" name='mail' onChange={inputEnter} value={inputValue.mail}  required />
            <TextField className='userLogin-form__input' label="Contraseña" type="password" name='password' onChange={inputEnter} value={inputValue.password}  required />
            
            { errorMsg == true &&
                <Alert severity="warning">¡Usuario o contraseña inválidos!</Alert>
            }
            
            <Button type='submit'>
                Iniciar Sesión
            </Button>

            <Divider />

            <Link to={'/UserRegister'} className='userLogin-__register-button'>
                <Button>No tengo una cuenta</Button>
            </Link>
        </form>
    </>
)
}

export default UserLoginByMail;