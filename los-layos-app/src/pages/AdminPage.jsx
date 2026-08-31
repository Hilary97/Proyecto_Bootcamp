import { useAuth } from "../auth/AuthContext.jsx";
import { LoginForm } from "../auth/LoginForm.jsx";
import { AdminAgendaPanel } from "../features/agenda/AdminAgendaPanel.jsx";

export function AdminPage() {
  const { session, loading, signOut } = useAuth();

  if (loading) {
    return <p className="text-center py-24 text-zinc-400">Cargando...</p>;
  }

  if (!session) {
    return <LoginForm />;
  }

  return (
    <div>
      <div className="flex justify-end px-6 pt-6">
        <button
          type="button"
          onClick={signOut}
          className="text-zinc-400 hover:text-red-500 text-sm"
        >
          Cerrar sesión
        </button>
      </div>
      <AdminAgendaPanel />
    </div>
  );
}
