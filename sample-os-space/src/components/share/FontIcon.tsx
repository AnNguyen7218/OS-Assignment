export const FontIcon = ({
  icon,
  className
}: {
  icon: string;
  className?: string;
}) => {
  if (!icon) return <></>;
  return <i className={`fa-solid ${icon} ${className ?? ''}`}></i>;
};
