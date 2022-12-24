import AddPost from "../components/Posts/NewPost";
import { redirect, useNavigate, useNavigation, useActionData } from "react-router-dom";
import { addPost } from "../utils/api";

const NewPost = () => {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();


  const cancel = () => {
    navigate(-1);
  };
  
  return (
    <>
      <h1>Add New Post</h1>
      {data && data.isError && <p className="input-error">{data.message}</p>}
      <AddPost onCancel={cancel} submitting={navigation.state === 'submitting'} />
    </>
  );
};

export default NewPost;

export async function action({ request }) {
  const data = await request.formData();
  
  const validationError = await addPost(data);

  if (validationError) {
    return validationError;
  }
  return redirect("/blog");
}
