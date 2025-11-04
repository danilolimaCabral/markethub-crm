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

function Router() {
  return (
    <CRMLayout>
      <Switch>
        <Route path={"/"} component={DashboardCRM} />
        <Route path={"/setup"} component={Setup} />
        <Route path={"/pedidos"} component={API} />
        <Route path={"/produtos"} component={API} />
        <Route path={"/anuncios"} component={API} />
        <Route path={"/clientes"} component={API} />
        <Route path={"/entregas"} component={API} />
        <Route path={"/financeiro"} component={API} />
        <Route path={"/notas"} component={API} />
        <Route path={"/relatorios"} component={API} />
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
