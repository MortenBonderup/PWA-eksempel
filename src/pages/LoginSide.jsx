import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginSide() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function haandterLogin(e) {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredential);
            navigate("/");
        } catch (error) {
            toast.error("Dit login-forsøg mislykkedes! ")
        }
    }

    return (
        <div>
            <Link to="/">Til forsiden</Link>
            <h1 style={{ marginTop: "155px" }}>Login side</h1>
            <form onSubmit={haandterLogin}>
                <input
                    type="email"
                    placeholder="Your Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="useremail"
                />
                <input
                    type="password"
                    placeholder="Your Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="userpassword"
                />
                <button type="submit" className='login-button'>Login</button>
            </form>
            <ToastContainer />
        </div>
    )
}