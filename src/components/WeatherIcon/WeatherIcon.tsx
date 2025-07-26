type WeatherIconProps = {
  iconId: string;
  size?: number;
};

export const WeatherIcon = ({ iconId, size = 48 }: WeatherIconProps) => (
  <svg width={size} height={size}>
    <use xlinkHref={`#${iconId}`} />
  </svg>
);
