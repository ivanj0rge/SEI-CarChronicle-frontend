import { useEffect } from "react";
import axios from "axios";

function Logout() {

    const apiUrl = process.env.REACT_APP_API_URL

    useEffect(() => {
        (async () => {
            try {
                await axios.post(
                    `${apiUrl}/logout/`,
                    {
                        refresh_token: localStorage.getItem("refresh_token"),
                    },
                    { headers: { "Content-Type": "application/json" } },
                    { withCredentials: true }
                );
                localStorage.clear();
                axios.defaults.headers.common["Authorization"] = null;
                window.location.href = "/login";
            } catch (e) {
                console.log("logout not working", e);
            }
        })();
    }, [apiUrl]);
    return <div></div>;
};

export default Logout