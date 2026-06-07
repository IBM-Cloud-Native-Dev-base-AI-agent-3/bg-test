import RecentComplexSection from "../components/Complex/RecentComplexSection";
import AiSection from "../components/home/AiSection";
import HeroSection from "../components/home/HeroSection";
import SmartUseSection from "../components/home/SmartUseSection";
import PageContainer from "../components/layout/PageContainer";

function Home() {
  return (
    <>
      <HeroSection />
      <PageContainer>
        <RecentComplexSection />
        <AiSection />
        <SmartUseSection />
      </PageContainer>
    </>
  );
}

export default Home;
