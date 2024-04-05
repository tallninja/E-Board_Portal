import {useSelector} from "react-redux";
import {RootState} from "../store.ts";
import {Navigate, Outlet, useLocation} from "react-router-dom";

export function Protected() {
    const auth = useSelector((state: RootState) => state.auth)
    const location = useLocation();

    return (
        <>
            {
                auth.authenticated
                ? <Outlet />
                : <Navigate to="/auth/login" state={{ from: location }} />
            }
        </>
    )
}