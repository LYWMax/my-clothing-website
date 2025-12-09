import { Gem } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Gem className="h-6 w-6 text-primary" />
      <span className="text-lg font-semibold">Maximum Style Advisor</span>
    </div>
  );
};

export default Logo;
