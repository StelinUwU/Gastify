import { ReactComponent as LogoutIcon } from "../images/log-out.svg";
import { useHistory } from "react-router-dom";
import Button from "../Elements/Button";
import { auth } from "../firebase/firebaseConfig";
const LogoutButton = () => {
  const history = useHistory();
  const logout = async () => {
    try {
      await auth.signOut();
      history.push("/login");
    } catch (error) {}
  };
  return (
    <Button iconoGrande as="button" onClick={logout}>
      <LogoutIcon></LogoutIcon>
    </Button>
  );
};

export default LogoutButton;
