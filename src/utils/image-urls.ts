function generateImageUrl(
  image: string,
  category: string,
  width: number = 1600
) {
  return `https://res.cloudinary.com/leoclub/image/upload/c_fill,g_center,q_75,w_${width}/${category}/${image}`;
}

export default generateImageUrl;
