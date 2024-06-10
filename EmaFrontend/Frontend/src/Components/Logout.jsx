import axios from "axios";
import { useEffect } from "react";

const Logout = () => {
    useEffect(() => {
        const isAuthencated = !!localStorage.getItem("token");
        const token = localStorage.getItem("token");
        
        if (isAuthencated) {
            const logout = async () => {
                try {
                    const response = await axios.post("http://127.0.0.1:8000/api/logout", {}, {
                        headers: {
                            Authorization: "Token " + token,
                        }
                    });
                    alert("Logout successful");
                    localStorage.removeItem("token");
                    window.location.href = "/";
                } catch (error) {
                    console.log(error);
                }
            };
            logout();
        }
    }, []);

    return null; 
};

export default Logout;
