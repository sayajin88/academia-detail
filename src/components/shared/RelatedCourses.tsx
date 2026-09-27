import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Course {
  name: string;
  url: string;
  description: string;
}

interface RelatedCoursesProps {
  courses: Course[];
  title?: string;
}

export function RelatedCourses({
  courses,
  title = 'Formaciones Relacionadas',
}: RelatedCoursesProps) {
  if (!courses.length) return null;

  return (
    <aside className="mt-10 pt-8 border-t border-border">
      <h3 className="text-xl font-bold text-foreground mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {courses.map((course) => (
          <Link
            key={course.url}
            to={course.url}
            className="group flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:bg-primary/5 transition-all"
          >
            <ArrowRight className="h-5 w-5 text-brand shrink-0 group-hover:translate-x-1 transition-transform" />
            <div>
              <p className="font-semibold text-foreground text-sm">{course.name}</p>
              <p className="text-xs text-muted-foreground">{course.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
