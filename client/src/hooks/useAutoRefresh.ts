import { useEffect, useRef, useState } from 'react';

interface UseAutoRefreshOptions {
  enabled?: boolean;
  intervalMs?: number;
  onRefresh: () => void | Promise<void>;
}

interface UseAutoRefreshReturn {
  lastRefresh: Date | null;
  isRefreshing: boolean;
  manualRefresh: () => Promise<void>;
}

/**
 * Hook para auto-refresh de dados em intervalos regulares
 * @param options - Configurações do auto-refresh
 * @returns Estado e controles do auto-refresh
 */
export function useAutoRefresh({
  enabled = true,
  intervalMs = 5 * 60 * 1000, // 5 minutos por padrão
  onRefresh,
}: UseAutoRefreshOptions): UseAutoRefreshReturn {
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const executeRefresh = async () => {
    if (isRefreshing) return;

    try {
      setIsRefreshing(true);
      await onRefresh();
      setLastRefresh(new Date());
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const manualRefresh = async () => {
    await executeRefresh();
  };

  useEffect(() => {
    if (!enabled) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Executar refresh inicial
    executeRefresh();

    // Configurar intervalo de refresh
    intervalRef.current = setInterval(() => {
      executeRefresh();
    }, intervalMs);

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, intervalMs]);

  return {
    lastRefresh,
    isRefreshing,
    manualRefresh,
  };
}
