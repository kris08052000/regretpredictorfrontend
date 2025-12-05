"use client";
import { useRouter, usePathname } from "next/navigation";
import { History, TrendingDown, LogOut } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-gray-900">Regret Predictor</h1>
            
            <div className="flex gap-2">
              <button
                onClick={() => router.push("/predict")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                  pathname === "/predict"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <TrendingDown className="w-4 h-4" />
                Predict
              </button>
              
              <button
                onClick={() => router.push("/history")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                  pathname === "/history"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <History className="w-4 h-4" />
                History
              </button>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}