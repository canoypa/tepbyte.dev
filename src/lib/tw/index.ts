export const tw = (
  strings: TemplateStringsArray,
  ...values: unknown[]
): string => {
  let result = strings[0];

  for (let i = 1; i < strings.length; i++) {
    result += values[i - 1];
    result += strings[i];
  }

  return result.replaceAll(/\s+/gm, ' ').trim();
};
