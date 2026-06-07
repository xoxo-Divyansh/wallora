"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  ESTIMATOR_PROPERTY_TYPES,
  ESTIMATOR_QUALITY_TIERS,
  ESTIMATOR_SERVICE_TYPES,
  SERVICE_LABELS,
  type EstimateOutput,
  type EstimatorPropertyType,
  type EstimatorQualityTier,
  type EstimatorServiceType,
} from "@/lib/estimator";
import { createEstimatorWhatsAppMessage, createWhatsAppUrl } from "@/lib/whatsapp";

interface EstimatorFormProps {
  defaultServiceType?: EstimatorServiceType;
}

type EstimateState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: EstimateOutput; context: EstimatorFormValues }
  | { status: "error"; message: string; fields?: Record<string, string> };

interface EstimatorFormValues {
  serviceType: EstimatorServiceType;
  propertyType: EstimatorPropertyType;
  qualityTier: EstimatorQualityTier;
  areaSize: number;
  city?: string;
  rooms?: number;
}

const inputClass =
  "w-full rounded-xl border border-brand-border bg-white px-4 py-3 text-sm text-brand-text outline-none transition focus:border-brand-accent";

const propertyLabels: Record<EstimatorPropertyType, string> = {
  apartment: "Apartment",
  independent_house: "Independent House",
  office: "Office",
  shop: "Shop",
  villa: "Villa",
};

const qualityLabels: Record<EstimatorQualityTier, string> = {
  basic: "Basic",
  standard: "Standard",
  premium: "Premium",
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    currency: "INR",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(value);
}

function isEstimatorServiceType(value: string | undefined): value is EstimatorServiceType {
  return ESTIMATOR_SERVICE_TYPES.includes(value as EstimatorServiceType);
}

