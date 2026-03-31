import React, { Suspense } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import HomeMain from './components/home/HomeMain';
import ScrollToTop from './components/ScrollToTop';
import UnderConstruction from './components/common/UnderConstruction';

// Lazy load all non-critical routes
const HomePrinterSection = React.lazy(() => import('./components/productsCategories/HomePrinterSection'));
const OfficePrinterSection = React.lazy(() => import('./components/productsCategories/OfficePrinterSection'));
const ProfilePage = React.lazy(() => import('./components/profile/ProfilePage'));
const AboutMain = React.lazy(() => import('./components/about/AboutMain'));
const PrivacyPolicy = React.lazy(() => import('./components/privacyPolicy/PrivacyPolicy'));
const TermsAndConditions = React.lazy(() => import('./components/TermsAndConditions'));
const GuideDetails = React.lazy(() => import("./components/ResourceCenterGuideDetails"));

// Admin Imports (lazy)
const AdminLogin = React.lazy(() => import('./components/admin/Auth/AdminLogin'));
const AdminLayout = React.lazy(() => import('./components/admin/Layout/AdminLayout'));
const AdminDashboard = React.lazy(() => import('./components/admin/Pages/AdminDashboard'));
const AdminCategories = React.lazy(() => import('./components/admin/Pages/AdminCategories'));
const AdminProducts = React.lazy(() => import('./components/admin/Pages/AdminProducts'));
const AdminOrders = React.lazy(() => import('./components/admin/Pages/AdminOrders'));
const AdminCustomers = React.lazy(() => import('./components/admin/Pages/AdminCustomers'));
const AdminChat = React.lazy(() => import('./components/admin/Pages/AdminChat'));
const AdminAnalytics = React.lazy(() => import('./components/admin/Pages/AdminAnalytics'));
const AdminSettings = React.lazy(() => import('./components/admin/Pages/AdminSettings'));

// Product Category Imports (lazy)
const AllInOne = React.lazy(() => import('./components/productsCategories/all_InOne/AllInOne'));
const LargeFormat = React.lazy(() => import('./components/productsCategories/largeFormat/LargeFormat'));
const InkjetPrinters = React.lazy(() => import('./components/productsCategories/inkjetPrinters/InkjetPrinters'));
const LedPrinters = React.lazy(() => import('./components/productsCategories/ledPrinters/LedPrinters'));
const InkToner = React.lazy(() => import('./components/productsCategories/inkToner/InkToner'));
const CustomerService = React.lazy(() => import('./components/customerService/CustomerService1'));
const HelpCenter = React.lazy(() => import('./components/customerService/HelpCenter'));
const LaserPrinters = React.lazy(() => import('./components/productsCategories/laserPrinters/LaserPrinters'));
const Cart = React.lazy(() => import('./components/Cart'));
const Checkout = React.lazy(() => import('./components/Checkout'));
const ProductDetails = React.lazy(() => import('./components/productsCategories/ProductDetails'));
const Search = React.lazy(() => import('./pages/Search'));
const OrderDetails = React.lazy(() => import('./components/order/OrderDetails'));
const TrackOrder = React.lazy(() => import('./components/order/TrackOrder'));
const ReturnsAndExchanges = React.lazy(() => import('./components/order/ReturnsAndExchanges'));
const FAQMain = React.lazy(() => import('./components/faq/FAQMain'));
const CustomerMain = React.lazy(() => import('./components/customerService/CustomerMain'));

const RefundReturnPolicy = React.lazy(() => import('./components/privacyPolicy/RefundReturnPolicy'));
const ReturnExchangePolicy = React.lazy(() => import('./components/privacyPolicy/ReturnExchangePolicy'));
const ShippingPolicy = React.lazy(() => import('./components/privacyPolicy/ShippingPolicy'));
const CookiePolicy = React.lazy(() => import('./components/privacyPolicy/CookiePolicy'));
const AccessibilityStatement = React.lazy(() => import('./components/privacyPolicy/AccessibilityStatement'));
const Disclaimer = React.lazy(() => import('./components/privacyPolicy/Disclaimer'));
const ConsumerRights = React.lazy(() => import('./components/privacyPolicy/ConsumerRights'));
const DoNotSellOrShare = React.lazy(() => import('./components/privacyPolicy/DoNotSellOrShare'));
const OrderHistory = React.lazy(() => import('./components/profile/OrderHistory'));

// Blog Imports (lazy)
const BlogsMain = React.lazy(() => import('./components/blogs/BlogsMain'));
const ChoosingPrinterGuide = React.lazy(() => import('./components/blogs/posts/ChoosingPrinterGuide'));
const PrinterBuyingGuide = React.lazy(() => import('./components/guides/PrinterBuyingGuide'));
const GuidesResources = React.lazy(() => import('./components/guides/GuidesResources'));
const PrinterMaintenanceGuide = React.lazy(() => import('./components/blogs/posts/PrinterMaintenanceGuide'));
const SavePrintingCostsGuide = React.lazy(() => import('./components/blogs/posts/SavePrintingCostsGuide'));
const PrintingMistakesGuide = React.lazy(() => import('./components/blogs/posts/PrintingMistakesGuide'));
const SmallBusinessPrintingGuide = React.lazy(() => import('./components/blogs/posts/SmallBusinessPrintingGuide'));

