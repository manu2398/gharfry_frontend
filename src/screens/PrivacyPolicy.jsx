import React from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../theme/colors';
import {LIST_MARGIN} from '../constants';
import {useTheme} from '../context/ThemeProvider';

const PrivacyPolicy = () => {
  const {theme} = useTheme();
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
        <Text style={[styles.heading, {color: theme.primaryTextColor}]}>
          Privacy Policy
        </Text>

        <Text style={[styles.sectionHeading, {color: theme.primaryTextColor}]}>
          Introduction
        </Text>
        <Text style={[styles.text, {color: theme.secondaryTextColor}]}>
          Welcome to Gharfry ("App," "Website," or "Service")! At Gharfry, we
          are committed to protecting your privacy and safeguarding your
          personal information. This Privacy Policy explains how we collect,
          use, store, and disclose your information when you use our App. By
          accessing or using our Service, you consent to the terms of this
          Privacy Policy.
        </Text>

        <Text style={[styles.sectionHeading, {color: theme.primaryTextColor}]}>
          Information We Collect
        </Text>
        <Text style={[styles.text, {color: theme.secondaryTextColor}]}>
          <Text style={[styles.boldText, {color: theme.secondaryTextColor}]}>
            Personal Information:
          </Text>{' '}
          When you register an account or use certain features of our App, we
          may collect personal information such as your name, email address,
          phone number, and postal address. We use this information to provide
          our services, communicate with you, and improve your user experience.
        </Text>
        <Text style={[styles.text, {color: theme.secondaryTextColor}]}>
          <Text style={[styles.boldText, {color: theme.secondaryTextColor}]}>
            Usage Information:
          </Text>{' '}
          We collect information about how you use our App, including the
          properties you view, searches you perform, and user-generated content
          you submit. This helps us understand your preferences, personalize
          your experience, and improve our services.
        </Text>
        <Text style={[styles.text, {color: theme.secondaryTextColor}]}>
          <Text style={[styles.boldText, {color: theme.secondaryTextColor}]}>
            Device Information:
          </Text>{' '}
          We automatically collect certain information about your device, such
          as your IP address, browser type, operating system, and device
          identifiers. This information is used for analytical purposes and to
          ensure the security and functionality of our App.
        </Text>
        <Text style={[styles.text, {color: theme.secondaryTextColor}]}>
          <Text style={[styles.boldText, {color: theme.secondaryTextColor}]}>
            Permissions:
          </Text>{' '}
          Our App may request permissions to access your device's image gallery
          and location services. We use these permissions to enable you to
          upload property images and provide location-based property
          recommendations. Granting or denying these permissions is entirely
          voluntary, and you can manage them through your device settings.
        </Text>

        <Text style={[styles.sectionHeading, {color: theme.primaryTextColor}]}>
          How We Use Your Information
        </Text>
        <Text style={[styles.text, {color: theme.secondaryTextColor}]}>
          <Text style={[styles.boldText, {color: theme.secondaryTextColor}]}>
            Providing and Improving our Service:
          </Text>{' '}
          We use your information to deliver our services, process transactions,
          and enhance your user experience. This includes customizing property
          listings, providing personalized recommendations, and optimizing our
          App's performance.
        </Text>
        <Text style={[styles.text, {color: theme.secondaryTextColor}]}>
          <Text style={[styles.boldText, {color: theme.secondaryTextColor}]}>
            Communication:
          </Text>{' '}
          We may send you transactional messages, updates, and promotional
          materials related to our App and services. You can opt-out of
          receiving marketing communications at any time by adjusting your
          account settings or following the unsubscribe instructions provided in
          the email.
        </Text>
        <Text style={[styles.text, {color: theme.secondaryTextColor}]}>
          <Text style={[styles.boldText, {color: theme.secondaryTextColor}]}>
            Legal Compliance and Protection:
          </Text>{' '}
          We may use and disclose your information as required by law, to
          enforce our terms and policies, protect our rights and interests, or
          prevent fraud or illegal activities.
        </Text>

        <Text style={[styles.sectionHeading, {color: theme.primaryTextColor}]}>
          Data Sharing and Third Parties
        </Text>
        <Text style={[styles.text, {color: theme.secondaryTextColor}]}>
          <Text style={[styles.boldText, {color: theme.secondaryTextColor}]}>
            Service Providers:
          </Text>{' '}
          We may share your information with trusted third-party service
          providers who assist us in delivering our Service. These providers are
          authorized to use your information only as necessary to provide the
          services to us.
        </Text>
        <Text style={[styles.text, {color: theme.secondaryTextColor}]}>
          <Text style={[styles.boldText, {color: theme.secondaryTextColor}]}>
            Business Transfers:
          </Text>{' '}
          In the event of a merger, acquisition, or sale of all or a portion of
          our assets, your information may be transferred to the acquiring
          entity.
        </Text>
        <Text style={[styles.text, {color: theme.secondaryTextColor}]}>
          <Text style={[styles.boldText, {color: theme.secondaryTextColor}]}>
            Legal Obligations:
          </Text>{' '}
          We may disclose your information to comply with applicable laws,
          regulations, or legal processes, or to respond to lawful requests from
          public authorities.
        </Text>

        <Text style={[styles.sectionHeading, {color: theme.primaryTextColor}]}>
          Data Security
        </Text>
        <Text style={[styles.text, {color: theme.secondaryTextColor}]}>
          We implement reasonable security measures to protect your personal
          information from unauthorized access, use, or disclosure. However, no
          method of transmission or storage is 100% secure. We cannot guarantee
          the absolute security of your information.
        </Text>

        <Text style={[styles.sectionHeading, {color: theme.primaryTextColor}]}>
          Your Rights and Choices
        </Text>
        <Text style={[styles.text, {color: theme.secondaryTextColor}]}>
          You have the right to access, update, correct, or delete your personal
          information. You can manage your communication preferences and opt-out
          of certain data processing activities within your account settings. If
          you have any questions or requests regarding your information, please
          contact us using the information provided at the end of this Privacy
          Policy.
        </Text>
        <Text style={[styles.sectionHeading, {color: theme.primaryTextColor}]}>
          Contact: support@gharfry.com
        </Text>
        <Text style={[styles.text, {color: theme.secondaryTextColor}]}>
          created: 13/06/2023
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: LIST_MARGIN,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.black,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: colors.black,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: colors.black,
  },
  boldText: {
    fontWeight: 'bold',
    color: colors.black,
  },
});

export default PrivacyPolicy;
