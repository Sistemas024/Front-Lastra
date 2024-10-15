import './Home.css';

export function Home({ user, setUser }) {
    const handleLogout = () => {
        setUser([]);
    };

    return (
        <div className="home-container">
            <div className="welcome-message">
                <h1>FICHAS TECNICAS PROVEEDORES</h1>
                <h2>Hola, {user[0]}!</h2>
            </div>
            <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
}