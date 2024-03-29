import { StyleSheet, useWindowDimensions } from 'react-native';

export default function GlobalStyle() {
    const layout = useWindowDimensions();

    let margin = 120;
    let gap = 30;

    if (layout.width < layout.height) {
        margin = 40;
        gap = 20;
    }

    return StyleSheet.create({
        // General
        container: {
            flex: 1,
            justifyContent: 'center',
            gap: gap,
        },
        flex1: {
            flex: 1
        }, 
        coverImageWrapper: {
            flex: 1
        }, 
        coverImage: {
            flex: 1,
            aspectRatio: 1 / 1
        }, 
        logoWrapper: {
            marginLeft: margin,
            marginRight: margin,
        },
        logo: {
            width: 40,
            aspectRatio: 1 / 1
        },
        title: {
            marginLeft: margin,
            marginRight: margin, 
            fontSize: 32,
            color: '#121212',
            fontWeight: 'bold'
        },
        inputComponent: {
            marginLeft: margin,
            marginRight: margin, 
            gap: 10,
            alignSelf: 'stretch',
            justifyContent: 'center'
        },
        flexRow: {
            flexDirection: 'row'
        }, 
        input: {
            padding: 8,
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 10
        }, 
        btnSubmitWrapper: {
            marginLeft: margin,
            marginRight: margin, 
            alignSelf: 'stretch',
            alignItems: 'center',
            backgroundColor: 'blue',
            borderRadius: 10,
        },
        btnSubmit: {
            color: '#ffffff',
            fontSize: 20,
            fontWeight: 'bold',
            padding: 10,
        },

        // SignIn
        hyperlinkComponent: {
            marginLeft: margin,
            marginRight: margin, 
            alignSelf: 'stretch',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        underline: {
            textDecorationLine: 'underline'
        },
        continueWrapper: {
            marginLeft: margin,
            marginRight: margin, 
            flexDirection: 'row',
            alignSelf: 'stretch',
            alignItems: 'center',
            justifyContent: 'space-between'
        }, 
        line: {
            borderBottomWidth: 1,
            borderBottomColor: '#000000',
            width: "25%",
        },
        btnGoogleWrapper: {
            marginLeft: margin,
            marginRight: margin, 
            flexDirection: 'row',
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            borderRadius: 10,
            borderColor: '#000000',
            // borderWidth: 1
        },
        btnGoogle: {
            color: '#000000',
            fontSize: 20,
            fontWeight: 'bold',
            padding: 10,
        }, 

        // OTP
        twoLogoWrapper: {
            flexDirection: 'row', 
            justifyContent: 'space-between',
            marginLeft: margin,
            marginRight: margin
        }, 
        description: {
            marginLeft: margin,
            marginRight: margin
        }, 

        error: {
            marginLeft: margin,
            marginRight: margin, 
            color: 'red'
        }, 

        bolder: {
            fontWeight: 'bolder'
        }
    });
}