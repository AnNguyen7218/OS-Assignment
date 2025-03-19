import '@/styles/pages/appLayout.css';
import { Link, Outlet } from 'react-router-dom';
import { SwitchTheme } from '../share';

export default function AppLayout() {
  return (
    <div className='app-layout'>
      <div className='app-layout__header'>
        <SwitchTheme />
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/admin'>Admin</Link>
        <Link to='/onboarding'>Onboarding</Link>
      </div>
      <div className='app-layout__content'>
        <Outlet />
      </div>
    </div>
  );
}
