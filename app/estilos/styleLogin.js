import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'flex-start', // 👈 muda isso
        padding: 24,
        paddingTop: 40, // 👈 controla o quanto desce
    },

    txtSaudacoes:{
        marginTop:40, 
        marginBottom:40,
        fontFamily: 'Poppins_600SemiBold', 
        color:"#000",
        fontSize:30, 
        textAlign:'center',
    },

    txtPin:{
        fontSize:16,
        marginBottom:15,
    },

    input:{
        backgroundColor:"#e5e7eb",
        borderRadius:12,
        padding:16,
        fontSize:12,
        textAlign:"center",
        marginBottom:20
        
    },

    containerBotao:{
        width:'100%',
        alignItems:'flex-end',
        marginTop: 20
        
    },

    botao:{
        backgroundColor:"#2563eb",
        borderRadius:40,
        width:'45%',
        paddingVertical:14,
        alignItems:'center'
    },

    txtBotao:{

        color:"#FFF",
        textAlign:"center",
        fontSize:16
    }

})