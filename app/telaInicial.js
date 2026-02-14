import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

import { styles } from "./estilos/styleTelaInicial";

import { calcularSaldoGeral, calcularGastoDoDia, calcularPorCategoria } from "./utils/calculosDespesas";




export default function TelaInicial(){
    
    const [nome,setNome] = useState("")
    const [contas,setContas] = useState([])
    const [despesas, setDespesas] = useState([])

    const saldoGeral = calcularSaldoGeral(contas)


    async function carregarContas(){
        const dados = await AsyncStorage.getItem("contas")
        const lista = dados ? JSON.parse(dados) : []
        setContas(lista)
        console.log("Contas carregadas:", lista)
    }

    useFocusEffect(
        useCallback(() => {
            carregarContas();
        }, [])
    )

    async function carregarDespesas() {
        const dados = await AsyncStorage.getItem("despesas");
        const lista = dados ? JSON.parse(dados) : [];
        setDespesas(lista);
    }

    useFocusEffect(
        useCallback(() => {
            carregarDespesas();
        }, [])
    );

    // const totalDespesas = calcularTotalDespesas(despesas);
    const gastoHoje = calcularGastoDoDia(despesas);
    const gastosPorCategoria = calcularPorCategoria(despesas);



    // para carregar os dados do usuário
    useEffect(() =>{
        async function carregarUsuario() {
            const dados = await AsyncStorage.getItem("usuario")
            if (dados){
                const usuario = JSON.parse(dados)
                setNome(usuario.nome)
            }
        }
        carregarUsuario()
    },[])

    return(
        <View style={styles.container}>

            <View style={styles.topo}>
            
                
            </View>

            <Text style={styles.txtSaudacao}>Olá, {nome || "Usuário"}</Text>

            {/* <Text style={styles.saldo}>R$ 1.512,90</Text> */}
            {/* <Text style={styles.txtCardGastos}>
                Gastos do dia: R$ {gastoHoje.toFixed(2)}
            </Text> */}
            <Text style={styles.txtCardGastos}>
                Saldo geral: R$ {saldoGeral.toFixed(2)}
            </Text>
            
            

            {/* {Object.entries(gastosPorCategoria).map(([categoria, valor])=>(
                <Text key={categoria}>
                    {categoria}: R$ {valor.toFixed(2)}
                </Text>
            ))} */}
            
            {/* flexGrow: 0 Controla o conteúdo interno da lista, não o container. */}
            <FlatList

            
            data={contas} //Aqui você passa o array que será exibido. Cada objeto do array vira um item da lista.
            
            keyExtractor={(item) => String(item.id)}

            // Define como cada item da lista será exibido na tela.
            renderItem={({ item }) => (
                <View
                style={{
                    backgroundColor: "#facc15",
                    padding: 16,
                    borderRadius: 20,
                    marginBottom: 16,
                }}
                >
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    {item.banco}
                </Text>
                <Text>R$ {Number(item.saldo).toFixed(2)}</Text>
                </View>
            )}
            ListEmptyComponent={
                <Text
                style={{
                    textAlign: "center",
                    marginVertical: 12,
                    color: "#666",
                }}
                >
                Nenhuma conta adicionada
                </Text>
            }

            
            style={{ flexGrow: 0 }}
            contentContainerStyle={{ flexGrow: 0 }}
            />


            <TouchableOpacity
                onPress={() => router.push("/adicionarConta")}
                style={{
                    backgroundColor: "#2563eb",
                    padding: 14,
                    borderRadius: 30,
                    alignItems: "center",
                    marginBottom: 20
                }}
                >
                <Text style={{ color: "#fff", fontSize: 16 }}>
                    + Adicionar Conta
                </Text>
            </TouchableOpacity>


            {/* Vou mover essa parte para cima */}
            


            {/* <View style={styles.conta}>
                <Text style={styles.nomeConta}>Santander</Text>
                <Text style={styles.valorConta}>R$ 1.000,00</Text>

                <Text style={styles.nomeConta}>Bradesco</Text>
                <Text style={styles.valorConta}>R$ 512,00</Text>

                <Text style={styles.nomeConta}>Caixa</Text>
                <Text style={styles.valorConta}>R$ 0,90</Text>
            </View> */}


            <View style={styles.ContainerSomaGastos}>
                
                <Text style={styles.txtCardGastos}>Gastos</Text>
                {Object.entries(gastosPorCategoria).map(([categoria, valor])=>(
                <Text key={categoria}>
                    {categoria}: R$ {valor.toFixed(2)}
                </Text>
            ))}


            </View>

            <Text style={styles.statusMeta}>
                Status da Meta: sem meta adicionada
            </Text>

            <View style={styles.containerBotao}>

                <TouchableOpacity style={styles.botoes} onPress={() => router.push("/despesas")}>

                    <Text style={styles.txtBotao}>Despesas</Text>

                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.botoes} onPress={()=>router.push("/meta")}>
                    <Text style={styles.txtBotao}>Metas</Text>
                </TouchableOpacity> */}

                
            </View>

            {/* <TouchableOpacity style={styles.botaoEconomizar} onPress={()=>router.push("/dicasEconomizar")}>

                <Text style={styles.txtBotao}>Como economizar</Text>
                
            </TouchableOpacity> */}
       
        </View>
    )
}