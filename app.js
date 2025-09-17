// Importar funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    FacebookAuthProvider, 
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCIi9HQewZEZGNfZHUFqPVgWwlronBVC48",
    authDomain: "cafeina-69f6c.firebaseapp.com",
    projectId: "cafeina-69f6c",
    storageBucket: "cafeina-69f6c.firebasestorage.app",
    messagingSenderId: "585811973878",
    appId: "1:585811973878:web:1bbe1577e627ebf6ddfed7"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Proveedores de autenticación
const facebookProvider = new FacebookAuthProvider();
// Agregar permisos necesarios para Facebook
facebookProvider.addScope('public_profile');
facebookProvider.addScope('email');
// Configurar parámetros personalizados
facebookProvider.setCustomParameters({
    'display': 'popup'
});

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// Elementos del DOM
const loginForm = document.querySelector('form');
const emailInput = document.querySelector('input[type="email"]');
const passwordInput = document.querySelector('input[type="password"]');
const socialButtons = document.querySelectorAll('.social-icon');

// Función para mostrar mensajes
function showMessage(message, isError = false) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px;
        border-radius: 5px;
        color: white;
        background-color: ${isError ? '#ff4444' : '#44aa44'};
        z-index: 1000;
    `;
    document.body.appendChild(messageDiv);
    setTimeout(() => messageDiv.remove(), 3000);
}

// Manejar inicio de sesión con email/password
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const result = await signInWithEmailAndPassword(
            auth,
            emailInput.value,
            passwordInput.value
        );
        showMessage('¡Inicio de sesión exitoso!');
        // Redirigir o actualizar UI después del login
        window.location.href = '/dashboard.html'; // Ajusta según tu necesidad
    } catch (error) {
        showMessage(error.message, true);
    }
});

// Función para manejar el inicio de sesión con proveedores sociales
async function signInWithProvider(provider, providerName) {
    try {
        const result = await signInWithPopup(auth, provider);
        showMessage(`¡Inicio de sesión con ${providerName} exitoso!`);
        // Redirigir o actualizar UI después del login
        window.location.href = '/dashboard.html'; // Ajusta según tu necesidad
    } catch (error) {
        showMessage(error.message, true);
    }
}

// Configurar eventos para botones sociales
socialButtons[0].addEventListener('click', () => signInWithProvider(googleProvider, 'Google'));
socialButtons[1].addEventListener('click', () => signInWithProvider(githubProvider, 'GitHub'));
socialButtons[2].addEventListener('click', () => signInWithProvider(facebookProvider, 'Facebook'));

// Escuchar cambios en el estado de autenticación
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Usuario autenticado
        console.log('Usuario autenticado:', user);
        // Puedes actualizar la UI aquí
    } else {
        // Usuario no autenticado
        console.log('Usuario no autenticado');
    }
});