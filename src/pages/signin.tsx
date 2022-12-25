import React, { useRef } from "react";

const Signin = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };
    try {
      const res = await fetch("http://localhost:3001/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      localStorage.setItem("token", result.access_token);
      
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form
      onSubmit={(e) => {
        onSubmit(e);
      }}
    >
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
      <button type="submit">Login</button>
    </form>
  );
};

export default Signin;
