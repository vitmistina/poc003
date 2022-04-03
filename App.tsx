/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {RSA} from 'react-native-rsa-native';
import RNFS from 'react-native-fs';
import Signature from 'react-native-signature-canvas';

import pubCertificate from './pub-cert';

import {
  NativeModules,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  PermissionsAndroid,
  Image,
  LogBox,
} from 'react-native';

const Aes = NativeModules.Aes;

LogBox.ignoreLogs(['new NativeEventEmitter']);

export default function App() {
  const [fullName, setName] = React.useState('');

  const requestPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Pozadavek k ukladani dat na pametovou kartu',
          message: 'Tato aplikace potrebuje povoleni ukladat data',
          buttonNeutral: 'Pozadat pozdeji',
          buttonNegative: 'Zrusit',
          buttonPositive: 'Povolit',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Aplikace nyni muze ukladat data na pametovou kartu');
      } else {
        console.error('Povoleni nebylo udeleno');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const onPressNew = async () => {
    setName('');
    setSign(undefined);
  };

  const [signature, setSign] = React.useState<string>();

  const handleOK = async (newSignature: string) => {
    const requiredVariable = 'fullName';
    if (!eval(requiredVariable)) {
      console.error(`Chybí vyplnit ještě ${requiredVariable}`);
      return;
    }

    setSign(newSignature);

    const path = `${RNFS.ExternalStorageDirectoryPath}/Download/${Date.now()}`;
    const payload = JSON.stringify({fullName, newSignature});

    const key = await Aes.randomKey(32);
    const iv = await Aes.randomKey(16);

    const encrypted = await Aes.encrypt(payload, key, iv, 'aes-256-cbc');

    const encryptedKey = await RSA.encrypt(key, pubCertificate);
    const encryptedIv = await RSA.encrypt(iv, pubCertificate);
    requestPermissions();
    await RNFS.writeFile(`${path}.encrypted`, encrypted, 'utf8');
    await RNFS.writeFile(`${path}.key`, encryptedKey, 'utf8');
    await RNFS.writeFile(`${path}.initializationVecor`, encryptedIv, 'utf8');
  };

  const handleEmpty = () => {
    console.log('Empty');
  };

  return (
    <View style={styles.container}>
      {/* TODO add all fields */}
      <Text>Jméno a příjmení</Text>
      <TextInput style={styles.input} value={fullName} onChangeText={setName} />

      {signature ? (
        <View>
          <Image
            resizeMode={'contain'}
            style={{width: 335, height: 114}}
            source={{uri: signature}}
          />
          <Button onPress={onPressNew} title="Nový formulář" color="#ea650d" />
        </View>
      ) : (
        <Signature
          onOK={handleOK}
          onEmpty={handleEmpty}
          descriptionText="Podpis"
          clearText="Nový podpis"
          confirmText="Uložit podpis"
          webStyle={`.m-signature-pad--footer
            .button {
              background-color: #ea650d;
              color: #ffffff;
            }`}
        />
      )}
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
