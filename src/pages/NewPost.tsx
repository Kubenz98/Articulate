import React from "react";
import NewPostForm from "../components/Posts/NewPostForm";
import { json, redirect, useNavigate, useNavigation } from "react-router-dom";
import { auth } from "../firebase";
import { writeNewPost } from "../api/postsApi";
import postValidation from "../helpers/newPostValidation";

import { WritePostFormData } from "src/ts/postInterfaces";

const NewPostPage = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const cancel = (): void => {
    navigate(-1);
  };

  return (
    <NewPostForm
      onCancel={cancel}
      submitting={navigation.state === "submitting"}
    />
  );
};

export default NewPostPage;

export async function action(args: { request: Request }) {
  const { request } = args;
  const data = await request.formData();

  const postData: WritePostFormData = {
    title: data.get("title") as string,
    tags: data.get("tags") as string,
    body: data.get("text") as string,
    image: data.get("image") as File,
    date: Date.now() as number
  };

  const postIsInvalid = postValidation(postData);

  if (postIsInvalid) {
    return postIsInvalid;
  }
  try {
    await writeNewPost(auth, postData);
  } catch (err) {
    throw json({ code: err.code });
  }
  return redirect("/posts/queue?page=1");
}
