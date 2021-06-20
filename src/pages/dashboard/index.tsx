import { Col, Row } from 'antd';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import Page from '../../components/layout/Page';
import { IRootReducers } from '../../reducers';
interface OwnProps {
  children?: any;
}

type Props = ReturnType<typeof mapStateToProps> & OwnProps;

const HomePage: NextPage<Props> = ({ user }): JSX.Element => {
  const router = useRouter();

  const Map = dynamic(
    () => import('../../components/map'), // replace '@components/map' with your component's location
    { ssr: false } // This line is important. It's what prevents server-side render
  );

  if (!user) {
    return (
      <Page className='dashboard'>
        {console.log('user2', user)}
        <Row className='map-container'>
          {' '}
          <Col className='card'>
            <h2>
              This page is only for registered users, go to the{' '}
              <a className='link' href='/'>
                land page
              </a>
            </h2>
          </Col>
        </Row>
      </Page>
    );
  }
  return (
    <Page className='dashboard'>
      {console.log('user2', user)}
      <Row className='map-container'>
        {' '}
        <Col className='card'>
          <h2>See where other users register</h2>
          <Map />
        </Col>
      </Row>
    </Page>
  );
};

const mapStateToProps = (state: IRootReducers) => {
  return {
    user: state.data.user,
  };
};

export default connect(mapStateToProps, null)(HomePage);
