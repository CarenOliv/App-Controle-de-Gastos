import { Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
// Dimensions → pegar tamanho da tela do celular

import { useFonts, Poppins_400Regular, Poppins_600SemiBold,Poppins_700Bold } from "@expo-google-fonts/poppins";

import { router } from "expo-router";
// Esse é o sistema de navegação do Expo Router. Ele permite ir de uma tela para outra


import {styles} from "./estilos/styleIndex"




// cria a tela principa.
export default function Index() {
  

  // Carregamento das fontes
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null; // espera a fonte carregar
  }


  return (

    // esse View style aplica o estilo em todo o código que está dentro da view, como o Body do HTML
    <View style={styles.container}>
      

      <View style={styles.containerLogo}>

        {/* LOGO */}
        <Image
          source={require("../assets/images/Logo final.png")}
          style={styles.logo}
        />

        {/* TEXTO INICIAL */}
        <Text style={styles.titulo}>
          Bem Vindo(a) ao seu Controle de Gastos
        </Text>

      </View>

      {/* Container dos botões */}
      <View style=
      {styles.Containerbotoes}>

        {/* Botão de : inscrever-se */}
        <TouchableOpacity onPress={() => router.push("/inscrever")}
        style={styles.botaoInscreva} >

          {/* Texto do botão de inscrever-se */}
          <Text style={styles.txtInscreva}>Inscreva-se</Text>


        {/* Botão de : entrar */}
        </TouchableOpacity>     

        <TouchableOpacity
            onPress={async () => {
                
                
                router.push("/login");
            }}
            style={styles.botaoEntrar}
            >
            <Text>Entrar</Text>
        </TouchableOpacity>    

      </View>

      {/* Essa View só existe para ocupar espaço na tela. */}
      <View style={{height:Dimensions.get('window').height/3,width:"100%"}}></View>    
       {/*Dimensions.get('window') --> pega o tamanho da tela do celular  
       como está escrito .height quer dizer que está pegando apenas a ALTURA
       como está dividindo por três (.height/3) que dizer que essa view vai ocupar 1/3 da altura da tela do celular e 100% da largura.
       
       tudo isso para os elementos não ocuparem essa região da tela*/}

       {/* Esse View é um espaçador invisível que reserva 1/3 da tela, empurrando o conteúdo para cima. */}

       {/* Então o valor que sairá de Dimensions.get('window').height/3 vai ser atribuído a height dessa view */}     

      
    </View>
  );
}