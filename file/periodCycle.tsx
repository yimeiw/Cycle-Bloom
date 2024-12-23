import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation, ParamListBase } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { usePrediction } from './AppContext';
import stylePeriodCycle from '../src/styles/stylePeriodCycle';

type signUPScreenNavigationProp = NativeStackNavigationProp<ParamListBase, 'Period Cycle'>;

const PeriodPredictionAI = () => {
    const navigation = useNavigation<signUPScreenNavigationProp>();
    const { setPredictionData } = usePrediction(); // Get the function to set data
    const [rmse, setRmse] = useState<number | null>(null);
    const [mae, setMae] = useState<number | null>(null);
    const [imgCycle, setImgCycle] = useState<string | null>(null);
    const [imgPeriod, setImgPeriod] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchPredictionCycle = async () => {
        try {
            const response = await fetch('http://10.0.2.2:5000/predict_cycle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setRmse(data.rmse);
            setMae(data.mae);
            setImgCycle(`data:image/png;base64,${data.img_cycle}`);
            setImgPeriod(`data:image/png;base64,${data.img_period}`);

            // Save the data to context
            setPredictionData({
                predictedMessageCycle: data.predictedMessage,
                recommendationCycle: data.recommendation,
                predictedMessageSymptoms: null,
                recommendationSymptoms: null,
            });
        } catch (error) {
            console.error('Error fetching prediction:', error);
            // setError('Loading....');
        }
    };

    // Fetch data from /predict_symptoms
    const fetchPredictionSymptoms = async () => {
        try {
            const response = await fetch('http://10.0.2.2:5000/predict_symptoms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            // Save the data to context
            setPredictionData({
                predictedMessageCycle: null,
                recommendationCycle: null,
                predictedMessageSymptoms: data.predicted_message,
                recommendationSymptoms: data.recommendation,
            });
        } catch (error) {
            console.error('Error fetching prediction:', error);
            // setError('Loading....');
        }
    };

    // Call both fetch functions on mount
    useEffect(() => {
        fetchPredictionCycle();
        fetchPredictionSymptoms();
    }, []);

    return (
        <ScrollView style={stylePeriodCycle.container}>
            <View>
                <Image source={require('../src/assets/periodCycleTitle.png')} style={stylePeriodCycle.imagePeriodCycle} />
            </View>
            <View style={stylePeriodCycle.sectionIsiPeriodCycle}>
                
                {error && <Text>{error}</Text>}
                {rmse && <Text>RMSE: {rmse}</Text>}
                {mae && <Text>MAE: {mae}</Text>}

                {imgCycle ? (
                    <View style={stylePeriodCycle.imageContainer}>
                        <Text>Cycle Variation</Text>
                        <Image source={{ uri: imgCycle }} style={stylePeriodCycle.image} />
                    </View>
                ) : (
                    <Text>Loading cycle image...</Text>
                )}

                {imgPeriod ? (
                    <View style={stylePeriodCycle.imageContainer}>
                        <Text>Period Variation</Text>
                        <Image source={{ uri: imgPeriod }} style={stylePeriodCycle.image} />
                    </View>
                ) : (
                    <Text>Loading period image...</Text>
                )}
                <View style={stylePeriodCycle.button}>
                    <TouchableOpacity style={stylePeriodCycle.buttonStyle} onPress={() => { fetchPredictionCycle(); fetchPredictionSymptoms(); }}>
                        <Text style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center', marginTop: 8, color:'white'}}>Refresh</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
            
            <View style={stylePeriodCycle.listFiturContainer}>

                <View style={stylePeriodCycle.listFiturPink}>
                
                    <View style={stylePeriodCycle.listFiturPutih}>

                        <TouchableOpacity style={stylePeriodCycle.periodCycleContainer} onPress={() => {navigation.navigate("Period Cycle")}}>
                            <View style={stylePeriodCycle.periodCycle}>
                                <Image source={require('../src/assets/logo-periodcycle.png')}/>
                                <Text style={{fontFamily: 'Montserrat', fontWeight: 'semibold', fontSize: 24, color:'#E29FAB', marginLeft: 20}}>Period Cycle</Text>
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity style={stylePeriodCycle.symptomsContainer} onPress={() => {navigation.navigate("Feelings and Symptoms")}}>
                        <View style={stylePeriodCycle.symptoms}>
                            <Image source={require('../src/assets/logo-symptoms.png')}/>
                            <Text style={{fontFamily: 'Montserrat', fontWeight: 'semibold', fontSize: 24, color:'#E29FAB'}}>Feelings and Symptoms</Text>
                            </View>
                        </TouchableOpacity>
                    

                        <TouchableOpacity style={stylePeriodCycle.calendarContainer} onPress={() => {navigation.navigate("Home")}}>
                        <View style={stylePeriodCycle.calendar}>
                            <Image source={require('../src/assets/logo-calendar.png')}/>
                            <Text style={{fontFamily: 'Montserrat', fontWeight: 'semibold', fontSize: 24, color:'#E29FAB',  marginLeft: 20}}>Calendar</Text>
                        </View>
                        </TouchableOpacity>
                    

                    </View>
                </View>

            </View>
            
        </ScrollView>
    );
};

export default PeriodPredictionAI;
