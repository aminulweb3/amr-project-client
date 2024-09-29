import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const useAxiosSecure = () => {
	const navigate = useNavigate();
	const { logOut } = useAuth();

	const axiosSecure = axios.create({
		baseURL: 'http://localhost:5000',
	});

	axiosSecure.interceptors.request.use(function (config) {
		const token = localStorage.getItem('access-token');
		config.headers.authorization = `Bearer ${token}`;
		return config;
	}, function (error) {
		return Promise.reject(error);
	});

	axiosSecure.interceptors.response.use(function (response) {
		return response;
	}, async function (error) {
		if (error.response && (error.response.status === 401 || error.response.status === 403)) {
			await logOut();
			localStorage.removeItem('access-token');
			navigate('/login');
		}
		return Promise.reject(error);
	});

	return axiosSecure;
};

export default useAxiosSecure;
