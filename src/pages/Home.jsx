import RecentComplexSection from "../components/Complex/RecentComplexSection";
import AiSection from "../components/home/AiSection";
import HeroSection from "../components/home/HeroSection";
import PageContainer from "../components/layout/PageContainer";

function Home() {
  return (
    <>
      <HeroSection />
      <PageContainer>
        <RecentComplexSection />
        <AiSection />
      </PageContainer>
    </>
  );
}

export default Home;
