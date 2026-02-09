type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost';
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const base = 'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-accent hover:bg-accent-hover text-white',
    ghost: 'bg-transparent hover:bg-white/10 text-muted hover:text-foreground',
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
