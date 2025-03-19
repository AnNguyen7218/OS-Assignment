import '@/styles/components/switchTheme.css';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeProvider';

const SwitchTheme = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const handleOnChangeTheme = () => {
    if (typeof document === 'undefined') {
      return;
    }
    toggleTheme();
  };

  return (
    <button className='theme-toggle' onClick={handleOnChangeTheme}>
      <div className='theme-toggle__label'>
        {isDarkMode ? (
          <span>
            <i className='fa-solid fa-moon' style={{ color: '#FFD43B' }}></i>
          </span>
        ) : (
          <span>
            <i className='fa-solid fa-sun' style={{ color: '#000' }}></i>
          </span>
        )}
      </div>
    </button>
  );
};

export default SwitchTheme;
