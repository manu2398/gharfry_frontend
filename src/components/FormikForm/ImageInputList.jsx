import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import colors from '../../theme/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {weight} from '../../theme/fonts';
import {launchImageLibrary} from 'react-native-image-picker';
import {useFormikContext} from 'formik';
import AppErrorMessage from './AppErrorMessage';
import {useSelector} from 'react-redux';
import {useTheme} from '../../context/ThemeProvider';

const ImageInput = ({imageUri, onChangeImage}) => {
  const handleAddImage = async () => {
    if (!imageUri) selectImage();
    else {
      Alert.alert(
        'Delete image',
        'Are you sure you want to delete this image?',
        [{text: 'Yes', onPress: () => onChangeImage(null)}, {text: 'No'}],
      );
    }
  };

  const selectImage = async () => {
    await launchImageLibrary(
      {mediaType: 'photo', quality: 0.5},
      ({didCancel, errorCode, errorMessage, assets}) => {
        if (!didCancel && !errorCode) {
          onChangeImage(assets[0]?.uri);
        }
      },
    );
  };

  return (
    <TouchableWithoutFeedback onPress={handleAddImage}>
      <View style={styles.container2}>
        {!imageUri && (
          <MaterialCommunityIcons name="camera" color={colors.grey} size={40} />
        )}
        {imageUri && (
          <Image
            source={{uri: imageUri.url || imageUri}}
            style={styles.image}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const ImageInputList = ({imageUris, onRemoveImage, onAddImage, name}) => {
  const {theme} = useTheme();
  const {errors, touched, setFieldValue} = useFormikContext();
  const scrollRef = useRef();
  const {status} = useSelector(state => state);

  useEffect(() => {
    if (status.onEdit) {
      setFieldValue('images', status.images);
    }
  }, [status]);

  return (
    <>
      <Text
        style={[
          {
            fontWeight: weight.bold,
            marginTop: 10,
            color: theme.secondaryTextColor,
          },
        ]}>
        Select Images*
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.container1}
        ref={scrollRef}
        onContentSizeChange={() => scrollRef.current.scrollToEnd()}>
        {imageUris?.map((imageUri, idx) => (
          <ImageInput
            imageUri={imageUri}
            onChangeImage={() => onRemoveImage(imageUri)}
            key={idx}
          />
        ))}

        <ImageInput onChangeImage={uri => onAddImage(uri)} />
      </ScrollView>
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default ImageInputList;

const styles = StyleSheet.create({
  container1: {
    flexDirection: 'row',
  },
  container2: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.border,
    borderRadius: 15,
    marginVertical: 5,
    overflow: 'hidden',
    marginRight: 5,
  },
  image: {
    width: 100,
    height: 100,
  },
});
