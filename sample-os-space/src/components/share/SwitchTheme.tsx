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
      <h1 className='theme-toggle__label'>
        {isDarkMode ? (
          <span>
            <i className='fa-solid fa-sun' style={{ color: '#FFD43B' }}></i>
          </span>
        ) : (
          <span>
            <i className='fa-solid fa-moon' style={{ color: '#FFD43B' }}></i>
          </span>
        )}
      </h1>
    </button>
  );
};

export default SwitchTheme;
