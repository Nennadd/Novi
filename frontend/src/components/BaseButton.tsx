type ButtonProps = React.ComponentPropsWithoutRef<"button">;

export const BaseButton = ({
  children,
  disabled,
  type,
  onClick,
}: ButtonProps) => {
  return (
    <button className="btn" disabled={disabled} type={type} onClick={onClick}>
      {children}
    </button>
  );
};
