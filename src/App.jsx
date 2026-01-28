import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeMain from './components/home/HomeMain';
import UnderConstruction from './components/common/UnderConstruction';

function App() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<HomeMain />} />

                    {/* Placeholder Routes */}
                    <Route path="/all-in-one" element={<UnderConstruction />} />
                    <Route path="/large-format" element={<UnderConstruction />} />
                    <Route path="/printers/:type" element={<UnderConstruction />} />
                    <Route path="/ink-toner" element={<UnderConstruction />} />
                    <Route path="/support" element={<UnderConstruction />} />
                    <Route path="/privacy" element={<UnderConstruction />} />
                    <Route path="/offers" element={<UnderConstruction />} />
                    <Route path="/click-print" element={<UnderConstruction />} />
                    <Route path="/print-core" element={<UnderConstruction />} />
                    <Route path="/categories/:category" element={<UnderConstruction />} />
                    <Route path="/product/:productId" element={<UnderConstruction />} />

                    {/* Catch-all */}
                    <Route path="*" element={<UnderConstruction />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
