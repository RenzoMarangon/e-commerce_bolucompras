import CardItem from '../CardItem/CardItem'
import CircularProgress from '@mui/material/CircularProgress';


const ItemListContainer = ({ listProducts, loading }) => {

  return (
    <main>
      
        <div className='main-container'>
          <div className='main-container__item-list-container'>

            {!loading ? <CircularProgress className='main-container__item-list-container__spinner' /> :
            listProducts.map(( product ) =>{
              return(
                 <CardItem key={ product.id } props={ product } />
              )
            })
            }

          </div>
        </div>
    </main>
  )
}

export default ItemListContainer