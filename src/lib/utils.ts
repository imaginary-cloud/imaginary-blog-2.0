export const convertString = (str: string) => {
  // Convert the string to lowercase
  const lowercaseString = str.toLowerCase();

  // Replace spaces with hyphens
  const resultString = lowercaseString.replace(/\s+/g, '-');

  return resultString;
};
