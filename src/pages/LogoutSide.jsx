import { useEffect } from "react"
import { auth } from '../firebase-config';
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";

export default function LogoutSide() {

    useEffect(() => {
        signOut(auth)
    }, [])


    return (
        <>
            <h2>Du er logget ud.</h2>
            <Link to="/">Gå til forsiden</Link>
        </>
    )
}