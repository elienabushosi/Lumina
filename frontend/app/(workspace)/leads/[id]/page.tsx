"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Phone, Mail, Calendar, MapPin, FileText, Tag, DollarSign, Home, Layers, ChevronDown, ChevronUp, Sparkles } from "lucide-react";

const detailData: Record<string, {
  name: string;
  location: string;
  type: string;
  status: string;
  source: string;
  phone: string;
  email: string;
  dob: string;
  notes: string;
  property: {
    type: string;
    yearBuilt: string;
    livingArea: string;
    totalBuilding: string;
    garage: string;
    porch: string;
    county: string;
    apn: string;
    lastSale: string;
    estimatedValue: string;
    propertyTax: string;
    foundation: string;
    roofType: string;
    roofStyle: string;
    pool: string;
    bedrooms: string;
    bathrooms: string;
    floorFinishes: string;
  };
  priorCarrier: string;
  currentPremium: string;
  agentName: string;
  agentCompany: string;
}> = {
  "1": {
    name: "Dak Prescott",
    location: "9808 Coolidge Dr, McKinney, TX 75072",
    type: "Texas",
    status: "New",
    source: "Referral",
    phone: "(214) 555-0182",
    email: "dak.prescott@email.com",
    dob: "July 29, 1993",
    priorCarrier: "Farmers Insurance",
    currentPremium: "$3,800/yr",
    agentName: "Linda",
    agentCompany: "Taylor Appleseed Farmers Insurance",
    notes: "Referred by agent Mike T. Looking to bundle home + auto. Interested in umbrella policy. Prefers communication via email. Best time to reach: weekday mornings.",
    property: {
      type: "Single-family home",
      yearBuilt: "2003",
      livingArea: "1,914 sq ft",
      totalBuilding: "2,379 sq ft",
      garage: "465 sq ft (attached)",
      porch: "44 sq ft (covered)",
      county: "Collin County",
      apn: "R-8113-00D-0190-1",
      lastSale: "$133,700 on 8/13/2003",
      estimatedValue: "$355,921",
      propertyTax: "Increased ~94% (up $3,510) in 2024",
      foundation: "Slab-on-grade",
      roofType: "Architectural asphalt shingle",
      roofStyle: "Hip roof",
      pool: "None",
      bedrooms: "4",
      bathrooms: "2.5",
      floorFinishes: "Hardwood (main), carpet (bedrooms), tile (bathrooms)",
    },
  },
  "3": {
    name: "Aaron Judge",
    location: "9808 Coolidge Dr, McKinney, TX 75072",
    type: "NewYork",
    status: "New",
    source: "Call-In",
    phone: "(212) 555-0347",
    email: "aaron.judge@email.com",
    dob: "April 26, 1992",
    priorCarrier: "Allstate",
    currentPremium: "$4,200/yr",
    agentName: "Linda",
    agentCompany: "Taylor Appleseed Farmers Insurance",
    notes: "Called in directly. Wants comprehensive coverage with a low deductible. Asked about flood and liability riders. Follow up by end of week.",
    property: {
      type: "Single-family home",
      yearBuilt: "2003",
      livingArea: "1,914 sq ft",
      totalBuilding: "2,379 sq ft",
      garage: "465 sq ft (attached)",
      porch: "44 sq ft (covered)",
      county: "Collin County",
      apn: "R-8113-00D-0190-1",
      lastSale: "$133,700 on 8/13/2003",
      estimatedValue: "$355,921",
      propertyTax: "Increased ~94% (up $3,510) in 2024",
      foundation: "Slab-on-grade",
      roofType: "Architectural asphalt shingle",
      roofStyle: "Hip roof",
      pool: "None",
      bedrooms: "4",
      bathrooms: "2.5",
      floorFinishes: "Hardwood (main), carpet (bedrooms), tile (bathrooms)",
    },
  },
};

const typeBadge: Record<string, string> = {
  Texas:   "bg-blue-50 text-blue-600 border border-blue-200",
  NewYork: "bg-gray-50 text-gray-600 border border-gray-200",
};

const typeLabel: Record<string, string> = {
  Texas:   "Texas",
  NewYork: "New York",
};

