import { Platform } from 'react-native';

let handlerConfigured = false;

async function getNotificationsModule() {
  if (Platform.OS === 'web') {
    return null;
  }

  try {
    const module = await import('expo-notifications');
    if (!handlerConfigured) {
      module.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldShowBanner: true,
          shouldShowList: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
      });
      handlerConfigured = true;
    }
    return module;
  } catch {
    return null;
  }
}

export async function requestNotificationPermissions() {
  const Notifications = await getNotificationsModule();
  if (!Notifications) {
    return false;
  }

  const settings = await Notifications.getPermissionsAsync();
  if (
    settings.granted ||
    settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  ) {
    return true;
  }

  const request = await Notifications.requestPermissionsAsync();
  return (
    request.granted ||
    request.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
}

export async function notifyTaskCompleted(title: string) {
  const Notifications = await getNotificationsModule();
  if (!Notifications) {
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Tarefa concluída',
      body: title,
    },
    trigger: null,
  });
}
