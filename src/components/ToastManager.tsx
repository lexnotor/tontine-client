import { useToastContext } from "@/context/ToastContext";
import { message } from "antd";
import { useEffect } from "react";

const ToastManager = () => {
    const { removeToast, toasts } = useToastContext();
    const [toast, contextHolder] = message.useMessage();

    useEffect(() => {
        if (toasts.length == 0) return;

        const { content, type, id } = toasts[0];
        type == "ERROR"
            ? toast.error(content)
            : type == "LOADING"
            ? toast.loading(content)
            : toast.success(content);

        removeToast(id);
    }, [toasts, toast, removeToast]);

    return contextHolder;
};

export default ToastManager;
