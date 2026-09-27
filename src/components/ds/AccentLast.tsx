/**
 * Pinta en degradado la parte final de un titular.
 * Si hay «:», resalta lo que va detrás; si no, la última palabra.
 */
export function AccentLast({ text }: { text: string }) {
  const colon = text.indexOf(':');
  if (colon > 0 && colon < text.length - 2) {
    return (
      <>
        {text.slice(0, colon + 1)} <span className="ds-text-gradient">{text.slice(colon + 1).trim()}</span>
      </>
    );
  }
  const i = text.lastIndexOf(' ');
  if (i < 0) return <span className="ds-text-gradient">{text}</span>;
  return (
    <>
      {text.slice(0, i)} <span className="ds-text-gradient">{text.slice(i + 1)}</span>
    </>
  );
}
