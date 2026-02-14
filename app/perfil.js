import { View ,Text, TouchableOpacity } from "react-native";

import { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {router} from "expo-router"

import {styles} from "./estilos/stylePerfil"

export default function Perfil(){

    const [nome, setNome] = useState("")
    const [renda, setRenda] = useState("")
    const [pin, setPin] = useState("")

    useEffect(() => {
        async function carregarUsuario() {
            const dados = await AsyncStorage.getItem("usuario")

            if (dados){
                async function carregarUsuario() {
                    
                }
            }
        }
    })
}