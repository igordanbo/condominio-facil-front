import { Link } from 'react-router-dom';
import './styles.css';

export default function TableItem({ id, status, col1, col2, col3, col4}) {
    return (
        <div className="table-item">
            <div className="table-item-id" >ID #{id}</div>
            <div className={`table-item-status ${status === 'ativo' ? 'active' : 'inative'}`} to="/"></div>
            <div className="table-item-column">
                <Link to={`/condominio/${id}`}>{col1}</Link>
            </div>

            <div className="table-item-column">
                <span>{col2}</span>
            
            </div>

            <div className="table-item-column">
                <span>{col3}</span>
            
            </div>

            <div className="table-item-column">
                <span>{col4}</span>
               
            </div>

            <div className="table-item-action">
                <button className="button-action edit">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                </button>
                <button className="button-action delete"> 
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </button>
            </div>
        </div>
    );
}