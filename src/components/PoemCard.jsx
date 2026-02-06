export function PoemCard({ id, title, excerpt, date, onEdit }) {
    const handleCardClick = () => {
        if (onEdit) {
            onEdit(id);
        }
    };

    const handleCardKeyDown = (event) => {
        if (!onEdit) return;
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onEdit(id);
        }
    };

    return (
        <div
            className={`poem-card${onEdit ? ' poem-card-clickable' : ''}`}
            onClick={handleCardClick}
            onKeyDown={handleCardKeyDown}
            role={onEdit ? 'button' : undefined}
            tabIndex={onEdit ? 0 : undefined}
        >
            <div className="poem-card-content">
                <h3>{title}</h3>
                <p>{excerpt}</p>
                <span>{date}</span>
            </div>
        </div>
    );
}