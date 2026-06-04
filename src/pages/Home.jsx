import RecentComplexSection from "../components/Complex/RecentComplexSection";
import HeroSection from "../components/home/HeroSection";
import PageContainer from "../components/layout/PageContainer";

function Home() {
  return (
    <>
      <HeroSection />
      <PageContainer>
        <RecentComplexSection />
      </PageContainer>
    </>
  );
}

export default Home;
