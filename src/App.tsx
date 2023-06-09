

import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import './App.scss';
import { Route, Routes } from "react-router-dom";
import CatalogPage from './pages/CatalogPage';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Header from './components/Header';
import Admin from './pages/Admin';
import Footer from './components/Footer';



function App() {
  // localStorage.clear()  

  return (
    
      <div className="App">
        <Header />
        <div className="container">             
          <Routes>
                <Route path='/sultan' index element={<CatalogPage />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>   
        <Footer />       
      </div>
  )
}

export default App;


