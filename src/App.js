
import './App.scss';
import NavBar from './components/NavBar/NavBar';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Home from './pages/Home';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Categorys from './pages/Categorys';
import CategoryContainer from './components/CategoryContainer/CategoryContainer';
import Contact from './pages/Contact';
import Offers from './pages/Offers'
import Cart from './pages/Cart';
import Error from './pages/Error';
import { CartProvider } from './context/CartContext';
function App() {
  return (
    <div className='App'>
      <CartProvider>
        <BrowserRouter>
            <NavBar/>
            <Routes>
              <Route path='/' element = { <Home />  }/>
              <Route path='*' element = { <Error /> }/>
              <Route path='/Offers'  element={ <Offers />}/>
              <Route path='/Contact'  element={ <Contact /> }/>
              <Route path='/:category/:id' element={ <ItemDetailContainer /> }/>
              <Route path='/Categorys' element={ <Categorys /> }/>
              <Route path='/Categorys/:category' element={ <CategoryContainer /> }/>
              <Route path='/Cart' element={ <Cart /> }/>  
            </Routes>
          </BrowserRouter>
      </CartProvider>
    </div>
    
  );
}

export default App;