import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.js";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBox from "./components/ChatBox.jsx";
import Stakeholders from "./pages/Stakeholders";
import Owner from "./pages/Owner.jsx";
import TrackMedicine from "./pages/TrackMedicine.jsx";
import Supplier from "./pages/stakeholders/Supplier.jsx";
import Manufacturer from "./pages/stakeholders/Manufacturer.jsx";
import Distributor from "./pages/stakeholders/Distributor.jsx";
import Retailer from "./pages/stakeholders/Retailer.jsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/stakeholders" element={<Stakeholders />} />
          <Route path="/owner" element={<Owner />} />
          <Route path="/trackMedicine" element={<TrackMedicine />} />
          <Route path="/supplier" element={<Supplier />} />
          <Route path="/manufacturer" element={<Manufacturer />} />
          <Route path="/distributor" element={<Distributor />} />
          <Route path="/retailer" element={<Retailer />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/trackMedicine/:medicineId" element={<TrackMedicine />} />
        </Routes>
        <ChatBox />
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
export default App;
