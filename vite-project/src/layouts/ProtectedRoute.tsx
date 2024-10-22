import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  // Misalkan, ambil token atau status login dari localStorage atau state manajemen global (seperti Redux atau context)
  const isAuthenticated = localStorage.getItem("userId") !== null;

  if (!isAuthenticated) {
    // Jika tidak terautentikasi, arahkan ke halaman login
    return <Navigate to="/login" replace />;
  }

  // Jika terautentikasi, tampilkan komponen anak-anak
  return children;
}

export default ProtectedRoute;
