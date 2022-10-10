const regex = /(\d+)\/$/;
export const getUrlID = (link: string) => {
  const match = link?.match(regex);
  return match && match[1];
};
