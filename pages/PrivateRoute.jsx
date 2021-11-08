import react from "react";
import { useAuth } from "../contexts/AuthContext";
import LoginPAge  from './auth/LoginPage'

const PrivateRoute = (Component) => {
  const Auth = (props) => {
    // Login data added to props via redux-store (or use react context for example)
    const { currentUser } = useAuth();

    // If user is not logged in, return login component
     return currentUser ? <Component {...props} /> : <LoginPAge />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default PrivateRoute;
