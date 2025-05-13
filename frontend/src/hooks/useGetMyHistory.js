import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGetMyHistory = () => {
    const [loading, setLoading] = useState();
    const apiUrl = import.meta.env.VITE_API_URL;
    const { authUser } = useAuthContext();

    const history = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/predictions/history/${authUser._id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("KS-token")}`,
                }
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            return data;
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { loading, history }
}

export default useGetMyHistory;