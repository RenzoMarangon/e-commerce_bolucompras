
import './App.scss';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import listProducts from './components/listProducts/listProducts';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';


function App() {

  return (
    <div className='App'>
        <NavBar />
        {/* <ItemListContainer listProducts={ listProducts } /> */}

        <ItemDetailContainer />
    </div>
    
  );
}

export default App;
