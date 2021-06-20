import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IRootReducers } from '../../reducers';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { register, setAuthError } from '../../actions/dataActions';
import { connect } from 'react-redux';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
interface OwnProps {
  children?: any;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps;

const Register: NextPage<Props> = ({
  register,
  setAuthError,
  authError,
}): JSX.Element => {
  const router = useRouter();
  const onFinish = async (values: any) => {
    await register(
      values.name,
      values.lastname,
      values.email,
      values.password,
      values.latitude,
      values.longitude
    );
    router.replace('/');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect((): any => {
    return setAuthError(null);
  }, []);

  return (
    <Row justify='center' className='register--container'>
      <Col>
        <h2 className='register--title'>Create your account!</h2>
      </Col>

      <Col span={24} className='register--box'>
        {authError && <div className='register--error'>{authError}</div>}
        <Form
          name='basic'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            className='basicFormItem'
            label='Name'
            name='name'
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input type='text' />
          </Form.Item>
          <Form.Item
            className='basicFormItem'
            label='Lastname'
            name='lastname'
            rules={[{ required: true, message: 'Please input your Lastname!' }]}
          >
            <Input type='text' />
          </Form.Item>
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
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 8, message: 'Introduce at least 8 characters' },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            className='basicFormItem'
            label='Repeat password'
            name='repetPassword'
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 8, message: 'Introduce at least 8 characters' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            className='basicFormItem'
            label='Latitude'
            name='latitude'
            rules={[{ required: true, message: 'Please input your latitude!' }]}
          >
            <Input type='number' />
          </Form.Item>
          <Form.Item
            className='basicFormItem'
            label='Longitude'
            name='longitude'
            rules={[{ required: true, message: 'Please input your latitude!' }]}
          >
            <Input type='number' />
          </Form.Item>

          <Form.Item className='formButton'>
            <Button className='button' htmlType='submit'>
              Register
            </Button>
          </Form.Item>
        </Form>
        <Row className='auth-bottom-message'>
          <div>You have an account </div>
          <div className='link'>
            <Link href='/auth/login'>Login here!</Link>
          </div>
        </Row>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state: IRootReducers) => {
  return {
    authError: state.data.authError,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      register,
      setAuthError,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Register);
