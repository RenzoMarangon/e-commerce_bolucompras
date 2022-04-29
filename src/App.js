
import './App.scss';
import NavBar from './components/NavBar/NavBar';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Home from './pages/Home';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Categorys from './pages/Categorys';
import CategoryContainer from './components/CategoryContainer/CategoryContainer';
import Contact from './pages/Contact';
import Offers from './pages/Offers'
import Cart from './pages/Cart';
import Error from './pages/Error';
import { CartProvider } from './context/CartContext';
import { LoginProvider } from './context/LoginContext';
import UserSettings from './components/UserSettings/UserSettings';
import LoginPage from './pages/LoginPage';
import FormContact from './components/FormContact/FormContact'
import UserRegister from './pages/UserRegister';

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
                <Route path='/Offers'  element={ <FormContact />}/>
                <Route path='/Contact'  element={ <Contact /> }/>
                <Route path='/:category/:id' element={ <ItemDetailContainer /> }/>
                <Route path='/Categorys' element={ <Categorys /> }/>
                <Route path='/Categorys/:category' element={ <CategoryContainer /> }/>
                <Route path='/UserSettings' element={ <UserSettings /> }/>
                <Route path='/UserRegister' element={ <UserRegister /> }/>
              </Routes>
            </BrowserRouter>
        </CartProvider>
      </LoginProvider>
    </div>
    
  );
}

export default App;