export function EstimatorForm({ defaultServiceType }: EstimatorFormProps) {
  const [state, setState] = useState<EstimateState>({ status: "idle" });
  const serviceDefault = isEstimatorServiceType(defaultServiceType) ? defaultServiceType : "interior_painting";

  const contactHref = useMemo(() => {
    if (state.status !== "success") {
      return "/contact";
    }

    const params = new URLSearchParams({
      serviceType: SERVICE_LABELS[state.context.serviceType],
      propertyType: propertyLabels[state.context.propertyType],
      areaSize: String(state.context.areaSize),
      sourceDetail: "cost_estimator",
    });

    if (state.context.city) {
      params.set("city", state.context.city);
    }

    return `/contact?${params.toString()}`;
  }, [state]);

  const whatsAppHref = useMemo(() => {
    if (state.status !== "success") {
      return createWhatsAppUrl();
    }

    const estimatedRange = `${formatCurrency(state.data.minPrice)} - ${formatCurrency(state.data.maxPrice)}`;

    return createWhatsAppUrl(
      createEstimatorWhatsAppMessage({
        serviceType: SERVICE_LABELS[state.context.serviceType],
        propertyType: propertyLabels[state.context.propertyType],
        areaSize: state.context.areaSize,
        qualityTier: qualityLabels[state.context.qualityTier],
        city: state.context.city,
        estimatedRange,
      }),
    );
  }, [state]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "loading" });

    const formData = new FormData(event.currentTarget);
    const payload = {
      serviceType: formData.get("serviceType"),
      propertyType: formData.get("propertyType"),
      qualityTier: formData.get("qualityTier"),
      areaSize: formData.get("areaSize"),
      city: formData.get("city"),
      rooms: formData.get("rooms"),
    };

    const response = await fetch("/api/estimator", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      setState({
        status: "error",
        message: result.message ?? "Unable to calculate estimate.",
        fields: result.errors,
      });
      return;
    }

    setState({
      status: "success",
      data: result.data,
      context: {
        serviceType: payload.serviceType as EstimatorServiceType,
        propertyType: payload.propertyType as EstimatorPropertyType,
        qualityTier: payload.qualityTier as EstimatorQualityTier,
        areaSize: Number(payload.areaSize),
        city: typeof payload.city === "string" && payload.city.trim() ? payload.city.trim() : undefined,
        rooms: payload.rooms ? Number(payload.rooms) : undefined,
      },
    });
  }

  const fieldErrors = state.status === "error" ? state.fields : undefined;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
      <form onSubmit={handleSubmit} className="grid gap-5 rounded-2xl border border-brand-border bg-brand-card p-5 shadow-sm sm:p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium">
            Service
            <select className={inputClass} name="serviceType" defaultValue={serviceDefault}>
              {ESTIMATOR_SERVICE_TYPES.map((serviceType) => (
                <option key={serviceType} value={serviceType}>
                  {SERVICE_LABELS[serviceType]}
                </option>
              ))}
            </select>
            {fieldErrors?.serviceType ? <span className="text-xs text-red-700">{fieldErrors.serviceType}</span> : null}
          </label>

          <label className="space-y-2 text-sm font-medium">
            Property Type
            <select className={inputClass} name="propertyType" defaultValue="apartment">
              {ESTIMATOR_PROPERTY_TYPES.map((propertyType) => (
                <option key={propertyType} value={propertyType}>
                  {propertyLabels[propertyType]}
                </option>
              ))}
            </select>
            {fieldErrors?.propertyType ? <span className="text-xs text-red-700">{fieldErrors.propertyType}</span> : null}
          </label>

          <label className="space-y-2 text-sm font-medium">
            Area Size
            <input className={inputClass} min="1" name="areaSize" placeholder="1200" type="number" />
            {fieldErrors?.areaSize ? <span className="text-xs text-red-700">{fieldErrors.areaSize}</span> : null}
          </label>

          <label className="space-y-2 text-sm font-medium">
            Quality Tier
            <select className={inputClass} name="qualityTier" defaultValue="standard">
              {ESTIMATOR_QUALITY_TIERS.map((qualityTier) => (
                <option key={qualityTier} value={qualityTier}>
                  {qualityLabels[qualityTier]}
                </option>
              ))}
            </select>
            {fieldErrors?.qualityTier ? <span className="text-xs text-red-700">{fieldErrors.qualityTier}</span> : null}
          </label>

          <label className="space-y-2 text-sm font-medium">
            City
            <input className={inputClass} name="city" placeholder="Lucknow" />
          </label>

          <label className="space-y-2 text-sm font-medium">
            Rooms
            <input className={inputClass} min="1" name="rooms" placeholder="3" type="number" />
            {fieldErrors?.rooms ? <span className="text-xs text-red-700">{fieldErrors.rooms}</span> : null}
          </label>
        </div>

        {state.status === "error" ? (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{state.message}</p>
        ) : null}

        <Button className="w-full rounded-full py-3 md:w-fit" disabled={state.status === "loading"} type="submit">
          {state.status === "loading" ? "Calculating..." : "Calculate Estimate"}
        </Button>
      </form>

      <aside className="rounded-2xl border border-brand-border bg-brand-card p-5 shadow-sm sm:p-6">
        {state.status === "success" ? (
          <div className="space-y-5">
            <div>
              <p className="text-sm font-medium text-brand-muted">Estimated Range</p>
              <p className="mt-1 text-3xl font-semibold">
                {formatCurrency(state.data.minPrice)} - {formatCurrency(state.data.maxPrice)}
              </p>
            </div>

            <div className="grid gap-3 text-sm text-brand-muted">
              <p>
                <span className="font-semibold text-brand-text">Timeline:</span> {state.data.estimatedTimeline}
              </p>
              <p>
                <span className="font-semibold text-brand-text">Recommended:</span>{" "}
                {qualityLabels[state.data.recommendedPackage]}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold">Included Services</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-brand-muted">
                {state.data.includedServices.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold">Assumptions</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-brand-muted">
                {state.data.assumptions.map((assumption) => (
                  <li key={assumption}>{assumption}</li>
                ))}
              </ul>
            </div>

            <p className="text-xs text-brand-muted">{state.data.disclaimer}</p>

            <Link
              href={contactHref}
              className="inline-flex w-full items-center justify-center rounded-full bg-brand-accent px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 md:w-fit"
            >
              Book Free Site Visit
            </Link>
            <a
              className="inline-flex w-full items-center justify-center rounded-full border border-brand-border bg-white px-5 py-3 text-sm font-semibold text-brand-text transition hover:border-brand-accent hover:text-brand-accent md:w-fit"
              href={whatsAppHref}
              rel="noreferrer"
              target="_blank"
            >
              Discuss on WhatsApp
            </a>
          </div>
        ) : (
          <div className="space-y-3 text-sm text-brand-muted">
            <h3 className="text-xl font-semibold text-brand-text">Your estimate will appear here.</h3>
            <p>Select service, property, area, and quality tier to get a planning range before booking a site visit.</p>
          </div>
        )}
      </aside>
    </div>
  );
}
