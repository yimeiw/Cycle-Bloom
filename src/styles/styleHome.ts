import { StyleSheet } from 'react-native';

const styleHome = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE0E0'
  },
  imageHome: {
    width: 324,
    height: 150,
    marginLeft: 25
  },
  sectionCalenderBackground: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  sectionCalenderPinkTop: {
    backgroundColor: '#FFE0E0',
    width: 373,
    height: 478,
    marginLeft: 9,
    marginTop: 11,
    borderRadius: 50
  },
  containerCalendar: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    width: 346,
    height: 406,
    marginLeft: 15,
    marginTop: 15,
    color: '#B9717D',
  },

  containerButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    width: 346,
    height: 36,
    marginLeft: 15,
  },
  button: {
    display: 'flex',
    width: 91,
    height: 29,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    top: -10,
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
  
  aiAnalyzeContainer: {
    backgroundColor: 'rgba(255, 224, 224, 0.7)',
    borderRadius: 40,
    width: 331,
    height: 72,
    marginTop: 18,
    marginLeft: 7,
  },

  aiAnalyze: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 80,
  },
});


export default styleHome;