// Guide Details Components (lazy)
const ResourceCenterGuideDetailsWiFi6 = React.lazy(() => import("./components/ResourceCenterGuideDetailsWiFi6"));
const ResourceCenterGuideDetailsMPS = React.lazy(() => import("./components/ResourceCenterGuideDetailsMPS"));
const ResourceCenterGuideDetailsSecurity = React.lazy(() => import("./components/ResourceCenterGuideDetailsSecurity"));
const ResourceCenterGuideDetailsSustainability = React.lazy(() => import("./components/ResourceCenterGuideDetailsSustainability"));
const ResourceCenterGuideDetailsPopularTopics = React.lazy(() => import("./components/ResourceCenterGuideDetailsPopularTopics"));

function App() {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    return (
        <div className="flex flex-col min-h-screen">
            {!isAdminRoute && <Header />}
            <ScrollToTop />

            <main className={`flex-grow ${isAdminRoute ? 'h-screen overflow-hidden' : ''}`}>
              <Suspense fallback={<div className="flex justify-center items-center py-20 min-h-[50vh]"><div className="w-14 h-14 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div></div>}>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<HomeMain />} />
                    <Route path="/product-category/all-in-one-printers" element={<AllInOne />} />
                    <Route path="/home-printer" element={<HomePrinterSection />} />
                    <Route path="/office-printer" element={<OfficePrinterSection />} />
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
                    
                    <Route path="/profile/order-history" element={<OrderHistory />} />
                    <Route path="/order-history" element={<OrderHistory />} />

                    {/* Blogs */}
                    <Route path="/blogs" element={<BlogsMain />} />
                    <Route path="/blogs/choosing-right-printer-home-office" element={<ChoosingPrinterGuide />} />
                    <Route path="/blogs/printer-maintenance-guide" element={<PrinterMaintenanceGuide />} />
                    <Route path="/blogs/top-7-printing-mistakes" element={<PrintingMistakesGuide />} />
                    <Route path="/blogs/save-printing-costs-guide" element={<SavePrintingCostsGuide />} />
                    <Route path="/blogs/small-business-printing-essential-tools" element={<SmallBusinessPrintingGuide />} />


                    <Route path="/product/:productSlug" element={<ProductDetails />} />
                    <Route path="/search" element={<Search />} />

                    <Route path="/resource-center/choose-right-printer" element={<GuideDetails />} />
                    <Route path="/printer-buying-guide" element={<PrinterBuyingGuide />} />
                    <Route path="/resource-center/wifi-6-vs-wifi-5" element={<ResourceCenterGuideDetailsWiFi6 />} />
                    <Route path="/resource-center/managed-print-services" element={<ResourceCenterGuideDetailsMPS />} />
                    <Route path="/resource-center/document-security" element={<ResourceCenterGuideDetailsSecurity />} />
                    <Route path="/resource-center/sustainable-printing" element={<ResourceCenterGuideDetailsSustainability />} />
                    <Route path="/resource-center/popular-topics" element={<ResourceCenterGuideDetailsPopularTopics />} />

                    <Route path="/track-order" element={<TrackOrder />} />
                    <Route path="/returns-exchanges" element={<ReturnsAndExchanges />} />

                    <Route path="/faq" element={<FAQMain />} />
                    <Route path="/help-center" element={<HelpCenter />} />
                    <Route path="/printer-buying-guide" element={<PrinterBuyingGuide />} />
                     <Route path="/guides-resources" element={<GuidesResources />} />


                    {/* other static routes */}
                    <Route path="/about" element={<AboutMain />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                    <Route path="/refund-return-policy" element={<RefundReturnPolicy />} />
                    <Route path="/return-exchange-policy" element={<ReturnExchangePolicy />} />
                    <Route path="/shipping-policy" element={<ShippingPolicy />} />
                    <Route path="/cookie-policy" element={<CookiePolicy />} />
                    <Route path="/customer-service" element={<CustomerService />} />
                    
                    <Route path="/accessibility-statement" element={<AccessibilityStatement />} />
                    <Route path="/disclaimer" element={<Disclaimer />} />
                    <Route path="/consumer-rights" element={<ConsumerRights />} />
                    <Route path="/do-not-sell-or-share-my-personal-information" element={<DoNotSellOrShare />} />

                    <Route path="/consumer-rights" element={<ConsumerRights />} />

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
              </Suspense>
            </main>

            {!isAdminRoute && <Footer />}
        </div>
    );
}

export default App;
