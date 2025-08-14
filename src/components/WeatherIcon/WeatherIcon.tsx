type WeatherIconProps = {
  iconId: string;
  size?: number;
};

export const WeatherIcon = ({ iconId }: { iconId: string }) => {
  return (
    <svg width="48" height="48">
      <use xlinkHref={`/sprite.svg#${iconId}`} />
    </svg>
  );
};
