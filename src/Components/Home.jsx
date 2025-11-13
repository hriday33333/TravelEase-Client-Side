import AboutSection from './AboutSection';
import AboutTravelEase from './AboutTravelEase';
import Banner from './Banner';
import BookingSection from './BookingSection';

import HomeModelCard from './HomeModelCard';
import ThreeDCardSection from './ThreeDCardSection ';

import TopCategories from './TopCategories';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <HomeModelCard></HomeModelCard>
      <ThreeDCardSection></ThreeDCardSection>
      <TopCategories></TopCategories>
      <BookingSection></BookingSection>
      <AboutSection></AboutSection>
      <AboutTravelEase></AboutTravelEase>
    </div>
  );
};

export default Home;
