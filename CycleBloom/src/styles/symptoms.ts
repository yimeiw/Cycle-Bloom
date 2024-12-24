import { StyleSheet } from "react-native";

const styleSymptoms = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFE0E0'
      },
      imageSymptoms: {
        width: 324,
        height: 150,
        marginLeft: 25
      },
      sectionIsiSymptoms: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },

    title: {
        margin: 16,
        marginBottom: 2,
    },

    containerMenstrualFlow: {
        marginTop: 30,
        backgroundColor: '#FFE6E6',
        borderRadius: 30,
        borderWidth: 1,  
        borderColor: '#E69AA6',
        width: 373,
        height: 108,
        marginLeft: 9,
    },

    containerListFlow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },

    listFlow:{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#EEB9B9',
        borderRadius: 50,
        width: 109,
        height: 26,
        margin: 6,
        marginTop: 20,
    },

    textListFlow: {
        color: '#B8001F',
        display: 'flex', 
        justifyContent: 'center', 
        textAlign:'center',
        fontSize: 15,
    },

    
    selectedButtonListFlow: {
        backgroundColor: '#FFB6C6',
    },


    containerMood: {
        marginTop: 30,
        backgroundColor: '#F0EDFF',
        borderRadius: 30,
        width: 373,
        height: 212,
        marginLeft: 9,
        borderWidth: 1,
        borderColor: '#A594F9'
    },

    textListMood: {
        color: '#9747FF',
        display: 'flex', 
        justifyContent: 'center', 
        textAlign:'center',
        fontSize: 15,
    },

    listMood:{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#A594F9',
        borderRadius: 50,
        width: 109,
        height: 26,
        margin: 6,
        marginTop: 20,
    },

    selectedButtonListMood: {
        backgroundColor: '#CCBFFF',
    },

    containerSymptoms: {
        marginTop: 30,
        backgroundColor: '#FFF8E5',
        borderRadius: 30,
        width: 373,
        height: 212,
        marginLeft: 9,
        marginBottom: 60,
        borderWidth: 1,
        borderColor: '#D1D191'
    },

    textListSymptoms: {
        color: '#BABA04',
        display: 'flex', 
        justifyContent: 'center', 
        textAlign:'center',
        fontSize: 15,
    },

    listSymptoms:{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#BABA04',
        borderRadius: 50,
        width: 109,
        height: 26,
        margin: 6,
        marginTop: 20,
    },

    selectedButtonListSymptoms: {
        backgroundColor: '#FFE5A0',
    },

    button: {
        alignSelf: 'center',
        marginBottom: 40,
        width: 91,
        height: 29,
        borderRadius: 40,
    }
});

export default styleSymptoms;