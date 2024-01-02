function formatPropertyTitle(slug: string) {
  const words = slug.split('-');
  const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  return capitalizedWords.join(' ');
}

export default formatPropertyTitle;
