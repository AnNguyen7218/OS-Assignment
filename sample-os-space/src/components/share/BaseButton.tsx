export type BaseButtonProps = {
  text: string;
  icon?: string;
  isLoading: boolean;
  disabled: boolean;
  className?: string;
  onClick?: () => void;
};

export const BaseButton = ({
  text,
  icon,
  isLoading,
  disabled,
  className,
  onClick
}: BaseButtonProps) => {
  return (
    <div
      className={`${disabled || isLoading ? 'disabled' : ''} ${className ?? ''}`}
      onClick={onClick}
    >
      {icon && (
        <div>
          <i className={`${className} fa-solid fa-circle-user`}></i>
        </div>
      )}
      {isLoading ? 'Loading...' : text}
    </div>
  );
};
