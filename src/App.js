
import './App.scss';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import listProducts from './components/listProducts/listProducts';



function App() {

  return (
    <div className='App'>
        <NavBar />
        <ItemListContainer listProducts={ listProducts } />
    </div>
    
  );
}

export default App;
