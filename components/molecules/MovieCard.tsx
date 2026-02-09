import Image from 'next/image';
import Link from 'next/link';
import { DurationBadge } from '@/components/atoms/DurationBadge';

type MovieCardProps = {
  id: string;
  title?: string | null;
  thumbnailUrl?: string | null;
  duration?: {
    minutes?: number | null;
    seconds?: number | null;
  };
  variant?: 'horizontal' | 'grid';
};

export const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  thumbnailUrl,
  duration,
  variant = 'horizontal',
}) => {
  const widthClass = variant === 'horizontal' ? 'w-[260px] flex-shrink-0' : 'w-full';

  return (
    <Link href={`/video/${id}`} className={`group block ${widthClass}`}>
      <div className="relative aspect-video rounded-lg overflow-hidden bg-card-bg">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={title ?? 'Movie thumbnail'}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes={variant === 'horizontal' ? '260px' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
          />
        ) : (
          <div className="w-full h-full bg-card-bg flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-10 h-10 text-muted/30"
            >
              <path
                fillRule="evenodd"
                d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zm1.5 0v1.5c0 .207.168.375.375.375h1.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-1.5A.375.375 0 003 5.625zm16.125-.375a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h1.5A.375.375 0 0021 7.125v-1.5a.375.375 0 00-.375-.375h-1.5zM21 9.375A.375.375 0 0020.625 9h-1.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h1.5A.375.375 0 0021 10.875v-1.5zm0 3.75a.375.375 0 00-.375-.375h-1.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h1.5A.375.375 0 0021 14.625v-1.5zm0 3.75a.375.375 0 00-.375-.375h-1.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h1.5A.375.375 0 0021 18.375v-1.5zM4.875 18.75a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-1.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h1.5zM3.375 15h1.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-1.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375zm0-3.75h1.5a.375.375 0 00.375-.375v-1.5A.375.375 0 004.875 9h-1.5A.375.375 0 003 9.375v1.5c0 .207.168.375.375.375zm4.125 0a.75.75 0 000 1.5h9a.75.75 0 000-1.5h-9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
        {duration && (
          <DurationBadge minutes={duration.minutes} seconds={duration.seconds} />
        )}
      </div>
      <p className="mt-2 text-sm text-foreground line-clamp-2 group-hover:text-white transition-colors">
        {title ?? 'Untitled'}
      </p>
    </Link>
  );
};
