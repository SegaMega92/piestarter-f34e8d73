import { Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-6">
        <a href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground">
          <span className="text-primary">Пай</span>стартер
        </a>

        <div className="hidden flex-1 max-w-md md:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск по объектам"
              className="pl-10 bg-secondary border-0"
            />
          </div>
        </div>

        <Button variant="outline" className="gap-2">
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">Личный кабинет</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
