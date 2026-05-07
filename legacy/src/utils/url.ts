export const tryAddHttps = (url?: string) => {
  if (!url) {
    return url;
  } else if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  if (url.includes('://')) {
    throw new Error(`Invalid URL: ${url}`);
  }

  return `https://${url}`;
};
