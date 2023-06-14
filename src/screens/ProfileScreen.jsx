import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Screen from '../components/Screen';
import {getUserProfile} from '../redux/reducers/profileReducer';
import ProfileList from '../components/ProfileList';

const ProfileScreen = ({route}) => {
  const {auth, profile} = useSelector(state => state);
  const dispatch = useDispatch();
  const {id} = route.params;

  useEffect(() => {
    if (profile.ids.every(item => item !== id)) {
      dispatch(getUserProfile({id, auth}));
    }
  }, [id, auth, dispatch, profile.ids]);

  return (
    <Screen>
      <ProfileList profile={profile} id={id} dispatch={dispatch} auth={auth} />
    </Screen>
  );
};

export default ProfileScreen;
