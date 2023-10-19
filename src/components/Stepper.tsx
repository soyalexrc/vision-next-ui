export default function Stepper(props: {steps: string[], currentStep: number}) {
    return (
        <ol className="flex items-center justify-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500  border-b border-gray-200 shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4">
            {
                props.steps.map((step, index, array) => (
                    <li key={step + index} className={`flex items-center ${props.currentStep === index + 1 && 'text-blue-600 dark:text-blue-500'}`}>
                        <span className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border rounded-full shrink-0 ${props.currentStep === index + 1 && 'border-blue-600  dark:border-blue-500'}`}>
                            {index + 1}
                        </span>
                        {step}
                        {
                            index < array.length - 1 &&
                            <svg className="w-3 h-3 ml-2 sm:ml-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
                            </svg>
                        }
                    </li>
                ))
            }
        </ol>
    )
}
