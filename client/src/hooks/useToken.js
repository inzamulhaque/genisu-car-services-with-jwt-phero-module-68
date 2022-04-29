import axios from "axios";
import { useEffect, useState } from "react";

const useToken = (user) => {
    const [token, setToken] = useState("");
    const email = user?.user?.email;

    useEffect(() => {
        const getToken = async () => {
            if (email) {
                const { data } = await axios.post("http://localhost:5000/login", { email });
                setToken(data.accessToken);
                localStorage.setItem("accessToken", data.accessToken);
            }
        }
        getToken();
    }, [user]);

    return [token];
}

export default useToken;