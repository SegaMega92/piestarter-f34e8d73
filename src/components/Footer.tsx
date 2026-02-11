import { Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[hsl(235,30%,14%)] text-white">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Logo & Legal */}
          <div className="space-y-4">
            <a href="/" className="text-xl font-bold">
              <span className="text-primary">Пай</span>стартер
            </a>
            <div className="text-xs text-white/50 space-y-1">
              <p>ОГРН: 1234567890123</p>
              <p>ИНН: 1234567890</p>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
            >
              <Send className="h-4 w-4" />
              Телеграм-канал
            </a>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Категории</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">Склады</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Офисы</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Торговые центры</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Жилая недвижимость</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">О компании</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">О нас</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Команда</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Карьера</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Блог</a></li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Контакты</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>+7 (800) 123-45-67</li>
              <li>info@paistarter.ru</li>
              <li>Москва, ул. Примерная, 1</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/40">
          <p>© 2025 Пайстартер. Все права защищены.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white/70 transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white/70 transition-colors">Пользовательское соглашение</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
