import React from "react";
import { Form } from "react-router-dom";
import { useActionData } from "react-router-dom";

interface Props {
  submitting: boolean;
}

const ForgotPassword = (props: Props) => {
  const error = useActionData() as string;

  return (
    <>
      <h1>Password reset</h1>
      <p>Check your mailbox after entering your e-mail.</p>
      <Form className="form" method="post">
        <div className="form__controls">
          <label htmlFor="email">E-mail</label>
          <input id="email" name="email" type="email" required />
        </div>
        {error && <p className="error-form">{error}</p>}
        <div className="form__actions">
          <button className="button button--link" disabled={props.submitting}>
            {props.submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </Form>
    </>
  );
};

export default ForgotPassword;
