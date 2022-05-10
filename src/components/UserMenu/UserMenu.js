/*HOOKS*/
import React, { useContext } from 'react'
import LoginContext from '../../context/LoginContext'

/*Material UI*/
import Menu from '@mui/material/Menu';
import { Avatar } from '@mui/material';


const UserMenu = ( { children } ) => {

    const { userProvider } = useContext(LoginContext);
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

  return (
    <div className='userMenu-container'>

    {
      /*Si no hay imagen de perfil muestra un avatar*/
      userProvider.image.length>1 ? (
        <img className='userMenu-container__profile-picture' src={ userProvider.image }  onClick={handleClick}/>
      ) : (
        <Avatar onClick={handleClick} />
      )
    }
    <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        key={'menux'}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 500,
              height: 500,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 4,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >

        { children }
        
      </Menu>
      </div>
  )
}

export default UserMenu