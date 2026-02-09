type DurationBadgeProps = {
  minutes?: number | null;
  seconds?: number | null;
};

export const DurationBadge: React.FC<DurationBadgeProps> = ({
  minutes,
  seconds,
}) => {
  const min = minutes ?? 0;
  const sec = seconds ?? 0;
  const formatted = `${min}:${sec.toString().padStart(2, '0')}`;

  return (
    <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
      {formatted}
    </span>
  );
};