export default function LeadDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [convoOpen, setConvoOpen] = useState(true);
  const lead = detailData[id];

  if (!lead) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Lead not found.</p>
        <Link href="/leads" className="text-sm text-[#37322F] underline mt-2 inline-block">Back to Leads</Link>
      </div>
    );
  }

  const p = lead.property;

  return (
    <div className="p-6">
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-section {
          opacity: 0;
          animation: fadeSlideIn 0.8s ease forwards;
        }
      `}</style>

      {/* Back */}
      <Link
        href="/leads"
        className="animate-section inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#37322F] mb-6"
        style={{ animationDelay: "0ms" }}
      >
        <ArrowLeft className="size-4" />
        Back to Leads
      </Link>

      {/* Header */}
      <div
        className="animate-section flex items-center justify-between mb-6"
        style={{ animationDelay: "100ms" }}
      >
        <h2 className="text-2xl font-semibold text-[#37322F]">{lead.name}</h2>
        <div className="flex flex-col items-end gap-1.5">
          <style>{`
            @keyframes glare {
              0% { transform: translateX(-100%) skewX(-20deg); }
              100% { transform: translateX(250%) skewX(-20deg); }
            }
            .btn-glare::after {
              content: '';
              position: absolute;
              top: 0; left: 0;
              width: 40%;
              height: 100%;
              background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
              animation: glare 2.5s ease-in-out infinite;
            }
          `}</style>
          <Link href="/research-browser-run" className="btn-glare relative overflow-hidden inline-flex items-center gap-2 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: "#6c70ba" }}>
            <Sparkles className="size-4" />
            Fill APEX Proposal Using AI
          </Link>
          <div className="flex flex-col items-end gap-1">
            <p className="text-xs text-gray-400">Forms we'll fill:</p>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(55,50,47,0.12)] bg-[#F9FAFB] pl-1.5 pr-3 py-1.5 text-xs font-medium text-[#37322F]">
                <img src="/alta%20logo.png" alt="Alta" className="h-5 w-auto object-contain" />
                Alta
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(55,50,47,0.12)] bg-[#F9FAFB] pl-1.5 pr-3 py-1.5 text-xs font-medium text-[#37322F]">
                <img src="/verisk-removebg.png" alt="360Value" className="h-5 w-auto object-contain" />
                360
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">

        {/* AI Confirmation Conversation */}
        <section className="animate-section bg-white border border-gray-200 rounded-xl p-5" style={{ animationDelay: "200ms" }}>
          <button
            onClick={() => setConvoOpen(!convoOpen)}
            className="flex items-center justify-between w-full mb-4 group"
          >
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">AI Lead Qualification Chat</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">Verified</span>
              <span className="inline-flex items-center gap-1 text-xs text-purple-600 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
                <Sparkles className="size-3" />
                Ready to start a proposal
              </span>
              {convoOpen ? <ChevronUp className="size-4 text-gray-400" /> : <ChevronDown className="size-4 text-gray-400" />}
            </div>
          </button>
          {convoOpen && (<div className="flex flex-col gap-3">

            {/* AI opens */}
            <div className="flex gap-3">
              <div className="flex flex-col items-center gap-1 shrink-0 mt-0.5">
                <img src="/professional-woman-avatar-with-short-brown-hair-an.jpg" alt="Linda" className="w-7 h-7 rounded-full object-cover" />
                <span className="text-[9px] text-gray-400 text-center leading-tight w-16">Linda</span>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-[#37322F] max-w-xl">
                Hi {lead.name.split(" ")[0]}, this is {lead.agentName} from {lead.agentCompany}. I'm a support team member reaching out to quickly verify a few details about your property before we prepare your home insurance proposal. Does <strong>9808 Coolidge Dr, McKinney, TX 75072</strong> match your current home address?
              </div>
            </div>

            {/* Dak replies */}
            <div className="flex gap-3 justify-end">
              <div className="bg-[#37322F] rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm text-white max-w-xl">
                Yes, that's my address.
              </div>
              <div className="flex flex-col items-center gap-1 shrink-0 mt-0.5">
                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-700 text-xs font-bold">{lead.name.split(" ")[0][0]}{lead.name.split(" ")[1][0]}</span>
                </div>
                <span className="text-[9px] text-gray-400 text-center leading-tight w-16">{lead.name}</span>
              </div>
            </div>

            {/* AI follows up */}
            <div className="flex gap-3">
              <div className="flex flex-col items-center gap-1 shrink-0 mt-0.5">
                <img src="/professional-woman-avatar-with-short-brown-hair-an.jpg" alt="Linda" className="w-7 h-7 rounded-full object-cover" />
                <span className="text-[9px] text-gray-400 text-center leading-tight w-16">Linda</span>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-[#37322F] max-w-xl">
                Perfect. Our records show it's a single-family home built in 2003, roughly 1,914 sq ft, with an attached garage and a hip-style shingle roof. Does that sound right to you?
              </div>
            </div>

            {/* Dak replies */}
            <div className="flex gap-3 justify-end">
              <div className="bg-[#37322F] rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm text-white max-w-xl">
                That all sounds right, yeah.
              </div>
              <div className="flex flex-col items-center gap-1 shrink-0 mt-0.5">
                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-700 text-xs font-bold">{lead.name.split(" ")[0][0]}{lead.name.split(" ")[1][0]}</span>
                </div>
                <span className="text-[9px] text-gray-400 text-center leading-tight w-16">{lead.name}</span>
              </div>
            </div>

            {/* AI wraps up */}
            <div className="flex gap-3">
              <div className="flex flex-col items-center gap-1 shrink-0 mt-0.5">
                <img src="/professional-woman-avatar-with-short-brown-hair-an.jpg" alt="Linda" className="w-7 h-7 rounded-full object-cover" />
                <span className="text-[9px] text-gray-400 text-center leading-tight w-16">Linda</span>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-[#37322F] max-w-xl">
                Great, thank you {lead.name.split(" ")[0]}. One last thing — we see you were previously covered by Farmers Insurance. Are you currently still with them or have you had a lapse in coverage?
              </div>
            </div>

            {/* Dak replies */}
            <div className="flex gap-3 justify-end">
              <div className="bg-[#37322F] rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm text-white max-w-xl">
                Still with them, but looking to switch. The rate went up a lot this year.
              </div>
              <div className="flex flex-col items-center gap-1 shrink-0 mt-0.5">
                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-700 text-xs font-bold">{lead.name.split(" ")[0][0]}{lead.name.split(" ")[1][0]}</span>
                </div>
                <span className="text-[9px] text-gray-400 text-center leading-tight w-16">{lead.name}</span>
              </div>
            </div>

            {/* AI closes */}
            <div className="flex gap-3">
              <div className="flex flex-col items-center gap-1 shrink-0 mt-0.5">
                <img src="/professional-woman-avatar-with-short-brown-hair-an.jpg" alt="Linda" className="w-7 h-7 rounded-full object-cover" />
                <span className="text-[9px] text-gray-400 text-center leading-tight w-16">Linda</span>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-[#37322F] max-w-xl">
                Understood. I've noted no lapse in coverage and flagged the rate increase for your agent. Everything is verified — you're all set. A Farmers agent will follow up with a personalized proposal shortly. Have a great day!
              </div>
            </div>

          </div>)}
        </section>

        {/* Property Images — full width */}
        <section className="animate-section bg-white border border-gray-200 rounded-xl overflow-hidden" style={{ animationDelay: "320ms" }}>
          <div className="px-5 pt-5 pb-3 flex items-center justify-between">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Property Images</h3>
            <div className="flex items-center gap-3">
              <img src="/logos/Google-Maps-Logo.jpg" alt="Google Maps" className="h-4 object-contain" />
              <img src="/logos/Zillow-Logo.png" alt="Zillow" className="h-4 object-contain" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 px-5 pb-5">
            <div className="flex flex-col gap-1">
              <img
                src="/9808CoolidgeGoogleMapsGrounds.png"
                alt="Street view of 9808 Coolidge Dr"
                className="w-full h-44 object-cover rounded-lg border border-gray-100"
              />
              <p className="text-xs text-gray-400 text-center">Street view</p>
            </div>
            <div className="flex flex-col gap-1">
              <img
                src="/9808CoolidgeGooglemapsBirds.png"
                alt="Bird's eye view of 9808 Coolidge Dr"
                className="w-full h-44 object-cover rounded-lg border border-gray-100"
              />
              <p className="text-xs text-gray-400 text-center">Bird's eye view</p>
            </div>
            <div className="flex flex-col gap-1">
              <img
                src="/Livingroom.jpg"
                alt="Living room interior"
                className="w-full h-44 object-cover rounded-lg border border-gray-100"
              />
              <p className="text-xs text-gray-400 text-center">Living room (Zillow)</p>
            </div>
            <div className="flex flex-col gap-1">
              <img
                src="/Bathroom.jpg"
                alt="Bathroom interior"
                className="w-full h-44 object-cover rounded-lg border border-gray-100"
              />
              <p className="text-xs text-gray-400 text-center">Bathroom (Zillow)</p>
            </div>
          </div>
        </section>

        {/* Two-column grid for remaining sections */}
        <div className="animate-section grid grid-cols-2 gap-6" style={{ animationDelay: "440ms" }}>

          {/* Property Details */}
          <section className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Property Details</h3>
              <div className="flex items-center gap-2">
                <img src="/logos/collin-cad-logo.png" alt="Collin CAD" className="h-5 object-contain" />
                <span className="text-xs text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                  Pulled automatically from CAD
                </span>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm text-[#37322F] mb-4">
              <MapPin className="size-4 text-gray-400 shrink-0 mt-0.5" />
              <span className="font-medium">{lead.location}</span>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              {[
                { label: "Type",           value: p.type,          aiDetected: false },
                { label: "Year built",     value: p.yearBuilt,     aiDetected: false },
                { label: "Bedrooms",       value: p.bedrooms,      aiDetected: false },
                { label: "Bathrooms",      value: p.bathrooms,     aiDetected: false },
                { label: "Living area",    value: p.livingArea,    aiDetected: false },
                { label: "Total building", value: p.totalBuilding, aiDetected: false },
                { label: "Floor finishes", value: p.floorFinishes, aiDetected: false },
                { label: "Garage",         value: p.garage,        aiDetected: false },
                { label: "Covered porch",  value: p.porch,         aiDetected: false },
                { label: "Foundation",     value: p.foundation,    aiDetected: true },
                { label: "Roof type",      value: p.roofType,      aiDetected: true },
                { label: "Roof style",     value: p.roofStyle,     aiDetected: true },
                { label: "Pool",           value: p.pool,          aiDetected: true },
                { label: "County",         value: p.county,        aiDetected: false },
                { label: "APN",            value: p.apn,           aiDetected: false },
              ].map(({ label, value, aiDetected }) => (
                <div key={label} className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-400">{label}</span>
                  <div className="flex items-center gap-2">
                    {aiDetected && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-purple-600 bg-purple-50 border border-purple-200 px-1.5 py-0.5 rounded-full">
                        <Sparkles className="size-2.5" />
                        AI detected
                      </span>
                    )}
                    <span className="font-medium text-[#37322F] text-right">{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Right column — stacked smaller sections */}
          <div className="flex flex-col gap-6">

            {/* Valuation */}
            <section className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Valuation & Tax</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-sm text-[#37322F]">
                  <DollarSign className="size-4 text-gray-400 shrink-0" />
                  <span className="text-gray-400">Estimated value:</span>
                  <span className="font-semibold">{p.estimatedValue}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#37322F]">
                  <FileText className="size-4 text-gray-400 shrink-0" />
                  <span className="text-gray-400">Last sale:</span>
                  <span className="font-medium">{p.lastSale}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#37322F]">
                  <Layers className="size-4 text-gray-400 shrink-0" />
                  <span className="text-gray-400">Property tax:</span>
                  <span className="font-medium">{p.propertyTax}</span>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Contact Information</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-sm text-[#37322F]">
                  <Phone className="size-4 text-gray-400 shrink-0" />
                  {lead.phone}
                </div>
                <div className="flex items-center gap-3 text-sm text-[#37322F]">
                  <Mail className="size-4 text-gray-400 shrink-0" />
                  {lead.email}
                </div>
                <div className="flex items-center gap-3 text-sm text-[#37322F]">
                  <Calendar className="size-4 text-gray-400 shrink-0" />
                  DOB: {lead.dob}
                </div>
              </div>
            </section>

            {/* Prior Coverage */}
            <section className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Prior Coverage</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-sm text-[#37322F]">
                  <Tag className="size-4 text-gray-400 shrink-0" />
                  {lead.priorCarrier}
                </div>
                <div className="flex items-center gap-3 text-sm text-[#37322F]">
                  <DollarSign className="size-4 text-gray-400 shrink-0" />
                  Current premium: {lead.currentPremium}
                </div>
              </div>
            </section>

            {/* Notes */}
            <section className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Notes</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{lead.notes}</p>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
}
