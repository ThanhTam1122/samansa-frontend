'use client';

import { useQuery } from '@apollo/client';
import Image from 'next/image';
import { GetOriginalVideoDocument } from '@/lib/graphql/generated/graphql';
import { LikeIcon } from '@/components/atoms/LikeIcon';
import { Badge } from '@/components/atoms/Badge';
import { Skeleton } from '@/components/atoms/Skeleton';

type VideoInfoProps = {
  videoId: string;
};

export const VideoInfo: React.FC<VideoInfoProps> = ({ videoId }) => {
  const { data, loading } = useQuery(GetOriginalVideoDocument, {
    variables: { id: videoId },
  });

  const video = data?.originalVideo;

  if (loading) {
    return (
      <div>
        <Skeleton className="aspect-video w-full rounded-xl mb-4" />
        <Skeleton className="h-7 w-2/3 mb-3" />
        <Skeleton className="h-4 w-24 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  }

  if (!video) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted">Video not found.</p>
      </div>
    );
  }

  const durationText = video.duration
    ? `${video.duration.minutes ?? 0}:${(video.duration.seconds ?? 0).toString().padStart(2, '0')}`
    : null;

  return (
    <div>
      {/* Thumbnail */}
      <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-card-bg mb-4">
        {video.landscapeThumbnail ? (
          <Image
            src={video.landscapeThumbnail}
            alt={video.title ?? 'Video'}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-16 h-16 text-muted/20"
            >
              <path
                fillRule="evenodd"
                d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zm7.5 3.75v5.25L15.75 12 9 9.375z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-foreground mb-3">
        {video.title ?? 'Untitled'}
      </h1>

      {/* Metadata */}
      <div className="flex items-center gap-3 mb-4">
        <LikeIcon count={video.likeNum} />
        {durationText && <Badge>{durationText}</Badge>}
      </div>

      {/* Description */}
      {video.description && (
        <div className="bg-card-bg rounded-lg p-4">
          <h3 className="text-sm font-semibold text-foreground mb-2">Description</h3>
          <p className="text-sm text-muted leading-relaxed whitespace-pre-wrap">
            {video.description}
          </p>
        </div>
      )}
    </div>
  );
};
