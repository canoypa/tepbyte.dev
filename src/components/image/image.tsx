import { HTMLMotionProps } from 'framer-motion';
import { FC, ImgHTMLAttributes } from 'react';
import { LightboxImage } from './lightbox_image';

type InternalImageProps =
  | ({
      lightbox: true;
    } & HTMLMotionProps<'img'>)
  | ({
      lightbox?: false;
    } & ImgHTMLAttributes<HTMLImageElement>);

export type ImageProps = InternalImageProps;

export const Image: FC<ImageProps> = ({ ...otherProps }) => {
  return otherProps.lightbox ? (
    <LightboxImage {...otherProps} />
  ) : (
    <img {...otherProps} />
  );
};
