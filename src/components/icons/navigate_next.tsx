import { FC } from "react";

export type IconProps = Partial<{
  width: number;
  height: number;
}>;

export const NavigateNext: FC<IconProps> = ({ width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={width}
      height={height}
    >
      <path d="m18.75 36-2.15-2.15 9.9-9.9-9.9-9.9 2.15-2.15L30.8 23.95Z" />
    </svg>
  );
};
