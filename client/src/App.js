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

import ProductsManagement from './components/Manager/ProductsManagement';
import AddProductForm from './components/Manager/AddProductForm';
import OrdersManagement from './components/Manager/OrdersManagement';
import UserManagement from './components/Manager/UserManagement';
import OrderDetails from './components/Manager/OrderDetails';
import PaymentsManagement from './components/Manager/PaymentsManagement';

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

          {/* מנהל  */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manager/client" element={<UserManagement />} />
          <Route path="/manager/products" element={<ProductsManagement />} />
          <Route path="/manager/add-product" element={<AddProductForm />} />
          <Route path="/manager/orders" element={<OrdersManagement />} />
          <Route path="/manager/orders/:orderId/details" element={<OrderDetails />} />
          <Route path="/manager/payments" element={<PaymentsManagement />} />


          <Route path="/cart" element={<Cart />} />
          <Route path="/language" element={<Language />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* עוגות  */}
          <Route path="/cakes" element={<ProductList type="cakes" />} />
          <Route path="/cakes/:category" element={<ProductList type="cakes" />} />
          <Route path="/product/:productId" element={<ProductDetails />} />

         

          <Route path="/fruit-trays" element={<ProductList products={products} type="fruit-trays"/>} />
          <Route path="/fruit-trays/:category" element={<ProductList category="מגש פירות'" products={products} />} />
          <Route path="/product/:productId" element={<ProductDetails products={products} />} />

          <Route path="/trays" element={<ProductList products={products} type="trays"/>} />
          <Route path="/trays/:category" element={<ProductList type = "trays" />} />
          <Route path="/product/:productId" element={<ProductDetails  />} />

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
