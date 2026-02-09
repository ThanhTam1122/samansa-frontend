'use client';

import { useParams } from 'next/navigation';
import { VideoDetailTemplate } from '@/components/templates/VideoDetailTemplate';

export default function VideoDetailPage() {
  const params = useParams();
  const videoId = params.id as string;

  return <VideoDetailTemplate videoId={videoId} />;
}
