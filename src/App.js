
import './App.scss';
import NavBar from './components/NavBar/NavBar';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Home from './pages/Home';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Categorys from './pages/Categorys';
import CategoryContainer from './components/CategoryContainer/CategoryContainer';
import Contact from './pages/Contact';
import Offers from './pages/Offers'
import Error from './pages/Error';
import { CartProvider } from './context/CartContext';
import { LoginProvider } from './context/LoginContext';
import FormContact from './components/FormContact/FormContact'
import CartCheckout from './pages/CartCheckout';
import LoginPage from './pages/LoginPage'
import UserPanel from './pages/UserPanel';
import UserRegister from './pages/UserRegister';
import UserTicket from './components/UserTicket/UserTicket';

function App() {
  return (
    <div className='App'>
      <LoginProvider>
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
                <Route path='/UserPanel' element={ <UserPanel/> }/>
                <Route path='/CartCheckout' element={ <CartCheckout /> }/>
                <Route path='/LoginPage' element={ <LoginPage /> }/>
                <Route path='/UserRegister' element={ <UserRegister /> }/>
                <Route path='/UserTickets' element={ <UserTicket /> }/>
              </Routes>
            </BrowserRouter>
        </CartProvider>
      </LoginProvider>
    </div>
    
  );
}

export default App;