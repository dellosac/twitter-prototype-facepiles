import IMAGE_MANIFEST from "../config/imageManifest.json";

const IMAGE_PRELOADER = {
  loadImages: () => {
    const { images } = IMAGE_MANIFEST;

    images.forEach((imgPath) => {
      const img = new Image();
      img.src = imgPath;
    });

    console.log("all images loaded");
  },
};

export default IMAGE_PRELOADER;
