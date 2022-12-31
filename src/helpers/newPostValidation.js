const postValidation = (postData) => {
  let error;
  if (postData.title.trim().length < 3) {
    error = "Title is too short";
  } else if (postData.body.trim().length < 10) {
    error = "Not enough post content";
  } else if (postData.tags.trim().length === 0) {
    error = "Add tag, please";
  } 
  return error
};

export default postValidation;
