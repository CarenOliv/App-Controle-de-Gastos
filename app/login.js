import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

import { styles } from "./estilos/styleLogin";
import { MSGEntrada } from "./services/notificacoes";

// Define a tela de login.
export default function Login() {
  const [pinDigitado, setPinDigitado] = useState("");
  /*Esse estadlo: guarda o que o usuário digita
     Começa vazio e é atualizado a cada tecla*/

  async function entrar() {
    try {
      const dadosSalvos = await AsyncStorage.getItem("usuario");
      //Busca o cadastro salvo
      //Retorna: string JSON (se existir)
      //ou null (se não existir)

      // Se não existir o cadastro
      if (!dadosSalvos) {
        Alert.alert("Nenhum cadastro encontrado");
        router.push("/inscrever"); // manda para a tela de cadastro
        return;
      }

      //Convertendo JSON em objeto
      // Transforma o texto salvo em um objeto JavaScript
      const usuario = JSON.parse(dadosSalvos);

      // Verifica o PIN
      if (pinDigitado === usuario.pin) {        
        
        // ✅ TENTA NOTIFICAÇÃO, MAS NÃO DEIXA QUEBRAR O LOGIN
            MSGEntrada().catch(err => 
                console.log("Notificação falhou (não crítico):", err)
            );
            
            // ✅ VAI PARA HOME IMEDIATAMENTE
            router.push("/telaInicial")

      } else {
        Alert.alert("PIN incorreto");
      }
    } catch (error) {
      Alert.alert("Erro ao verificar o login");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.txtSaudacoes}>Bem Vindo (a)</Text>

      <Text style={styles.txtPin}>Digite seu PIN para continuar:</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        maxLength={4}
        secureTextEntry //esconde os números
        value={pinDigitado}
        onChangeText={setPinDigitado}
      />

      <View style={styles.containerBotao}>
        <TouchableOpacity onPress={entrar} style={styles.botao}>
          <Text style={styles.txtBotao}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
