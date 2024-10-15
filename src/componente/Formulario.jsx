import './Formulario.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

export function Formulario({ setUser }) {
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState(''); // Para el formulario de registro
    const [error, setError] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false); // Estado para alternar entre login y registro
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (usuario === '' || contraseña === '') {
            setError(true);
            return;
        }
        setError(false);
        setUser([usuario]);
        // Limpiar campos después del login
        setUsuario('');
        setContraseña('');
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (usuario === '' || contraseña === '' || confirmarContraseña === '') {
            setError(true);
            return;
        }

        if (contraseña !== confirmarContraseña) {
            setError(true);
            console.error('Las contraseñas no coinciden');
            return;
        }

        setError(false);

        // Enviar los datos al backend para registrar el usuario
        try {
            const response = await fetch('http://localhost:3001', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ usuario, contraseña }),
            });

            if (response.ok) {
                alert('Usuario registrado exitosamente');
                navigate('/login'); // Redirigir a la página de login
            } else {
                console.error('Error en el registro');
            }
        } catch (error) {
            console.error('Error de conexión', error);
        }

        // Limpiar campos después del registro
        setUsuario('');
        setContraseña('');
        setConfirmarContraseña('');
    };

    return (
        <section className="formulario-container">
            <div className="borde-exterior">
                {isRegistering ? (
                    <>
                        <h1>Registro</h1>
                        <form className='formulario' onSubmit={handleRegister}>
                            <div className='form-group'>
                                <label htmlFor='usuario'>Usuario</label>
                                <input
                                    id='usuario'
                                    type="text"
                                    value={usuario}
                                    onChange={e => setUsuario(e.target.value)}
                                    placeholder='Ingrese su usuario'
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='contraseña'>Contraseña</label>
                                <input
                                    id='contraseña'
                                    type="password"
                                    value={contraseña}
                                    onChange={e => setContraseña(e.target.value)}
                                    placeholder='Ingrese su contraseña'
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='confirmarContraseña'>Confirmar Contraseña</label>
                                <input
                                    id='confirmarContraseña'
                                    type="password"
                                    value={confirmarContraseña}
                                    onChange={e => setConfirmarContraseña(e.target.value)}
                                    placeholder='Confirme su contraseña'
                                />
                            </div>

                            <div className='button-container'>
                                <button type="submit">Registrarme</button>
                                <button type="button" onClick={() => setIsRegistering(false)}>Volver a login</button>
                            </div>
                            {error && <p className='error-message'>Todos los campos son obligatorios y las contraseñas deben coincidir</p>}
                        </form>
                    </>
                ) : (
                    <>
                        <h1>Inicio de Sesion</h1>
                        <form className='formulario' onSubmit={handleLogin}>
                            <div className='form-group'>
                                <label htmlFor='usuario'>Usuario</label>
                                <input
                                    id='usuario'
                                    type="text"
                                    value={usuario}
                                    onChange={e => setUsuario(e.target.value)}
                                    placeholder='Ingrese su usuario'
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='contraseña'>Contraseña</label>
                                <input
                                    id='contraseña'
                                    type="password"
                                    value={contraseña}
                                    onChange={e => setContraseña(e.target.value)}
                                    placeholder='Ingrese su contraseña'
                                />
                            </div>

                            <div className='button-container'>
                                <button type="submit">Iniciar Sesión</button>
                                <button type="button" onClick={() => setIsRegistering(true)}>Registrarse</button>
                            </div>
                            {error && <p className='error-message'>Todos los campos son obligatorios</p>}
                        </form>
                    </>
                )}
            </div>
        </section>
    );
}
