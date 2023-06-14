import moment from 'moment';

const formattedTimeStamp = date => {
  const momentTimestamp = moment(date);

  const timestamp =
    momentTimestamp.diff(moment(), 'days') > -2
      ? momentTimestamp.fromNow()
      : momentTimestamp.format('MMM D, YYYY');

  return timestamp;
};

export const expiryDate = date => {
  const expirationDate = moment(date)
    .add(30, 'days')
    .format('YYYY-MM-DDTHH:mm:ss.SSSZ');

  return expirationDate;
};

export default formattedTimeStamp;
