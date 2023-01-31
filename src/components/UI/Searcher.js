import classes from "./Searcher.module.scss"

const Searcher = (props) => {

  let title = 'Main Posts'

  if(props.path === '/posts/queue') {
    title = 'Posts Queue'
  }

  return (
    <div className={classes.container}>
    <h1 className={classes.title}>{title}</h1>
    {
      <input
        className={classes.searcher}
        onChange={props.onChange}
        type="text"
        placeholder={props.placeholder}
      />
    }
  </div>
  )
}

export default Searcher;