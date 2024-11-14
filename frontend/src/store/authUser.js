import axios from "axios"
import toast from "react-hot-toast";
import { create } from "zustand"

export const useAuthStore = create((set) => ({
    user : null,
    isSignup : false,
    isLogin : false,
    isCheckingAuth : true,
    isLoggingOut : false,
    signup : async (credentials) => {
        set({ isSignup : true })
        try {
            const res = await axios.post(`${import.meta.env.LOCALHOST}/api/v1/netflix/auth/signup`,credentials);
            set({ user : res.data.user,isSignup : false })
            toast.success("Signup Successfully")
        } catch (error) {
            toast.error(error.response.data.message || "Signup Failed")
            set({ user : null,isSignup : false })
        }
    },
    login : async (credentials) => {
        set({ isLogin : true })
        try {
            const res = await axios.post(`${import.meta.env.LOCALHOST}/api/v1/netflix/auth/login`,credentials);
            set({ user : res.data.user,isLogin : false })
            toast.success("Login Successfully")
        } catch (error) {
            toast.error(error.response.data.message || "Login Failed")
            set({ user : null,isLogin : false })
        }
    },
    logout : async () => {
        set({ isLoggingOut : true })
        try {
            await axios.post(`${import.meta.env.LOCALHOST}/api/v1/netflix/auth/logout`);
            set({ user : null,isLoggingOut : false })
            toast.success("Logout Successfully")

        } catch (error) {
            set({ isLoggingOut : false })
            toast.error(error.response.data.message || "An error occured")
        }
    },
    authCheck : async () => {
        try {
            set({ isCheckingAuth : true })
            const res = await axios.get(`${import.meta.env.LOCALHOST}/api/v1/netflix/auth/authCheck`);
            set({ user : res.data.user,isCheckingAuth : false})
        } catch (error) {
            set({ user : null,isCheckingAuth : false})
        }
    },
}))