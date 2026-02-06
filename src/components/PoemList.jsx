import { PoemCard } from "./PoemCard";

const groupPoemsByDate = (items) => {
  const groups = [];
  const lookup = new Map();

  items.forEach((poem) => {
    const key = poem.fecha || "Sin fecha";
    if (!lookup.has(key)) {
      const group = { date: key, poems: [] };
      lookup.set(key, group);
      groups.push(group);
    }
    lookup.get(key).poems.push(poem);
  });

  return groups;
};

export function PoemList({ items, onEdit }) {
  const groups = groupPoemsByDate(items);

  return (
    <div className="poem-list">
      {groups.map((group) => (
        <section key={group.date} className="poem-group">
          <div className="poem-group-header">
            <h3>{group.date}</h3>
          </div>
          <div className="poem-grid">
            {group.poems.map((p) => (
              <PoemCard
                key={p.id}
                id={p.id}
                title={p.titulo}
                excerpt={p.contenido}
                date={p.fecha}
                onEdit={onEdit}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}