import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Button, TouchableOpacity, Animated } from 'react-native';
import { usePrediction } from './AppContext';  // Pastikan usePrediction diimport dengan benar
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styleAI from '../src/styles/AIAnalyze';

type signUPScreenNavigationProp = NativeStackNavigationProp<ParamListBase, 'AI Analyze'>;

interface SymptomsData {
    predicted_message: string;
    recommendation: string;
    predicted_message_symptoms: string;
    recommendation_symptoms: string;
}

interface AIAnalyzeScreenProps {
    symptomsData: SymptomsData;
}

const AIAnalyze = ({ symptomsData }: AIAnalyzeScreenProps) => {
    const navigation = useNavigation<signUPScreenNavigationProp>();

    const { predictedMessageCycle } = usePrediction();

    const [localSymptomsData, setLocalSymptomsData] = useState({
        predicted_message: '',
        recommendation: '',
    });

    const [showCycleOverlay, setShowCycleOverlay] = useState(false);
    const [showSymptomsOverlay, setShowSymptomsOverlay] = useState(false);

    const fadeAnim = useState(new Animated.Value(0))[0];

    const handleSymptomsOverlay = () => {
        setShowSymptomsOverlay(true);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };
    const closeSymptomsOverlay = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500, 
            useNativeDriver: true,
        }).start(() => {
            setShowSymptomsOverlay(false);
        });
    };

    return (
        <ScrollView style={styleAI.container}>
            <View>
                <Image source={require('../src/assets/title-sectionTitle.png')} style={styleAI.imageAI} />
            </View>
            <View style={styleAI.containerPink}>
                <View style={styleAI.containerPutih}>
                    {/* Overlay untuk Cycle Prediction */}
                    <View>
                        <Text style={styleAI.textCycle}>
                            {predictedMessageCycle || 'No Prediction Cycle Available'}
                        </Text>
                    </View>

                    {/* Overlay untuk Symptoms Prediction */}
                    {showSymptomsOverlay && (
                        <Animated.View style={[styleAI.overlay, { opacity: fadeAnim }]}>
                            <TouchableOpacity onPress={closeSymptomsOverlay} style={styleAI.closeButton}>
                                <Image source={require('../src/assets/panah-kirioverlay-analyzeAI.png')}></Image>
                            </TouchableOpacity>

                            <Text style={styleAI.textSymptomsTitle}>Symptoms Prediction Message:</Text>
                            <Text style={styleAI.textSymptoms}>
                                {symptomsData.predicted_message || 'No prediction available'}
                            </Text>

                            <Text style={styleAI.textSymptomsTitle}>Symptoms Recommendation:</Text>
                            <Text style={styleAI.textSymptoms}>
                                {symptomsData.recommendation || 'No recommendation available'}
                            </Text>
                        </Animated.View>
                    )}
                    {/* Tombol untuk menampilkan Symptoms Prediction */}
                    <TouchableOpacity onPress={handleSymptomsOverlay} style={styleAI.openButton}>
                        <Image source={require('../src/assets/panah-kanan-overlay-analyzeAI.png')}></Image>
                    </TouchableOpacity>
                    
                </View>
            </View>

            <View style={styleAI.listFiturPink}>
            
                <View style={styleAI.listFiturPutih}>

                    <TouchableOpacity style={styleAI.periodCycleContainer} onPress={() => {navigation.navigate("Period Cycle")}}>
                        <View style={styleAI.periodCycle}>
                            <Image source={require('../src/assets/logo-periodcycle.png')}/>
                            <Text style={{fontFamily: 'Montserrat', fontWeight: 'semibold', fontSize: 24, color:'#E29FAB', marginLeft: 20}}>Period Cycle</Text>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity style={styleAI.symptomsContainer} onPress={() => {navigation.navigate("Feelings and Symptoms")}}>
                    <View style={styleAI.symptoms}>
                        <Image source={require('../src/assets/logo-symptoms.png')}/>
                        <Text style={{fontFamily: 'Montserrat', fontWeight: 'semibold', fontSize: 24, color:'#E29FAB'}}>Feelings and Symptoms</Text>
                        </View>
                    </TouchableOpacity>
                

                    <TouchableOpacity style={styleAI.calendarContainer} onPress={() => {navigation.navigate("Home")}}>
                    <View style={styleAI.calendar}>
                        <Image source={require('../src/assets/logo-calendar.png')}/>
                        <Text style={{fontFamily: 'Montserrat', fontWeight: 'semibold', fontSize: 24, color:'#E29FAB',  marginLeft: 20}}>Calendar</Text>
                    </View>
                    </TouchableOpacity>
                

                </View>

            

            </View>
        </ScrollView>
    );
};

export default AIAnalyze;
