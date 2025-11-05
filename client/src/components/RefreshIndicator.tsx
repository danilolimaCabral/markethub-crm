import { RefreshCw, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface RefreshIndicatorProps {
  lastRefresh: Date | null;
  isRefreshing: boolean;
  onRefresh: () => void;
}

export default function RefreshIndicator({ lastRefresh, isRefreshing, onRefresh }: RefreshIndicatorProps) {
  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      {lastRefresh && (
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          <span>
            Atualizado {formatDistanceToNow(lastRefresh, { addSuffix: true, locale: ptBR })}
          </span>
        </div>
      )}
      
      <Button
        variant="ghost"
        size="sm"
        onClick={onRefresh}
        disabled={isRefreshing}
        className="gap-2 h-8"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
        {isRefreshing ? 'Atualizando...' : 'Atualizar'}
      </Button>
    </div>
  );
}
