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
import SignUp from "./pages/SignUp";
import Settings from './pages/Settings';
import Metricas from './pages/Metricas';
import ChatIA from './pages/ChatIA';
import PosVendas from './pages/PosVendas';
import { isLoggedIn } from "./lib/local-auth";

function Router() {
  // Check if user is authenticated locally
  const authenticated = isLoggedIn();

  // Public routes (no authentication required)
  if (!authenticated) {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
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
        <Route path={"/setup"} component={Setup} />
        <Route path={"/pedidos"} component={API} />
        <Route path={"/produtos"} component={API} />
        <Route path={"/anuncios"} component={API} />
        <Route path={"/clientes"} component={API} />
        <Route path={"/entregas"} component={API} />
        <Route path={"/financeiro"} component={API} />
        <Route path={"/notas"} component={API} />
        <Route path={"/relatorios"} component={API} />
        <Route path="/configuracoes" component={Settings} />
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
