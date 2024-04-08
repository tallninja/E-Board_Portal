import {useEffect} from "react";
import {Outlet} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useGetAuthUserQuery} from "../services";
import {login, logout} from "../features";

export function PersistAuthSession() {
    const dispatch = useDispatch();
    const {data: authUser, isLoading, isError} = useGetAuthUserQuery();

    useEffect(() => {
        let isMounted = true;
        dispatch(login(authUser!))
        return () => {isMounted = false};
    }, [authUser, dispatch]);

    if (isError) {
        dispatch(logout())
    }

    return (
        <>
            {
                isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    )
}