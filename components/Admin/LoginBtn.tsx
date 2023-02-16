import { useSession, signIn, signOut } from "next-auth/react";
import { useStateContext } from "../../context/StateContext";
import Link from "next/link";
import Router from "next/router";

export default function LoginBtn() {
  const { data: session } = useSession();
  const ctx = useStateContext();
  function isLogin() {
    if (!ctx?.user?.user) {
      return false;
    }
    return true;
  }
  if (isLogin()) {
    return (
      <>
        <p className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100">
          {ctx?.user?.user.name ?? ""}
        </p>{" "}
        <button
          className="block w-full px-4 py-2 text-left text-sm font-semibold text-gray-700 hover:bg-gray-100"
          type="submit"
          onClick={() => {
            localStorage.removeItem("token");
            fetch("localhost:3001/auth/logout", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token: localStorage.getItem("token"),
              }),
            });

            window.location.reload();
          }}
        >
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      <Link
        href={`/signin?callbackUrl=${Router.asPath}`}
        className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
      >
        Sign in
      </Link>
      <Link
        href="/signup"
        className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
      >
        Create account
      </Link>
    </>
  );
}
