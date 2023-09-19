import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../Store/store";
import { resetUserState } from "../Store/userSlice";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const handleResetUserState = () => {
    dispatch(resetUserState());
  };
  return (
    <div className="main-container-home">
      <div className="content-container-home">
        <h1 className="title">You are logged in</h1>
        <div className="nav-button-container-home">
          <Link to={`/${user.user?.username}/dashboard`}>
            <Button>Contacts</Button>
          </Link>
          <Button onClick={handleResetUserState}>Log out</Button>
        </div>
      </div>
    </div>
  );
}
