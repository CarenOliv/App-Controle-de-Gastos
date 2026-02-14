import { View, Text, TextInput, TouchableOpacity, Alert} from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { styles } from "./estilos/styleAddDespesa";
import { MsgAddDespesa } from "./services/notificacoes";

export default function AdicionarDespesas(){

    const [valor,setValor] = useState("")
    const [categoria,setCategoria] = useState("")
    const [descricao,setDescricao] = useState("")
    
    const [contas, setContas] = useState([]);
    const [contaSelecionada, setContaSelecionada] = useState(null);

    //carrega os dados ao abrir a tela
    useEffect(() => {
    async function carregarContas() {
      const dados = await AsyncStorage.getItem("contas");
      const lista = dados ? JSON.parse(dados) : [];
      setContas(lista);
    }
    carregarContas();
  }, []);

    //Função principal
    async function salvarDespesas() {

        if (!valor || !categoria || !contaSelecionada){
            Alert.alert("Informe os dados necessários")
            return
        }

        const valorNumerico = Number(valor)

        const novaDespesa = {
            id: Date.now().toString(),
            valor: valorNumerico,
            categoria,
            descricao,
            data: new Date().toISOString().split("T")[0],
            contaId: contaSelecionada.id,
            contaNome: contaSelecionada.banco
        }
            // Cada despesa vai ser salva assim:
            /*
            {
                id: "123456",
                valor: 50,
                categoria: "Alimentação",
                descricao: "Almoço",
                data: "2026-01-24"
            }
            */
        

        const dados = await AsyncStorage.getItem("despesas")
        const despesas =  dados ? JSON.parse(dados):[]

        despesas.push(novaDespesa)

        await AsyncStorage.setItem("despesas",JSON.stringify(despesas))

        // Atualizar o saldo da conta selecionada
        const dadosContas = await AsyncStorage.getItem("contas")
        const listaContas = dadosContas ? JSON.parse(dadosContas):[]

        const contasAtualizadas = listaContas.map((conta) =>
          conta.id === contaSelecionada.id
            ? { ...conta, saldo: conta.saldo - valorNumerico }
            : conta
        );

        await AsyncStorage.setItem(
          "contas",
          JSON.stringify(contasAtualizadas)
        );

        await MsgAddDespesa()
        router.back() // volta para a tela anterior

    }

    return(
        <View style={styles.container}>
            <Text style={{fontSize:18, marginTop:40,textAlign:'center'}}>Nova Despesa</Text>

            <Text style={{marginTop:40}}>Valor R$</Text>
            <TextInput
            keyboardType="numeric"
            value={valor}
            onChangeText={setValor}
            placeholder="Ex: 50.00"
            style={styles.inputValorDesp}/>

            <Text>Categoria</Text>
            <TextInput
            value={categoria}
            onChangeText={setCategoria}
            placeholder="EX: Alimentação"
            style={styles.inputDescriDesp}/>

            <Text>Descrição (opcional)</Text>
            <TextInput
                value={descricao}
                onChangeText={setDescricao}
                placeholder="Ex: Almoço, lanche..."
                style={styles.inputDescriDesp}
            />

            <Text style={{ marginTop: 16 }}>Conta usada</Text>
             

            {contas.map((conta) => (
              <TouchableOpacity
                key={conta.id}
                onPress={() => setContaSelecionada(conta)}
                style={{
                  padding: 12,
                  borderRadius: 10,
                  marginTop: 8,
                  backgroundColor:
                    contaSelecionada?.id === conta.id ? "#2563eb" : "#e5e7eb",
                }}
              >
                <Text
                  style={{
                    color:
                      contaSelecionada?.id === conta.id ? "#fff" : "#000",
                  }}
                >
                {conta.banco} — R$ {Number(conta.saldo).toFixed(2)}
          </Text>
        </TouchableOpacity>
      ))}

            <TouchableOpacity
            onPress={salvarDespesas}
            
            style={styles.botaoSalvar}>
                <Text style={styles.txtBotaoSalvar}>Salvar Despesas</Text>
            </TouchableOpacity>
        </View>

        
    )
}