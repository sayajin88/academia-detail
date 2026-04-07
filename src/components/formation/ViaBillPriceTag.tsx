import { useEffect } from 'react';

interface ViaBillPriceTagProps {
  price: number;
  view?: 'product' | 'list' | 'basket';
}

export function ViaBillPriceTag({ price, view = 'product' }: ViaBillPriceTagProps) {
  useEffect(() => {
    // Re-trigger ViaBill widget scan after mount
    if (typeof window !== 'undefined' && (window as any).vb?.pt?.scan) {
      (window as any).vb.pt.scan();
    }
  }, [price]);

  return (
    <div
      className="viabill-pricetag mt-3"
      data-view={view}
      data-price={price.toString()}
      data-currency="EUR"
      data-language="ES"
      data-country-code="ES"
      data-tags="_pI9NHA4kQ%3D"
    />
  );
}
