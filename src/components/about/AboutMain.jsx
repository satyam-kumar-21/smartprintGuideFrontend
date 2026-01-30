import React from "react";
import AboutHero from "./AboutHero";
import AboutContent from "./AboutContent";
import WhyChooseSection from "../home/WhyChooseSection";
import StatsCircles from "../home/StatsCircles";
const AboutMain = () => {
  return (
    <>
       {/* <AboutHero/> */}
       <AboutContent/>
       <WhyChooseSection/>
       <StatsCircles/>
    </>
  );
};

export default AboutMain;
