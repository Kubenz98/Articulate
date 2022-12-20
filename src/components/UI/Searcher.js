import classes from "./Searcher.module.scss"

const Searcher = (props) => {

  return (
    <div className={classes.container}>
    <h1 className={classes.title}>{props.title}</h1>
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