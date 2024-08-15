import Header from "./Header";
import './Layout.scss'

export default function Layout({children}) {
    return (
        <>
        <Header />
        <div className="root-container">
        {children}
        </div>
        </>
    )
}