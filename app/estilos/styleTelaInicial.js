import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#f5f5f4",
        paddingHorizontal: 20,
        paddingTop: 40,
    },

    topo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 30,
    },


    txtSaudacao:{
        fontSize:23,
        fontWeight:"bold"
    },

    saldo:{
        fontSize: 36,
        fontWeight: "bold",
        color: "#16a34a",
        textAlign: "center",
        marginBottom: 30
    },

    conta: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    nomeConta: {
        fontSize: 16,
        color: "#444",
    },
    valorConta: {
        fontSize: 16,
        fontWeight: "600",
    },

    statusMeta:{
        textAlign: "center",
        color: "#555",
        marginTop:15,
        marginBottom: 35,
        fontSize:20
    },

    ContainerSomaGastos:{
        backgroundColor: "#facc15",
        padding: 16,
        marginTop:15,
        borderRadius: 20,
        marginBottom: 20,
        justifyContent:"center",
        alignItems:"center",
        width:"60%",
        alignSelf:"center" //centraliza o container
    },
    txtCardGastos:{
        fontWeight: "bold",
        marginBottom: 10,
        marginTop:20,
        fontSize: 24,
        textAlign:"center"
    },

    txtBotao:{
        // fontWeight: "bold",
        fontSize:16
    },
    containerBotao:{
        flexDirection:"row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    botoes:{
        backgroundColor:"#fbbf24",
        padding:14,
        borderRadius:20,
        width:"30%",
        alignItems:"center", 
        justifyContent:"center",
        alignItems:"center"
    },
    botaoEconomizar:{
        backgroundColor: "#f59e0b",
        paddingVertical: 14,
        borderRadius: 30,
        alignItems: "center", 
    }
})