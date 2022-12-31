import { Suspense } from "react";
import { useLoaderData, defer, Await, useNavigation } from "react-router-dom";
import Comments from "../components/Comments/CommentsList";
import { getPostComments, writePostComment } from "../utils/api";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { auth } from "../firebase";

const CommentsPage = () => {
  const navigation = useNavigation();
  const data = useLoaderData();

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Await resolve={data.comments}>
        {(loadedComments) => <Comments data={loadedComments} submitting={navigation.state === 'submitting'} />}
      </Await>
    </Suspense>
  );
};

export default CommentsPage;

export async function loader({ params }) {
  return defer({ comments: getPostComments(params.id) });
}

export async function action({ request, params }) {
  const { id } = params;
  let reset;

  const data = await request.formData();

  const commentBody = data.get("comment");

  await writePostComment(auth, commentBody, id);

  reset = true;

  return reset;
}
