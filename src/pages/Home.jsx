import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features"; 
import Pricing from "../components/Pricing";   
import Contact from "../components/Contact";   
import Footer from "../components/Footer";     
import Album from "../components/Album";

// FIXED: Idinagdag ang { setView } dito sa loob ng parenthesis ()
function Home({ setView }) {
    return (
        <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-yellow-400 selection:text-black">
            
            {/* FIXED: Ipinasa ang setView prop pababa sa Navbar component */}
            <Navbar setView={setView} />
            
            <Hero />
            <Features />
            <Pricing />
            <Album />
            <Contact />
            <Footer />
        </div>
    );
}

export default Home;