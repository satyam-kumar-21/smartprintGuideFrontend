import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import HomeMain from './components/home/HomeMain';
import ProfilePage from './components/profile/ProfilePage';
import UnderConstruction from './components/common/UnderConstruction';
import AboutMain from './components/about/AboutMain';
import PrivacyPolicy from './components/privacyPolicy/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';

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
import CustomerService from './components/customerService/CustomerService1';
import LaserPrinters from './components/productsCategories/laserPrinters/LaserPrinters';
import ScrollToTop from './components/ScrollToTop';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import ProductDetails from './components/productsCategories/ProductDetails';
import OrderDetails from './components/order/OrderDetails';
import TrackOrder from './components/order/TrackOrder';
import ReturnsAndExchanges from './components/order/ReturnsAndExchanges';
import FAQMain from './components/faq/FAQMain';
import CustomerMain from './components/customerService/CustomerMain';
import RefundReturnPolicy from './components/privacyPolicy/RefundReturnPolicy';
import ReturnExchangePolicy from './components/privacyPolicy/ReturnExchangePolicy';
import ShippingPolicy from './components/privacyPolicy/ShippingPolicy';
import CookiePolicy from './components/privacyPolicy/CookiePolicy';
import CCPAPrivacyPolicy from './components/privacyPolicy/CCPAPrivacyPolicy';
import AccessibilityStatement from './components/privacyPolicy/AccessibilityStatement';
import Disclaimer from './components/privacyPolicy/Disclaimer';

// Blog Imports
import BlogsMain from './components/blogs/BlogsMain';
import ChoosingPrinterGuide from './components/blogs/posts/ChoosingPrinterGuide';
import PrinterMaintenanceGuide from './components/blogs/posts/PrinterMaintenanceGuide';
import SavePrintingCostsGuide from './components/blogs/posts/SavePrintingCostsGuide';
import PrintingMistakesGuide from './components/blogs/posts/PrintingMistakesGuide';
import SmallBusinessPrintingGuide from './components/blogs/posts/SmallBusinessPrintingGuide';

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
                    <Route path="/customer-service" element={<CustomerMain />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order/:id" element={<OrderDetails />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    
                    {/* Blogs */}
                    <Route path="/blogs" element={<BlogsMain />} />
                    <Route path="/blogs/choosing-right-printer-home-office" element={<ChoosingPrinterGuide />} />
                    <Route path="/blogs/printer-maintenance-guide" element={<PrinterMaintenanceGuide />} />
                    <Route path="/blogs/top-7-printing-mistakes" element={<PrintingMistakesGuide />} />
                    <Route path="/blogs/save-printing-costs-guide" element={<SavePrintingCostsGuide />} />
                    <Route path="/blogs/small-business-printing-essential-tools" element={<SmallBusinessPrintingGuide />} />

                    <Route path="/product/:productSlug" element={<ProductDetails />} />

                    {/*order*/}
                    <Route path="/track-order" element={<TrackOrder />} />
                    <Route path="/returns-exchanges" element={<ReturnsAndExchanges />} />
                    <Route path="/faq" element={<FAQMain />} />


                    {/* other static routes */}
                    <Route path="/about" element={<AboutMain />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                    <Route path="/refund-return-policy" element={<RefundReturnPolicy />} />
                    <Route path="/return-exchange-policy" element={<ReturnExchangePolicy />} />
                    <Route path="/shipping-policy" element={<ShippingPolicy />} />
                    <Route path="/cookie-policy" element={<CookiePolicy />} />
                    <Route path="/customer-service" element={<CustomerService />} />
                    <Route path="/ccpa-privacy-policy" element={<CCPAPrivacyPolicy />} />
                    <Route path="/accessibility-statement" element={<AccessibilityStatement />} />
                    <Route path="/disclaimer" element={<Disclaimer />} />

                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<Navigate to="/admin/dashboard" replace />} />
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
