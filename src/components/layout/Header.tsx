import { NextPage } from 'next';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IRootReducers } from '../../reducers';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { logout } from '../../actions/dataActions';
import { connect } from 'react-redux';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
interface OwnProps {
  children?: any;
}
type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps;

const Header: NextPage<Props> = ({ user, logout }): JSX.Element => {
  const router = useRouter();
  const handlelogout = () => {
    router.replace('/');
    logout();
  };
  const renderAuthButtons = () => {
    return (
      <div className='buttons-auth-container'>
        <Button className='buttonsAuth'>
          <Link href='auth/login'>Login</Link>
        </Button>
        <Button className='buttonsAuth'>
          <Link href='auth/register'>Register</Link>
        </Button>
      </div>
    );
  };
  const renderLogoutButton = () => {
    return (
      <div className='buttons-auth-container'>
        {`${user.name} ${user.lastname}`}
        <Button className='buttonsAuth' onClick={handlelogout}>
          Logout
        </Button>
      </div>
    );
  };

  return (
    <Row className='header'>
      <Col span={8} className='title'>
        <h1> Earth Pulse Test</h1>
      </Col>
      <Col span={8} className='auth-container'>
        {user ? renderLogoutButton() : renderAuthButtons()}
      </Col>
    </Row>
  );
};

const mapStateToProps = (state: IRootReducers) => {
  return {
    user: state.data.user,
  };
};
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      logout,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Header);
