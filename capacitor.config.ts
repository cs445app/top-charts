import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'org.TopChartsApp.TestApp',
  appName: 'TestApp',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
