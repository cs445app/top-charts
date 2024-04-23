import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'org.TopChartsApp.TestApp',
  appName: 'Top Charts',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
