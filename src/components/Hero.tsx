
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, ArrowDown } from "lucide-react";

const Hero = () => {
  const scrollToFooter = () => {
    document.getElementById("email-capture")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto text-center">
        <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/10 border-0 font-medium px-4 py-1.5">
          The Next Generation Logistics Engine
        </Badge>

        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-foreground leading-[1.15] max-w-4xl mx-auto">
          Achieve High Efficiency Gains
          <br />
          in your Logistics.
        </h1>

        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
          The only logistics operating system built for the realities of the ground. Featuring
          offline-first driver apps, a visual network designer, and real-time profitability simulation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <Button size="lg">
            <Play className="mr-2 h-4 w-4" />
            Watch the Demo
          </Button>

          <Button variant="outline" size="lg" onClick={scrollToFooter}>
            <ArrowDown className="mr-2 h-4 w-4" />
            Join Early Access
          </Button>
        </div>

        <div className="bg-muted/30 rounded-lg p-8 max-w-3xl mx-auto">
          <blockquote className="text-lg italic text-muted-foreground mb-2 leading-relaxed">
            "International software assumes online payments, perfect addresses and full 4G coverage.
            We built an engine for reality."
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default Hero;
