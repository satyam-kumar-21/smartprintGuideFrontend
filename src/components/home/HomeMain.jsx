
import Hero from "./Hero";
import Home from "./Home";
import LatestTips from "./LatestTips";
import Reviews from "./Reviews";
import StatsCircles from "./StatsCircles";
import TopPicksGrid from "./TopPicksGrid";
import WhyChooseSection from "./WhyChooseSection";


const HomeMain = () => {
    return (
        <>
            <Hero />
            <Home />
            <WhyChooseSection />
            <TopPicksGrid />
            <Reviews />
            <LatestTips />
            <StatsCircles />
        </>
    );
};

export default HomeMain;
