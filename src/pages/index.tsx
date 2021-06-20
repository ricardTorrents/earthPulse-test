import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import Page from '../components/layout/Page';
interface OwnProps {
  children?: any;
}
type Props = OwnProps;

const Home: NextPage<Props> = (): JSX.Element => {
  return (
    <Page>
      <div className={'home-container'}>
        <main className='home'>
          <h1 className='title'>
            Welcome to{' '}
            <a className='link' href='https://earthpulse.es/'>
              EarthPulse
            </a>{' '}
            Test
          </h1>

          <h1 className='sub-title'>
            Find out where other users have registered!
          </h1>

          <div className='grid'>
            <div className='card'>
              <h2>Step 1</h2>
              <p>
                Create your account and introudce your latitude and longitude
              </p>
            </div>
            <div className='card'>
              <h2>Step 2</h2>
              <p>Login in this page!</p>
            </div>
            <div className='card'>
              <h2>Step 3</h2>
              <p>
                Go to the{' '}
                <span className='link'>
                  <Link href='/dashboard'>dashboard!</Link>
                </span>
              </p>
            </div>
            <div className='card'>
              <h2>Step 4</h2>
              <p>See where other users registered!</p>
            </div>
          </div>
        </main>
      </div>
    </Page>
  );
};

export default Home;
