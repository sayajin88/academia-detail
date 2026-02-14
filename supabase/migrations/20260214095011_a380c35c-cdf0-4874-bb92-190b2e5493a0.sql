
-- Add comunidad_autonoma column to detailer_profiles
ALTER TABLE public.detailer_profiles ADD COLUMN comunidad_autonoma TEXT;

-- Update existing records based on province
UPDATE public.detailer_profiles 
SET comunidad_autonoma = 'Comunidad Valenciana'
WHERE province ILIKE '%Alicante%' OR province ILIKE '%Valencia%' OR province ILIKE '%Castellón%' OR province ILIKE '%Castellon%';

UPDATE public.detailer_profiles 
SET comunidad_autonoma = 'Comunidad de Madrid'
WHERE province ILIKE '%Madrid%';

UPDATE public.detailer_profiles 
SET comunidad_autonoma = 'Cataluña'
WHERE province ILIKE '%Barcelona%' OR province ILIKE '%Tarragona%' OR province ILIKE '%Girona%' OR province ILIKE '%Lleida%' OR province ILIKE '%Lérida%';

UPDATE public.detailer_profiles 
SET comunidad_autonoma = 'Andalucía'
WHERE province ILIKE '%Sevilla%' OR province ILIKE '%Málaga%' OR province ILIKE '%Malaga%' OR province ILIKE '%Cádiz%' OR province ILIKE '%Cadiz%' OR province ILIKE '%Granada%' OR province ILIKE '%Córdoba%' OR province ILIKE '%Cordoba%' OR province ILIKE '%Jaén%' OR province ILIKE '%Jaen%' OR province ILIKE '%Huelva%' OR province ILIKE '%Almería%' OR province ILIKE '%Almeria%';

UPDATE public.detailer_profiles 
SET comunidad_autonoma = 'País Vasco'
WHERE province ILIKE '%Vizcaya%' OR province ILIKE '%Bizkaia%' OR province ILIKE '%Guipúzcoa%' OR province ILIKE '%Gipuzkoa%' OR province ILIKE '%Álava%' OR province ILIKE '%Araba%';

UPDATE public.detailer_profiles 
SET comunidad_autonoma = 'Galicia'
WHERE province ILIKE '%A Coruña%' OR province ILIKE '%Coruña%' OR province ILIKE '%Pontevedra%' OR province ILIKE '%Ourense%' OR province ILIKE '%Lugo%';

UPDATE public.detailer_profiles 
SET comunidad_autonoma = 'Castilla y León'
WHERE province ILIKE '%Valladolid%' OR province ILIKE '%León%' OR province ILIKE '%Burgos%' OR province ILIKE '%Salamanca%' OR province ILIKE '%Zamora%' OR province ILIKE '%Palencia%' OR province ILIKE '%Ávila%' OR province ILIKE '%Segovia%' OR province ILIKE '%Soria%';

UPDATE public.detailer_profiles 
SET comunidad_autonoma = 'Castilla-La Mancha'
WHERE province ILIKE '%Toledo%' OR province ILIKE '%Ciudad Real%' OR province ILIKE '%Albacete%' OR province ILIKE '%Cuenca%' OR province ILIKE '%Guadalajara%';

UPDATE public.detailer_profiles 
SET comunidad_autonoma = 'Aragón'
WHERE province ILIKE '%Zaragoza%' OR province ILIKE '%Huesca%' OR province ILIKE '%Teruel%';

UPDATE public.detailer_profiles 
SET comunidad_autonoma = 'Región de Murcia'
WHERE province ILIKE '%Murcia%';

UPDATE public.detailer_profiles 
SET comunidad_autonoma = 'Islas Canarias'
WHERE province ILIKE '%Las Palmas%' OR province ILIKE '%Santa Cruz de Tenerife%' OR province ILIKE '%Tenerife%';

UPDATE public.detailer_profiles 
SET comunidad_autonoma = 'Islas Baleares'
WHERE province ILIKE '%Baleares%' OR province ILIKE '%Illes Balears%' OR province ILIKE '%Mallorca%';

UPDATE public.detailer_profiles 
SET comunidad_autonoma = 'Extremadura'
WHERE province ILIKE '%Cáceres%' OR province ILIKE '%Caceres%' OR province ILIKE '%Badajoz%';

UPDATE public.detailer_profiles 
SET comunidad_autonoma = 'Asturias'
WHERE province ILIKE '%Asturias%';

UPDATE public.detailer_profiles 
SET comunidad_autonoma = 'Cantabria'
WHERE province ILIKE '%Cantabria%';

UPDATE public.detailer_profiles 
SET comunidad_autonoma = 'Navarra'
WHERE province ILIKE '%Navarra%';

UPDATE public.detailer_profiles 
SET comunidad_autonoma = 'La Rioja'
WHERE province ILIKE '%Rioja%';

UPDATE public.detailer_profiles 
SET comunidad_autonoma = 'Ceuta y Melilla'
WHERE province ILIKE '%Ceuta%' OR province ILIKE '%Melilla%';
