import '@/styles/pages/appLayout.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { SwitchTheme } from '../share';

export default function AppLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };
  return (
    <div className='app-layout'>
      <div className='app-layout__header'>
        <SwitchTheme />
        <div onClick={handleLogout} className='app-layout__header__logout'>
          Logout
        </div>
      </div>
      <div className='app-layout__content'>
        <Outlet />
      </div>
    </div>
  );
}
