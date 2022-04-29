import React, { useContext } from 'react'
import Menu from '@mui/material/Menu';
import { Avatar } from '@mui/material';
import LoginContext from '../../context/LoginContext'


const UserMenu = ( { children } ) => {

    const { userProvider } = useContext(LoginContext);
    
    console.log(userProvider.name.length)
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
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
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