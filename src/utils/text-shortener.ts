function textShortener(text: string, limit: number) {
  return text.length > limit ? text.substring(0, limit - 3).concat('...') : text;
}

export default textShortener;
