import ProtectedRoute from "../components/ProtectedRoute";
import HistoryPage from "../components/HistoryPage";

export default function History() {
  return (
    <ProtectedRoute>
      <HistoryPage />
    </ProtectedRoute>
  );
}