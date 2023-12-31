import React from 'react';
import {View, Text, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import {weight} from '../theme/fonts';
import colors from '../theme/colors';
import {LIST_MARGIN} from '../constants';
import {useTheme} from '../context/ThemeProvider';

const TCScreen = () => {
  const {theme} = useTheme();
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
        <Text style={[styles.heading, {color: theme.primaryTextColor}]}>
          Terms and Conditions
        </Text>

        <Text style={[styles.sectionHeading, {color: theme.primaryTextColor}]}>
          Acceptance of Terms
        </Text>
        <Text style={[styles.text, {color: theme.secondaryTextColor}]}>
          By accessing or using the Gharfry App, you agree to be bound by these
          Terms and Conditions. If you do not agree with any part of these
          terms, please refrain from using our App.
        </Text>

        <Text style={[styles.sectionHeading, {color: theme.primaryTextColor}]}>
          User Accounts
        </Text>
        <Text style={[styles.text, {color: theme.secondaryTextColor}]}>
          <Text style={[styles.boldText, {color: theme.secondaryTextColor}]}>
            Account Creation:
          </Text>{' '}
          In order to use certain features of our App, you may be required to
          create an account. You must provide accurate and complete information
          during the registration process and keep your account credentials
          confidential.
        </Text>
        <Text style={[styles.text, {color: theme.secondaryTextColor}]}>
          <Text style={[styles.boldText, {color: theme.secondaryTextColor}]}>
            Account Responsibility:
          </Text>{' '}
          You are solely responsible for maintaining the confidentiality of your
          account and for any activities that occur under your account. You
          agree to notify us immediately of any unauthorized use or suspected
          security breach.
        </Text>

        <Text style={[styles.sectionHeading, {color: theme.primaryTextColor}]}>
          User Conduct and Content
        </Text>
        <Text style={[styles.text, {color: theme.secondaryTextColor}]}>
          <Text style={[styles.boldText, {color: theme.secondaryTextColor}]}>
            Prohibited Activities:
          </Text>{' '}
          You agree not to use our App for any unlawful, unauthorized, or
          prohibited activities. This includes but is not limited to:
        </Text>
        <Text style={[styles.text, {color: theme.secondaryTextColor}]}>
          - Violating any applicable laws or regulations
        </Text>
        <Text style={[styles.text, {color: theme.secondaryTextColor}]}>
          - Interfering with the operation of the App or other users' access
        </Text>
        <Text style={[styles.text, {color: theme.secondaryTextColor}]}>
          - Uploading or transmitting harmful code, viruses, or other malicious
          content
        </Text>
        <Text style={[styles.text, {color: theme.secondaryTextColor}]}>
          - Engaging in fraudulent, misleading, or deceptive activities
        </Text>
        <Text style={[styles.text, {color: theme.secondaryTextColor}]}>
          <Text style={[styles.boldText, {color: theme.secondaryTextColor}]}>
            User-Generated Content:
          </Text>{' '}
          You retain ownership of any content you submit or post on our App.
          However, by submitting content, you grant us a non-exclusive,
          royalty-free, worldwide license to use, display, reproduce, modify,
          and distribute your content for the purposes of operating and
          promoting our App.
        </Text>

        <Text style={[styles.sectionHeading, {color: theme.primaryTextColor}]}>
          Intellectual Property
        </Text>
        <Text style={[styles.text, {color: theme.secondaryTextColor}]}>
          <Text style={[styles.boldText, {color: theme.secondaryTextColor}]}>
            Ownership:
          </Text>{' '}
          All intellectual property rights in the Gharfry App, including
          trademarks, logos, and content, are owned or licensed by us. You may
          not use, copy, modify, or distribute any of our intellectual property
          without our prior written consent.
        </Text>
        <Text style={[styles.text, {color: theme.secondaryTextColor}]}>
          <Text style={[styles.boldText, {color: theme.secondaryTextColor}]}>
            User License:
          </Text>{' '}
          We grant you a limited, revocable, non-transferable, and non-exclusive
          license to access and use our App for personal, non-commercial
          purposes. This license does not permit you to use our intellectual
          property without our consent.
        </Text>

        <Text style={[styles.sectionHeading, {color: theme.primaryTextColor}]}>
          Limitation of Liability
        </Text>
        <Text style={[styles.text, {color: theme.secondaryTextColor}]}>
          <Text style={[styles.boldText, {color: theme.secondaryTextColor}]}>
            Disclaimer of Warranties:
          </Text>{' '}
          Our App is provided on an "as-is" and "as available" basis. We make no
          warranties or representations, express or implied, regarding the
          operation, availability, or accuracy of our App or the content
          provided.
        </Text>
        <Text style={[styles.text, {color: theme.secondaryTextColor}]}>
          <Text style={[styles.boldText, {color: theme.secondaryTextColor}]}>
            Limitation of Liability:
          </Text>{' '}
          We shall not be liable for any indirect, incidental, special,
          consequential, or punitive damages, including but not limited to loss
          of profits, data, or goodwill, arising from your use or inability to
          use our App.
        </Text>

        <Text style={[styles.sectionHeading, {color: theme.primaryTextColor}]}>
          Governing Law and Dispute Resolution
        </Text>
        <Text style={[styles.text, {color: theme.secondaryTextColor}]}>
          These Terms and Conditions shall be governed by and construed in
          accordance with the laws of India. Any disputes arising out of or
          relating to these terms shall be submitted to the exclusive
          jurisdiction of the courts.
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

export default TCScreen;
