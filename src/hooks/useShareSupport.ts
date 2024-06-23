import { useState, useEffect } from 'react';

function useShareSupport() {
    const [isShareSupported, setIsShareSupported] = useState(false);

    useEffect(() => {
        const checkSupport = () => {
            setIsShareSupported('share' in navigator);
        };

        checkSupport();

        // Cleanup function to prevent memory leaks
        return () => {};
    }, []);

    return isShareSupported;
}

export default useShareSupport;
