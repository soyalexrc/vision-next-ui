const breakpoints = [4320, 2160, 1080, 640, 384, 256, 128];

function formatSlides(images: string[]) {
  return images.map((image: string) => {
    const width = 1920;
    const height = 1080;
    return {
      src: image,
      width,
      height,
      srcSet: breakpoints.map((breakpoint) => {
        const breakpointHeight = Math.round((height / width) * breakpoint);
        return {
          src: image,
          width: breakpoint,
          height: breakpointHeight,
        };
      }),
    };
  });
}

export default formatSlides;
