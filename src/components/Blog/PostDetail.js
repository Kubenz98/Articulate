import classes from "./PostDetail.module.scss"

const BlogPostDetail = (props) => {

  let postClass = classes.post;
  let tagsClass = classes['post__tags'];
  if(props.post.id % 2 === 0) {
    postClass = `${classes.post} ${classes['post--gold']}`;
    tagsClass = `${classes['post__tags']} ${classes['post__tags--gold']}`;
  }
  
  return (
    <div className={postClass}>
      <span className={tagsClass}>{props.post.tags.join(", ")}</span>
    <h3 className={classes['post__title']}>{props.post.title}</h3>
    <p className={classes['post__text']}>{props.post.body}</p>
    </div>
  )
}

export default BlogPostDetail;