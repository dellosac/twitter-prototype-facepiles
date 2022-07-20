import IMAGE_MANIFEST from "../config/imageManifest.json";

const IMAGE_PRELOADER = {
  loadImages: async () => {
    const { images } = IMAGE_MANIFEST;

    for (const imgPath of images) {
      const img = new Image();
      img.src = imgPath;
    }

    // images.forEach((imgPath) => {
    //   const img = new Image();
    //   img.src = imgPath;
    // });

    console.log("all images loaded");

    return true;
  },
};

export default IMAGE_PRELOADER;
