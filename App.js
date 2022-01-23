/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {RSA} from 'react-native-rsa-native';

import pubCertificate from './pub-cert';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default function App() {
  const [fullName, setName] = React.useState('');

  const onPressSave = async () => {
    const payload = JSON.stringify({fullName});
    const encrypted = await RSA.encrypt(payload, pubCertificate);
    setName('');
  };

  return (
    <View style={styles.container}>
      {/* TODO add all fields */}
      <Text>Jméno a příjmení</Text>
      <TextInput style={styles.input} value={fullName} onChangeText={setName} />
      {/* TODO add signature field */}

      <Button onPress={onPressSave} title="Uložit" color="#ea650d" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

// const Section = ({children, title}) => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

// const App = () => {
//   const [encryptedString, setEcryptedString] = React.useState('');

//   const myString = 'this is a secret message';
//   const pubCertificate = `-----BEGIN PUBLIC KEY-----
//    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvrBEcJMyAHCoR996+eq7
//    iSspzg/omULtWV9pasTMxxi6/e67tcx1+EIlFKHsu30nqnfsux45Z/pGFypxtKp0
//    ZJk980f+6nzotjLsGVB+J0CYLyZp/jbdjBF7p3KXLLfzQGjwMFEcYeigcAJwDNZt
//    2O8EdFWAW19SfbPouy4/PbDKHZFNqG6dWJqYonKv59Q4GzTc2Qg4y17li4WMY+zf
//    SNfoJ3v/i5ALwZtwqkv6aYJ7O9uQLwTaO26gZcwcRa2LXe12OPuYgOQGfLcDxFBO
//    irk41MRekVmND7WQvweN5Gk4Fxt1w5YXirpgb78LJypCTLBLtFKUmR9yyb+/set/
//    AwIDAQAB
//    -----END PUBLIC KEY-----`;

//   const onPressEncrypt = async () => {
//     const encrypted = await RSA.encrypt(myString, pubCertificate);
//     setEcryptedString(encrypted);
//     console.log(encrypted);
//   };

//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Unencrypted">{myString}</Section>
//           <Button onPress={onPressEncrypt} title="Encrypt" color="#ea650d" />
//           <Section title="Encrypted">{encryptedString}</Section>
//           {/* <Section title="GeneratedKey">{key.public}</Section> */}
//           <Section title="Public Key">{pubCertificate}</Section>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.js</Text> to change this
//             screen and then come back to see your edits. Just like this
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;
