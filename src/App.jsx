import React, { lazy, Suspense, useContext, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './App.css';
import 'flowbite';
import 'react-toastify/dist/ReactToastify.css';

import { AppContext, AppProvider } from './AppContext';
import { Dna } from 'react-loader-spinner';
import { ToastContainer } from "react-toastify";

const Home = lazy(() => import('./components/home/Home'));
const Dashboard = lazy(() => import('./dashboard/home/Dashboard'));
const Order = lazy(() => import('./dashboard/home/Orders'));
const SignupSeller = lazy(() => import('./components/auth-pages/SignupSeller'));
const SignupCustomer = lazy(() => import('./components/auth-pages/SignupCustomer'));
const LoginSeller = lazy(() => import('./components/auth-pages/LoginSeller'));
const LoginCustomer = lazy(() => import('./components/auth-pages/LoginCustomer'));
const Header = lazy(() => import('./components/header/Header'));
const Sidebar = lazy(() => import('./components/sidebar/Sidebar'));
const MyFooter = lazy(() => import('./components/footer/Footer'));
const AllProducts = lazy(() => import('./pages/all-products/AllProducts'));
const ProfilePage = lazy(() => import('./pages/profile-page/ProfilePage'));
const ProductsInCategory = lazy(() => import('./pages/products-in-category/productsInCategory'));
const Cart = lazy(() => import('./pages/cart/Cart'));
const CheckOut = lazy(() => import('./pages/check-out/CheckOut'));
const ContactUs = lazy(() => import('./pages/contact-us/contactUs'));
const AboutUs = lazy(() => import('./pages/about-us/AboutUs'));
const ProductDetails = lazy(() => import('./pages/product-details/ProductDetails'));

function AppContent() {
  const { i18n } = useTranslation();
  const languageSelected = i18n.language;
  const location = useLocation();
  useEffect(() => {
    document.body.dir = languageSelected === 'ar' ? 'rtl' : 'ltr';
  }, [languageSelected]);

  const { isSidebarOpen, toggleSidebar } = useContext(AppContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    // console.clear();
  }, [location.pathname]);


  return (
    <div className="App bg-[#F4F4F4]">
      <Suspense fallback={
        <div className="h-screen w-screen grid place-content-center">
          <Dna
            visible={true}
            height="160"
            width="160"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      }>
        <Header toggleSidebar={toggleSidebar} />
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={i18n.language === "ar"}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className={"z-[1000000000]"}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/seller-signup" element={<SignupSeller />} />
          <Route path="/seller-login" element={<LoginSeller />} />
          <Route path="/customer-signup" element={<SignupCustomer />} />
          <Route path="/customer-login" element={<LoginCustomer />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/categories/:id" element={<ProductsInCategory />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
        <MyFooter />
      </Suspense>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;