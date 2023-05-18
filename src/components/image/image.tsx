import { FC, ImgHTMLAttributes } from 'react';
import { LightboxImage } from './lightbox_image';

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  lightbox?: boolean;
};

export const Image: FC<ImageProps> = ({ lightbox, ...otherProps }) => {
  return lightbox ? <LightboxImage {...otherProps} /> : <img {...otherProps} />;
};
