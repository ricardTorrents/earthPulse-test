import 'leaflet/dist/leaflet.css';
import { NextPage } from 'next';
import { useEffect } from 'react';
import { Circle, MapContainer, Popup, TileLayer } from 'react-leaflet';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { fetchUserPositions } from '../actions/dataActions';
import { IRootReducers } from '../reducers';

interface OwnProps {
  children?: any;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps;

const Map: NextPage<Props> = ({
  fetchUserPositions,
  usersPositions,
  user,
}): JSX.Element => {
  useEffect(() => {
    fetchUserPositions();
  }, []);

  return (
    <MapContainer
      center={[
        user ? user.latitude : 41.221112,
        user ? user.longitude : 41.221112,
      ]}
      zoom={15}
      scrollWheelZoom={false}
      style={{ height: 400, width: '100%' }}
    >
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      {user && (
        <Circle
          center={[
            user ? user.latitude : 41.221112,
            user ? user.longitude : 41.221112,
          ]}
          pathOptions={{
            color: 'blue',
          }}
        >
          <Popup>You registered here</Popup>
        </Circle>
      )}

      {usersPositions?.map((otherUser) => {
        if (otherUser.name !== `${user.name} ${user.lastname}`) {
          console.log('otherUser', otherUser);

          return (
            <Circle
              center={[otherUser.latitude, otherUser.longitude]}
              pathOptions={{
                color: 'red',
                radius: 100,
              }}
            >
              <Popup>{otherUser.name}</Popup>
            </Circle>
          );
        }
      })}
    </MapContainer>
  );
};

const mapStateToProps = (state: IRootReducers) => {
  return {
    user: state.data.user,
    usersPositions: state.data.userPositions,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ fetchUserPositions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Map);
