import Nav from "./nav";

export default function Layout({children}){
    return(
        <div className="page-layout">
            <Nav></Nav>
            <main>{children}</main>
            <br></br>
        </div>
        
    )
}