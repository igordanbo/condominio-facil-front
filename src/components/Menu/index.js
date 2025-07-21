import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './styles.css';

export default function Menu() {

    const location = useLocation();

    return (
        <aside className="asside-menu-bar">
            <img className="logo" src="/imagens/logo.png" alt="logo" />
            <div>

                <Link className={`menu-item ${location.pathname === '/' ? 'active' : ''}`} to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z"/></svg>
                    Dashboard
                </Link>
                <Link className={`menu-item ${location.pathname === '/condominios' ? 'active' : ''}`} to="/condominios">
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" ><path d="M120-120v-560h160v-160h400v320h160v400H520v-160h-80v160H120Zm80-80h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 320h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 480h80v-80h-80v80Zm0-160h80v-80h-80v80Z"/></svg>
                    Condomínios
                </Link>
                <Link className={`menu-item ${location.pathname === '/usuarios' ? 'active' : ''}`} to="/usuarios">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M560-680v-80h320v80H560Zm0 160v-80h320v80H560Zm0 160v-80h320v80H560Zm-240-40q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM80-160v-76q0-21 10-40t28-30q45-27 95.5-40.5T320-360q56 0 106.5 13.5T522-306q18 11 28 30t10 40v76H80Zm86-80h308q-35-20-74-30t-80-10q-41 0-80 10t-74 30Zm154-240q17 0 28.5-11.5T360-520q0-17-11.5-28.5T320-560q-17 0-28.5 11.5T280-520q0 17 11.5 28.5T320-480Zm0-40Zm0 280Z"/></svg>
                    Usuários
                </Link>
                <Link className={`menu-item ${location.pathname === '/manutencoes' ? 'active' : ''}`} to="/manutencoes">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M240-200h240v-40H240v40Zm30-360h180q12 0 21-9t9-21q0-12-9-21t-21-9H270q-12 0-21 9t-9 21q0 12 9 21t21 9Zm0-100h180q12 0 21-9t9-21q0-12-9-21t-21-9H270q-12 0-21 9t-9 21q0 12 9 21t21 9Zm370 140v-80h80v-80h-80v-80h80q33 0 56.5 23.5T800-680h80q17 0 28.5 11.5T920-640q0 17-11.5 28.5T880-600h-80q0 33-23.5 56.5T720-520h-80ZM480-320h-80v-200h160v-240H240q-33 0-56.5 23.5T160-680v80q0 33 23.5 56.5T240-520h80v200h-80v-120q-66 0-113-47T80-600v-80q0-66 47-113t113-47h320q33 0 56.5 23.5T640-760v240q0 33-23.5 56.5T560-440h-80v120ZM220-120q-25 0-42.5-17.5T160-180v-80q0-25 17.5-42.5T220-320h280q25 0 42.5 17.5T560-260v80q0 25-17.5 42.5T500-120H220Zm140-520Zm120 440H240h240Z"/></svg>
                    Manutenções
                </Link>
                <Link className={`menu-item ${location.pathname === '/tipos-manutencoes' ? 'active' : ''}`} to="/tipos-manutencoes">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M240-200h240v-40H240v40Zm30-360h180q12 0 21-9t9-21q0-12-9-21t-21-9H270q-12 0-21 9t-9 21q0 12 9 21t21 9Zm0-100h180q12 0 21-9t9-21q0-12-9-21t-21-9H270q-12 0-21 9t-9 21q0 12 9 21t21 9Zm370 140v-80h80v-80h-80v-80h80q33 0 56.5 23.5T800-680h80q17 0 28.5 11.5T920-640q0 17-11.5 28.5T880-600h-80q0 33-23.5 56.5T720-520h-80ZM480-320h-80v-200h160v-240H240q-33 0-56.5 23.5T160-680v80q0 33 23.5 56.5T240-520h80v200h-80v-120q-66 0-113-47T80-600v-80q0-66 47-113t113-47h320q33 0 56.5 23.5T640-760v240q0 33-23.5 56.5T560-440h-80v120ZM220-120q-25 0-42.5-17.5T160-180v-80q0-25 17.5-42.5T220-320h280q25 0 42.5 17.5T560-260v80q0 25-17.5 42.5T500-120H220Zm140-520Zm120 440H240h240Z"/></svg>
                    Tipos Manutenções
                </Link>


            </div>
           
        </aside>
    );
}