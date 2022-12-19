import classes from "./UserItem.module.scss"
import { Link} from "react-router-dom"

const UserItem = (props) => {
  
  // const navigate = useNavigate();
  // // const link = () => {
  // //   navigate(`${props.id}`)
  // // }
  return (
    <Link to={props.id.toString()} className={classes.user}>
      <div className={classes['user__image']}><img src={props.image} alt='avatar' /></div>
      <h3 className={classes['user__name']}>{props.username}</h3>
    </Link>
  )
}

export default UserItem;