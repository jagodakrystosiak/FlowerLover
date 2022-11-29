import axios from 'axios';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppContext from '../contexts/AppContext';

const useRefreshToken = () => {
    const { auth, setAuth, logout } = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation();

    const refresh = async () => {
        if (auth?.refresh_token) {
            axios.get('http://localhost:8080/api/token/refresh', {
                withCredentials: true,
                headers: {
                    Authorization: auth?.refresh_token ? `Bearer ${auth?.refresh_token}` : null
                },
                mode: 'cors'
            }).catch((err) => {
                console.log(err);
                logout();
                navigate(location);
                return null;
            }).then((res) => {
                const response = res;
                if (response?.data?.access_token) {
                    setAuth(prev => {
                        console.log(JSON.stringify(prev));
                        console.log(response.data.access_token);
                        console.log(response.data.refresh_token);
                        return { ...prev, access_token: response.data.access_token, refresh_token: response.data.refresh_token }
                    })
                    localStorage.setItem("auth", JSON.stringify({ access_token: response.data.access_token, refresh_token: response.data.refresh_token }));
                }
                else localStorage.removeItem("auth");
                return response?.data?.access_token;
            });
        } else {
            localStorage.removeItem("auth");
            return null;
        }

    }
    return refresh;
};

export default useRefreshToken;
