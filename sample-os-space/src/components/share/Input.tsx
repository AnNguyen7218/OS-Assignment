export const Input = ({
  iconLeft,
  iconRight,
  placeholder
}: {
  iconLeft?: string;
  iconRight?: string;
  placeholder: string;
}) => {
  return (
    <div>
      {iconLeft && <div></div>}
      <input placeholder={placeholder} />
      {iconRight && <div></div>}
    </div>
  );
};
