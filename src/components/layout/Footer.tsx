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

const FooterApp: NextPage<OwnProps> = ({}): JSX.Element => {
  return (
    <Row justify='center' className='footer'>
      EarthPulse test
    </Row>
  );
};

export default FooterApp;
