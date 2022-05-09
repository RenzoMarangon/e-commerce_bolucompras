import React,{ useState } from 'react'
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';


const style = {
  width:'100',
  height:'100vh',
}

const ModalInfo = ( {props}) => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (

    <>
    <Modal 
        disableEnforceFocus
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={ style }>
          {props.description}
          <Button onClick={handleClose}> Enviar </Button>
        </div>

      </Modal>

      <Button onClick={handleOpen}>Open modal</Button>
    </>
  )
}

export default ModalInfo