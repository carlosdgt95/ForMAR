import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClickGame = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const messages = ["Haz clic aquí", "Haz clic de nuevo", "Ya casi", "Este sí ya es el último, por fa ponte audifonos o baja el volumen!"];
    // Nuevos estilos de botón con colores suaves y femeninos
    const buttonStyles = [
        "bg-pink-300 hover:bg-pink-400 text-white",  // Suave rosa
        "bg-purple-300 hover:bg-purple-400 text-white",  // Suave púrpura
        "bg-rose-300 hover:bg-rose-400 text-white",  // Suave rosa pastel
        "bg-fuchsia-300 hover:bg-fuchsia-400 text-white",  // Fucsia suave
      ];
  const handleClick = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate('/upload');
    }
  };
  
  const getRandomPosition = () => ({
    position: 'absolute',
    top: `${Math.random() * 80}%`,
    left: `${Math.random() * 80}%`,
  });
  
  return (
    <div className="h-screen w-screen bg-gradient-to-r from-pink-100 to-purple-100 relative overflow-hidden">
      {/* Fondo decorativo con círculos difusos */}
      <div className="absolute inset-0 bg-white opacity-50 z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-pink-200 opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              filter: 'blur(20px)',  // Efecto de difuminado
            }}
          />
        ))}
      </div>

      {/* Botón interactivo */}
      <button
        onClick={handleClick}
        className={`${buttonStyles[step]} font-bold py-3 px-6 rounded-full shadow-lg transform hover:scale-110 transition duration-300 ease-in-out z-10 relative`}
        style={getRandomPosition()}
      >
        {messages[step]}
      </button>
    </div>
  );
};


export default ClickGame;

////////
