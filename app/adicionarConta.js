import { View, Text, TextInput, TouchableOpacity,Alert } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { styles } from "./estilos/styleAddConta";

import {MsgAddConta} from "./services/notificacoes"



export default function adicionarConta(){

    const [banco, setBanco] = useState("")
    const [saldo,setSaldo] = useState("")

    async function salvarConta() {
        
        if(!banco || !saldo){
            Alert.alert("Preencha todos os campos!")
            return
        }

        const novaConta = {
            id: Date.now().toString(),
            banco,
            saldo:Number(saldo)
        }

        try{
            const contasSalvas = await AsyncStorage.getItem("contas")
            const contas = contasSalvas ? JSON.parse(contasSalvas):[]

            contas.push(novaConta)

            await AsyncStorage.setItem("contas",JSON.stringify(contas))

            Alert.alert("Conta adicionada com sucesso")
            await MsgAddConta()
            router.back()
        }
        catch (error){
            Alert.alert("Não foi possível salvar a conta")
        }
    }

    return(
        <View style={styles.container}>

            <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Adicionar Conta</Text>

            <Text>Nome do banco:</Text>
            <TextInput
            style={styles.input}
            placeholder="Ex: Santander"
            value={banco}
            onChangeText={setBanco}/>
            
            <Text>Saldo Inicial</Text>
            <TextInput
            style={styles.input}
            placeholder="Ex: 100"
            keyboardType="numeric"
            value={saldo}
            onChangeText={setSaldo}/>

            <TouchableOpacity
            onPress={salvarConta}
            style={styles.botaoSalvarConta}>
                <Text>Salvar Conta</Text>
            </TouchableOpacity>
        </View>
    )

}