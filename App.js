import React, { useState } from 'react';
import { View, Button, Text, TextInput } from 'react-native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const requestPermission = async () => {
    const authorizationStatus = await messaging().requestPermission();
    if (authorizationStatus) {
      const fcmToken = await messaging().getToken();
      setToken(fcmToken);
    }
  };

  const sendNotification = async (message) => {
    if (!token || !userName) {
      return;
    }

    const notification = {
      to: token,
      sound: 'default',
      title: 'Attention Needed',
      body: `${userName} ${message}`,
    };

    await firebase.messaging().send(notification);
  };

  const handleSignUp = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      setUserName(email);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      setUserName(email);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F7F9FB' }}>
      {userName ? (
        <>
          <Button
            title="Desperate Need of Attention"
            onPress={() => sendNotification('is in desperate need of attention')}
            color="#9C27B0"
          />
          <Button
            title="Need Kisses Right Now"
            onPress={() => sendNotification('needs kisses right now')}
            color="#4CAF50"
          />
        </>
      ) : (
        <>
          {isSigningIn ? (
            <>
              <TextInput
                style={{
                  height: 40,
                  width: 200,
                  borderColor: '#9C27B0',
                  borderWidth: 1,
                  padding: 10,
                  backgroundColor: 'white',
                  color: '#9C27B0',
                  marginTop: 20,
                }}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
                autoCapitalize="none"
              />
              <TextInput
                style={{
                  height: 40,
                  width: 200,
                  borderColor: '#9C27B0',
                  borderWidth: 1,
                  padding: 10,
                  backgroundColor: 'white',
                  color: '#9C27B0',
                  marginTop: 20,
                }}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
                autoCapitalize="none"
              />
              <TextInput
                style={{
                  height: 40,
                  width: 200,
                  borderColor: '#9C27B0',
                  borderWidth: 1,
                  padding: 10,
                  backgroundColor: 'white',
                  color: '#9C27B0',
                  marginTop: 20,
                }}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                secureTextEntry={true}
              />
              <Button
                title="Sign Up"
                onPress={handleSignUp}
                color="#9C27B0"
                style={{ marginTop: 20 }}
              />
              <Button
                title="Sign In"
                onPress={() => setIsSigningIn(true)}
                color="#9C27B0"
                style={{ marginTop: 20 }}
              />
            </>
          )}
        </>
      )}
      {errorMessage && (
        <Text style={{ color: 'red', marginTop: 20 }}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

export default App;