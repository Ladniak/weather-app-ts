type WeatherIconProps = {
  iconId: string;
  size?: number;
};

export const WeatherIcon = ({ iconId }: { iconId: string }) => {
  return (
    <svg width="120" height="120">
      <use href={`/sprite.svg#${iconId}`} fill="white" />
    </svg>
  );
};
