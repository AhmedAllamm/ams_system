import Header from './shared/Header';
import Footer from './shared/Footer';
import './style/App.css';
import ProductList from "./pages/ProductList";



const App = () => {
  return (
    <>
     <Header/>
     <ProductList/>
     <Footer/>
    </>
  )
}

export default App;
