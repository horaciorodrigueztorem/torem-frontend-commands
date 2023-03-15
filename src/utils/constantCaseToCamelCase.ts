export const convertToCamelCase = (text: string): string => {
  const splitted = text.toLocaleLowerCase().split("_");

  const adapted = splitted.map((chunk, index) => {
    if (index === 0) {
      return chunk;
    } else {
      return chunk.charAt(0).toUpperCase() + chunk.slice(1);
    }
  });

  return adapted.join("");
};
