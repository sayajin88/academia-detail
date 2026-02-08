import { BlogSection } from '@/data/blogPosts';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

interface BlogArticleContentProps {
  sections: BlogSection[];
}

export function BlogArticleContent({ sections }: BlogArticleContentProps) {
  return (
    <div className="max-w-[720px]">
      {sections.map((section, index) => (
        <AnimatedSection key={section.id} animation="fade-up" stagger={index * 80} duration="fast">
          <section id={section.id} className={index > 0 ? 'mt-10' : ''}>
            {/* Decorative separator between sections */}
            {index > 0 && (
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-gradient-to-r from-primary/40 via-primary/20 to-transparent" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                <div className="h-px flex-1 bg-gradient-to-l from-primary/40 via-primary/20 to-transparent" />
              </div>
            )}

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
                  className={`text-base md:text-lg text-muted-foreground leading-[1.8] ${
                    i === 0 ? 'first-letter:text-3xl first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-1.5 first-letter:mt-0.5 first-letter:leading-none' : ''
                  }`}
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        </AnimatedSection>
      ))}
    </div>
  );
}
