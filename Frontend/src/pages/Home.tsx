 import Hero from "../components/Hero";
import OurStory from "../components/OurStory";
import WhyChooseUs from '../components/WhyChoseUs'
import Commitment from "../components/Home/Commitment"
import ProductsSection from "../components/Home/ProductSection";
 
 import FAQ from "../components/Home/FAQ";
import ShipmentSection from "../components/Home/ShipmentSection";
import InstagramSection from "../components/Home/InstagramSection";
import BlogsSection from "../components/Home/BlogsSection"

const Home = () => {
  return (
    <>
      {/* Full Screen Hero */}
      <Hero />

      {/* Home Page Sections */}
       <OurStory /> 

     <WhyChooseUs />

       <Commitment /> 

      <ProductsSection /> 

     <FAQ />

        <ShipmentSection />

      <InstagramSection /> 

      <BlogsSection />
    </>
  );
};

export default Home;
