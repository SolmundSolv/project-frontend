import { useSession, signIn, signOut } from "next-auth/react";
import { useStateContext } from "../context/StateContext";
import Link from "next/link";

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
        {ctx?.user?.user?.isEmployee ? (
          <Link className="text-sm font-medium" href={`/admin/profile`}>
            {ctx?.user?.user.name ?? ""}
          </Link>
        ) : (
          <Link
            className="text-sm font-medium"
            href={`/account/${localStorage.getItem("token")}`}
          >
            {ctx?.user?.user.name ?? ""}
          </Link>
        )}
        {/* <br /> */}
        <button
          className="text-left text-sm font-medium"
          type="submit"
          onClick={() => {
            fetch("http://localhost:3001/auth/logout", {
              method: "POST",

              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token: localStorage.getItem("token"),
              }),
            }).then(() => {
              localStorage.removeItem("token");
              window.location.reload();
            });
          }}
        >
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      <Link href="/signin" className="text-sm font-medium">
        Sign in
      </Link>
      <Link href="/signup" className="text-sm font-medium">
        Create account
      </Link>
    </>
  );
}
