import '@/styles/pages/appLayout.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { SwitchTheme } from '../share';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

export default function AppLayout() {
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);

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
        {isAdmin && (
          <>
            <Link className='app-layout__header__link' to='/dashboard'>
              Dashboard
            </Link>
            <Link className='app-layout__header__link' to='/onboarding'>
              Onboarding
            </Link>
          </>
        )}
      </div>
      <div className='app-layout__content'>
        <Outlet />
      </div>
    </div>
  );
}
