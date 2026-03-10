"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AltaPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    use: "Multi Family",
    style: "Unknown",
    numberOfStories: "1 Story",
    foundationType: "Concrete Slab",
    exteriorWallFinish: "Brick Veneer",
    exteriorWallConstruction: "Wood Framing",
    roofCover: "Tile",
    garageCarport: "2 Car (397–576 sq ft)",
    styleGarage: "Attached / Built-In",
    floorCoverings: "Carpet; Tile - Ceramic",
    fireplaces: "None",
    kitchens: "Medium (11'x10')",
    bathrooms: "Half",
    fireAlarm: "No device",
    burglarAlarm: "No device",
    waterLeakProtection: "No device",
    fortifiedCert: "Not certified",
    stormShutters: "No",
    yearBuilt: "2000–2010",
    livableSqFt: "1,000–1,999 sq ft",
    plumbing: "Yes - PEX",
    solarPanels: "No",
    roofMaterials: "Composition - Architectural shingle",
    roofingStyle: "Gable",
    roofReplacementYear: "2011–Present",
    constructionRenovation: "No",
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

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
                <span className="text-[#1D4ED8] text-sm leading-none">✓</span>
                Customer info
              </span>
            </li>
            <li className="px-2 py-1 bg-[#E5F0FF] text-[#1D4ED8] font-medium">
              Home features
            </li>
            <li className="px-4 py-1 text-[#4B5563]">
              •{" "}
              <a href="/alta/est-replacement-cost" className="hover:underline">
                Est replacement cost
              </a>
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
        <div className="bg-[#e6eff8ff] border border-[#E2E8F0] p-6">
          <div className="max-w-4xl space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                Home features
              </p>
            </div>

            {/* Property Details */}
          <section className="space-y-3 text-[13px] text-[#374151]">
            <h2 className="text-sm font-semibold text-[#111827]">Property details</h2>
            <div className="space-y-2">
              <SelectField
                label="Use"
                value={form.use}
                options={["Single Family Detached", "Multi Family", "Condo/Townhouse"]}
                onValueChange={(v) => update("use", v)}
              />
              <SelectField
                label="Style"
                value={form.style}
                options={["Unknown", "Traditional", "Contemporary"]}
                onValueChange={(v) => update("style", v)}
              />
              <SelectField
                label="Number of Stories"
                value={form.numberOfStories}
                options={["1 Story", "2 Story", "3+ Story"]}
                onValueChange={(v) => update("numberOfStories", v)}
              />
              <SelectField
                label="Foundation Type"
                value={form.foundationType}
                options={["Concrete Slab", "Pier & Beam", "Crawl Space"]}
                onValueChange={(v) => update("foundationType", v)}
              />
              <SelectField
                label="Exterior Wall Finish"
                value={form.exteriorWallFinish}
                options={["Brick Veneer", "Stucco", "Vinyl Siding"]}
                onValueChange={(v) => update("exteriorWallFinish", v)}
              />
              <SelectField
                label="Exterior Wall Construction"
                value={form.exteriorWallConstruction}
                options={["Wood Framing", "Steel Framing", "Masonry Block"]}
                onValueChange={(v) => update("exteriorWallConstruction", v)}
              />
              <SelectField
                label="Roof Cover"
                value={form.roofCover}
                options={[
                  "Composition - Architectural Shingle",
                  "Metal",
                  "Tile",
                ]}
                onValueChange={(v) => update("roofCover", v)}
              />
              <SelectField
                label="Garage/Carport"
                value={form.garageCarport}
                options={[
                  "2 Car (397–576 sq ft)",
                  "1 Car (200–396 sq ft)",
                  "3 Car (577–800 sq ft)",
                ]}
                onValueChange={(v) => update("garageCarport", v)}
              />
              <SelectField
                label="Style (Garage)"
                value={form.styleGarage}
                options={["Attached / Built-In", "Detached", "Carport"]}
                onValueChange={(v) => update("styleGarage", v)}
              />
              <SelectField
                label="Floor Coverings"
                value={form.floorCoverings}
                options={["Carpet; Tile - Ceramic", "Hardwood", "Luxury Vinyl Plank"]}
                onValueChange={(v) => update("floorCoverings", v)}
              />
              <SelectField
                label="Fireplaces"
                value={form.fireplaces}
                options={["None", "1 Fireplace", "2 Fireplaces"]}
                onValueChange={(v) => update("fireplaces", v)}
              />
              <SelectField
                label="Kitchen(s)"
                value={form.kitchens}
                options={["Medium (11'x10')", "Small (8'x8')", "Large (14'x12')"]}
                onValueChange={(v) => update("kitchens", v)}
              />
              <SelectField
                label="Bathroom(s)"
                value={form.bathrooms}
                options={["Half", "Full", "Full + Half"]}
                onValueChange={(v) => update("bathrooms", v)}
              />
            </div>
          </section>

          <hr className="border-[#E5E7EB]" />

          {/* Safety features */}
          <section className="space-y-3 text-[13px] text-[#374151]">
            <h2 className="text-sm font-semibold text-[#111827]">
              Safety features
            </h2>
            <div className="space-y-2">
              <SelectField
                label="Fire alarm"
                value={form.fireAlarm}
                options={["No device", "Local alarm only", "Monitored system"]}
                onValueChange={(v) => update("fireAlarm", v)}
              />
              <SelectField
                label="Burglar alarm"
                value={form.burglarAlarm}
                options={["No device", "Local alarm only", "Monitored system"]}
                onValueChange={(v) => update("burglarAlarm", v)}
              />
              <SelectField
                label="Water leak protection device"
                value={form.waterLeakProtection}
                options={["No device", "Passive sensor only", "Auto shut-off system"]}
                onValueChange={(v) => update("waterLeakProtection", v)}
              />
              <SelectField
                label="FORTIFIED Home certification"
                value={form.fortifiedCert}
                options={["Not certified", "FORTIFIED Roof", "FORTIFIED Silver", "FORTIFIED Gold"]}
                onValueChange={(v) => update("fortifiedCert", v)}
              />
              <SelectField
                label="Permanent storm shutters"
                value={form.stormShutters}
                options={["No", "Partial (some windows)", "Full coverage"]}
                onValueChange={(v) => update("stormShutters", v)}
              />
            </div>
          </section>

          <hr className="border-[#E5E7EB]" />

          {/* Home details */}
          <section className="space-y-3 text-[13px] text-[#374151]">
            <h2 className="text-sm font-semibold text-[#111827]">
              Home details
            </h2>
            <div className="space-y-2">
              <SelectField
                label="What year was the home built?"
                value={form.yearBuilt}
                options={["Pre-1980", "1980–1999", "2000–2010", "2011–Present"]}
                onValueChange={(v) => update("yearBuilt", v)}
              />
              <SelectField
                label="What is the livable square feet of the home?"
                value={form.livableSqFt}
                options={[
                  "Under 1,000 sq ft",
                  "1,000–1,999 sq ft",
                  "2,000–3,000 sq ft",
                  "3,001+ sq ft",
                ]}
                onValueChange={(v) => update("livableSqFt", v)}
              />
              <SelectField
                label="Is all the plumbing PVC, PEX or copper in the home?"
                value={form.plumbing}
                options={["Yes - PVC", "Yes - PEX", "Yes - Copper", "Mixed/Unknown"]}
                onValueChange={(v) => update("plumbing", v)}
              />
              <SelectField
                label="Are there solar panels present?"
                value={form.solarPanels}
                options={["No", "Yes - Owned", "Yes - Leased"]}
                onValueChange={(v) => update("solarPanels", v)}
              />
            </div>
          </section>

          <hr className="border-[#E5E7EB]" />

          {/* Roofing */}
          <section className="space-y-3 text-[13px] text-[#374151]">
            <h2 className="text-sm font-semibold text-[#111827]">
              Roofing
            </h2>
            <div className="space-y-2">
              <SelectField
                label="Roof materials"
                value={form.roofMaterials}
                options={[
                  "Composition - Architectural shingle",
                  "Metal",
                  "Tile",
                ]}
                onValueChange={(v) => update("roofMaterials", v)}
              />
              <SelectField
                label="Roofing style"
                value={form.roofingStyle}
                options={["Hip", "Gable", "Flat"]}
                onValueChange={(v) => update("roofingStyle", v)}
              />
              <SelectField
                label="When was the roof fully replaced most recently?"
                note="Replacement year"
                value={form.roofReplacementYear}
                options={["Pre-2000", "2000–2010", "2011–Present"]}
                onValueChange={(v) => update("roofReplacementYear", v)}
              />
            </div>
          </section>

          <hr className="border-[#E5E7EB]" />

          {/* Unusual risks */}
          <section className="space-y-3 text-[13px] text-[#374151]">
            <h2 className="text-sm font-semibold text-[#111827]">
              Unusual risks
            </h2>
            <div className="space-y-2">
              <SelectField
                label="Is the property under construction or major renovation?"
                value={form.constructionRenovation}
                options={[
                  "No",
                  "Minor renovation",
                  "Major renovation",
                  "New construction",
                ]}
                onValueChange={(v) => update("constructionRenovation", v)}
              />
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
                className="px-5 py-2 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-md"
                onClick={() => router.push("/alta/est-replacement-cost")}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

type SelectFieldProps = {
  label: string;
  value: string;
  options: string[];
  onValueChange: (value: string) => void;
  note?: string;
};

function SelectField({
  label,
  value,
  options,
  onValueChange,
  note,
}: SelectFieldProps) {
  return (
    <div className="space-y-1 pl-4">
      <div className="grid grid-cols-[minmax(0,260px)_200px] items-center gap-x-3">
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
      {note && (
        <div className="grid grid-cols-[minmax(0,260px)_200px] items-center gap-x-3 mt-0.5">
          <div className="text-[11px] font-semibold text-[#111827]">{note}</div>
          <div className="w-full text-xs text-[#374151] border border-[#D1D5DB] bg-[#F9FAFB] px-2 py-1.5 rounded-none">
            {value}
          </div>
        </div>
      )}
    </div>
  );
}
