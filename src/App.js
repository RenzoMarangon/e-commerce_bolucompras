
import './App.scss';
import NavBar from './components/NavBar/NavBar';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Home from './pages/Home';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Categorys from './pages/Categorys';
import CategoryContainer from './components/CategoryContainer/CategoryContainer';

function App() {

  return (
    <div className='App'>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={ <Home />  }/>
            <Route path='*' element={ <h1>404 ERROR</h1>}/>
            {/* <Route path='/Offers'  element={ <ItemDetailContainer />}/>
            <Route path='/Contact'  element={ <ItemDetailContainer /> }/> */}
            <Route path='/:category/:id' element={ <ItemDetailContainer /> }/>
            <Route path='/Categorys' element={ <Categorys /> }/>
            <Route path='/:category' element={ <CategoryContainer /> }/>
          </Routes>
        </BrowserRouter>
    </div>
    
  );
}

export default App;
