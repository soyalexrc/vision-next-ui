import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Layout({children}: any) {
    return (
        <>
            <Header/>
            {children}
            <Footer/>
        </>
    )
}
