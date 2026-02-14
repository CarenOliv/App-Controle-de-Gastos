import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center"
  },

  txtForm:{
    marginLeft:5, 
    color:"#000000",
    marginTop:20,
    fontSize:18
  },

  ContainerInput:{
    width:'90%',
    height:40,
    borderWidth:1,
    borderRadius:40,
    marginTop:10,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor:'#e7e4e4',
    borderColor:'#949393'

  },
  input:{
    height:'100%',
    width:'100%',
    borderRadius:40,
    paddingHorizontal:15,
    justifyContent: "center"
  },

  inputText:{
    textAlign: "left", // força alinhamento à esquerda
    color: "#000",

  },

  ContainerRenda:{
    flexDirection: "row",
    gap: 10,
    marginTop: 5,
    width:'90%'
  },
  botaoRenda:{
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    alignItems: "center",
  },
  botaoSelecionado:{
    backgroundColor: "#eea522",
    borderColor: "#be800c",
  },
  containerBotaoFinal:{
    width:'90%',
    alignItems:'flex-end',
    marginBottom:60,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  botao:{
    backgroundColor:"#2563eb",
    borderRadius:40,
    width:'45%',
    paddingVertical:14,
    alignItems:'center'
  },
  txtBotao:{
    fontSize:18,
    color:"#FFF"
  },
});
