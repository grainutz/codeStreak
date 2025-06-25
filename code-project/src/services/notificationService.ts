
// Mock notification service for web platform
export class NotificationService {
  static async initializePushNotifications() {
    console.log('Push notifications initialized (web mock)');
  }

  static async scheduleLocalNotification(title: string, body: string, triggerAt: Date) {
    console.log(`Notification scheduled: ${title} - ${body} at ${triggerAt}`);
  }

  static async scheduleDailyReminder() {
    const now = new Date();
    const reminderTime = new Date();
    reminderTime.setHours(19, 0, 0, 0);
    
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
    console.log('All notifications cancelled');
  }
}

export default NotificationService;