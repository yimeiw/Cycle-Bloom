import { StyleSheet } from "react-native";

const styleAIAnalyze = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0C6C6',
    },
    imageAI: {
        width: 324,
        height: 150,
        marginLeft: 25,
    },
    containerPink: {
        backgroundColor: '#FFE0E0',
        width: 373,
        height: 558,
        marginLeft: 9,
        marginTop: 11,
        borderRadius: 50,
    },
    containerPutih: {
        backgroundColor: 'white',
        width: 343,
        height: 527,
        marginLeft: 15,
        marginTop: 15,
        borderRadius: 50,
    },
    textSymptomsTitle: {
        marginLeft: 20,
        marginTop: 30,
        fontWeight: 'bold',
        fontSize: 20,
    },
    textSymptoms: {
        marginLeft: 20,
        marginRight: 40,
        marginTop: 10,
        textAlign: 'justify',
        fontSize: 20,
    },

    textCycle:{
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,
        fontSize: 20,
        textAlign: 'justify',
    },

    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        zIndex: 1,
        borderRadius: 50,
        padding: 20,
    },
    openButton: {
        display: 'flex',
        position: 'absolute',
        bottom: 7,  
        right: 20,   
        width: 50,
        height: 50,
        // zIndex: 10,
    },

    closeButton: {
        position: 'absolute',
        bottom: 10,     
        left: 50,      
        width: 50,      
        height: 50,     
        zIndex: 10,     
    },

    listFiturPink: {
        backgroundColor: '#FFE0E0',
        width: 373,
        height: 317,
        marginLeft: 9,
        marginTop: 11,
        borderRadius: 50
    },
    
      listFiturPutih: {
        backgroundColor: 'white',
        width: 344,
        height: 287,
        borderRadius: 50,
        marginLeft: 15,
        marginTop: 15,
      },
    
    periodCycleContainer: {
        backgroundColor: 'rgba(255, 224, 224, 0.7)',
        borderRadius: 40,
        width: 331,
        height: 72,
        marginTop: 18,
        marginLeft: 7,
    },

    periodCycle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 80,
    },


    symptomsContainer: {
        backgroundColor: 'rgba(255, 224, 224, 0.7)',
        borderRadius: 40,
        width: 331,
        height: 72,
        marginTop: 18,
        marginLeft: 7,
    },

    symptoms: {
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
    },
    
    calendarContainer: {
        backgroundColor: 'rgba(255, 224, 224, 0.7)',
        borderRadius: 40,
        width: 331,
        height: 72,
        marginTop: 18,
        marginLeft: 7,
    },

    calendar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 80,
    },
});

export default styleAIAnalyze;
