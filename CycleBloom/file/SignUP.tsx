import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  ImageBackground,
  FlatList,
  Dimensions,
  Text,
  TouchableOpacity,
  Animated,
  TextInput,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import styleSignUP from '../src/styles/stylesignUP';

type RootStackParamList = {
  SignUP: undefined;
  'Home': undefined;
  'Period Cycle': undefined;
  'Feelings and Symptoms': undefined;
  'AI Analyze': undefined;
};

const { width: screenWidth } = Dimensions.get('window');

const SignUP = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const data = [
    { id: '1', image: require('../src/assets/slider-1.png') },
    { id: '2', image: require('../src/assets/slider-2.png') },
    { id: '3', image: require('../src/assets/slider-3.png') },
  ];

  const extendedData = [
    data[data.length - 1], 
    ...data,
    data[0], 
  ];

  const initialIndex = 1;

  const handleScrollEnd = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (screenWidth * 0.8 + 10));

    if (index === 0) {
      flatListRef.current?.scrollToOffset({
        offset: data.length * (screenWidth * 0.8 + 10),
        animated: false,
      });
    }
    else if (index === extendedData.length - 1) {
      flatListRef.current?.scrollToOffset({
        offset: screenWidth * 0.8 + 10,
        animated: false,
      });
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8; 
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (!validateEmail(text)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (!validatePassword(text)) {
      setPasswordError('Password must be at least 8 characters long.');
    } else {
      setPasswordError('');
    }
  };

  const handleSignUp = () => {
    if (email && password && !emailError && !passwordError) {
      // Perform SignUp logic here
      navigation.navigate('Home');
    }
  };

  return (
    <ImageBackground source={require('../src/assets/background-sign-up.png')} style={styleSignUP.background}>
      <ScrollView>
        <View>
          <Image source={require('../src/assets/vector-sign-up.png')} />
          <View style={styleSignUP.textOverlay}>
            <Text style={styleSignUP.textTitle}>Hi, Mooners</Text>
            <Text style={styleSignUP.textSubTitle}>
              Track your cycle with ease and find your natural rhythm.
            </Text>
          </View>
        </View>


        {/* ----Slider---- */}
        <View style={styleSignUP.sliderContainer}>
          <Animated.FlatList
            ref={flatListRef}
            data={extendedData}
            renderItem={({ item, index }) => {
              const inputRange = [
                (index - 2) * (screenWidth * 0.8 + 10),
                (index - 1) * (screenWidth * 0.8 + 10),
                index * (screenWidth * 0.8 + 10),
              ];

              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.9, 0.4, 0.9],
                extrapolate: 'clamp',
              });

              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [1.0, 2.0, 1.0],
                extrapolate: 'clamp',
              });

              return (
                <Animated.View
                  style={[
                    styleSignUP.sliderItem,
                    {
                      marginHorizontal: 5,
                      transform: [{ scale }],
                      opacity,
                    },
                  ]}
                >
                  <Image source={item.image} style={styleSignUP.sliderImage} />
                </Animated.View>
              );
            }}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled={false}
            onMomentumScrollEnd={handleScrollEnd}
            initialScrollIndex={initialIndex}
            getItemLayout={(_, index) => ({
              length: screenWidth * 0.8 + 10,
              offset: (screenWidth * 0.8 + 10) * index,
              index,
            })}
            contentContainerStyle={{
              paddingHorizontal: (screenWidth - screenWidth * 0.8) / 2,
            }}
            snapToAlignment="start"
            decelerationRate="fast"
            snapToInterval={screenWidth * 0.8 + 10}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
          />
        </View>
        
          {/* ----Email Input---- */}
          <View style={styleSignUP.inputContainer}>
            <TextInput
              style={styleSignUP.input}
              placeholder="Enter your email"
              placeholderTextColor={'#B9717D'}
              value={email}
              onChangeText={handleEmailChange}
            />
            {emailError ? <Text style={styleSignUP.errorText}>{emailError}</Text> : null}
          </View>
    
          {/* ----Password Input---- */}
          <View style={styleSignUP.inputContainer}>
            <TextInput
              style={styleSignUP.input}
              placeholder="Enter your password"
              placeholderTextColor={'#B9717D'}
              secureTextEntry
              value={password}
              onChangeText={handlePasswordChange}
            />
            {passwordError ? <Text style={styleSignUP.errorText}>{passwordError}</Text> : null}
          </View>

        {/* ----Sign Up Button---- */}
        <View style={styleSignUP.containerButton}>
          <TouchableOpacity
            style={styleSignUP.containerButton2}
            onPress={handleSignUp}
            disabled={!email || !password || !!emailError || !!passwordError}
          >
            <LinearGradient
              colors={['rgba(254, 224, 217, 1)', 'rgba(254, 224, 217, 1)', 'rgba(248, 182, 182, 1)']}
              locations={[0, 0.27, 1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styleSignUP.buttonSignUP}
            >
              <View style={styleSignUP.textContainer}>
                <Text style={styleSignUP.textButton}>SIGN UP</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default SignUP;
