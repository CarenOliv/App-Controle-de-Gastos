import { Text, View, Image, Dimensions, TouchableOpacity } from "react-native";

import { router, useLocalSearchParams } from "expo-router";

export default function TelaTeste(){
    
    const {nome,
        email,
        dataNAscimento,
        tipoRenda,
        rendaMensal,
        profissao,
        intervalo,
        valorMedio} = useLocalSearchParams();

    return (
        <View style={{flex:1,padding:20,justifyContent:'center'}}>

            <Text style={{fontSize:20,fontWeight:'bold'}}>Tela de Teste</Text>

            <Text>Nome: {nome}</Text>
            <Text>Email: {email}</Text>
            <Text>Tipo de Renda: {tipoRenda}</Text>
            
            
            
            {tipoRenda==="fixa" && (
            <>
                <Text>Renda mensal: {rendaMensal}</Text>
                <Text>Profissão: {profissao}</Text> 
            </>
            )} 
                
            {tipoRenda==="variavel" && (
                <>
                    <Text>Intervalo: {intervalo}</Text>
                    <Text>Valor Médio: {valorMedio}</Text>
                </>
            )}
            

            <TouchableOpacity onPress={() => router.push("/telaInicial")}
                style={{marginTop:30,backgroundColor:'#2563eb',
                    padding:12,
                    borderRadius:8
                }}>

                <Text style={{color:'#FFF',textAlign:'center'}}>Ir para a tela inicial (final)</Text>

            </TouchableOpacity>

        </View>
    )
}