import {useSelector} from "react-redux";

const useAuth = () => {
    const isAuthorized = useSelector((state) => state.auth.isAuthorized);
    const userProfile = useSelector((state) => state.auth.userProfile);
    const isLoading = useSelector((state) => state.auth.isLoading);
    const isRefreshing = useSelector((state) => state.auth.isRefreshing);
    const error = useSelector((state) => state.auth.error);
    return { isAuthorized, userProfile, isLoading, error, isRefreshing };
};

export default useAuth;