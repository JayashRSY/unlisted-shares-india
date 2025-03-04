import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Title from "./../../components/Title";
import Chart from "@/components/Chart";
import FAQ from "./../../components/FAQ";
import Footer from "@/components/Footer";
import AboutShare from "@/components/AboutShare";
import Fundamentals from "./../../components/share/Fundamentals";
import Financials from "@/components/share/Financials";
import ShareholdingPattern from "@/components/share/ShareholdingPattern";
import PromotersOrManagement from "./../../components/share/PromotersOrManagement";
import Blogs from "./../../components/Blogs";
import BuyAndSell from "@/components/BuyAndSell";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <div className="px-30 mt-20">
        <div className="flex gap-4">
          <div className="flex-2/3">
            <Title />
            <Chart />
            <AboutShare />
            <Fundamentals />
            <Financials />
            <ShareholdingPattern />
            <PromotersOrManagement />
          </div>
          <div className="flex-1/3">
            <BuyAndSell />
          </div>
        </div>
        <FAQ />
        <Blogs />
      </div>
      <Footer />
    </>
  );
}
