import './styles.css';

export default function TableHeader({ col1, col2, col3, col4 }) {
    return (
        <div className="table-header">
            <div className="table-header-item">
                <span>{col1}</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
            </div>

            <div className="table-header-item">
                <span>{col2}</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
            </div>

            <div className="table-header-item">
                <span>{col3}</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
            </div>

            <div className="table-header-item">
                <span>{col4}</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
            </div>

        </div>
    );
}