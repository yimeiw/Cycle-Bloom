import { StyleSheet } from 'react-native';

const stylePeriodCycle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0C6C6'
    },

    imageContainer: {
      marginTop: 20,
      alignItems: 'center',
  },
  image: {
      width: 300,
      height: 200,
      marginTop: 10,
  },

  button: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
   
  },

  buttonStyle:{
    width: 91,
    height: 39,
    backgroundColor: '#FFCED6',
    borderRadius: 50,
    marginTop: 30,
    marginBottom: 50,
  },

    imagePeriodCycle: {
        width: 324,
        height: 150,
        marginLeft: 30,
        marginBottom: 30
    },
    sectionIsiPeriodCycle: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    listFiturContainer: {
        backgroundColor: 'white'
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

export default stylePeriodCycle;