import AddPost from "../components/Posts/NewPost";
import { redirect, useNavigate, useNavigation } from "react-router-dom";
import { auth } from "../firebase";
import { writeNewPost } from "../utils/api";
import postValidation from "../helpers/newPostValidation";

const NewPost = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const cancel = () => {
    navigate(-1);
  };

  return (
    <>
      <h1>Add New Post</h1>
      <AddPost
        onCancel={cancel}
        submitting={navigation.state === "submitting"}
      />
    </>
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
