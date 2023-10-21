type Variant = 'success' | 'error' | 'warning' | 'info';

export default function Snackbar(props: {
    title: string;
    variant: Variant,
    message: string;
    close: () => void;
}) {
    const variant = props.variant;
    const borderColor = variant === 'error' ? 'border-red-500' : variant === 'warning' ? 'border-yellow-500' : variant === 'success' ? 'border-green-500' : 'border-blue-500'
    const titleColor =  variant === 'error' ?'text-red-900' : variant === 'warning' ? 'text-yellow-900' : variant === 'success' ? 'text-green-900' : 'text-blue-900'
    const textColor =  variant === 'error' ? 'text-red-500' : variant === 'warning' ? 'text-yellow-500' : variant === 'success' ? 'text-green-500' : 'text-blue-500'
    const bgColor =  variant === 'error' ? 'bg-red-100' : variant === 'warning' ? 'bg-yellow-100' : variant === 'success' ? 'bg-green-100' : 'bg-blue-100'
    return (
        <div className={`${bgColor} flex justify-between items-center border-t-4 ${borderColor} rounded-b ${titleColor} px-4 py-3 shadow-md`} role="alert">
        {/*<div className={`bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md`} role="alert">*/}
            <div className="flex">
                <div className="py-1"><svg className={`fill-current h-6 w-6 ${textColor} mr-4`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                <div>
                    <p className="font-bold">{props.title}</p>
                    <p className="text-sm">{props.message}</p>
                </div>
            </div>
            <span onClick={props.close} className=" cursor-pointer px-4 py-3">
                <svg className={`fill-current h-6 w-6 ${textColor}`} role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
        </div>
    )
}
