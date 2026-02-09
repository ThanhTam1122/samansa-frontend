'use client';

import { useQuery } from '@apollo/client';
import { GetVideoCommentsDocument } from '@/lib/graphql/generated/graphql';
import { CommentItem } from '@/components/molecules/CommentItem';
import { Button } from '@/components/atoms/Button';
import { Skeleton } from '@/components/atoms/Skeleton';

type CommentSidebarProps = {
  videoId: string;
};

const COMMENTS_PER_PAGE = 10;

export const CommentSidebar: React.FC<CommentSidebarProps> = ({ videoId }) => {
  const { data, loading, fetchMore } = useQuery(GetVideoCommentsDocument, {
    variables: { id: videoId, first: COMMENTS_PER_PAGE },
  });

  const comments = data?.videoComments;
  const edges = comments?.edges;
  const pageInfo = comments?.pageInfo;

  const handleLoadMore = () => {
    if (!pageInfo?.hasNextPage || !pageInfo.endCursor) return;
    fetchMore({
      variables: {
        after: pageInfo.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          videoComments: {
            ...prev.videoComments,
            edges: [
              ...(prev.videoComments.edges || []),
              ...(fetchMoreResult.videoComments.edges || []),
            ],
            pageInfo: fetchMoreResult.videoComments.pageInfo,
          },
        };
      },
    });
  };

  return (
    <aside className="bg-sidebar-bg rounded-xl border border-border p-4 h-fit">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-foreground">Comments</h3>
        {comments?.allCount != null && (
          <span className="text-xs text-muted">
            {comments.allCount.toLocaleString()} comments
          </span>
        )}
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="w-9 h-9 rounded-full flex-shrink-0" />
              <div className="flex-1">
                <Skeleton className="h-3 w-20 mb-2" />
                <Skeleton className="h-3 w-full mb-1" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : edges && edges.length > 0 ? (
        <>
          <div className="space-y-0 max-h-[600px] overflow-y-auto pr-1">
            {edges.map(({ node }) =>
              node ? (
                <CommentItem
                  key={node.id}
                  id={node.id}
                  contents={node.contents}
                  createdAt={node.createdAt}
                  likeNum={node.likeNum}
                  user={node.user}
                />
              ) : null,
            )}
          </div>
          {pageInfo?.hasNextPage && (
            <div className="mt-4">
              <Button
                variant="ghost"
                onClick={handleLoadMore}
                className="w-full text-sm"
              >
                Load More Comments
              </Button>
            </div>
          )}
        </>
      ) : (
        <p className="text-sm text-muted py-4 text-center">No comments yet.</p>
      )}
    </aside>
  );
};
