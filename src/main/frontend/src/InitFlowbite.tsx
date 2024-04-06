import {useEffect} from "react";
import {initFlowbite} from "flowbite";

export function InitFlowbite() {
    useEffect(() => {
        initFlowbite();
    }, []);

    return null;
}