const postValidation = (postData) => {
  let error;
  if (postData.title.trim().length < 3) {
    error = "Title is too short";
  } else if (postData.body.trim().length < 10) {
    error = "Not enough post content";
  } else if (postData.tags.trim().length === 0) {
    error = "Add tag, please";
  } else if (postData.image.size > 4000000) {
    error =
      "This image is too big. Please upload an image with maximum of size 4mb";
  } else if (
    postData.image.type !== "image/jpeg" &&
    postData.image.type !== "image/png"
  ) {
    error =
      "Wrong type of image. Please upload an image in .png or .jpg format";
  }
  return error;
};

export default postValidation;
