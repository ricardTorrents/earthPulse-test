import { NextPage } from 'next';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IRootReducers } from '../../reducers';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { login } from '../../actions/dataActions';
import { connect } from 'react-redux';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
interface OwnProps {
  children?: any;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps;

const Login: NextPage<Props> = ({ user, login }): JSX.Element => {
  const router = useRouter();
  const onFinish = (values: any) => {
    login(values.email, values.password);
    router.replace('/');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row justify='center' className='login--container'>
      <Col>
        <h2 className='login--title'>Welcome!</h2>
      </Col>
      <Col span={24} className='login--box'>
        <Form
          name='basic'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            className='basicFormItem'
            label='Email'
            name='email'
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Introduce a valid email' },
            ]}
          >
            <Input type='email' />
          </Form.Item>

          <Form.Item
            className='basicFormItem'
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item className='formButton'>
            <Button className='button' htmlType='submit'>
              Login
            </Button>
          </Form.Item>
        </Form>
        <Row className='auth-bottom-message'>
          <div>You don't have an account </div>
          <div className='link'>
            <Link href='/posts/first-post'>Register here!</Link>
          </div>
        </Row>
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
      login,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Login);
