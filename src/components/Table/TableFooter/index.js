import './styles.css';

export default function TableFooter({ children, totalPages, atualPage, onPageChange}) {
    return (
        <tfoot className="table-footer">
            <button 
                disabled={atualPage <= 1}
                onClick={() => onPageChange(atualPage - 1)}
            >
                Página anterior
            </button>
            
            Página {atualPage} de {totalPages}
           
            <button 
                disabled={atualPage >= totalPages}
                onClick={() => onPageChange(atualPage + 1)}
            >
                Próxima página
            </button>
        </tfoot>
    );
}
