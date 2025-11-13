import AboutSection from './AboutSection';
import AboutTravelEase from './AboutTravelEase';
import Banner from './Banner';
import BookingSection from './BookingSection';
import FAQSection from './FAQSection ';


import HomeModelCard from './HomeModelCard';
import ThreeDCardSection from './ThreeDCardSection ';

import TopCategories from './TopCategories';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <HomeModelCard></HomeModelCard>
      <FAQSection></FAQSection>
      <ThreeDCardSection></ThreeDCardSection>
      <TopCategories></TopCategories>
      <BookingSection></BookingSection>
      <AboutSection></AboutSection>
      <AboutTravelEase></AboutTravelEase>
    </div>
  );
};

export default Home;
