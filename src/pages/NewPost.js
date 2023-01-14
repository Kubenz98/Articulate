import NewPostForm from "../components/Posts/NewPostForm";
import { redirect, useNavigate, useNavigation } from "react-router-dom";
import { auth } from "../firebase";
import { writeNewPost } from "../api";
import postValidation from "../helpers/newPostValidation";

const NewPost = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const cancel = () => {
    navigate(-1);
  };

  return (
    <NewPostForm
      onCancel={cancel}
      submitting={navigation.state === "submitting"}
    />
  );
};

export default NewPost;

export async function action({ request }) {
  const data = await request.formData();

  const postData = {
    title: data.get("title"),
    tags: data.get("tags"),
    body: data.get("text"),
    image: data.get("image"),
  };

  const postIsInvalid = postValidation(postData);

  if (postIsInvalid) {
    return postIsInvalid;
  }

  await writeNewPost(auth, postData);

  return redirect("/posts?page=1");
}
