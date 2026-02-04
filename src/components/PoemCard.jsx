export function PoemCard({title ,excerpt ,date}){
    return (
        <>
        <div className="poem-card">
            <h3>{title}</h3>
            <p>{excerpt}</p>
            <span>{date}</span>
        </div>
        </>
    );
}