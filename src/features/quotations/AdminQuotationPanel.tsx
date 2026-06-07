import { AdminQuotationClientPanel } from "@/features/quotations/AdminQuotationClientPanel";
import type { Lead } from "@/types/lead";
import type { Quotation } from "@/types/quotation";

interface AdminQuotationPanelProps {
  initialLeads: Lead[];
  initialQuotations: Quotation[];
  selectedLeadId?: string;
}

export function AdminQuotationPanel(props: AdminQuotationPanelProps) {
  return <AdminQuotationClientPanel {...props} />;
}
