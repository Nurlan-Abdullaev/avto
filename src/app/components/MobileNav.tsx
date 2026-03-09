import { Link, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Home, Search, PlusCircle, Heart, User } from 'lucide-react';
import { getCurrentUser } from '../../utils/auth';

export default function MobileNav() {
  const { t } = useTranslation();
  const location = useLocation();
  const user = getCurrentUser();

  const navItems = [
    { path: '/', icon: Home, label: t('home') },
    { path: '/catalog', icon: Search, label: t('search') },
    { path: '/sell', icon: PlusCircle, label: t('addListing') },
    { path: '/favorites', icon: Heart, label: t('favorites') },
    { path: '/profile', icon: User, label: t('profile') },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--gold)]/20 backdrop-blur-xl bg-background/95">
      <div className="flex items-center justify-around h-20 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full space-y-1 transition-colors duration-300 ${
                isActive ? 'text-[var(--gold)]' : 'text-muted-foreground'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'fill-[var(--gold)]' : ''}`} />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
