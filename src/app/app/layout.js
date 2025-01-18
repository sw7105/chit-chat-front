'use client'
import { AppContextProvider } from './appContext';

export default function AppLayout({ children }) {
  return (
    <AppContextProvider>
    {children}
    </AppContextProvider>
  );
}