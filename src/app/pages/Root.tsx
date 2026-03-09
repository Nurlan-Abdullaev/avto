import { Outlet } from 'react-router';
import Header from '../components/Header';
import MobileNav from '../components/MobileNav';

export default function Root() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-24 lg:pb-8">
        <Outlet />
      </main>
      <MobileNav />
    </div>
  );
}
