import { useEffect } from 'react';

interface ViaBillPriceTagProps {
  price: number;
}

export function ViaBillPriceTag({ price }: ViaBillPriceTagProps) {
  useEffect(() => {
    // Re-trigger ViaBill widget scan after mount
    if (typeof window !== 'undefined' && (window as any).vb?.pt?.scan) {
      (window as any).vb.pt.scan();
    }
  }, [price]);

  return (
    <div
      id="viabill-pricetag"
      data-view="product"
      data-price={price.toString()}
      data-currency="EUR"
      data-language="ES"
      data-country-code="ES"
      data-tags="_pI9NHA4kQ%3D"
      className="mt-3"
    />
  );
}
