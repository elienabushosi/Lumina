export default function AltaEstReplacementCostPage() {
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
          {/* Header value */}
          <div className="flex flex-col gap-1">
            <p className="text-base md:text-lg font-semibold uppercase tracking-wide text-[#111827]">
              Est. home replacement cost
            </p>
            <div className="flex items-baseline gap-3 mt-1">
              <p className="text-3xl md:text-4xl font-semibold text-[#111827]">
                $453,000
              </p>
              <span className="text-xs text-[#6B7280]">
                Based on 360Value and other information provided
              </span>
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
                <Field label="Stories above ground" value="1 story" />
                <Field label="Garage style" value="Attached / Built-in" />
                <Field label="Garage capacity" value="2 Car (397 - 576 sq. ft.)" />
                <Field label="Bathroom types" value="Full Bath, 1/2 Bath" />
                <Field label="Number of full baths" value="2" />
                <Field label="Number of 1/2 baths" value="1" />
                <Field label="Flooring types" value="Carpet, Tile, Ceramic" />
                <Field label="Percent Carpet" value="50" />
                <Field label="Percent Tile - Ceramic" value="50" />
                <Field label="Fireplaces" value="None" />
              </div>

              {/* Right stack – matches right side of screenshot */}
              <div className="space-y-3">
                <Field label="Exterior wall finish" value="Veneer - Brick" />
                <Field label="Exterior wall construction" value="Wood framing" />
                <Field label="Heating systems" value="Forced Air" />
                <Field label="Primary system" value="Forced Air" />
                <Field label="Number of Forced Air" value="1" />
                <Field label="Cooling systems" value="Central AC" />
                <Field label="Number of Central AC" value="1" />
                <Field label="Overall quality grade" value="Above Average" />
                <Field label="Foundation type" value="Concrete slab" />
                <Field label="Foundation Shape" value="6-7 Corners - L Shape" />
              </div>
            </div>
          </section>

          {/* Footer actions */}
          <div className="flex justify-start gap-3 items-center pt-4 border-t border-[#E5E7EB]">
            <button className="px-4 py-2 text-sm text-[#1F2937] border border-[#D1D5DB] rounded-md bg-white hover:bg-[#F3F4F6]">
              Back
            </button>
            <button className="px-5 py-2 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-md">
              Continue
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

