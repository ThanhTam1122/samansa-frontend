'use client';

import Link from 'next/link';
import { VideoInfo } from '@/components/organisms/VideoInfo';
import { CommentSidebar } from '@/components/organisms/CommentSidebar';

type VideoDetailTemplateProps = {
  videoId: string;
};

export const VideoDetailTemplate: React.FC<VideoDetailTemplateProps> = ({
  videoId,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-foreground">Video Detail</span>
      </nav>

      {/* Content Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          <VideoInfo videoId={videoId} />
        </div>

        {/* Comment Sidebar */}
        <div className="w-full lg:w-[380px] flex-shrink-0">
          <CommentSidebar videoId={videoId} />
        </div>
      </div>
    </div>
  );
};
