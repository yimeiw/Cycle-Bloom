import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import styleSymptoms from '../src/styles/symptoms';
import axios from 'axios'; 
import LinearGradient from 'react-native-linear-gradient';

const Symptoms = ({ setSymptomsData }: { setSymptomsData: (data: any) => void }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<any>({});
  const [selectedMenstrualFlow, setSelectedMenstrualFlow] = useState<string>('');  // For menstrual flow
  const [selectedMood, setSelectedMood] = useState<string>('');  // For mood

  const handleSymptomSelect = (symptom: string) => {
    setSelectedSymptoms((prevState: any) => ({
      ...prevState,
      [symptom]: !prevState[symptom],
    }));
  };

  const handleMenstrualFlowSelect = (flow: string) => {
    setSelectedMenstrualFlow(flow);
  };

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
  };

  interface PredictionData {
    predicted_message?: string;
    recommendation?: string;
    [key: string]: any;
  }

  const handleAddButtonPress = async () => {
    // Ensure all fields are selected
    if (!selectedMenstrualFlow || !selectedMood || Object.keys(selectedSymptoms).length === 0) {
      alert("Please select all the required fields.");
      return;
    }

    const selectedSymptomsData = Object.keys(selectedSymptoms).filter(
      (symptom) => selectedSymptoms[symptom]
    );

    const dataToSend = {
      menstrual_flow: selectedMenstrualFlow,
      mood: selectedMood,
      symptoms: selectedSymptomsData,  // Send full list of symptoms
    };

    try {
      const response = await axios.post<any>('http://10.0.2.2:5000/predict_symptoms', dataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });


      console.log('Backend Response:', response.data);

      const predictionData: PredictionData = response.data;
      if (predictionData?.predicted_message) {
        setSymptomsData({
          predicted_message: predictionData.predicted_message,
          recommendation: predictionData.recommendation || 'No recommendation available.',
          predicted_message_symptoms: predictionData.predicted_message_symptoms || 'No prediction available',
          recommendation_symptoms: predictionData.recommendation_symptoms || 'No recommendation available',
        });
      } else {
        console.error('Prediction data structure is incorrect');
      }      
    } catch (error) {
      console.error('Error while sending data to backend:', error);
    }
};


  return (
    <ScrollView style={styleSymptoms.container}>
      <View>
        <Image
          source={require('../src/assets/AIAnalyzeTitle.png')}
          style={styleSymptoms.imageSymptoms}
        />
      </View>

      <View style={styleSymptoms.sectionIsiSymptoms}>
        {/* Menstrual Flow Section */}
        <View style={styleSymptoms.containerMenstrualFlow}>
          <Text style={styleSymptoms.title}>Menstrual Flow</Text>
          <View style={styleSymptoms.containerListFlow}>
            <TouchableOpacity
              style={[styleSymptoms.listFlow, selectedMenstrualFlow === 'light' && styleSymptoms.selectedButtonListFlow]}
              onPress={() => handleMenstrualFlowSelect('light')}
            >
              <Text style={styleSymptoms.textListFlow}>Light</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styleSymptoms.listFlow, selectedMenstrualFlow === 'medium' && styleSymptoms.selectedButtonListFlow]}
              onPress={() => handleMenstrualFlowSelect('medium')}
            >
              <Text style={styleSymptoms.textListFlow}>Medium</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styleSymptoms.listFlow, selectedMenstrualFlow === 'heavy' && styleSymptoms.selectedButtonListFlow]}
              onPress={() => handleMenstrualFlowSelect('heavy')}
            >
              <Text style={styleSymptoms.textListFlow}>Heavy</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Mood Section */}
        <View style={styleSymptoms.containerMood}>
          <Text style={styleSymptoms.title}>Mood</Text>
          <View style={styleSymptoms.containerListFlow}>
            <TouchableOpacity
              style={[styleSymptoms.listMood, selectedMood === 'calm' && styleSymptoms.selectedButtonListMood]}
              onPress={() => handleMoodSelect('calm')}
            >
              <Text style={styleSymptoms.textListMood}>Calm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styleSymptoms.listMood, selectedMood === 'happy' && styleSymptoms.selectedButtonListMood]}
              onPress={() => handleMoodSelect('happy')}
            >
              <Text style={styleSymptoms.textListMood}>Happy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styleSymptoms.listMood, selectedMood === 'confident' && styleSymptoms.selectedButtonListMood]}
              onPress={() => handleMoodSelect('confident')}
            >
              <Text style={styleSymptoms.textListMood}>Confident</Text>
            </TouchableOpacity>
          </View>

          {/* ----SECTION 2---- */}

          <View style={styleSymptoms.containerListFlow}>
            <TouchableOpacity
              style={[styleSymptoms.listMood, selectedMood === 'sad' && styleSymptoms.selectedButtonListMood]}
              onPress={() => handleMoodSelect('sad')}
            >
              <Text style={styleSymptoms.textListMood}>Sad</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styleSymptoms.listMood, selectedMood === 'depressed' && styleSymptoms.selectedButtonListMood]}
              onPress={() => handleMoodSelect('depressed')}
            >
              <Text style={styleSymptoms.textListMood}>Depressed</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styleSymptoms.listMood, selectedMood === 'sensitive' && styleSymptoms.selectedButtonListMood]}
              onPress={() => handleMoodSelect('sensitive')}
            >
              <Text style={styleSymptoms.textListMood}>Sensitive</Text>
            </TouchableOpacity>
          </View>


          {/* ----SECTION 3---- */}

          <View style={styleSymptoms.containerListFlow}>
            <TouchableOpacity
              style={[styleSymptoms.listMood, selectedMood === 'angry' && styleSymptoms.selectedButtonListMood]}
              onPress={() => handleMoodSelect('angry')}
            >
              <Text style={styleSymptoms.textListMood}>Angry</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styleSymptoms.listMood, selectedMood === 'anxious' && styleSymptoms.selectedButtonListMood]}
              onPress={() => handleMoodSelect('anxious')}
            >
              <Text style={styleSymptoms.textListMood}>Anxious</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styleSymptoms.listMood, selectedMood === 'insecure' && styleSymptoms.selectedButtonListMood]}
              onPress={() => handleMoodSelect('insecure')}
            >
              <Text style={styleSymptoms.textListMood}>Insecure</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Symptoms Section */}
        <View style={styleSymptoms.containerSymptoms}>
          <Text style={styleSymptoms.title}>Symptoms</Text>
          <View style={styleSymptoms.containerListFlow}>
            <TouchableOpacity
              style={[styleSymptoms.listSymptoms, selectedSymptoms['all fine'] && styleSymptoms.selectedButtonListSymptoms]}
              onPress={() => handleSymptomSelect('all fine')}
            >
              <Text style={styleSymptoms.textListSymptoms}>All Fine</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styleSymptoms.listSymptoms, selectedSymptoms.cramps && styleSymptoms.selectedButtonListSymptoms]}
              onPress={() => handleSymptomSelect('cramps')}
            >
              <Text style={styleSymptoms.textListSymptoms}>Cramps</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styleSymptoms.listSymptoms, selectedSymptoms.acne && styleSymptoms.selectedButtonListSymptoms]}
              onPress={() => handleSymptomSelect('acne')}
            >
              <Text style={styleSymptoms.textListSymptoms}>Acne</Text>
            </TouchableOpacity>
          </View>


          {/* ----SECTION 2---- */}


          <View style={styleSymptoms.containerListFlow}>
            <TouchableOpacity
              style={[styleSymptoms.listSymptoms, selectedSymptoms.nausea && styleSymptoms.selectedButtonListSymptoms]}
              onPress={() => handleSymptomSelect('nausea')}
            >
              <Text style={styleSymptoms.textListSymptoms}>Nausea</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styleSymptoms.listSymptoms, selectedSymptoms.cravings && styleSymptoms.selectedButtonListSymptoms]}
              onPress={() => handleSymptomSelect('cravings')}
            >
              <Text style={styleSymptoms.textListSymptoms}>Cravings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styleSymptoms.listSymptoms, selectedSymptoms.migraine && styleSymptoms.selectedButtonListSymptoms]}
              onPress={() => handleSymptomSelect('migraine')}
            >
              <Text style={styleSymptoms.textListSymptoms}>Migraine</Text>
            </TouchableOpacity>
          </View>


          {/* ----SECTION 3---- */}

          <View style={styleSymptoms.containerListFlow}>
            <TouchableOpacity
              style={[styleSymptoms.listSymptoms, selectedSymptoms['lower back'] && styleSymptoms.selectedButtonListSymptoms]}
              onPress={() => handleSymptomSelect('lower back')}
            >
              <Text style={styleSymptoms.textListSymptoms}>Lower Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styleSymptoms.listSymptoms, selectedSymptoms.joint && styleSymptoms.selectedButtonListSymptoms]}
              onPress={() => handleSymptomSelect('joint')}
            >
              <Text style={styleSymptoms.textListSymptoms}>Joint</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styleSymptoms.listSymptoms, selectedSymptoms.leg && styleSymptoms.selectedButtonListSymptoms]}
              onPress={() => handleSymptomSelect('leg')}
            >
              <Text style={styleSymptoms.textListSymptoms}>Leg</Text>
            </TouchableOpacity>
          </View>

        </View>

        {/* Add Button */}
        <TouchableOpacity onPress={handleAddButtonPress}>
          <LinearGradient colors={["#FFCED6", "#EEB9B9"]} style={styleSymptoms.button}>
            <Text style={{ textAlign: 'center', marginTop: 3, color: 'white' }}>Add</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Symptoms;
