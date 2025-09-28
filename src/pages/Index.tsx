import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ChatInterface from "@/components/ChatInterface";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <ChatInterface />
      <Dashboard />
    </div>
  );
};

export default Index;
