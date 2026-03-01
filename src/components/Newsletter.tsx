
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useState, type FormEvent } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email) return;

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("https://formspree.io/f/mvzbnqjo", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        let message = "Something went wrong. Please try again.";
        try {
          const data = await response.json();
          if (data?.error) {
            message = data.error;
          }
        } catch {
          // ignore JSON parse errors and use default message
        }
        setErrorMessage(message);
        setStatus("error");
      }
    } catch {
      setErrorMessage("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section id="email-capture" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 text-foreground">Interested?</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Drop your email below to get notified when we open early access for strategic partners.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email..."
            className="flex-1 px-4 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Button type="submit" disabled={status === "submitting"}>
            <Send className="mr-2 h-4 w-4" />
            {status === "submitting" ? "Sending..." : "Request Access"}
          </Button>
        </form>
        {status === "success" && (
          <p className="mt-4 text-sm text-emerald-500">
            Thanks! You&apos;re on the list. We&apos;ll reach out when early access opens.
          </p>
        )}
        {status === "error" && errorMessage && (
          <p className="mt-4 text-sm text-destructive">
            {errorMessage}
          </p>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
