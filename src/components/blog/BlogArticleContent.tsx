import { BlogSection } from '@/data/blogPosts';

interface BlogArticleContentProps {
  sections: BlogSection[];
}

export function BlogArticleContent({ sections }: BlogArticleContentProps) {
  return (
    <div className="max-w-[720px]">
      {sections.map((section, index) => (
        <section key={section.id} id={section.id} className={index > 0 ? 'mt-10' : ''}>
          <h2
            className="text-xl md:text-2xl font-bold text-foreground mb-4 scroll-mt-24"
            style={{ fontFamily: "'Open Sans', sans-serif", textTransform: 'none', letterSpacing: 'normal' }}
          >
            {section.title}
          </h2>
          <div className="space-y-4">
            {section.content.split('\n\n').map((paragraph, i) => (
              <p
                key={i}
                className="text-base md:text-lg text-muted-foreground leading-[1.8]"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
