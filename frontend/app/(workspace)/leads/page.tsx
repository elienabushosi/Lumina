"use client";

import Link from "next/link";
import { Phone, MessageSquare, Sparkles, CheckCircle } from "lucide-react";

const leads = [
  // New (14)
  { id: 1,  name: "Dak Prescott",     location: "4821 Lakeside Dr, Dallas, TX 75205",         status: "New", type: "Texas",   source: "Referral" },
  { id: 3,  name: "Aaron Judge",      location: "415 E 80th St, New York, NY 10075",           status: "New", type: "NewYork", source: "Call-In" },
  { id: 2,  name: "CeeDee Lamb",      location: "2304 Turtle Creek Blvd, Dallas, TX 75219",    status: "New", type: "Texas",   source: "EverQuote" },
  { id: 17, name: "Luis Gil",         location: "280 Riverside Dr, New York, NY 10025",        status: "New", type: "NewYork", source: "Call-In" },
  { id: 18, name: "Zack Martin",      location: "1842 Oak Lawn Ave, Dallas, TX 75207",         status: "New", type: "Texas",   source: "Referral" },
  { id: 4,  name: "Gerrit Cole",      location: "210 Riverside Dr, New York, NY 10025",        status: "New", type: "NewYork", source: "EverQuote" },
  { id: 19, name: "Rico Dowdle",      location: "6200 Gaston Ave, Dallas, TX 75214",           status: "New", type: "Texas",   source: "EverQuote" },
  { id: 20, name: "Carlos Rodon",     location: "505 W 37th St, New York, NY 10018",           status: "New", type: "NewYork", source: "Referral" },
  { id: 21, name: "Nico Collins",     location: "4521 Montrose Blvd, Houston, TX 77006",       status: "New", type: "Texas",   source: "Call-In" },
  { id: 22, name: "Cody Bellinger",   location: "350 W 42nd St, New York, NY 10036",           status: "New", type: "NewYork", source: "EverQuote" },
  { id: 23, name: "Tyler Smith",      location: "3901 Lemmon Ave, Dallas, TX 75219",           status: "New", type: "Texas",   source: "Referral" },
  { id: 24, name: "Ben Rice",         location: "175 W 93rd St, New York, NY 10025",           status: "New", type: "NewYork", source: "Call-In" },
  { id: 25, name: "Joe Mixon",        location: "2800 Bagby St, Houston, TX 77006",            status: "New", type: "Texas",   source: "EverQuote" },
  { id: 26, name: "Paul Goldschmidt", location: "225 E 63rd St, New York, NY 10065",           status: "New", type: "NewYork", source: "Referral" },
  // Contacted (9)
  { id: 7,  name: "Juan Soto",        location: "530 W 236th St, Bronx, NY 10463",             status: "Contacted", type: "NewYork", contactMethod: "text" },
  { id: 5,  name: "Micah Parsons",    location: "7103 Preston Rd, Dallas, TX 75225",           status: "Contacted", type: "Texas",   contactMethod: "phone" },
  { id: 27, name: "Nestor Cortes",    location: "440 W 163rd St, New York, NY 10032",          status: "Contacted", type: "NewYork", contactMethod: "text" },
  { id: 6,  name: "C.J. Stroud",      location: "3200 Kirby Dr, Houston, TX 77098",            status: "Contacted", type: "Texas",   contactMethod: "text" },
  { id: 8,  name: "Anthony Volpe",    location: "355 E 72nd St, New York, NY 10021",           status: "Contacted", type: "NewYork", contactMethod: "phone" },
  { id: 28, name: "Jake Ferguson",    location: "9800 Harry Hines Blvd, Dallas, TX 75220",     status: "Contacted", type: "Texas",   contactMethod: "phone" },
  { id: 29, name: "Marcus Stroman",   location: "315 E 86th St, New York, NY 10028",           status: "Contacted", type: "NewYork", contactMethod: "text" },
  { id: 30, name: "DeMarcus Lawrence",location: "4400 Live Oak St, Dallas, TX 75204",          status: "Contacted", type: "Texas",   contactMethod: "phone" },
  { id: 31, name: "Laremy Tunsil",    location: "3100 Smith St, Houston, TX 77006",            status: "Contacted", type: "Texas",   contactMethod: "text" },
  // Quoted (5)
  { id: 11, name: "Gleyber Torres",   location: "188 W 230th St, Bronx, NY 10463",             status: "Quoted", type: "NewYork", quote: "$8,100" },
  { id: 9,  name: "Stefon Diggs",     location: "5110 Kelvin Dr, Houston, TX 77005",           status: "Quoted", type: "Texas",   quote: "$4,200" },
  { id: 12, name: "Jazz Chisholm Jr.",location: "720 Fort Washington Ave, New York, NY 10040", status: "Quoted", type: "NewYork", quote: "$3,500" },
  { id: 10, name: "Will Anderson Jr.",location: "1801 Main St, Houston, TX 77002",             status: "Quoted", type: "Texas",   quote: "$6,750" },
  { id: 32, name: "Dalton Schultz",   location: "1900 Bagby St, Houston, TX 77002",            status: "Quoted", type: "Texas",   quote: "$5,300" },
  // Closed (4)
  { id: 15, name: "Clarke Schmidt",   location: "301 E 79th St, New York, NY 10075",           status: "Closed", type: "NewYork", policy: "POL-2024-83741" },
  { id: 13, name: "Trevon Diggs",     location: "5530 Swiss Ave, Dallas, TX 75214",            status: "Closed", type: "Texas",   policy: "POL-2024-61209" },
  { id: 16, name: "DJ LeMahieu",      location: "425 W 50th St, New York, NY 10019",           status: "Closed", type: "NewYork", policy: "POL-2025-49382" },
  { id: 14, name: "Tank Dell",        location: "2410 Westheimer Rd, Houston, TX 77098",       status: "Closed", type: "Texas",   policy: "POL-2025-77514" },
];

