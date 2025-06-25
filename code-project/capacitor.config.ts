import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.e2b49a15a32a4977bc927d9cec9ce171',
  appName: 'code-flow-reminder',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    url: 'https://e2b49a15-a32a-4977-bc92-7d9cec9ce171.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    },
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
      sound: "beep.wav"
    }
  }
};

export default config;