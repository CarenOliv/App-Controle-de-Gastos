import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./estilos/styleInscrever";

import { router } from "expo-router"; //permite navegar entre telas

import DateTimePicker from "@react-native-community/datetimepicker";
// Componente externo que abre o seletor de data nativo do celular
//Para importar isso antes foi preciso baixar no terminal

import { useState } from "react"; //Hook do React usado para guardar e controlar estados (valores que mudam)

import AsyncStorage from "@react-native-async-storage/async-storage"; //armazenamento interno do celular
//Funciona como um banco de dados simples (chave,valor)

export default function Inscrever() {

  // Estados dos Campos
  //constantes que guardam o que o usuário digita

  const [nome,setNome] = useState("");
  const [email,setEmail] = useState("");

  const [data, setData] = useState(null);
  // Se refere a mudança da data do nascimento
  /* [guarda a data, permite modificar a data]
  a data começa como null, enquando nenhuma data for escolhida, depois vira um objeto Date*/

  const [mostrar, setMostrar] = useState(false);
  /*Cria uma variável chamada mostrar, que começa como false,
  e uma função chamada setMostrar que muda esse valor.
  Como começa em false, o calendário não aparece quando a tela abre. 
  false --> o calendário não aparece
  true --> o calendário aparece*/

  /*Mas quando o usuário clicar no campo de data, setMotrar modificará o valor de Mostrar:
  onPress={() => setMostrar(true)} 
  mostrar = true  */

  const [tipoRenda, setTipoRenda] = useState(null);
  // Guarda se a renda é "fixa" ou "variavel"

  const [intervalo, setIntervalo] = useState(null);
  // Permite o usuário escolher e modificar o intervalo da renda 
  // Como o valor inicial é null, o usuário ainda não escolheu nenhum intervalo
  //se o usuário clicar em renda "mensal", então intervalo === "Mensal"
  // se trata dos campos: "Semanal", "Quinzenal" ou "Mensal"

  const [rendaMensal,setRendaMensal] = useState("");
  const [profissao,setProfissao] = useState("")
  const [valorMedio,setValorMedio] = useState("");
  const [pin,setPin] = useState("")


 async function salvarCadastro(){

  /* Validação simples:
  Se algum campo obrigatório estiver vazio --> mostra erro e para a função */
  if (!nome || !email || !tipoRenda || !rendaMensal || !pin){
    Alert.alert ("Erro\nPreencha todos os campos obrigatórios!")
    return
  }

  if(pin.length!==4){
    Alert.alert("Erro\nO PIN deve ter 4 dígitos")
    return //sem o return mesmo com o PIN errado, o código continua salvando
  }

  // Montagem do objeto usuário
  const usuario={
    nome,email,

    dataNascimento: data ? data.toLocaleDateString("pt-br") : "",
    /*Se existir uma data (data não é null)
    então salve a data formatada,
    senão salve uma string vazia*/

    tipoRenda, //é o mesmo que: tipoRenda: tipoRenda,

    rendaMensal: tipoRenda === "fixa" ? rendaMensal: "",
    /*Se o tipo da renda for fixa,
    salve o valor de rendaMensal,
    senão salve vazio*/

    profissao: tipoRenda === "fixa" ? profissao: "",
    /*Se a renda for fixa --> salva a profissão
    senão --> salva vazio*/

    intervalo: tipoRenda === "variavel" ? intervalo : "",
    /*se a renda dor variavel --> salva intervalo
    senão --> salva vazio*/

    valorMedio: tipoRenda === "variavel" ? valorMedio :"",
    /*Se a renda for variavel --> salva valor médio
    senão --> salva vazio*/
    pin
  }

  try{
    await AsyncStorage.setItem ("usuario", JSON.stringify(usuario))

    Alert.alert("Cadastro realizado com suceso!")
    router.push("/login") //tela de PIN

  }catch (error){
    Alert.alert("Erro ao salvar os dados")
  }

 }

  return (
    <View style={styles.container}>

      <View>

        {/* Campo do Nome */}
        <Text style={styles.txtForm}>Nome Completo:</Text>
        <View style={styles.ContainerInput}>
          <TextInput style={styles.input}
          value={nome}
          onChangeText={setNome}/>
        </View>

        {/* Data de Nascimento */}
        <Text style={styles.txtForm}>Data de Nascimento:</Text>

        <View style={styles.ContainerInput}>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setMostrar(true)}
          >
            {/* Renderização condicional :
            Se já existe data → mostra a data formatada
            Se não existe → mostra o texto de ajuda*/}

            {/* è um if...else simplificado, caso contrário ficaria assim: */}

            {/* if (data) {
                texto = data.toLocaleDateString("pt-BR");
              } else {
                texto = "Clique aqui para selecionar";
              }*/}

            <Text style={styles.inputText}>
              {data ? data.toLocaleDateString("pt-BR") : "Clique aqui para selecionar"}
            </Text>

          </TouchableOpacity>
        </View>
        

        {/* Se mostrar for true, renderize o DateTimePicker, ou seja, Se mostrar for true, o calendário aparece na tela */}

        {/* mostrar && <DateTimePicker é o mesmo que 
        if (mostrar === true) { mostrar o DateTimePicker na tela }  */}

        {/* Quando mostrar é false → o DateTimePicker nem existe na árvore de componentes */}

        {mostrar && (
          <DateTimePicker
            value={data || new Date()}
            mode="date"
            display="default"
            onChange={(_, selectedDate) => {
              setMostrar(false);
              if (selectedDate) {
                setData(selectedDate);
              }
            }}
            // A função onChange evia 2 parâmetros, mas o parâmetro do event não será usado, então posso substituir por _
          />
        )}

        
        {/* Email */}
        <Text style={styles.txtForm}>Email:</Text>
        <View style={styles.ContainerInput}>
          <TextInput style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <Text style={styles.txtForm}>Crie um PIN (4 números): </Text>
        <View style={styles.ContainerInput}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={4}
            secureTextEntry //secureTextEntry esconde os números
            value={pin}
            onChangeText={setPin}
          />
        </View>          

        {/* Tipo de renda */}
        <Text style={styles.txtForm}>Tipo de Renda:</Text>
        
        <View style={styles.ContainerRenda}>

          

          <TouchableOpacity style={
            [styles.botaoRenda,
            tipoRenda==="fixa" && styles.botaoSelecionado]}
            onPress={()=>setTipoRenda("fixa")}>

              <Text
                style={{
                  color: tipoRenda === "fixa" ? "#fff" : "#000",
                  fontWeight: "bold",
                }}>
                Fixa
              </Text>

          </TouchableOpacity>

          {/*Botão de renda variaveç 
          tipoRenda vira "variavel" 
          Se for "variavel", aplica botaoSelecionado*/}

          <TouchableOpacity style={[styles.botaoRenda, tipoRenda==="variavel" && styles.botaoSelecionado]}
          onPress={()=>setTipoRenda("variavel")}>

            <Text
              style={{
                color: tipoRenda === "variavel" ? "#fff" : "#000",
                fontWeight: "bold",
              }}>
              Variável
            </Text>

          </TouchableOpacity>
          </View>

          {/* Campo - RENDA FIXA */}
          {tipoRenda === "fixa" && (
            <View>
              <Text style={styles.txtForm}>Renda Mensal:</Text>
              <View style={styles.ContainerInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 2500"
                  keyboardType="numeric"
                  value={rendaMensal}
                  onChangeText={setRendaMensal}
                />
            </View>

          <Text style={styles.txtForm}>Trabalho / Profissão:</Text>
          <View style={styles.ContainerInput}>
            <TextInput
              style={styles.input}
              placeholder="Ex: Professora"
              value={profissao}
              onChangeText={setProfissao}
            />
          </View>
        </View>
      )}

        {tipoRenda === "variavel" && (
        <View>
          <Text style={styles.txtForm}>Intervalo de Recebimento:</Text>

          <View style={styles.ContainerRenda}> 

            {/* Cria 3 botões automaticamente, evitando repetição de código: */}

            {["Semanal", "Quinzenal", "Mensal"].map((item) => (
              <TouchableOpacity
                key={item}
                style={[styles.botaoRenda, 
                  intervalo === item && styles.botaoSelecionado]} 
                  // Destaca visualmente o intervalo escolhido
                  
                onPress={()=>setIntervalo(item)}
              >
                <Text
                    style={{
                      color: intervalo === item ? "#fff" : "#000",
                      fontWeight: "bold",
                    }}
                  >
                    {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.txtForm}>Valor Médio:</Text>
          <View style={styles.ContainerInput}>
            <TextInput
              style={styles.input}
              placeholder="Ex: 1200"
              keyboardType="numeric"
              value={valorMedio}
              onChangeText={setValorMedio}
            />
          </View>
        </View>
      )}
          
        </View>
        <View style={styles.containerBotaoFinal}>

          <TouchableOpacity style={styles.botao} onPress={salvarCadastro}>

          <Text style={styles.txtBotao}>Cadastrar</Text>

        </TouchableOpacity>
        </View>
        
      </View>
    
  );
}
