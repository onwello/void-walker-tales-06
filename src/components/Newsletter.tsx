
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const Newsletter = () => {
  return (
    <section id="email-capture" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 text-foreground">Interested?</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Drop your email below to get notified when we open early access for strategic partners.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email..."
            className="flex-1 px-4 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground"
          />
          <Button>
            <Send className="mr-2 h-4 w-4" />
            Request Access
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
