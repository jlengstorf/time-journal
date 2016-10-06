import React from 'react';
import { connect } from 'react-redux';
import UserInfo from '../components/UserInfo';
import { userLogin } from '../store/user';

export default connect(
  (state) => ({
    imageUrl: state.user.imageUrl || 'http://placekitten.com/80/80',
    displayName: state.user.displayName || 'Johnny User',
    email: state.user.email || 'johnny.user@example.org',
  }),
  {
    userLogin,
  }
)(UserInfo);
