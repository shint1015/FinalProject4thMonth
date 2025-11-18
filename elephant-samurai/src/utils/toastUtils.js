// toastUtils.ts
import { toast } from 'react-toastify'

export const showToast = (type, msg) => {
    const options = {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressStyle: {
            background: '#e7ec5c', // Primary yellow color
        },
    }

    switch (type) {
        case 'success':
            toast.success(msg, options)
            break
        case 'error':
            toast.error(msg, options)
            break
        case 'info':
            toast.info(msg, options)
            break
        case 'warning':
            toast.warn(msg, options)
            break
        default:
            toast(msg, options)
    }
}
