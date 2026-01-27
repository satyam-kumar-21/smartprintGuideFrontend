
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeMain from './components/home/HomeMain';

function App() {
    return (
        <div className="min-h-screen bg-slate-100 flex justify-center">
            <div className="w-full max-w-[1920px] bg-white min-h-screen shadow-2xl relative">
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<HomeMain />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default App;
