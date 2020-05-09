import { toast } from "react-toastify";

toast.configure();
export default function notification(type, msg) {
    if (type === "error") {
        toast.error(msg, { hideProgressBar: true });
    } else if (type === "success") {
        toast.success(msg, { hideProgressBar: true });
    }
}