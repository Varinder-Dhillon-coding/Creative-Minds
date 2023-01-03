import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "/utils/firebase";
import {SiMinds} from "react-icons/si"

export default function Nav() {
  const [user, loading] = useAuthState(auth); // to get user's data

  return (
    <nav>
      <Link href="/">
        <h2><SiMinds size={30} className="Icons"></SiMinds> Creative  Minds</h2>
      </Link>
      <ul>
        {!user && ( // if user is not logged in show them this
          <Link href={"/auth/login"}>
            <button>Join Now!</button>
          </Link>
        )}
        {user && (
          <div className="Nav-user-dash">
            <Link href={"/dashboard"}>
              <img src={user? user.photoURL :""} />
            </Link>
            <Link href={"/post"}>
              <button>Post</button>
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
}
