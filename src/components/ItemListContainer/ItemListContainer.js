import CardItem from '../CardItem/CardItem'
import CircularProgress from '@mui/material/CircularProgress';
import { Grid, Skeleton } from '@mui/material';


const ItemListContainer = ({ listProducts, loading }) => {

  const skeleton = 

      <Grid container margin={'auto'} justifyContent={'space-around'} className='skeleton-container'>
        <Grid item xs={12} sm={6} md={4} className='skeleton-body'>
          <Skeleton className='skeleton-main'/>
          <Skeleton className='skeleton-image'/>
          <Skeleton className='skeleton-info' />
        </Grid>

        <Grid item xs={12} sm={6} md={4} className='skeleton-body'>
          <Skeleton className='skeleton-main'/>
          <Skeleton className='skeleton-image'/>
          <Skeleton className='skeleton-info' />
        </Grid>

        <Grid item xs={12} sm={6} md={4} className='skeleton-body'>
          <Skeleton className='skeleton-main'/>
          <Skeleton className='skeleton-image'/>
          <Skeleton className='skeleton-info' />
        </Grid>



      </Grid>


  return (
    <main>
 
        {!loading ? skeleton : <div className='main-container'>
          <div className='main-container__item-list-container'>
            {listProducts.map(( product ) =>{
              return(
                 <CardItem key={ product.id } props={ product } />
              )
            })}
          </div>
        </div> }
    </main>
  )
}

export default ItemListContainer