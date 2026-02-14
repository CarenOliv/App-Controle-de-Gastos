import { StyleSheet,Dimensions } from "react-native";

export const styles = StyleSheet.create({

    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#2563eb"
    },

    containerLogo:{
        height:Dimensions.get('window').height/3,width:"100%",
        alignItems:'center',
        justifyContent:'center'
    },

    logo:{
        width:'100%',
        height:'60%', 
        resizeMode:"contain"
    },

    Containerbotoes:{
        height:Dimensions.get('window').height/4,
        width:"100%", 
        paddingHorizontal: 37,
        alignItems: "center",  
        justifyContent: "center",
        shadowColor: "#000",

    },

    botaoInscreva:{
        width: "50%",
        height: 45,
        borderRadius: 40,
        backgroundColor: "#eea522",
        justifyContent: "center",  
        alignItems: "center",      
        marginBottom: 15,
        borderColor:'#706c6c',
        marginTop:"60%",
                shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },

    txtInscreva:{
        textAlign:'center',
        color:"#FFF",
        fontSize:18
    },

    botaoEntrar:{
        width: "50%",
        height: 45,
        borderRadius: 40,
        backgroundColor: "#FFF",
        justifyContent: "center",  
        alignItems: "center",      
        marginBottom: 15,
        borderColor:'#706c6c',
                shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },

    txtEntrar:{
        textAlign:'center',
        color:"#2563eb",
        fontSize:18},

    titulo:{
            marginTop:40, 
            marginBottom:40,
            fontFamily: 'Poppins_600SemiBold', 
            color:"#FFF",
            fontSize:30, 
            textAlign:'center',
            
    },
})