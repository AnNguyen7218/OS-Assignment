import '../../../styles/auth/layout.css';
import { Outlet } from 'react-router-dom';
import SwitchTheme from '../../share/SwitchTheme';

export default function AuthLayout() {
  return (
    <div className='auth-layout'>
      <SwitchTheme />
      <div className='auth-layout__content'>
        <Outlet />
      </div>
    </div>
  );
}
