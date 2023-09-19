import { useSelector } from "react-redux";
import Home from "../components/Home";
import Login from "../components/Login";
import { RootState } from "../Store/store";

export default function Landing() {
  const user = useSelector((state: RootState) => state.user);
  console.log(user, "user");
  return (
    <div className="landing-container">
      {user?.isAuthenticated ? <Home /> : <Login />}
    </div>
  );
}
