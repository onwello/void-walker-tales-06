
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold tracking-tight text-foreground">Logistics OS</span>
          </Link>

          <a
            href="mailto:hello@domain.com"
            className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
