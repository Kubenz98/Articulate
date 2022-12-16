import { Suspense } from "react";
import { useLoaderData, defer, Await } from "react-router-dom";
import Comments from "../components/Comments/Comments";
import { getPostComments } from "../utils/api";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";


const CommentsPage = () => {
  const data = useLoaderData();

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Await resolve={data.comments}>
        {(loadedComments) => <Comments data={loadedComments} />}
      </Await>
    </Suspense>
  )

}

export default CommentsPage;

export async function loader({ params }) {
  return defer({ comments: getPostComments(params.id) });
}