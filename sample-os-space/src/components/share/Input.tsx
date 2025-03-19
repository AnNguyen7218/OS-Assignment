import '@styles/components/input.css';
import { FontIcon } from './FontIcon';

export const Input = ({
  iconLeft,
  iconRight,
  placeholder,
  type,
  className = '',
  iconAction,
  error = '',
  ...rest
}: {
  iconLeft?: string;
  iconRight?: string;
  placeholder: string;
  type?: string;
  className?: string;
  error?: string;
  iconAction?: () => void;
}) => {
  return (
    <div className='input-wrapper-outer'>
      <div className={`input-wrapper ${className}`}>
        {iconLeft && (
          <div>
            <FontIcon icon={iconLeft} />
          </div>
        )}
        <input
          {...rest}
          placeholder={placeholder}
          className='input-wrapper__input'
          type={type ?? 'text'}
        />
        {iconRight && (
          <div className='input-wrapper__icon-right' onClick={iconAction}>
            <FontIcon icon={iconRight} />
          </div>
        )}
      </div>
      <div className='input-wrapper__error'>{error}</div>
    </div>
  );
};
