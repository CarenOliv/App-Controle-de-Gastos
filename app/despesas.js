import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { styles } from "./estilos/styleDespesas";

export default function Despesas(){
    const [despesas,setDespesas] = useState([])

    async function carregarDespesas(){
        const dados = await AsyncStorage.getItem("despesas")
        const lista =  dados ? JSON.parse(dados) : []
        setDespesas(lista)
    }

    useFocusEffect(
        useCallback(() => {
            carregarDespesas()
        },[])
    )

    function renderItem({item}){
        return(
            <View style={styles.container1}>
                <Text style={{ fontWeight: "bold" }}>
                    {item.categoria}
                </Text>

                <Text>
                    {item.descricao || "Sem descrição"}
                </Text>

                <Text style={{marginTop:6}}>
                    R$ {Number(item.valor).toFixed(2)}
                </Text>

                <Text style={{ fontSize: 12, color: "#666" }}>
                    {item.data}
                </Text>
            </View>
        )
    }
    return(
        <View style={styles.container2}>

            <Text style={styles.txtTitulo}>
                Minhas Despesas
            </Text>

            <FlatList
            data={despesas}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListEmptyComponent={
                <Text style={{ textAlign: "center", marginTop: 40, color: "#666" }}>
                    Nenhuma despesa cadastrada
                </Text>
            }/>

            <TouchableOpacity
            onPress={()=>router.push("/adicionarDespesas")}
            style={styles.botaoNovaDespe}>
                <Text style={{ color: "#fff", fontSize: 16 }}>Nova Despesa</Text>
            </TouchableOpacity>
        </View>
    )
}