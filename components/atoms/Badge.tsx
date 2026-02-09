type BadgeProps = {
  children: React.ReactNode;
  variant?: 'default' | 'accent';
  className?: string;
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium';
  const variantClasses =
    variant === 'accent'
      ? 'bg-accent/20 text-accent'
      : 'bg-white/10 text-muted';

  return (
    <span className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  );
};
