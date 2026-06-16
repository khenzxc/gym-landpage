import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features"; // Tiyaking may s sa dulo (Features)
import Pricing from "../components/Pricing";   // Naka-link na sa bagong Rates Matrix natin
import CTA from "../components/ContactSecton";
function Home() {
    return (
        <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-yellow-400 selection:text-black">
            <Navbar />
            <Hero />
            <Features />
            <Pricing />
            <CTA />
        </div>
    );
}

export default Home;
