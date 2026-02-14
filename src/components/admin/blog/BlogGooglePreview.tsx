interface Props {
  title: string;
  excerpt: string;
  slug: string;
}

export function BlogGooglePreview({ title, excerpt, slug }: Props) {
  const displayTitle = title ? `${title.slice(0, 57)}${title.length > 57 ? '...' : ''} | Blog Academia Detail` : 'Título del artículo | Blog Academia Detail';
  const displayUrl = `academiadetail.com › blog › ${slug || 'slug-del-articulo'}`;
  const displayDesc = excerpt ? excerpt.slice(0, 155) + (excerpt.length > 155 ? '...' : '') : 'Descripción del artículo...';

  return (
    <div className="bg-card border rounded-lg p-4">
      <p className="text-xs text-muted-foreground mb-1">Preview en Google</p>
      <div className="space-y-0.5">
        <p className="text-sm text-muted-foreground">{displayUrl}</p>
        <p className="text-blue-500 text-lg leading-tight hover:underline cursor-default">{displayTitle}</p>
        <p className="text-sm text-muted-foreground leading-snug">{displayDesc}</p>
      </div>
    </div>
  );
}
