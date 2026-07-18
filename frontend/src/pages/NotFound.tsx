import { Link } from 'react-router-dom';
import { Hexagon } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center px-4">
      <div className="w-20 h-20 bg-primary/5 text-primary rounded-3xl flex items-center justify-center mb-8">
        <Hexagon size={40} fill="currentColor" className="text-secondary" />
      </div>
      <h1 className="text-6xl font-heading font-extrabold mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-6">Page not found</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>
      <Link to="/">
        <Button size="lg" className="h-12 px-8">Return to Home</Button>
      </Link>
    </div>
  );
}
