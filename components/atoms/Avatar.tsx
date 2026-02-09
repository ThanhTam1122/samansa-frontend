import Image from 'next/image';

type AvatarProps = {
  src?: string | null;
  alt: string;
  size?: number;
  className?: string;
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 32,
  className = '',
}) => {
  if (!src) {
    return (
      <div
        className={`rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-muted ${className}`}
        style={{ width: size, height: size }}
      >
        {alt.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`rounded-full object-cover ${className}`}
    />
  );
};
