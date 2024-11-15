import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Client/Navbar';
import ProductNavbar from './components/Client/ProductNavbar';
import Home from './pages/Home';
import Search from './pages/Search';
import Login from './pages/Login';
import Cart from './components/Client/Cart';
import Language from './pages/Language';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './components/Manager/Dashboard';
import ProductList from './components/Client/ProductList';
import ProductDetails from './components/Client/ProductDetails';
import products from './data/Product'; 
import { CartProvider } from './context/CartContext'; // ייבוא של ספק הסל
import Checkout from './components/Client/Chekout'
import Register from './pages/Register';
import Payment from './components/Client/Payment';

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <ProductNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/language" element={<Language />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cakes" element={<ProductList products={products} type="cakes"/>} />
          <Route path="/cakes/:category" element={<ProductList category="עוגות" products={products} />} />
          <Route path="/product/:productId" element={<ProductDetails products={products} />} />

          <Route path="/fruit-trays" element={<ProductList products={products} type="fruit-trays"/>} />
          <Route path="/fruit-trays/:category" element={<ProductList category="מגש פירות'" products={products} />} />
          <Route path="/product/:productId" element={<ProductDetails products={products} />} />

          <Route path="/trays" element={<ProductList products={products} type="trays"/>} />
          <Route path="/trays/:category" element={<ProductList category="מגש מתןקים'" products={products} />} />
          <Route path="/product/:productId" element={<ProductDetails products={products} />} />

          <Route path="/chocolates" element={<ProductList products={products} type="chocolates"/>} />
          <Route path="/chocolates/:category" element={<ProductList category="מגש פירות'" products={products} />} />
          <Route path="/product/:productId" element={<ProductDetails products={products} />} />

          <Route path="/new-arrivals" element={<ProductList products={products} type="new-arrivals"/>} />
          <Route path="/new-arrivals/:category" element={<ProductList category="מוצרים חדשים '" products={products} />} />
          <Route path="/product/:productId" element={<ProductDetails products={products} />} />


          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
        

        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
