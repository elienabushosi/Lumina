"use client";

import { useState, useEffect } from "react";
import { CircleCheck } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function AltaEstReplacementCostFrom360Page() {
  const [form, setForm] = useState({
    exteriorWallFinish: "Veneer - Brick",
    exteriorWallConstruction: "Wood Framing",
    heatingSystems: "Forced Air",
    primarySystem: "Forced Air",
    coolingSystems: "Central AC",
    foundationType: "Concrete Slab",
    bathroomTypes: "Full Bath 1/2 Bath",
    flooringTypes: "Carpet Tile Ceramic",
    fireplaces: "None",
    // Editable text fields
    storiesAboveGround: "1 story",
    garageCapacity: "2 Car (397 - 576 sq. ft.)",
    numberFullBaths: "2",
    numberHalfBaths: "1",
    percentCarpet: "50",
    percentTileCeramic: "50",
    numberForcedAir: "1",
    numberCentralAC: "1",
    overallQualityGrade: "Above Average",
    foundationShape: "6-7 Corners - L Shape",
  });
  const [isSaved, setIsSaved] = useState(false);
  const [displayValue, setDisplayValue] = useState(453000);

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  useEffect(() => {
    const start = 453000;
    const end = 471829;
    const duration = 1500;
    const steps = 30;
    const stepDuration = duration / steps;
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep += 1;
      const progress = currentStep / steps;
      const value = Math.round(start + (end - start) * progress);
      setDisplayValue(value);
      if (currentStep >= steps) {
        clearInterval(interval);
        setDisplayValue(end);
      }
    }, stepDuration);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F3F6FB] flex px-4 py-6 md:px-8">
      {/* Sidebar */}
      <aside className="w-64 max-w-xs bg-white border-r border-[#E5E7EB] p-4 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <img
            src="/alta%20logo.png"
            alt="Alta Experience"
            className="h-14 w-auto object-contain"
          />
        </div>
        <div className="text-xs text-[#4B5563] font-medium">
          <p>Elie Naboushsi - Home</p>
          <p className="text-[11px] text-[#6B7280] mt-1">Alta # 177281581481464040</p>
        </div>
        <nav className="mt-3 flex-1 text-sm text-[#374151]">
          <ul className="space-y-0.5">
            <li className="px-2 py-1">
              <span className="inline-flex items-center gap-1 font-medium text-[#111827]">
                <span className="text-[#1D4ED8] text-lg leading-none">✓</span>
                Customer info
              </span>
            </li>
            <li className="px-2 py-1">
              <a
                href="/alta"
                className="block text-[#4B5563] hover:bg-[#EEF2FF] px-1 py-0.5 rounded"
              >
                Home features
              </a>
            </li>
            <li className="px-2 py-1 bg-[#E5F0FF] text-[#1D4ED8] font-medium">
              Est replacement cost
            </li>
            <li className="px-4 py-1 text-[#4B5563]">• Home coverages</li>
            <li className="px-4 py-1 text-[#4B5563]">• Home bind</li>
          </ul>

          <hr className="my-3 border-[#E5E7EB]" />

          <ul className="space-y-0.5">
            <li className="px-2 py-1 text-[#4B5563]">Rates summary</li>
            <li className="px-2 py-1 text-[#4B5563]">Compare rates</li>
            <li className="px-2 py-1 text-[#4B5563]">Create presentation</li>
          </ul>

          <hr className="my-3 border-[#E5E7EB]" />

          <ul className="space-y-0.5">
            <li className="px-2 py-1 text-[#4B5563]">Credit hit</li>
          </ul>

          <hr className="my-3 border-[#E5E7EB]" />

          <ul className="space-y-0.5">
            <li className="px-2 py-1 text-[#111827] font-semibold">Home reports</li>
            <li className="px-2 py-1 text-[#9CA3AF]">
              Contingencies <span className="text-[11px]">(Not available yet)</span>
            </li>
          </ul>
        </nav>

        <div className="mt-3 pt-3 border-t border-[#E5E7EB] text-xs text-[#4B5563]">
          <p>Mike Ridley - 355130</p>
          <p>
            Commission series - A <span className="text-[#2563EB]">Edit</span>
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-4 md:ml-6">
        <div className="bg-[#e6eff8ff] border border-[#E2E8F0] p-6 space-y-6">
          {/* Header value + Open 360Value */}
          <div className="flex items-start justify-between gap-6">
            <div className="flex flex-col gap-1">
              <p className="text-base md:text-lg font-semibold uppercase tracking-wide text-[#111827]">
                Est. home replacement cost
              </p>
              <p className="text-xs text-[#6B7280] mt-1">
                Based on 360Value and other information provided
              </p>
              <p className="text-3xl md:text-4xl font-semibold text-[#111827] mt-1">
                {displayValue.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
            <div className="text-xs text-[#6B7280] space-y-1 text-right shrink-0">
              <a
                href="/360Value"
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-[13px] font-semibold text-[#1D4ED8] border border-[#BFDBFE] shadow-sm"
              >
                Open 360Value
              </a>
              <div className="mt-1">
                <div>360Value ID: A8E2-QA25</div>
                <div>360Value ID Version: A8E2-QA25.3</div>
              </div>
            </div>
          </div>

          {/* Primary home characteristics (match screenshot fields & stacking) */}
          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-[#111827]">
              Primary home characteristics
            </h2>
            <div className="grid gap-4 md:grid-cols-2 text-[13px] text-[#374151]">
              {/* Left stack – matches left side of screenshot */}
              <div className="space-y-3">
                <InputField
                  label="Stories above ground"
                  value={form.storiesAboveGround}
                  onChange={(v) => update("storiesAboveGround", v)}
                />
                <Field label="Garage style" value="Attached / Built-in" />
                <InputField
                  label="Garage capacity"
                  value={form.garageCapacity}
                  onChange={(v) => update("garageCapacity", v)}
                />
                <SelectField
                  label="Bathroom types"
                  value={form.bathroomTypes}
                  options={[
                    "Full Bath 1/2 Bath",
                    "Full Bath Only",
                    "3/4 Bath 1/2 Bath",
                    "Full Bath 3/4 Bath 1/2 Bath",
                  ]}
                  onValueChange={(v) => update("bathroomTypes", v)}
                />
                <InputField
                  label="Number of full baths"
                  value={form.numberFullBaths}
                  onChange={(v) => update("numberFullBaths", v)}
                />
                <InputField
                  label="Number of 1/2 baths"
                  value={form.numberHalfBaths}
                  onChange={(v) => update("numberHalfBaths", v)}
                />
                <SelectField
                  label="Flooring types"
                  value={form.flooringTypes}
                  options={[
                    "Carpet Tile Ceramic",
                    "Hardwood",
                    "Luxury Vinyl Plank",
                    "Tile Only",
                    "Mixed",
                  ]}
                  onValueChange={(v) => update("flooringTypes", v)}
                />
                <InputField
                  label="Percent Carpet"
                  value={form.percentCarpet}
                  onChange={(v) => update("percentCarpet", v)}
                />
                <InputField
                  label="Percent Tile - Ceramic"
                  value={form.percentTileCeramic}
                  onChange={(v) => update("percentTileCeramic", v)}
                />
                <SelectField
                  label="Fireplaces"
                  value={form.fireplaces}
                  options={["None", "1 Fireplace", "2 Fireplaces", "3+ Fireplaces"]}
                  onValueChange={(v) => update("fireplaces", v)}
                />
              </div>

              {/* Right stack – matches right side of screenshot */}
              <div className="space-y-3">
                <SelectField
                  label="Exterior wall finish"
                  value={form.exteriorWallFinish}
                  options={[
                    "Veneer - Brick",
                    "Stucco",
                    "Vinyl Siding",
                    "Stone Veneer",
                    "Fiber Cement",
                  ]}
                  onValueChange={(v) => update("exteriorWallFinish", v)}
                />
                <SelectField
                  label="Exterior wall construction"
                  value={form.exteriorWallConstruction}
                  options={[
                    "Wood Framing",
                    "Steel Framing",
                    "Masonry Block",
                    "Insulated Concrete Form",
                  ]}
                  onValueChange={(v) => update("exteriorWallConstruction", v)}
                />
                <SelectField
                  label="Heating systems"
                  value={form.heatingSystems}
                  options={[
                    "Forced Air",
                    "Radiant Heat",
                    "Baseboard Electric",
                    "Heat Pump",
                  ]}
                  onValueChange={(v) => update("heatingSystems", v)}
                />
                <SelectField
                  label="Primary system"
                  value={form.primarySystem}
                  options={["Forced Air", "Heat Pump", "Boiler", "Mini Split"]}
                  onValueChange={(v) => update("primarySystem", v)}
                />
                <InputField
                  label="Number of Forced Air"
                  value={form.numberForcedAir}
                  onChange={(v) => update("numberForcedAir", v)}
                />
                <SelectField
                  label="Cooling systems"
                  value={form.coolingSystems}
                  options={[
                    "Central AC",
                    "Window Units",
                    "Mini Split",
                    "Evaporative Cooler",
                  ]}
                  onValueChange={(v) => update("coolingSystems", v)}
                />
                <InputField
                  label="Number of Central AC"
                  value={form.numberCentralAC}
                  onChange={(v) => update("numberCentralAC", v)}
                />
                <InputField
                  label="Overall quality grade"
                  value={form.overallQualityGrade}
                  onChange={(v) => update("overallQualityGrade", v)}
                />
                <SelectField
                  label="Foundation type"
                  value={form.foundationType}
                  options={[
                    "Concrete Slab",
                    "Pier & Beam",
                    "Crawl Space",
                    "Basement",
                  ]}
                  onValueChange={(v) => update("foundationType", v)}
                />
                <InputField
                  label="Foundation Shape"
                  value={form.foundationShape}
                  onChange={(v) => update("foundationShape", v)}
                />
              </div>
            </div>
          </section>

          {/* Footer actions */}
          <div className="flex justify-start gap-3 items-center pt-4 border-t border-[#E5E7EB]">
            <button
              type="button"
              className="px-4 py-2 text-sm text-[#1F2937] border border-[#D1D5DB] rounded-md bg-white hover:bg-[#F3F4F6]"
            >
              Back
            </button>
            <button
              type="button"
              className={`px-5 py-2 text-sm font-medium rounded-md border transition-colors ${
                isSaved
                  ? "text-green-700 bg-white border-green-600 hover:bg-green-50"
                  : "text-white bg-[#2563EB] hover:bg-[#1D4ED8] border-transparent"
              }`}
              onClick={() => setIsSaved(true)}
            >
              {isSaved ? (
                <span className="inline-flex items-center gap-2">
                  <CircleCheck className="h-4 w-4" />
                  <span>Progress saved</span>
                </span>
              ) : (
                "Save progress"
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

type FieldProps = {
  label: string;
  value: string;
};

function Field({ label, value }: FieldProps) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_220px] items-center gap-x-4 pl-4">
      <div className="text-[11px] font-semibold text-[#111827]">
        {label}
      </div>
      <div className="border border-[#D1D5DB] bg-[#F9FAFB] px-2 py-1 text-right text-xs justify-self-end w-full">
        {value}
      </div>
    </div>
  );
}

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function InputField({ label, value, onChange }: InputFieldProps) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_220px] items-center gap-x-4 pl-4">
      <div className="text-[11px] font-semibold text-[#111827]">{label}</div>
      <div className="w-full">
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-full border-[#D1D5DB] bg-[#F9FAFB] px-2 py-1 text-right text-xs text-[#111827] rounded-none"
        />
      </div>
    </div>
  );
}

type SelectFieldProps = {
  label: string;
  value: string;
  options: string[];
  onValueChange: (value: string) => void;
};

function SelectField({
  label,
  value,
  options,
  onValueChange,
}: SelectFieldProps) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_220px] items-center gap-x-4 pl-4">
      <div className="text-[11px] font-semibold text-[#111827]">{label}</div>
      <div className="w-full">
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger className="h-8 w-full border-[#D1D5DB] bg-[#F9FAFB] text-xs text-[#111827] rounded-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-none">
            {options.map((opt) => (
              <SelectItem key={opt} value={opt} className="text-xs">
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
