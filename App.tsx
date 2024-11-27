import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  //TextInput,
  View,
} from 'react-native';
// import {BouncyCheckboxHandle} from 'react-native-bouncy-checkbox';

import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Slider from '@react-native-community/slider';

// From Validation
import * as Yup from 'yup';
import {Formik} from 'formik';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be min of 4 characters')
    .max(16, 'Should be max of 16 characters')
    .required('Length is required'),
});

export default function App() {
  const [password, setPassword] = useState('');

  const [ispassGenerated, setPassGenerated] = useState(false);

  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePassword = (passwordLength: number) => {
    let characterList = '';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0987654321';
    const specialChars = '!@#$%^&*()_+';

    if (upperCase) {
      characterList += upperCaseChars;
    }
    if (lowerCase) {
      characterList += lowerCaseChars;
    }
    if (numbers) {
      characterList += digitChars;
    }
    if (symbols) {
      characterList += specialChars;
    }

    const passwordResult = createPassword(characterList, passwordLength);

    setPassword(passwordResult);
    setPassGenerated(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPasswordState = () => {
    setPassword('');
    setPassGenerated(false);
    setLowerCase(false);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView>
        <View>
          <Text style={styles.app}>Password Generator</Text>
          <Formik
            initialValues={{passwordLength: 4}}
            validationSchema={PasswordSchema}
            onSubmit={values => {
              console.log(values);
              generatePassword(Number(values.passwordLength)); // Todo
            }}>
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              setFieldValue,
              handleReset,
              /* and other goodies */
            }) => (
              <>
                {/* <Text style={styles.app}>Password Generator</Text> */}
                <View>
                  {/* <Text style={styles.label}>4</Text>
                  <Text style={styles.label}>16</Text> */}
                  <Text style={styles.label}>Selet Length</Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={4}
                    maximumValue={16}
                    step={1}
                    value={values.passwordLength}
                    // onValueChange={ handleChange ('passwordLength')}
                    onValueChange={value =>
                      setFieldValue('passwordLength', value)
                    }
                  />
                </View>
                <Text style={styles.label}>
                  Current Password Length: {values.passwordLength}
                </Text>

                <View style={styles.checkbox}>
                  <View style={styles.checkboxItem}>
                    <Text style={styles.text}>Include lowerCase</Text>
                    <BouncyCheckbox
                      isChecked={lowerCase}
                      onPress={() => setLowerCase(!lowerCase)}
                      fillColor="#29AB87"
                    />
                  </View>
                  <View style={styles.checkboxItem}>
                    <Text style={styles.text}>Include UpperCase</Text>
                    <BouncyCheckbox
                      isChecked={upperCase}
                      onPress={() => setUpperCase(!upperCase)}
                      fillColor="#29AB87"
                    />
                  </View>
                  <View style={styles.checkboxItem}>
                    <Text style={styles.text}>Include Numbers</Text>
                    <BouncyCheckbox
                      isChecked={numbers}
                      onPress={() => setNumbers(!numbers)}
                      fillColor="#29AB87"
                    />
                  </View>
                  <View style={styles.checkboxItem}>
                    <Text style={styles.text}>Include Symbols</Text>
                    <BouncyCheckbox
                      isChecked={symbols}
                      onPress={() => setSymbols(!symbols)}
                      fillColor="#29AB87"
                    />
                  </View>
                </View>
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  app: {
    fontSize: 24,
    textAlign: 'center',
    color: 'white',
    marginBlockEnd: 20,
  },
  checkbox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  checkboxItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    // flex: 1,
  },

  label: {
    marginBlockStart: 20,
    marginHorizontal: 15,
    fontSize: 18,
    // marginBottom: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  slider: {
    width: 250,
    height: 40,
  },
});
