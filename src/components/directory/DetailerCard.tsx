import { Link } from 'react-router-dom';
import { MapPin, Phone } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { DetailerBadge } from './DetailerBadge';

export interface DetailerProfile {
  id: string;
  business_name: string;
  slug: string;
  owner_name: string;
  city: string;
  province: string;
  services: string[];
  level_badge: 'member' | 'certified' | 'master';
  is_verified: boolean;
  featured_image_url: string | null;
  description: string | null;
  whatsapp_number: string | null;
  phone: string | null;
  latitude: number | null;
  longitude: number | null;
  website_url: string | null;
  instagram_handle: string | null;
  email: string;
  address: string | null;
  zip_code: string | null;
}

interface DetailerCardProps {
  detailer: DetailerProfile;
}

export function DetailerCard({ detailer }: DetailerCardProps) {
  return (
    <Link to={`/directorio/${detailer.slug}`} className="group block">
      <Card className="overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-[var(--shadow-glow-subtle)] bg-card">
        {/* Image */}
        <div className="aspect-[16/9] overflow-hidden bg-muted relative">
          {detailer.featured_image_url ? (
            <img
              src={detailer.featured_image_url}
              alt={`${detailer.business_name} - Detailing en ${detailer.city}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <span className="text-4xl font-bold opacity-20">
                {detailer.business_name.charAt(0)}
              </span>
            </div>
          )}
          {/* Badge overlay */}
          <div className="absolute top-3 left-3">
            <DetailerBadge level={detailer.level_badge} size="sm" />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-bold text-foreground text-lg leading-tight group-hover:text-primary transition-colors">
              {detailer.business_name}
            </h3>
            <div className="flex items-center gap-1 mt-1 text-muted-foreground text-sm">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span>{detailer.city}, {detailer.province}</span>
            </div>
          </div>

          {/* Services */}
          {detailer.services.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {detailer.services.slice(0, 4).map((service) => (
                <span
                  key={service}
                  className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  {service}
                </span>
              ))}
              {detailer.services.length > 4 && (
                <span className="px-2 py-0.5 text-[11px] text-muted-foreground">
                  +{detailer.services.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Contact hint */}
          {detailer.phone && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Phone className="h-3 w-3" />
              <span>Ver contacto</span>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
