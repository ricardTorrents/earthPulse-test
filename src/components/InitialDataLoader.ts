import { NextPage } from 'next';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { setInitialData } from '../actions/dataActions';

type Props = ReturnType<typeof mapDispatchToProps>;

const InitialDataLoader: NextPage<Props> = ({ setInitialData }): any => {
  useEffect(() => {
    setInitialData();
  });
  return null;
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      setInitialData,
    },
    dispatch
  );
export default connect(null, mapDispatchToProps)(InitialDataLoader);
