
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
function App() {


  return (
    <div className='App'>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={ <Home />  }/>
            <Route path='*' element={ <h1>404 ERROR</h1>}/>
            <Route path='/Offers'  element={ <Offers />}/>
            <Route path='/Contact'  element={ <Contact /> }/>
            <Route path='/:category/:id' element={ <ItemDetailContainer /> }/>
            <Route path='/Categorys' element={ <Categorys /> }/>
            <Route path='/:category' element={ <CategoryContainer /> }/>
            <Route path='/Cart' element={ <Cart /> }/>
          </Routes>
        </BrowserRouter>


 
    </div>
    
  );
}

export default App;
