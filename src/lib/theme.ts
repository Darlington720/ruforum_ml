import { createTheme } from '@/lib/utils';

export const theme = createTheme({
  primary: {
    50: '#fcf8f0',
    100: '#f7eeda',
    200: '#efdab4',
    300: '#e6c089',
    400: '#dca65e',
    500: '#d18d3c',
    600: '#bd7424',
    700: '#8b4513', // Main primary
    800: '#6d381c',
    900: '#5a301c',
    950: '#321808',
  },
  background: {
    light: '#f5f0e1', // Light beige background
    card: '#ffffff',
    sidebar: '#4d1c00', // Dark brown sidebar
  },
  text: {
    primary: '#333333',
    secondary: '#666666',
    light: '#ffffff',
    muted: '#888888',
  },
  status: {
    active: '#10b981',
    inactive: '#6b7280',
  }
});

export function createTheme(colors: Record<string, Record<string, string>>) {
  return {
    colors,
    getColor(path: string) {
      const [category, shade] = path.split('.');
      if (this.colors[category] && this.colors[category][shade]) {
        return this.colors[category][shade];
      }
      return path;
    }
  };
}