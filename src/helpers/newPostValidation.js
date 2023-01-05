const postValidation = (postData) => {
  let error;
  if (postData.title.trim().length < 3) {
    error = "Title is too short";
  } else if (postData.body.trim().length < 10) {
    error = "Not enough post content";
  } else if (postData.tags.trim().length === 0) {
    error = "Add tag, please";
  }
  if (postData.image.size > 0) {
    if (postData.image.size > 500000) {
      error =
        "This image is too big. Please upload an image with maximum of size 500kb";
    } else if (
      postData.image.type !== "image/jpeg" &&
      postData.image.type !== "image/png"
    ) {
      error =
        "Wrong type of image. Please upload an image in .png or .jpg format";
    }
  } else return
  return error;
};

export default postValidation;
