const postValidation = (postData) => {
  let error;

  if (postData.title.trim().length < 3) {
    error = "Title is too short";
  } else if (postData.body.trim().length < 10) {
    error = "Not enough post content";
  } else if (postData.tags.trim().length === 0) {
    error = "Add a tag, please";
  } else if (postData.tags.trim().length > 25) {
    error = "tags are too long"
  }
  if (postData.image.size > 0) {
    if (postData.image.size > 524288) {
      error =
        "This image is too big. Please upload an image with maximum of size 500kb";
    } else if (
      postData.image.type !== "image/jpeg" &&
      postData.image.type !== "image/png"
    ) {
      error =
        "Wrong type of image. Please upload an image in .png or .jpg format";
    }
  }
  return error;
};

export default postValidation;
