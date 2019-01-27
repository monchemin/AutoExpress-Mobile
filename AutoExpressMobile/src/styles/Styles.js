import {
  StyleSheet
} from 'react-native';

const Styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#8e44ad',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10
        //padding: 5,
        //borderBottomColor: '#DDDDDD',
        //borderBottomWidth: 1
    },
    smallWrapper: {
        flexGrow: 2,
        backgroundColor: '#8e44ad',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        margin: 10,
        height: 150,
        //borderBottomColor: '#DDDDDD',
        borderWidth: 1
    },
    wrapperGame: {
    flex: 1,
    backgroundColor: '#ecf0f1',//#ecf0f1
    justifyContent: 'center',
    //alignItems: 'center',
    paddingBottom: 10
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    titleMove: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#8e44ad'
    },
    smallTitleMove: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#8e44ad'
    },
    titleScoreMove: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#8e44ad'
    },
    subTitle: {
        fontWeight: '200',
        color: '#FFFFFF'
    },
    titleWrapper: {
        flex: 1,
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1'
    },
    logoContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100
    },
     smallLogo: {
        width: 70,
        height: 70
    },
    formContainer: {
        flexDirection: 'column',
        margin: 10,
    },
    subContainer: {
        flexGrow: 10,
        flexDirection: 'column',
    },
    gameSubContainer: {
        flexGrow: 10,
        flexDirection: 'column',
        alignItems: 'center'
    },
    inputLogin: {
        height: 40,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#8e44ad'
    },
    inputProfile: {
        height: 25,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderColor: '#8e44ad'
    },
    inputAnswer: {
        height: 100,
        fontSize: 15,
        fontWeight: 'bold',
        borderWidth: 1,
        marginBottom: 10,
        borderColor: '#8e44ad'
    },
    buttonContainer: {
        flex: 1,
        paddingVertical: 15,
        justifyContent: 'center',
        marginBottom: 10,
        backgroundColor: '#8e44ad'
    },
    squareButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //paddingVertical: 15,
        margin: 10,
        backgroundColor: '#8e44ad',
        width: 200,
        height: 200
    },
    buttonRightContainer: {
        flex: 1,
        borderLeftWidth: 0.5,
        borderColor: '#ecf0f1',
        paddingVertical: 15,
        backgroundColor: '#8e44ad'
    },
     buttonLeftContainer: {
        flex: 1,
        borderRightWidth: 0.5,
        borderColor: '#ecf0f1',
        paddingVertical: 15,
        backgroundColor: '#8e44ad'
    },
    buttonViewContainer: {
        flexDirection: 'row'
    },
    buttonText: {
        textAlign: 'center',
        color: '#ecf0f1',
        fontWeight: '700'
    },
    questionText: {
        
        textAlign: 'center',
        color: '#ecf0f1',
        fontWeight: '700'
    },
    icon: {
    width: 26,
    height: 26,
    },


    cover: {
        flex: 1,
        width: 150,
        height: 150,
        marginLeft: 10,
        resizeMode: 'contain'
    },
    info: {
        flex: 3,
        alignItems: 'flex-end',
        flexDirection: 'column',
        alignSelf: 'center',
        padding: 20
    },
    name: {
        marginBottom: 12,
        fontSize: 16,
        fontWeight: '700',
        color: '#222222'
    }
});

export default Styles;