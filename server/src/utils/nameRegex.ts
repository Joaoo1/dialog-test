export const createSearchNameRegex = (name: string) =>
  new RegExp(
    name
      .trim()
      .split(' ')
      .map(n => `\\w*${n}\\w*`)
      .join('\\s'),
    'i'
  );
