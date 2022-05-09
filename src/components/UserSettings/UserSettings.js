/*Hooks*/
import React, { useContext } from 'react'
import LoginContext from '../../context/LoginContext';

/*Components*/
import ImageUploader from '../ImageUploader/ImageUploader'

/*Material UI*/
import { Button, Icon } from '@mui/material'
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';

const UserSettings = ( {setComponent} ) => {

  const { userProvider } = useContext(LoginContext);



  return ( 
    <div className='userSettings-container'>
      <h2>Datos de mi cuenta</h2>

      <div className='userSettings-info'>
        <div className='name'>
          <p>Nombre</p>
          <TextField id="outlined-basic" label={`${ userProvider.name }`} variant="outlined" disabled/>
          <Button><EditIcon sx={{ color: 'var(--grisClaro)' }} /></Button>
        </div>

        <div className='dni'>
          <p>DNI</p>
          <TextField id="outlined-basic" label={`38.373.635`} variant="outlined" disabled/>
          <Button><EditIcon sx={{ color: 'var(--grisClaro)' }} /></Button>
        </div>

        <div className='tel'>
          <p>Teléfono</p>
          <TextField id="outlined-basic" label={`11-2233-4455`} variant="outlined" disabled/>
          <Button><EditIcon sx={{ color: 'var(--grisClaro)' }} /></Button>
        </div>

        <div className='email'>
          <p>E-Mail</p>
          <TextField id="outlined-basic" label={`${ userProvider.mail }`} variant="outlined" disabled/>
          <Button><EditIcon sx={{ color: 'var(--grisClaro)' }} /></Button>
        </div>

        <div className='direction'>
          <p>Dirección</p>
          <TextField id="outlined-basic" label={`Calle Falsa 123`} variant="outlined" disabled/>
          <Button><EditIcon sx={{ color: 'var(--grisClaro)' }} /></Button>
        </div>

        <div className='zipcode'>
          <p>Código Postal</p>
          <TextField id="outlined-basic" label={`1661`} variant="outlined" disabled/>
          <Button><EditIcon sx={{ color: 'var(--grisClaro)' }} /></Button>
        </div>
      </div>

      <div className='userSettings-cards'>
        <h3>Mis tarjetas</h3>
        <div className='card'>
          <img src='./images/mastercard.svg' />
          <p>Master Card terminada en 2289</p>
          <Button>Editar</Button>
        </div>

        <div className='card'>
          <img src='./images/mastercard.svg' />
          <p>Master Card terminada en 2289</p>
          <Button>Editar</Button>
        </div>

        <div className='card'>
          <img src='./images/visa.png' />
          <p>Visa crédito terminada en 2567</p>
          <Button>Editar</Button>
        </div>

        <Button className='add'>Agregar más tarjetas</Button>


      </div>
      <Button className='userSettings-save'>Guardar cambios</Button>

    </div>


  )
}

export default UserSettings