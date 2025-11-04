export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.warn('Browser tidak mendukung notifikasi.');
    return;
  }

  if (Notification.permission === 'default') {
    try {
      await Notification.requestPermission();
    } catch (error) {
      console.error('Gagal meminta izin notifikasi:', error);
    }
  }
};

export const showNotification = (title: string, body: string, icon?: string) => {
  if (!('Notification' in window)) return;

  if (Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: icon,
    });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        new Notification(title, { body, icon });
      }
    });
  }
};
