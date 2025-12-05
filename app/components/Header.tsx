"use client";
import { useRouter } from "next/navigation";
import { History, AlertCircle, LogOut } from "lucide-react";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left - Brand */}
          <button
            onClick={() => router.push("/predict")}
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition relative cursor-pointer after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-600 after:to-purple-600 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"
           >
            Regret Predictor
          </button>

          {/* Right - Navigation Links */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push("/history")}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition font-medium"
            >
              <History className="w-4 h-4" />
              History
            </button>

            <button
              onClick={() => router.push("/issues")}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition font-medium"
            >
              <AlertCircle className="w-4 h-4" />
              Issues
            </button>

            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition font-medium"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}