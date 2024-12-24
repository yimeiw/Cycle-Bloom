import React from 'react';
import { View, Image, SafeAreaView, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar } from './Calendar';
import { NavigationContainer, useNavigation, ParamListBase } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import styles from '../src/styles/styleHome'; 


type SignUPScreenNavigationProp = NativeStackNavigationProp<ParamListBase, 'Home'>;

const Home = () => {
  const navigation = useNavigation<SignUPScreenNavigationProp>();
  // const[valueCalendar: TCalendarValue, setValueCalendar: React.Dispatch<React.SetStateAction<TCalendarValue>></React.SetStateAction>] = useState<TCalendarValue>(new Date());

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image
          source={require('../src/assets/title-sectionTitle.png')}
          style={styles.imageHome}
        />
      </View>
      
      <View style={styles.sectionCalenderBackground}>
        <View style={styles.sectionCalenderPinkTop}>
          <Calendar />
        </View>
      </View>

      <View style={styles.listFiturContainer}>
        <View style={styles.listFiturPink}>
      
          <View style={styles.listFiturPutih}>

            <TouchableOpacity style={styles.periodCycleContainer} onPress={() => {navigation.navigate("Period Cycle")}}>
                <View style={styles.periodCycle}>
                    <Image source={require('../src/assets/logo-periodcycle.png')}/>
                    <Text style={{fontFamily: 'Montserrat', fontWeight: 'semibold', fontSize: 24, color:'#E29FAB', marginLeft: 20}}>Period Cycle</Text>
                </View>
            </TouchableOpacity>


            <TouchableOpacity style={styles.symptomsContainer} onPress={() => {navigation.navigate("Feelings and Symptoms")}}>
              <View style={styles.symptoms}>
                  <Image source={require('../src/assets/logo-symptoms.png')}/>
                  <Text style={{fontFamily: 'Montserrat', fontWeight: 'semibold', fontSize: 24, color:'#E29FAB'}}>Feelngs and Sympitoms</Text>
                </View>
            </TouchableOpacity>
          

            <TouchableOpacity style={styles.aiAnalyzeContainer} onPress={() => {navigation.navigate("AI Analyze")}}>
             <View style={styles.aiAnalyze}>
                <Image source={require('../src/assets/logo-analyze.png')}/>
                <Text style={{fontFamily: 'Montserrat', fontWeight: 'semibold', fontSize: 24, color:'#E29FAB',  marginLeft: 20}}>AI Analyze</Text>
              </View>
            </TouchableOpacity>
           

          </View>

          

        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
