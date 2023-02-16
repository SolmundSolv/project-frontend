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
        <a
          className="text-sm font-medium"
          href={`/account/${localStorage.getItem("token")}`}
        >
          {ctx?.user?.user.name ?? ""}
        </a>{" "}
        <br />
        <button
          className="text-sm font-medium"
          type="submit"
          onClick={() => {
            localStorage.removeItem("token");
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
      <Link href="/signin" className="text-sm font-medium">
        Sign in
      </Link>
      <Link href="/signup" className="text-sm font-medium">
        Create account
      </Link>
    </>
  );
}
