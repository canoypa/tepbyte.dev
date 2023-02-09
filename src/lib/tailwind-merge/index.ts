import { extendTailwindMerge } from 'tailwind-merge';

const isTypographyToken = (value: string) => {
  const pattern =
    /(?:display|headline|body|label|title)-(?:large|medium|small)/;
  return pattern.test(value);
};

export const twMerge = extendTailwindMerge({
  classGroups: {
    'font-size': [{ text: [isTypographyToken] }],
  },
});
