import { connect } from 'react-redux';
import { handleLogin, handleSignup, handleStatusCheck } from '../../../store/user';

import Login from '../components/Login';

export default connect(
  (state) => ({
    isLoggedIn: state.user.isLoggedIn,
    user: state.user,
  }),
  {
    handleLogin,
    handleSignup,
    handleStatusCheck,
  }
)(Login);
