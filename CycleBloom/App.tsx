import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUP from './file/SignUP';
import HomeScreen from './file/Home';
import PeriodCycleScreen from './file/periodCycle';
import SymptomsScreen from './file/Symptoms';
import AIAnalyzeScreen from './file/AIAnalyze';
import { PredictionProvider } from './file/AppContext';

const RootStack = createNativeStackNavigator();

const App = () => {
  const [symptomsData, setSymptomsData] = useState<any>({});

  return (
    <NavigationContainer>
      <PredictionProvider>
        <RootStack.Navigator initialRouteName="Sign UP">
          <RootStack.Screen name="Sign UP" component={SignUP} />
          <RootStack.Screen name="Home" component={HomeScreen} />
          <RootStack.Screen name="Period Cycle" component={PeriodCycleScreen} />
          <RootStack.Screen name="Feelings and Symptoms">
            {(props) => <SymptomsScreen {...props} setSymptomsData={setSymptomsData} />}
          </RootStack.Screen>
          <RootStack.Screen name="AI Analyze">
            {(props) => <AIAnalyzeScreen {...props} symptomsData={symptomsData} />}
          </RootStack.Screen>
        </RootStack.Navigator>
      </PredictionProvider>
    </NavigationContainer>
  );  
};
export default App;
