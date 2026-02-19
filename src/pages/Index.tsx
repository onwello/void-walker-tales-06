
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Newsletter />

      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>&copy; 2025 Logistics OS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
