/** 2997 → "2.997 €" (punto de millar también en números de 4 cifras) */
export const formatPrice = (value: number) => `${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} €`;
