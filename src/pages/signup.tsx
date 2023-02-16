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
      const res = await fetch("http://localhost:3001/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.statusCode == 403)
        alert(`Account with email ${emailRef.current?.value} already exist`);
      else if (result.access_token) {
        window.location.href = "/signin";
      }
    }
  }
  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <form
        className="w-96 rounded-lg bg-white p-6 shadow-md"
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <h2 className="mb-4 text-lg font-medium">Create Account</h2>
        <div className="mb-4">
          <label
            className="mb-2 block font-medium text-gray-700"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="w-full rounded-lg border border-gray-400 p-2"
            type="text"
            name="name"
            id="name"
            ref={nameRef}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block font-medium text-gray-700"
            htmlFor="email"
          >
            E-mail
          </label>
          <input
            className="w-full rounded-lg border border-gray-400 p-2"
            type="email"
            name="email"
            id="email"
            ref={emailRef}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block font-medium text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full rounded-lg border border-gray-400 p-2"
            type="password"
            name="password"
            id="password"
            ref={passwordRef}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block font-medium text-gray-700"
            htmlFor="cpassword"
          >
            Confirm Password
          </label>
          <input
            className="w-full rounded-lg border border-gray-400 p-2"
            type="password"
            name="cpassword"
            id="cpassword"
            ref={cpasswordRef}
            required
          />
        </div>
        <button className="rounded-lg bg-yellow-400 py-2 px-4 text-white hover:bg-yellow-300">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Signup;
