import UserItem from "./UserItem";

const UsersList = (props) => {
  return (
    <>
      <h1 className={`title title--left`}>All Users</h1>
      <ul className="list">
        {props.users.map((user) => (
          <UserItem
            key={user.id}
            id={user.id}
            image={user.image}
            username={user.username}
          />
        ))}
      </ul>
    </>
  );
};

export default UsersList;
