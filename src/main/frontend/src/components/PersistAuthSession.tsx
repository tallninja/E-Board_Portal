import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store.ts";
import {useEffect, useRef} from "react";
import {useGetAuthUserQuery} from "../services/auth.ts";
import {login, logout, setAuthUser} from "../features";
import {Outlet} from "react-router-dom";
import {toast} from "react-toastify";
import {initFlowbite} from "flowbite";

export function PersistAuthSession() {
    const dispatch = useDispatch();
    const auth = useSelector((state: RootState) => state.auth);
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