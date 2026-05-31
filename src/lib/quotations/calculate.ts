export interface QuotationCostInput {
  labourCost: number;
  materialCost: number;
  additionalCost: number;
  discount: number;
  tax: number;
}

export function calculateQuotationTotal(input: QuotationCostInput): number {
  const total = input.labourCost + input.materialCost + input.additionalCost + input.tax - input.discount;
  return Math.max(0, total);
}
