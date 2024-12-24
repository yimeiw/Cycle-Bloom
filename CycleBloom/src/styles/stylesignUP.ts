import { StyleSheet, Dimensions } from "react-native";

const styleSignUP = StyleSheet.create({
    background: {
        flex: 1,
    },

    inputContainer: {
        marginVertical: 10,
        paddingHorizontal: 20,
      },
      input: {
        height: 50,
        borderColor: '#B9717D',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        fontSize: 16,
      },
      errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
      },
    
    sliderContainer: {
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center', 
    },

    sliderItem: {
        width: Dimensions.get('window').width * 0.8, 
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 10, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 5 }, 
        shadowOpacity: 0.2, 
        shadowRadius: 10, 
    },      
    sliderImage: {
        width: '100%',
        height: 350,
        resizeMode: 'cover',
    },
    textOverlay: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textTitle: {
        marginTop: 30,
        fontSize: 40,
        fontFamily: 'CrimsonText-Regular',  
        textAlign: 'center',
    },
    textSubTitle: {
        marginTop: 5,
        marginLeft: 70,
        marginRight: 70,
        fontSize: 20,
        lineHeight: 30,
        fontFamily: 'CrimsonText-Italic',
        fontStyle: 'italic',
        textAlign: 'center',
    },
    containerButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20, // Tambahkan jarak vertikal untuk estetika
    },
    containerButton2: {
        borderRadius: 50,
        overflow: 'hidden', // Pastikan elemen anak tidak keluar dari radius
    },
    buttonSignUP: {
        width: 362,
        height: 99,
        borderRadius: 50,
        justifyContent: 'center', // Untuk memusatkan teks
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        textAlign: 'center',
        fontSize: 40,
        color: 'white',
        fontFamily: 'CormorantGaramond-Bold',
    },
})

export default styleSignUP;