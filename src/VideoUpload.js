
import React, { useState,useEffect } from 'react';
import { X, Wand2 } from 'lucide-react';
import '../src/clickGame.css';
import { FaClock, FaBook, FaFeatherAlt, FaKey, FaRing } from 'react-icons/fa'; // Paquete Font Awesome

const objects = [
  { name: 'Reloj', icon: <FaClock className="w-16 h-16 mx-auto" /> },
  { name: 'Libro', icon: <FaBook className="w-16 h-16 mx-auto" /> },
  { name: 'Pluma', icon: <FaFeatherAlt className="w-16 h-16 mx-auto" /> },
  { name: 'Varita', icon: <Wand2 className="w-16 h-16 mx-auto" /> }, // De lucide-react
  { name: 'Llave', icon: <FaKey className="w-16 h-16 mx-auto" /> },
  { name: 'Anillo', icon: <FaRing className="w-16 h-16 mx-auto" /> }, // Usa FaRing de Font Awesome
];

const questions = [
  {
    question: "¿Cuál es la casa de Hogwarts de Harry Potter?",
    options: ["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"],
    correct: 0
  },
  {
    question: "¿Cómo se llama el elfo doméstico de la familia Malfoy?",
    options: ["Kreacher", "Winky", "Dobby", "Hokey"],
    correct: 2
  },
  {
    question: "¿Qué animal puede ver Harry en los carruajes de Hogwarts después de presenciar la muerte?",
    options: ["Hipogrifos", "Thestrals", "Nifflers", "Bowtruckles"],
    correct: 1
  }
];
const ElegantWandSearch = () => {
  const [acceptedTerms, setAcceptedTerms] = useState(false); 
  const [showModal, setShowModal] = useState(false);
  const [gameState, setGameState] = useState('quiz');
  const [message, setMessage] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [currentImage, setCurrentImage] = useState('');
  const [couponsViewed, setCouponsViewed] = useState(0); // Para rastrear cuántos cupones se han visto
  const [couponsDownloaded, setCouponsDownloaded] = useState(false);
  const handleAcceptTerms = () => {
    setAcceptedTerms(true); // Activa la aceptación de términos
  };
  const audio= React.useRef(new Audio('/img/music.mp3'));
  useEffect(() => {
    audio.current.loop = true;

    if (!acceptedTerms) {
      audio.current.play().catch(error => {
        console.error('Error al reproducir el audio:', error);
      });
    } 


  }, [acceptedTerms]); // Se ejecuta cuando cambian los términos aceptados

  const handleShowCoupons = () => {
    if (!couponsDownloaded) {
      const couponImages = [
        { src: '/img/cupones.png', name: 'cupon.png' },

      ];

      couponImages.forEach(coupon => {
        const link = document.createElement('a');
        link.href = coupon.src;
        link.download = coupon.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });

      setCouponsDownloaded(true);
    }
  };

  const handleAnswer = (selectedIndex) => {
    if (selectedIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setGameState('search');
    }
  };

  const handleObjectClick = (objectName) => {
    if (objectName === 'Varita') {
      setGameState('won');
      setShowModal(true); // Aquí mostramos el modal cuando se gana el juego
    } else {
      alert('Ese objeto no es el correcto. Sigue buscando.');
    }
  };

  const handleImageClick = (index) => {
    const imagePaths = [
      '/img/imagen1.png',
      '/img/imagen2.png',
      '/img/imagen3.png',
    ];
    
    setCurrentImage(imagePaths[index]);
    if (couponsViewed < 3) {
      setCouponsViewed(prev => prev + 1); // Incrementa el contador de cupones vistos
    }
  };

  const renderQuiz = () => {
    const currentQ = questions[currentQuestion];
    return (
      <div className="max-w-lg mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4"> Primero responde esto c:</h2>
        <p className="mb-4">Pregunta {currentQuestion + 1} de {questions.length}</p>
        <p className="text-lg mb-4">{currentQ.question}</p>
        <div className="space-y-2">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className="button w-full text-left" // Cambiado a "button"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderGame = () => (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">¿Cuál es el objeto especial?</h2>
      <p className="mb-4">Entre estos objetos misteriosos se esconde la llave de tu regalo. ¿Puedes encontrarla?</p>    
      <div className="grid grid-cols-3 gap-4 mb-4">
        {objects.map((obj) => (
          <div
            key={obj.name}
            onClick={() => handleObjectClick(obj.name)}
            className="cursor-pointer hover:shadow-lg transition-shadow duration-300 text-center"
          >
            {obj.icon}
            <p>{obj.name}</p>
          </div>
        ))}
      </div>
      {message && (
        <div className="flex items-center justify-center mb-4">
          <X className="mr-2" />
          <p className="alert-error">{message}</p> {/* Mensaje de error en rojo */}
        </div>
      )}
    </div>
  );
  
  const renderWon = () => {
    const allCouponsViewed = couponsViewed === 3;

    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">¡Has encontrado la varita mágica!</h2>
        <div className="bg-gradient p-8 rounded-lg shadow-lg inline-block">
          <Wand2 className="text-white w-16 h-16 mx-auto mb-4" />
          <h3 className="text-xl mb-4">Selecciona un regalo:</h3>
        
          {/* Botones para seleccionar los regalos */}
          <div className="flex justify-center space-x-4 mb-4">
            {['Regalo 1', 'Regalo 2', 'Regalo 3'].map((regalo, index) => (
              <button
                key={index}
                onClick={() => handleImageClick(index)}
                // disabled={acceptedTerms}
                ///
                
                className="button-regalo"
              >
                {regalo}
              </button>
            ))}
          </div>
  
          {/* Mostrar la imagen del regalo seleccionado */}
          {currentImage && (
            <img src={currentImage} alt="Regalo seleccionado" className="mb-4 rounded-lg transition-transform duration-500 transform hover:scale-105" />
          )}
  
          {/* Términos y condiciones antes del botón de descarga */}
          {allCouponsViewed && (
            <div className="text-left bg-purple-100 p-4 rounded-lg shadow-md mb-4">
              <p className="text-md text-gray-700 font-semibold mb-2">
                Estos cupones son solo para <span className="text-purple-600">María Alexandra Ramos</span>. ¡Úsalos cuando quieras! Acepta los términos y condiciones antes de descargar los cupones.
              </p>
              <label className="flex items-center text-gray-600">
                {/* <input type="checkbox" className="mr-2" onChange={handleAcceptTerms}/>  */}
                <input 
        type="checkbox" 
        className="mr-2" 
        onChange={handleAcceptTerms} 
        disabled={acceptedTerms} // Bloquea el checkbox si los términos ya han sido aceptados
      /> 
                Acepto los términos y condiciones.
              </label>
            </div>
          )}
  
          {/* Botón para descargar cupones */}
          {allCouponsViewed && (
            <button
              onClick={handleShowCoupons}
              className="button-descargar mt-4"
            >
              Descargar todos los cupones
            </button>
          )}
        </div>
      </div>
    );
  };
  
  
  return (
    <div className="max-w-2xl mx-auto p-4">
      <audio src="/img/music.mp3" loop autoPlay />
      {gameState === 'quiz' && renderQuiz()}
      {gameState === 'search' && renderGame()}
      {gameState === 'won' && renderWon()}


    </div>
  );
};

export default ElegantWandSearch;


