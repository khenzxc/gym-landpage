import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features"; // Tiyaking may s sa dulo (Features)
import Pricing from "../components/Pricing";   // Naka-link na sa bagong Rates Matrix natin
import Contact from "../components/Contact";   // Naka-link na sa bagong Location & Contact Section natin
import Footer from "../components/Footer";     // Naka-link na sa bagong Footer Section natin
function Home() {
    return (
        <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-yellow-400 selection:text-black">
            <Navbar />
            <Hero />
            <Features />
            <Pricing />
            <Contact />
            <Footer />
        </div>
    );
}

export default Home;
