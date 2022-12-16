import { Suspense } from "react";
import { useLoaderData, defer, Await } from "react-router-dom";
import Comments from "../components/Comments/Comments";
import { getPostComments } from "../utils/api";


const CommentsPage = () => {
  const data = useLoaderData();

  return (
    <Suspense fallback={<p>Loading...</p>}>
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