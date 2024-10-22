import { useState } from "react";
import supabase from "../services/supabase";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams(); // Mengambil token dari URL
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordReset = async () => {
    if (!token) {
      setMessage("Token tidak ditemukan!");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
      access_token: token,
    });

    if (error) {
      setMessage("Terjadi kesalahan saat mereset password: " + error.message);
    } else {
      setMessage(
        "Password berhasil direset. Silakan login dengan password baru."
      );
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <input
        type="password"
        placeholder="Masukkan password baru"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handlePasswordReset}>Reset Password</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
