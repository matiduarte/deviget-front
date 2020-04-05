export default function fixGifExtension(image) {
  return image.includes('gifv') ? image.replace('gifv', 'gif') : image;
}