const columns = [
  { key: "New",       label: "New",                color: "bg-gray-100 text-gray-500 border-gray-200" },
  { key: "Contacted", label: "Contacted with AI", color: "bg-gray-100 text-gray-500 border-gray-200" },
  { key: "Quoted",    label: "Proposal with AI",    color: "bg-gray-100 text-gray-500 border-gray-200" },
  { key: "Closed",    label: "Closed",            color: "bg-gray-100 text-gray-500 border-gray-200" },
];

const typeBadge: Record<string, string> = {
  Texas:   "bg-blue-50 text-blue-600 border border-blue-200",
  NewYork: "bg-gray-50 text-gray-600 border border-gray-200",
};

const typeLabel: Record<string, string> = {
  Texas:   "Texas",
  NewYork: "New York",
};

const DEMO_IDS = [1, 3];

export default function LeadsPage() {
  return (
    <div className="p-6">
      <div className="animate-section mb-6" style={{ animationDelay: "0ms" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <h2 className="text-xl font-semibold text-[#37322F]">Leads</h2>
            <p className="text-xs text-gray-400"><span className="font-medium text-gray-500">How it works:</span> Automatically pulled in from AgencyZoom.</p>
          </div>
          <img src="/AgencyZoom-removebg-preview.png" alt="AgencyZoom" className="h-7 object-contain" />
        </div>
        <p className="text-sm text-gray-500 mt-1">{leads.length} total leads</p>
      </div>

      {/* Insurance tabs */}
      <div className="animate-section flex gap-1 border-b border-gray-200 mb-6" style={{ animationDelay: "100ms" }}>
        <div className="px-4 py-2 text-sm font-medium text-[#37322F] border-b-2 border-[#37322F] cursor-pointer">
          Home
        </div>
        <div className="px-4 py-2 text-sm font-medium text-gray-400 cursor-pointer hover:text-gray-600">
          Auto
        </div>
        <div className="px-4 py-2 text-sm font-medium text-gray-400 cursor-pointer hover:text-gray-600">
          Life
        </div>
      </div>

      <style>{`
        @keyframes demo-glow {
          0%, 100% { box-shadow: 0 0 8px 2px rgba(139, 92, 246, 0.4); }
          50% { box-shadow: 0 0 18px 6px rgba(139, 92, 246, 0.75); }
        }
        .demo-glow { animation: demo-glow 2s ease-in-out infinite; }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-section {
          opacity: 0;
          animation: fadeSlideIn 0.8s ease forwards;
        }
      `}</style>

      <div className="grid grid-cols-4 gap-4">
        {columns.map((col, colIdx) => {
          const colLeads = leads.filter((l) => l.status === col.key);
          return (
            <div key={col.key} className="animate-section flex flex-col gap-3" style={{ animationDelay: `${200 + colIdx * 100}ms` }}>
              <div className={`flex items-center justify-between px-3 py-2 rounded-lg border ${col.color}`}>
                <span className="font-semibold text-sm">{col.label}</span>
                <span className="text-xs font-medium rounded-full bg-white/60 px-2 py-0.5">
                  {colLeads.length}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {colLeads.map((lead) => {
                  const hasDetail = DEMO_IDS.includes(lead.id);
                  const card = (
                    <div className={`bg-white rounded-lg border p-3 shadow-sm transition-all ${hasDetail ? "hover:shadow-md hover:border-[#37322F] cursor-pointer border-purple-300 demo-glow" : "cursor-default border-gray-200"}`}>
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-[#37322F] leading-tight">{lead.name}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${typeBadge[lead.type]}`}>
                          {typeLabel[lead.type]}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{lead.location}</p>
                      {"policy" in lead && (
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-gray-400">Policy:</span>
                          <span className="text-xs font-medium text-gray-600">{(lead as any).policy}</span>
                        </div>
                      )}
                      {"source" in lead && (
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-orange-50 text-orange-600 border border-orange-200">
                            {(lead as any).source}
                          </span>
                        </div>
                      )}
                      {DEMO_IDS.includes(lead.id) && (
                        <div className="inline-flex items-center gap-1 mt-1 text-[10px] text-purple-600 bg-purple-50 border border-purple-200 px-1.5 py-0.5 rounded-full">
                          <CheckCircle className="size-2.5" />
                          Property research ready
                        </div>
                      )}
                      {"contactMethod" in lead && (
                        <div className="flex items-center gap-1 mt-1">
                          {(lead as any).contactMethod === "phone" ? (
                            <Phone className="size-3 text-blue-500" />
                          ) : (
                            <MessageSquare className="size-3 text-green-500" />
                          )}
                          <span className="text-xs text-gray-400 capitalize">{(lead as any).contactMethod}</span>
                        </div>
                      )}
                      {"quote" in lead && (
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs font-semibold text-purple-600">{(lead as any).quote}</p>
                          <span className="inline-flex items-center gap-1 text-[10px] text-purple-600 bg-purple-50 border border-purple-200 px-1.5 py-0.5 rounded-full">
                            <Sparkles className="size-2.5" />
                            Proposal with AI
                          </span>
                        </div>
                      )}
                    </div>
                  );

                  return hasDetail ? (
                    <Link key={lead.id} href={`/leads/${lead.id}`}>{card}</Link>
                  ) : (
                    <div key={lead.id}>{card}</div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
