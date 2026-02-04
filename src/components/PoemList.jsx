import { PoemCard } from "./PoemCard";

export function PoemList({ items }) {
  return (
    <div className="poem-grid">
      {items.map((p) => (
        <PoemCard key={p.id} title={p.titulo} excerpt={p.contenido} date={p.fecha} />
      ))}
    </div>
  );
}