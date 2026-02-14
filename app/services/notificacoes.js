import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

//Configuração obrigatória
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,    // Mostra alerta com app aberto
    shouldPlaySound: true,    // Toca som
    shouldSetBadge: true,    // Altera badge do ícone
  }),
});

async function verificarPermissao(){
  const { status } = await Notifications.getPermissionsAsync();
  return status==='granted'
}

async function canalAndroid() {
  // Configura canal do Android (obrigatório), no ios não é necessario  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'Notificações',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
      });
    }
}

// Estrutura da notificação ao usuário logar 
export async function MSGEntrada() {
  if (!await verificarPermissao()) return false

  await canalAndroid()

  // Estrtura da notificação
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Seja bem-vindo de volta!",
        sound: true,
      },
      trigger: null, // null = enviar imediatamente
    }); 
}

export async function MsgAddConta() {
  if(!await verificarPermissao()) return false

  await canalAndroid()

  await Notifications.scheduleNotificationAsync({
    content:{
      title:"Conta criada com sucesso!",
      sound:true,
    },
    trigger:null
  })
}

export async function MsgAddDespesa() {
  if(!await verificarPermissao()) return false

  await canalAndroid()

  await Notifications.scheduleNotificationAsync({
    content:{
      title:"Despesa criada com sucesso!",
      sound:true,
    },
    trigger:null
  })
}