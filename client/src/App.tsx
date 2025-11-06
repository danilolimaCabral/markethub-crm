import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import CRMLayout from "./components/CRMLayout";
import DashboardCRM from "./pages/DashboardCRM";
import Setup from "./pages/Setup";
import API from "./pages/API";
import Docs from "./pages/Docs";
import Login from "./pages/Login";
import Callback from "./pages/Callback";
import Settings from './pages/Settings';
import Metricas from './pages/Metricas';
import ChatIA from './pages/ChatIA';
import PosVendas from './pages/PosVendas';
import Pedidos from './pages/Pedidos';
import Importacao from './pages/Importacao';
import ContasPagar from './pages/ContasPagar';
import ContasReceber from './pages/ContasReceber';
import FluxoCaixa from './pages/FluxoCaixa';
import { isAuthenticated } from "./lib/auth";
import { useTokenRefresh } from "./hooks/useTokenRefresh";

function Router() {
  // DEMO MODE: Bypass authentication for demonstration
  const authenticated = true; // isAuthenticated();

  // Public routes (no authentication required)
  if (!authenticated) {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/callback" component={Callback} />
        <Route component={Login} />
      </Switch>
    );
  }

  // Protected routes (authentication required)
  return (
    <CRMLayout>
      <Switch>
        <Route path={"/"} component={DashboardCRM} />
          <Route path="/chat" component={ChatIA} />
          <Route path="/pos-vendas" component={PosVendas} />
        <Route path="/callback" component={Callback} />
        <Route path={"/setup"} component={Setup} />
        <Route path={"/pedidos"} component={Pedidos} />       <Route path={"/produtos"} component={API} />
        <Route path={"/anuncios"} component={API} />
        <Route path={"/clientes"} component={API} />
        <Route path={"/entregas"} component={API} />
        <Route path="/contas-pagar" component={ContasPagar} />
        <Route path="/contas-receber" component={ContasReceber} />
        <Route path="/fluxo-caixa" component={FluxoCaixa} />
        <Route path={"/notas"} component={API} />
        <Route path={"/relatorios"} component={API} />
        <Route path="/configuracoes" component={Settings} />
        <Route path="/importacao" component={Importacao} />
        <Route path="/metricas" component={Metricas} />
        <Route path={"/docs"} component={Docs} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </CRMLayout>
  );
}

function App() {
  // Inicia monitoramento de renovação automática de token
  useTokenRefresh();

  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
