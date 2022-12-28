import { Form, Link, useActionData } from "react-router-dom";
import { useEffect, useState } from "react";

const Authentication = () => {

  const action = useActionData();

  const [error, setError] = useState(null);

  useEffect(() => {
      setError(action);
  }, [action]);

  return (
    <>
      <h1>Login</h1>
      <Form className="form" method="post">
        <div className="form__controls">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div className="form__controls">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" />
        </div>
        <div className="form__actions">
          <Link to="../signup">Click here to create new account</Link>
        </div>
        {error && <p className="error-form">{error}</p>}
        <div className="form__actions">
          <button className="button button--link">Login</button>
        </div>
      </Form>
    </>
  );
};

export default Authentication;
