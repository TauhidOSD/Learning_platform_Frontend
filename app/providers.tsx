"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useThemeStore } from "@/store/useThemeStore";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient());
  const hydrate = useAuthStore((s) => s.hydrate);
  const initTheme = useThemeStore((s) => s.init);

  useEffect(() => {
    hydrate();
    initTheme();
  }, [hydrate, initTheme]);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
