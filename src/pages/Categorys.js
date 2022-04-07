import React,{ useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

/*ICONOS*/
import { Skeleton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonDress, faGem, faPerson, faComputer } from '@fortawesome/free-solid-svg-icons'


const Categorys = () => {

    const [ loader, setLoader ] = useState(false);

    useEffect(()=>{
        setTimeout(()=>{
            setLoader(true);
        },1000)
    },[]);

    const skeleton = 
        <div className='categorys-container__skeleton'>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
        </div>;

  return (
   
    <div className='categorys-container'>


        {!loader ?  skeleton

            : 

        <div className='categorys-container__links'>
            <div className='categorys-container__link'>
                <Link to={`/Categorys/jewelery`} > 
                    <Button>
                        <FontAwesomeIcon icon={ faGem }/>
                        <p>Joyería</p>
                    </Button>
                </Link>
                
            </div>

            <div className='categorys-container__link'>
                <Link to={`/Categorys/women's%20clothing`} > 
                    <Button>  
                        <FontAwesomeIcon icon={ faPersonDress }/>
                        <p>Ropa de Mujer</p>
                    </Button>
                </Link>
                
            </div>

            <div className='categorys-container__link'>
                <Link to={`/Categorys/men's%20clothing`} > 
                    <Button>
                        <FontAwesomeIcon icon={ faPerson }/>
                        <p>Ropa de Hombre</p>
                    </Button>
                </Link>
                
            </div>

            <div className='categorys-container__link'>
                <Link to={`/Categorys/electronics`} > 
                    <Button>
                        <FontAwesomeIcon icon={ faComputer }/> 
                        <p>Tecnología</p>
                    </Button>
                </Link>
                
            </div>
        </div>
            
        }

        
    </div>
  )
}

export default Categorys