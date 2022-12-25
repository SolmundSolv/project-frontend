import { useSession, signIn, signOut } from "next-auth/react";
import { useStateContext } from "../context/StateContext";
import Link from "next/link";

export default function LoginBtn() {
  const { data: session } = useSession();
  const ctx = useStateContext();
  if (ctx?.user?.user) {
    return (
      <>
        <p className="text-sm font-medium">{ctx.user.user.name ?? ""}</p> <br />
        <button
          className="text-sm font-medium"
          type="submit"
          onClick={() => localStorage.removeItem("token")}
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
