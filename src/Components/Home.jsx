import AboutTravelEase from './AboutTravelEase';
import Banner from './Banner';
import BookingSection from './BookingSection';

import HomeModelCard from './HomeModelCard';

import TopCategories from './TopCategories';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <HomeModelCard></HomeModelCard>
      <TopCategories></TopCategories>
      <BookingSection></BookingSection>
      <AboutTravelEase></AboutTravelEase>
    </div>
  );
};

export default Home;
