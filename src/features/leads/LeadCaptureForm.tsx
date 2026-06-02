"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string; fields?: Record<string, string> };

const services = [
  "Interior Painting",
  "Exterior Painting",
  "Texture & Stencil Designs",
  "Wallpaper",
  "Waterproofing",
  "Wood Polish/Coating",
  "False Ceiling",
  "Deep Cleaning",
];

const inputClass =
  "w-full rounded-xl border border-brand-border bg-white px-4 py-3 text-sm text-brand-text outline-none transition focus:border-brand-accent";

interface LeadCaptureFormDefaults {
  serviceType?: string;
  propertyType?: string;
  areaSize?: string;
  city?: string;
  sourceDetail?: string;
}

interface LeadCaptureFormProps {
  defaults?: LeadCaptureFormDefaults;
}

export function LeadCaptureForm({ defaults }: LeadCaptureFormProps) {
  const [state, setState] = useState<SubmitState>({ status: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "submitting" });

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      city: formData.get("city"),
      address: formData.get("address"),
      serviceType: formData.get("serviceType"),
      propertyType: formData.get("propertyType"),
      areaSize: formData.get("areaSize"),
      budgetRange: formData.get("budgetRange"),
      preferredDate: formData.get("preferredDate"),
      message: formData.get("message"),
      source: defaults?.sourceDetail === "cost_estimator" ? "estimator" : "contact",
      sourceDetail: defaults?.sourceDetail,
    };

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      setState({
        status: "error",
        message: result.message ?? "Unable to submit enquiry.",
        fields: result.errors,
      });
      return;
    }

    event.currentTarget.reset();
    setState({
      status: "success",
      message: "Your consultation request is saved. The Wallora team can now see it in admin leads.",
    });
  }

  const fieldErrors = state.status === "error" ? state.fields : undefined;

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 rounded-2xl border border-brand-border bg-brand-card p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium">
          Name
          <input className={inputClass} name="name" placeholder="Your name" />
          {fieldErrors?.name ? <span className="text-xs text-red-700">{fieldErrors.name}</span> : null}
        </label>

        <label className="space-y-2 text-sm font-medium">
          Phone
          <input className={inputClass} name="phone" placeholder="+91 98765 43210" />
          {fieldErrors?.phone ? <span className="text-xs text-red-700">{fieldErrors.phone}</span> : null}
        </label>

        <label className="space-y-2 text-sm font-medium">
          Email
          <input className={inputClass} name="email" placeholder="you@example.com" type="email" />
          {fieldErrors?.email ? <span className="text-xs text-red-700">{fieldErrors.email}</span> : null}
        </label>

        <label className="space-y-2 text-sm font-medium">
          City
          <input className={inputClass} defaultValue={defaults?.city} name="city" placeholder="Bangalore" />
          {fieldErrors?.city ? <span className="text-xs text-red-700">{fieldErrors.city}</span> : null}
        </label>

        <label className="space-y-2 text-sm font-medium">
          Service
          <select className={inputClass} name="serviceType" defaultValue={defaults?.serviceType ?? ""}>
            <option value="" disabled>
              Select service
            </option>
            {defaults?.serviceType && !services.includes(defaults.serviceType) ? (
              <option value={defaults.serviceType}>{defaults.serviceType}</option>
            ) : null}
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          {fieldErrors?.serviceType ? <span className="text-xs text-red-700">{fieldErrors.serviceType}</span> : null}
        </label>

        <label className="space-y-2 text-sm font-medium">
          Property Type
          <select className={inputClass} name="propertyType" defaultValue={defaults?.propertyType ?? ""}>
            <option value="">Not sure yet</option>
            {defaults?.propertyType && !["1BHK", "2BHK", "3BHK", "Office"].includes(defaults.propertyType) ? (
              <option value={defaults.propertyType}>{defaults.propertyType}</option>
            ) : null}
            <option value="1BHK">1BHK</option>
            <option value="2BHK">2BHK</option>
            <option value="3BHK">3BHK</option>
            <option value="Office">Office</option>
          </select>
        </label>

        <label className="space-y-2 text-sm font-medium">
          Approx Area
          <input className={inputClass} defaultValue={defaults?.areaSize} min="1" name="areaSize" placeholder="1200" type="number" />
          {fieldErrors?.areaSize ? <span className="text-xs text-red-700">{fieldErrors.areaSize}</span> : null}
        </label>

        <label className="space-y-2 text-sm font-medium">
          Preferred Date
          <input className={inputClass} name="preferredDate" type="date" />
        </label>
      </div>

      <label className="space-y-2 text-sm font-medium">
        Address
        <input className={inputClass} name="address" placeholder="Area or full address" />
      </label>

      <label className="space-y-2 text-sm font-medium">
        Budget Range
        <input className={inputClass} name="budgetRange" placeholder="Example: 50k - 80k" />
      </label>

      <label className="space-y-2 text-sm font-medium">
        Message
        <textarea className={`${inputClass} min-h-28 resize-y`} name="message" placeholder="Tell us what you want to refresh." />
      </label>

      {state.status === "success" ? (
        <p className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">{state.message}</p>
      ) : null}

      {state.status === "error" ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{state.message}</p>
      ) : null}

      <Button className="w-full rounded-full py-3 md:w-fit" disabled={state.status === "submitting"} type="submit">
        {state.status === "submitting" ? "Submitting..." : "Book Free Consultation"}
      </Button>
    </form>
  );
}
