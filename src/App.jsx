import { Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import HomeMain from './components/home/HomeMain';
import UnderConstruction from './components/common/UnderConstruction';

// Admin Imports
import AdminLogin from './components/admin/Auth/AdminLogin';
import AdminLayout from './components/admin/Layout/AdminLayout';
import AdminDashboard from './components/admin/Pages/AdminDashboard';
import AdminCategories from './components/admin/Pages/AdminCategories';
import AdminProducts from './components/admin/Pages/AdminProducts';
import AdminOrders from './components/admin/Pages/AdminOrders';
import AdminCustomers from './components/admin/Pages/AdminCustomers';
import AdminChat from './components/admin/Pages/AdminChat';
import AdminAnalytics from './components/admin/Pages/AdminAnalytics';
import AdminSettings from './components/admin/Pages/AdminSettings';

// Product Category Imports
import AllInOne from './components/productsCategories/all_InOne/AllInOne';
import LargeFormat from './components/productsCategories/largeFormat/LargeFormat';
import InkjetPrinters from './components/productsCategories/inkjetPrinters/InkjetPrinters';
import LedPrinters from './components/productsCategories/ledPrinters/LedPrinters';
import InkToner from './components/productsCategories/inkToner/InkToner';
import CustomerService from './components/customerService/CustomerService';
import LaserPrinters from './components/productsCategories/laserPrinters/LaserPrinters';
import ScrollToTop from './components/ScrollToTop';

function App() {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    return (
        <div className="flex flex-col min-h-screen">
            {!isAdminRoute && <Header />}
            <ScrollToTop />

            <main className={`flex-grow ${isAdminRoute ? 'h-screen overflow-hidden' : ''}`}>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<HomeMain />} />
                    <Route path="/product-category/all-in-one-printers" element={<AllInOne />} />
                    <Route path="/product-category/large-format-printers" element={<LargeFormat />} />
                    <Route path="/product-category/inkjet-printers" element={<InkjetPrinters />} />
                    <Route path="/product-category/laser-printers" element={<LaserPrinters />} />
                    <Route path="/product-category/led-printers" element={<LedPrinters />} />
                    <Route path="/product-category/ink-toner" element={<InkToner />} />
                    <Route path="/customer-service" element={<CustomerService />} />


                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="categories" element={<AdminCategories />} />
                        <Route path="products" element={<AdminProducts />} />
                        <Route path="orders" element={<AdminOrders />} />
                        <Route path="customers" element={<AdminCustomers />} />
                        <Route path="chat" element={<AdminChat />} />
                        <Route path="analytics" element={<AdminAnalytics />} />
                        <Route path="settings" element={<AdminSettings />} />
                        <Route path="*" element={<UnderConstruction />} />
                    </Route>

                    {/* Placeholder Routes for Public Site */}
                    <Route path="/shop" element={<UnderConstruction />} />
                    <Route path="/about" element={<UnderConstruction />} />
                    <Route path="/support" element={<UnderConstruction />} />
                    <Route path="/account" element={<UnderConstruction />} />
                    <Route path="/cart" element={<UnderConstruction />} />

                    {/* Catch-all */}
                    <Route path="*" element={<UnderConstruction />} />
                </Routes>
            </main>

            {!isAdminRoute && <Footer />}
        </div>
    );
}

export default App;
