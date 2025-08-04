import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  avatar?: string;
  content: string;
  rating?: number;
}

export function TestimonialCard({ name, avatar, content, rating = 5 }: TestimonialCardProps) {
  return (
    <Card className="glass-card border-white/10 hover:border-white/20 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        
        <p className="text-white/90 mb-4 italic">"{content}"</p>
        
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="bg-primary text-white">
              {name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="text-white font-semibold text-sm">{name}</div>
            <div className="text-muted-foreground text-xs">Alumno certificado</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}