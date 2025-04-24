/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProfile } from "../utils/profileSlice"; // ajustá la ruta si es distinta
import { useState } from "react";

const Form = ({ type, name, padding, style, desc }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("https://encasastream-api.vercel.app/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) throw new Error("Usuario o contraseña incorrectos");

    const user = await response.json();

    const selectedProfile = user.subProfile.find(p => p.name.toLowerCase() === "mary") || user.subProfile[1];

    localStorage.setItem("Profile", JSON.stringify(selectedProfile));
    dispatch(setProfile(selectedProfile));
    navigate("/browse");

  } catch (error) {
    alert("Error al iniciar sesión: " + error.message);
  }
};


  const handleGuestLogin = () => {
    const guestProfile = {
      id: "guest123",
      name: "Invitado",
      img: "/images/avatar1.png",
      isProfile: true,
    };

    localStorage.setItem("Profile", JSON.stringify(guestProfile));
    dispatch(setProfile(guestProfile));
    navigate("/browse");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative max-w-[400px] mx-auto z-10 ${padding}`}
    >
      <h1 className={style.name}>{name}</h1>

      <div className="flex flex-col gap-4 mt-4">
        <input
          type="email"
          placeholder="Email"
          className={style.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className={style.input}
          id={style.inputId}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-red-600 w-full text-white font-semibold p-2 rounded-md hover:bg-red-700"
        >
          {name}
        </button>

        <div className="text-center text-gray-300 my-2">OR</div>

        <button
          type="button"
          onClick={handleGuestLogin}
          className="bg-gray-800 text-white w-full p-2 rounded-md hover:bg-gray-700"
        >
          Sign-In as a Guest
        </button>
      </div>

      {desc?.detail && <p className="text-gray-400 text-sm mt-4">{desc.detail}</p>}
    </form>
  );
};

export default Form;
