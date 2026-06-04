import Header from "../components/common/Header";
import RecentComplexSection from "../components/complex/RecentComplexSection";
import PageContainer from "../components/layout/PageContainer";

function Home() {
  return (
    <main>
      <Header />
      <PageContainer>
        <RecentComplexSection />
      </PageContainer>
    </main>
  );
}

export default Home;
