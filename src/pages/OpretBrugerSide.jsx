import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config'; // Import your Firebase configuration
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function OpretBrugerSide() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // User successfully created
            // alert("Du er nu oprettet, makker!");
            console.log('User created successfully!');
            navigate("/");
        } catch (error) {
            // Handle error (e.g., display an error message)
            toast.error("Din oprettelse slog fejl, makker!");
            console.error('Error creating user:', error.message);
        }
    };

    return (
        <div>
            <ToastContainer />
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignup}>Sign Up</button>
        </div>
    );
}