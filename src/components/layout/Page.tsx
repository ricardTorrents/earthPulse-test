import { NextPage } from 'next';
import React from 'react';
import { connect } from 'react-redux';
import { IRootReducers } from '../../reducers';
import FooterApp from './Footer';
import Header from './Header';

interface OwnProps {
  children?: any;
  className?: string;
}

const Page: NextPage<OwnProps> = ({ children, className }): JSX.Element => {
  return (
    <div className={className}>
      <Header />
      {children}
      <FooterApp />
    </div>
  );
};

export default Page;
