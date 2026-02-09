import { Avatar } from '@/components/atoms/Avatar';
import { LikeIcon } from '@/components/atoms/LikeIcon';

type CommentItemProps = {
  id: string;
  contents?: string | null;
  createdAt?: string | null;
  likeNum?: number | null;
  user?: {
    id: string;
    name?: string | null;
    avatar?: string | null;
  } | null;
};

export const CommentItem: React.FC<CommentItemProps> = ({
  contents,
  createdAt,
  likeNum,
  user,
}) => {
  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="flex gap-3 py-3 border-b border-border last:border-b-0">
      <Avatar src={user?.avatar} alt={user?.name ?? 'User'} size={36} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-foreground truncate">
            {user?.name ?? 'Anonymous'}
          </span>
          <span className="text-xs text-muted flex-shrink-0">
            {formatDate(createdAt)}
          </span>
        </div>
        <p className="text-sm text-muted leading-relaxed break-words">
          {contents}
        </p>
        {likeNum != null && likeNum > 0 && (
          <div className="mt-1.5">
            <LikeIcon count={likeNum} />
          </div>
        )}
      </div>
    </div>
  );
};
