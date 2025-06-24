import { PushNotifications } from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

export class NotificationService {
  static async initializePushNotifications() {
    if (!Capacitor.isNativePlatform()) {
      console.log('Push notifications not available on web platform');
      return;
    }

    try {
      // Request permission for push notifications
      const result = await PushNotifications.requestPermissions();
      
      if (result.receive === 'granted') {
        await PushNotifications.register();
        console.log('Push notifications registered successfully');
      }

      // Handle registration
      PushNotifications.addListener('registration', (token) => {
        console.log('Push registration success, token: ' + token.value);
        // Store token for backend communication
        localStorage.setItem('pushToken', token.value);
      });

      // Handle registration errors
      PushNotifications.addListener('registrationError', (error) => {
        console.error('Error on registration: ' + JSON.stringify(error));
      });

      // Handle incoming push notifications
      PushNotifications.addListener('pushNotificationReceived', (notification) => {
        console.log('Push notification received: ', notification);
      });

      // Handle notification action
      PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
        console.log('Push notification action performed', notification.actionId, notification.inputValue);
      });

    } catch (error) {
      console.error('Error initializing push notifications:', error);
    }
  }

  static async scheduleLocalNotification(title: string, body: string, triggerAt: Date) {
    try {
      await LocalNotifications.requestPermissions();
      
      await LocalNotifications.schedule({
        notifications: [
          {
            title,
            body,
            id: Math.floor(Math.random() * 1000),
            schedule: { at: triggerAt },
            sound: 'beep.wav',
            attachments: undefined,
            actionTypeId: "",
            extra: null
          }
        ]
      });

      console.log('Local notification scheduled for:', triggerAt);
    } catch (error) {
      console.error('Error scheduling local notification:', error);
    }
  }

  static async scheduleDailyReminder() {
    // Schedule a daily reminder at 7 PM
    const now = new Date();
    const reminderTime = new Date();
    reminderTime.setHours(19, 0, 0, 0); // 7:00 PM
    
    // If it's already past 7 PM today, schedule for tomorrow
    if (now > reminderTime) {
      reminderTime.setDate(reminderTime.getDate() + 1);
    }

    await this.scheduleLocalNotification(
      'Time to Code! 🚀',
      'Your daily programming lesson is waiting. Keep your streak alive!',
      reminderTime
    );
  }

  static async cancelAllNotifications() {
    try {
      await LocalNotifications.cancel({ notifications: [] });
      console.log('All notifications cancelled');
    } catch (error) {
      console.error('Error cancelling notifications:', error);
    }
  }
}

// Initialize notifications when the service loads
if (Capacitor.isNativePlatform()) {
  NotificationService.initializePushNotifications();
}

export default NotificationService;
