import {
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import Screen from '../components/Screen';
import {LIST_MARGIN} from '../constants';
import Row from '../components/Row';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomButton from '../components/FormikForm/CustomButton';
import AppTextInput from '../components/FormikForm/AppTextInput';
import PropertyLocationCoords from '../components/FormikForm/PropertyLocationCoords';
import ImageInputList from '../components/FormikForm/ImageInputList';
import AppFormAmenities from '../components/FormikForm/AppFormAmenities';
import {useDispatch, useSelector} from 'react-redux';
import {createPost, updatePost} from '../redux/reducers/propertyReducer';
import {useNavigation} from '@react-navigation/native';
import colors from '../theme/colors';
import {weight} from '../theme/fonts';
import {updateCredits} from '../redux/reducers/authReducer';
import TestPicker from '../components/TestPicker';
import BottomSheetModal from '../components/BottomSheet';
import PayBox from '../components/PayBox';

// for dummy
// const validationSchema = Yup.object().shape({
//   address: Yup.string().max(255).label('Address'),
//   description: Yup.string().max(255).label('Description'),
//   beds: Yup.number().label('Beds'),
//   baths: Yup.number().label('Baths'),
//   sqft: Yup.number().max(10000).label('Sq Ft'),
//   rent: Yup.number().max(100000).label('Rent'),
//   sharingType: Yup.string().label('Sharing'),
//   furnishing: Yup.string().label('Furnishing'),
//   images: Yup.array(),
//   amenities: Yup.array(),
//   geometry: Yup.object()
//     .shape({
//       latitude: Yup.number(),
//       longitude: Yup.number(),
//     })

//     .label('Coordinates'),
// });

const validationSchema = Yup.object().shape({
  address: Yup.string().required('Required').max(255).label('Address'),
  description: Yup.string()
    .required('Required')
    .max(500)
    .test(
      'no-mobile-number',
      'Mobile numbers are not allowed in the description',
      value => {
        const words = value.split(' ');

        // Define a regular expression pattern to match mobile numbers
        const mobileNumberPattern = /^\d{10}$/;

        for (const word of words) {
          // Check if the word is a mobile number or contains spaces between digits
          if (mobileNumberPattern.test(word) || /\d\s\d/.test(word)) {
            return false; // Return false to indicate validation failure
          }
        }

        return true; // Return true to indicate validation success
      },
    )
    .label('Description'),
  beds: Yup.string().when('propertyType', {
    is: val =>
      !['Commercial-Rent', 'Commercial-Sale', 'Land/Plot'].includes(val),
    then: () => Yup.number().required('Required').label('Beds'),
    otherwise: () => Yup.string(),
  }),
  floor: Yup.string().when('propertyType', {
    is: val => !['Land/Plot'].includes(val),
    then: () => Yup.number().required('Required').label('Floor'),
    otherwise: () => Yup.string(),
  }),
  baths: Yup.string().when('propertyType', {
    is: val => !['Land/Plot'].includes(val),
    then: () => Yup.number().required('Required').label('Baths'),
    otherwise: () => Yup.string(),
  }),
  commercial: Yup.string().when('propertyType', {
    is: val => ['Commercial-Rent', 'Commercial-Sale'].includes(val),
    then: () => Yup.string().required('Required').label('Commercial Type'),
    otherwise: () => Yup.string(),
  }),
  propertyType: Yup.string().required('Required').label('Property Type'),
  role: Yup.string().required('Required').label('Role'),
  tenantType: Yup.string().when('propertyType', {
    is: val => val === 'PG',
    then: () => Yup.string().required('Required').label('Tenant'),
    // otherwise: () => Yup.string(),
  }),
  sqft: Yup.number().required('Required').max(100000).label('Sq Ft'),
  rent: Yup.number().required('Required').max(990000000).label('Price'),
  sharingType: Yup.string().when('propertyType', {
    is: val => val === 'PG',
    then: () => Yup.string().required('Required').label('Sharing'),
    // otherwise: () => Yup.string(),
  }),
  furnishing: Yup.string().when('propertyType', {
    is: val => !['Land/Plot'].includes(val),
    then: () => Yup.string().required('Required').label('Furnishing'),
    otherwise: () => Yup.string(),
  }),
  images: Yup.array().min(1, 'Please select atleast one image'),
  amenities: Yup.array().min(3, 'Please select atleast 3 amenities'),

  geometry: Yup.object()
    .shape({
      latitude: Yup.number(),
      longitude: Yup.number(),
    })
    .required('Required')
    .label('Coordinates'),
});
const amenities = [
  {key: 1, value: 'AC', selected: false},
  {key: 2, value: 'Fridge', selected: false},
  {key: 3, value: 'Cooler', selected: false},
  {key: 4, value: 'W. Machine', selected: false},
  {key: 5, value: 'Food', selected: false},
  {key: 6, value: 'WiFi', selected: false},
  {key: 7, value: 'Geyser', selected: false},
  {key: 8, value: 'Almirah', selected: false},
  {key: 9, value: 'Table & Chair', selected: false},
  {key: 10, value: 'Parking', selected: false},
  {key: 11, value: 'TV', selected: false},
  {key: 12, value: 'Housekeeping', selected: false},
  {key: 13, value: 'Power backup', selected: false},
  {key: 14, value: 'CCTV', selected: false},
  {key: 15, value: 'RO Water', selected: false},
  {key: 16, value: 'Lift', selected: false},
  {key: 17, value: 'NA Order clear', selected: false},
  {key: 18, value: 'Park Facing', selected: false},
  {key: 19, value: 'On Main Road', selected: false},
  {key: 20, value: 'Negotiable', selected: false},
];

const amenities1 = [
  {key: 1, value: 'AC', selected: false},
  {key: 2, value: 'Fridge', selected: false},
  {key: 3, value: 'Cooler', selected: false},
  {key: 4, value: 'W. Machine', selected: false},
  {key: 5, value: 'Food', selected: false},
  {key: 6, value: 'WiFi', selected: false},
  {key: 7, value: 'Geyser', selected: false},
  {key: 8, value: 'Almirah', selected: false},
  {key: 9, value: 'Table & Chair', selected: false},
  {key: 10, value: 'Parking', selected: false},
  {key: 11, value: 'TV', selected: false},
  {key: 12, value: 'Housekeeping', selected: false},
  {key: 13, value: 'Power backup', selected: false},
  {key: 14, value: 'CCTV', selected: false},
  {key: 15, value: 'RO Water', selected: false},
  {key: 16, value: 'Lift', selected: false},
  {key: 17, value: 'NA Order clear', selected: false},
  {key: 18, value: 'Park Facing', selected: false},
  {key: 19, value: 'On Main Road', selected: false},
  {key: 20, value: 'Negotiable', selected: false},
];

const AddPropertyScreen = ({route}) => {
  const [bedCategory, setBedCategory] = useState(null);
  const [floorCategory, setFloorCategory] = useState(null);
  const [bathCategory, setBathCategory] = useState(null);
  const [furnishingCategory, setFurnishingCategory] = useState(null);
  const [roleCategory, setRoleCategory] = useState(null);
  const [propertyTypeCategory, setPropertyTypeCategory] = useState(null);
  const [commercialTypeCategory, setCommercialTypeCategory] = useState(null);
  const [tenantCategory, setTenantCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sharingCategory, setSharingCategory] = useState(null);
  const [getCoordinates, setGetCoordinates] = useState({});
  const [imageUris, setImageUris] = useState([]);
  const [myData, setMyData] = useState(amenities);
  const dispatch = useDispatch();
  const {auth, status} = useSelector(state => state);
  const navigation = useNavigation();

  const [isRendered, setIsRendered] = useState(false);
  useLayoutEffect(() => {
    // Update the state to indicate that the screen has been rendered
    setIsRendered(true);
  }, []);

  const beds = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
  ];

  const baths = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
  ];

  const furnishing = [
    {label: 'Un-Furnished', value: 'Un-Furnished'},
    {label: 'Semi-Furnished', value: 'Semi-Furnished'},
    {label: 'Fully-Furnished', value: 'Fully-Furnished'},
  ];

  const floorType = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
    {label: '6', value: '6'},
    {label: '7', value: '7'},
    {label: '8', value: '8'},
    {label: '9', value: '9'},
    {label: '10', value: '10'},
    {label: '11', value: '11'},
    {label: '12', value: '12'},
    {label: '13', value: '13'},
    {label: '14', value: '14'},
    {label: '15', value: '15'},
    {label: '16', value: '16'},
    {label: '17', value: '17'},
    {label: '18', value: '18'},
    {label: '19', value: '19'},
    {label: '20', value: '20'},
    {label: '21', value: '21'},
    {label: '22', value: '22'},
    {label: '23', value: '23'},
    {label: '24', value: '24'},
    {label: '25', value: '25'},
  ];

  const propertyType = [
    {label: 'For Sale-House', value: 'For Sale-House'},
    {label: 'For Rent-House', value: 'For Rent-House'},
    {label: 'For Sale-Flat', value: 'For Sale-Flat'},
    {label: 'For Rent-Flat', value: 'For Rent-Flat'},
    {label: 'PG', value: 'PG'},
    {label: 'Commercial-Sale', value: 'Commercial-Sale'},
    {label: 'Commercial-Rent', value: 'Commercial-Rent'},
    {label: 'Land/Plot', value: 'Land/Plot'},
  ];

  const tenantType = [
    {label: 'For All', value: 'For All'},
    {label: 'For Girls only', value: 'For Girls only'},
    {label: 'For Boys only', value: 'For Boys only'},
    {label: 'For Family only', value: 'For Family only'},
  ];

  const roleType = [
    {label: 'Owner', value: 'Owner'},
    {label: 'Broker', value: 'Broker'},
  ];

  const commercialType = [
    {label: 'Office', value: 'Office'},
    {label: 'Shop', value: 'Shop'},
    {label: 'Showroom', value: 'Showroom'},
    {label: 'Co-working', value: 'Co-working'},
  ];

  const sharing = [
    {label: 'Single Sharing', value: 'Single Sharing'},
    {label: 'Double Sharing', value: 'Double Sharing'},
    {label: 'Triple Sharing', value: 'Triple Sharing'},
  ];

  useEffect(() => {
    if (route.params?.onEdit && status.onEdit) {
      navigation.setOptions({
        title: 'Edit Property',
      });
      setPropertyTypeCategory({
        label: status.propertyType,
        value: status.propertyType,
      });
      setImageUris(status.images);
      setGetCoordinates({
        latitude: status.geometry.coordinates[1],
        longitude: status.geometry.coordinates[0],
      });
    } else {
      setMyData(amenities1);
    }
  }, [
    route.params,
    status,
    navigation,
    setPropertyTypeCategory,
    setImageUris,
    setGetCoordinates,
    setMyData,
  ]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleFormSubmit = async values => {
    if (status.onEdit) {
      dispatch(updatePost({values, auth, status}));
      navigation.goBack();
    } else {
      if (!auth.user.verified) {
        Alert.alert('Verify Account', 'Please verify your email Id first.', [
          {
            text: 'Verify',
            onPress: () => navigation.navigate('Account'),
          },
          {text: 'Cancel'},
        ]);

        return;
      }
      Alert.alert(
        'Confirm',
        'This will cost you 💰50 credits to post your property. Are you sure you want to continue?',
        [
          {
            text: 'Yes',
            onPress: async () => {
              const res = await dispatch(
                updateCredits({
                  currentCredits: auth.user.credits,
                  toBeUsed: -50,
                  auth,
                }),
              );

              if (res?.error) {
                handleOpenModal();
                return;
              }

              let newValues = {};

              if (propertyTypeCategory === 'Land/Plot')
                newValues = {
                  ...values,
                  furnishing: '',
                  tenantType: '',
                  sharingType: '',
                  floor: '',
                  beds: '',
                  baths: '',
                  commercial: '',
                };

              if (
                propertyTypeCategory === 'Commercial-Rent' ||
                propertyTypeCategory === 'Commercial-Sale'
              )
                newValues = {
                  ...values,
                  tenantType: '',
                  sharingType: '',
                  beds: '',
                };

              if (propertyTypeCategory === 'PG')
                newValues = {
                  commercial: '',
                  ...values,
                };

              if (
                propertyTypeCategory === 'Commercial-Rent' ||
                propertyTypeCategory === 'Commercial-Sale'
              )
                newValues = {
                  ...values,
                  tenantType: '',
                  sharingType: '',
                  beds: '',
                };

              if (propertyTypeCategory.includes('For')) {
                newValues = {
                  ...values,
                  tenantType: '',
                  sharingType: '',
                  commercial: '',
                };
              }

              dispatch(createPost(newValues, auth));
              navigation.goBack();
            },
          },
          {text: 'No'},
        ],
      );
    }
  };

  const initialValues = {
    address: '',
    beds: '',
    baths: '',
    floor: '',
    sqft: '',
    rent: '',
    role: '',
    furnishing: '',
    commercial: '',
    propertyType: '',
    tenantType: '',
    amenities: [],
    description: '',
    geometry: null,
    sharingType: '',
    images: [],
  };

  if (!isRendered) {
    // Render a loading indicator or placeholder while waiting for the screen to render
    return (
      <View>
        <Text>Waiting for screen to render...</Text>
      </View>
    );
  }

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: LIST_MARGIN + 10}}>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={values => {
            handleFormSubmit(values);
            Keyboard.dismiss();
          }}>
          {({handleSubmit, setFieldValue, values}) => (
            <>
              <AppTextInput
                placeholder="Ex. 123 Main St, Mohali, Punjab"
                label="Complete address"
                name="address"
              />

              <TestPicker
                name="propertyType"
                data={propertyType}
                placeholder="Select Property Type"
                selectedItem={propertyTypeCategory}
                onSelectItem={item => setPropertyTypeCategory(item)}
                width="100%"
                label="Select Property Type"
                makeDisable={status?.onEdit}
                placeText={true}
              />

              <TestPicker
                name="role"
                data={roleType}
                placeholder="Are you ?"
                selectedItem={roleCategory}
                onSelectItem={item => setRoleCategory(item)}
                width="48%"
                label="Who Are you?"
              />
              {propertyTypeCategory === 'PG' || values.propertyType === 'PG' ? (
                <>
                  <TestPicker
                    name="sharingType"
                    data={sharing}
                    placeholder="Select Sharing Type"
                    selectedItem={sharingCategory}
                    onSelectItem={item => setSharingCategory(item)}
                    width="48%"
                    label="Select Sharing Type"
                  />

                  <TestPicker
                    name="tenantType"
                    data={tenantType}
                    placeholder="Select Tenant Type"
                    selectedItem={tenantCategory}
                    onSelectItem={item => setTenantCategory(item)}
                    width="48%"
                    label="Select Tenant Type"
                  />
                </>
              ) : (
                <></>
              )}

              {/* beds and baths */}

              {propertyTypeCategory === 'Commercial-Sale' ||
                (propertyTypeCategory === 'Commercial-Rent' ||
                propertyTypeCategory === 'Land/Plot' ||
                values.propertyType === 'Commercial-Sale' ||
                values.propertyType === 'Commercial-Rent' ||
                values.propertyType === 'Land/Plot' ? (
                  <></>
                ) : (
                  <TestPicker
                    name="beds"
                    data={beds}
                    placeholder="Beds"
                    selectedItem={bedCategory}
                    onSelectItem={item => setBedCategory(item)}
                    width="48%"
                    label="Select Beds"
                  />
                ))}
              {propertyTypeCategory === 'Land/Plot' ||
                (values.propertyType === 'Land/Plot' ? (
                  <></>
                ) : (
                  <TestPicker
                    name="baths"
                    data={baths}
                    placeholder="Baths"
                    selectedItem={bathCategory}
                    onSelectItem={item => setBathCategory(item)}
                    width="48%"
                    label="Select Baths"
                  />
                ))}

              {/* Sqft and Furnishing */}
              {propertyTypeCategory === 'Land/Plot' ||
                (values.propertyType === 'Land/Plot' ? (
                  <></>
                ) : (
                  // <Row style={{justifyContent: 'space-between'}}>
                  <>
                    <TestPicker
                      name="floor"
                      data={floorType}
                      placeholder="Floor"
                      selectedItem={floorCategory}
                      onSelectItem={item => setFloorCategory(item)}
                      width="48%"
                      label="Select Floor"
                    />

                    <TestPicker
                      name="furnishing"
                      data={furnishing}
                      placeholder="Furnishing"
                      selectedItem={furnishingCategory}
                      onSelectItem={item => setFurnishingCategory(item)}
                      width="48%"
                      label="Select furnishing"
                    />
                  </>
                  // </Row>
                ))}

              {/* Rent and Sharing Type */}
              <Row style={{justifyContent: 'space-between'}}>
                <AppTextInput
                  placeholder="sqft"
                  label="Sq. Ft."
                  name="sqft"
                  width="48%"
                  keyboardType="number-pad"
                />
                <AppTextInput
                  placeholder="Price ₹"
                  label={
                    propertyTypeCategory === 'For Rent-House' ||
                    propertyTypeCategory === 'For Rent-Flat' ||
                    propertyTypeCategory === 'Commercial-Rent' ||
                    propertyTypeCategory === 'PG' ||
                    values.propertyType === 'For Rent-House' ||
                    values.propertyType === 'For Rent-Flat' ||
                    values.propertyType === 'Commercial-Rent' ||
                    values.propertyType === 'PG'
                      ? 'Price /month'
                      : 'Price'
                  }
                  name="rent"
                  width="48%"
                  keyboardType="number-pad"
                />
              </Row>
              {propertyTypeCategory?.label === 'Commercial-Rent' ||
              propertyTypeCategory?.label === 'Commercial-Sale' ||
              values.propertyType === 'Commercial-Rent' ||
              values.propertyType === 'Commercial-Sale' ? (
                <TestPicker
                  name="commercial"
                  data={commercialType}
                  placeholder="Select Type"
                  selectedItem={commercialTypeCategory}
                  onSelectItem={item => setCommercialTypeCategory(item)}
                  width="48%"
                  label="Select Type"
                />
              ) : (
                <></>
              )}

              {/* Description */}
              <AppTextInput
                placeholder="Write basic information about your property..."
                label="Description"
                multiline={true}
                name="description"
                autoCorrect={true}
              />

              <AppFormAmenities
                name="amenities"
                label="Amenities"
                width="100%"
                myData={myData}
                setMyData={items => setMyData(items)}
              />

              <View style={styles.badgeContainer}>
                {myData.map(item =>
                  item.selected ? (
                    <View style={styles.badge} key={item.key}>
                      <Text style={styles.badgeText}>{item.value}</Text>
                    </View>
                  ) : null,
                )}
              </View>

              <PropertyLocationCoords
                getCoordinates={getCoordinates}
                setGetCoordinates={item => setGetCoordinates(item)}
                name="geometry"
              />

              <ImageInputList
                name="images"
                imageUris={imageUris}
                onAddImage={uri => {
                  setImageUris([...imageUris, uri]);
                  setFieldValue('images', [...imageUris, uri]);
                }}
                onRemoveImage={uri => {
                  setImageUris(imageUris.filter(image => image !== uri));
                  setFieldValue(
                    'images',
                    imageUris.filter(image => image !== uri),
                  );
                }}
              />

              <CustomButton
                title={
                  status?.onEdit ? 'Update Property' : 'Post Property for 💰50'
                }
                type="PRIMARY"
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </ScrollView>
      <BottomSheetModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <PayBox />
      </BottomSheetModal>
    </Screen>
  );
};

export default AddPropertyScreen;

const styles = StyleSheet.create({
  badgeContainer: {flexDirection: 'row', marginTop: 10, flexWrap: 'wrap'},
  badge: {
    backgroundColor: colors.grey,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
  },
  badgeText: {color: colors.white, fontWeight: weight.bold},
});
