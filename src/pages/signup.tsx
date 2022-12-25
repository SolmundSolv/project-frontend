import React, { useRef } from "react";

const Signup = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const cpasswordRef = useRef<HTMLInputElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (passwordRef.current?.value == cpasswordRef.current?.value) {
      const formData = {
        name: nameRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      };
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result == "P2002")
        alert(`Account with email ${emailRef.current?.value} already exist`);
    }
  }
  return (
    <form
      onSubmit={(e) => {
        onSubmit(e);
      }}
    >
      <label htmlFor="name">Name</label>
      <input type="text" name="name" id="name" ref={nameRef} required />
      <label htmlFor="email">E-mail</label>
      <input type="email" name="email" id="email" ref={emailRef} required />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        ref={passwordRef}
        required
      />
      <label htmlFor="cpassword">Confirm Password</label>
      <input
        type="password"
        name="cpassword"
        id="cpassword"
        ref={cpasswordRef}
        required
      />
      <button type="submit">Sign up</button>
    </form>
  );
};

export default Signup;
