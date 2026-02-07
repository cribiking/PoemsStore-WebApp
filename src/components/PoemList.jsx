import { PoemCard } from "./PoemCard";

const parseDateString = (value) => {
  if (typeof value !== "string") return null;

  const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    const [, year, month, day] = isoMatch;
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  const slashMatch = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (slashMatch) {
    const [, first, second, year] = slashMatch;
    const a = Number(first);
    const b = Number(second);

    if (a > 12 && b <= 12) {
      return new Date(Number(year), b - 1, a);
    }
    if (b > 12 && a <= 12) {
      return new Date(Number(year), a - 1, b);
    }

    // Ambiguous: default to day/month to keep Spanish-style dates consistent.
    return new Date(Number(year), b - 1, a);
  }

  return null;
};

const getPoemDate = (poem) => {
  if (poem?.updatedAt?.toDate) return poem.updatedAt.toDate();
  if (poem?.createdAt?.toDate) return poem.createdAt.toDate();
  return parseDateString(poem?.fecha);
};

const getDateKey = (poem) => {
  const date = getPoemDate(poem);
  if (date) return date.toISOString().split("T")[0];
  if (typeof poem?.fecha === "string" && poem.fecha.trim()) return `raw:${poem.fecha}`;
  return "Sin fecha";
};

const getDateLabel = (poem) => {
  const date = getPoemDate(poem);
  if (date) return date.toLocaleDateString("es-ES");
  if (typeof poem?.fecha === "string" && poem.fecha.trim()) return poem.fecha;
  return "Sin fecha";
};

const groupPoemsByDate = (items) => {
  const groups = [];
  const lookup = new Map();

  items.forEach((poem) => {
    const key = getDateKey(poem);
    if (!lookup.has(key)) {
      const group = { dateKey: key, dateLabel: getDateLabel(poem), poems: [] };
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
        <section key={group.dateKey} className="poem-group">
          <div className="poem-group-header">
            <h3>{group.dateLabel}</h3>
          </div>
          <div className="poem-grid">
            {group.poems.map((p) => (
              <PoemCard
                key={p.id}
                id={p.id}
                title={p.titulo}
                excerpt={p.contenido}
                date={getDateLabel(p)}
                onEdit={onEdit}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}