"use client";

import { useRouter } from "next/navigation";
import { Phone, PhoneIncoming, PhoneMissed, PhoneOutgoing, Clock } from "lucide-react";

const DEMO_IDS = [1, 17];

type CallStatus = "Completed" | "Missed" | "Voicemail" | "In Progress";
type CallDirection = "Inbound" | "Outbound";

const calls: {
  id: number;
  name: string;
  phone: string;
  type: "Texas" | "NewYork";
  direction: CallDirection;
  status: CallStatus;
  duration: string;
  time: string;
  topic: string;
}[] = [
  { id: 17, name: "Breanna Stewart",     phone: "(212) 555-0154", type: "NewYork", direction: "Inbound",  status: "Completed",   duration: "6:44", time: "Today, 9:08 AM",   topic: "Home insurance quote" },
  { id: 1,  name: "Trinity Rodman",      phone: "(214) 555-0182", type: "Texas",   direction: "Inbound",  status: "Completed",   duration: "4:32", time: "Today, 9:14 AM",   topic: "Home insurance quote" },
  { id: 18, name: "Sabrina Ionescu",     phone: "(718) 555-0267", type: "NewYork", direction: "Outbound", status: "Completed",   duration: "4:55", time: "Today, 9:35 AM",   topic: "Renters to home upgrade" },
  { id: 2,  name: "Sophia Smith",        phone: "(972) 555-0247", type: "Texas",   direction: "Outbound", status: "Completed",   duration: "6:18", time: "Today, 9:41 AM",   topic: "Policy renewal" },
  { id: 19, name: "Jonquel Jones",       phone: "(646) 555-0381", type: "NewYork", direction: "Inbound",  status: "Missed",      duration: "—",    time: "Today, 10:02 AM",  topic: "EverQuote lead" },
  { id: 3,  name: "Alex Morgan",         phone: "(469) 555-0391", type: "Texas",   direction: "Inbound",  status: "Missed",      duration: "—",    time: "Today, 10:14 AM",  topic: "New lead follow-up" },
  { id: 4,  name: "Megan Rapinoe",       phone: "(214) 555-0558", type: "Texas",   direction: "Outbound", status: "Voicemail",   duration: "0:47", time: "Today, 10:28 AM",  topic: "Auto add-on" },
  { id: 20, name: "Courtney Vandersloot",phone: "(212) 555-0492", type: "NewYork", direction: "Outbound", status: "Completed",   duration: "3:28", time: "Today, 10:47 AM",  topic: "Policy renewal" },
  { id: 5,  name: "Rose Lavelle",        phone: "(972) 555-0614", type: "Texas",   direction: "Inbound",  status: "Completed",   duration: "3:55", time: "Today, 11:05 AM",  topic: "Claim status update" },
  { id: 21, name: "Betnijah Laney",      phone: "(718) 555-0516", type: "NewYork", direction: "Inbound",  status: "Completed",   duration: "5:03", time: "Today, 11:19 AM",  topic: "Coverage question" },
  { id: 6,  name: "Mallory Swanson",     phone: "(469) 555-0729", type: "Texas",   direction: "Outbound", status: "Completed",   duration: "5:10", time: "Today, 11:33 AM",  topic: "Home insurance quote" },
  { id: 22, name: "Leonie Fiebich",      phone: "(646) 555-0638", type: "NewYork", direction: "Outbound", status: "Voicemail",   duration: "0:41", time: "Today, 11:52 AM",  topic: "New lead follow-up" },
  { id: 7,  name: "Lindsey Horan",       phone: "(214) 555-0843", type: "Texas",   direction: "Inbound",  status: "Missed",      duration: "—",    time: "Today, 12:01 PM",  topic: "Referral inquiry" },
  { id: 23, name: "Nyara Sabally",       phone: "(212) 555-0742", type: "NewYork", direction: "Inbound",  status: "Completed",   duration: "7:16", time: "Today, 12:18 PM",  topic: "Home insurance quote" },
  { id: 8,  name: "Sam Kerr",            phone: "(972) 555-0967", type: "Texas",   direction: "Outbound", status: "Completed",   duration: "7:44", time: "Today, 12:22 PM",  topic: "Policy renewal" },
  { id: 24, name: "Marine Johannes",     phone: "(718) 555-0855", type: "NewYork", direction: "Outbound", status: "Missed",      duration: "—",    time: "Today, 12:45 PM",  topic: "Claim status update" },
  { id: 9,  name: "Catarina Macario",    phone: "(469) 555-0112", type: "Texas",   direction: "Inbound",  status: "Completed",   duration: "2:38", time: "Today, 1:04 PM",   topic: "Coverage question" },
  { id: 25, name: "Ivanka Matic",        phone: "(646) 555-0969", type: "NewYork", direction: "Inbound",  status: "Completed",   duration: "2:52", time: "Today, 1:22 PM",   topic: "Auto add-on" },
  { id: 10, name: "Christen Press",      phone: "(214) 555-0235", type: "Texas",   direction: "Outbound", status: "Voicemail",   duration: "0:52", time: "Today, 1:31 PM",   topic: "EverQuote lead" },
  { id: 26, name: "Han Xu",              phone: "(212) 555-0173", type: "NewYork", direction: "Outbound", status: "Completed",   duration: "4:37", time: "Today, 1:58 PM",   topic: "Umbrella policy inquiry" },
  { id: 11, name: "Becky Sauerbrunn",    phone: "(972) 555-0378", type: "Texas",   direction: "Inbound",  status: "Completed",   duration: "5:27", time: "Today, 2:09 PM",   topic: "Umbrella policy inquiry" },
  { id: 27, name: "Natasha Howard",      phone: "(718) 555-0284", type: "NewYork", direction: "Inbound",  status: "Voicemail",   duration: "0:55", time: "Today, 2:26 PM",   topic: "Referral inquiry" },
  { id: 12, name: "Tobin Heath",         phone: "(469) 555-0491", type: "Texas",   direction: "Outbound", status: "Completed",   duration: "4:01", time: "Today, 2:44 PM",   topic: "Home insurance quote" },
  { id: 28, name: "Stefanie Dolson",     phone: "(646) 555-0397", type: "NewYork", direction: "Outbound", status: "Completed",   duration: "5:49", time: "Today, 2:51 PM",   topic: "Policy renewal" },
  { id: 13, name: "Julie Ertz",          phone: "(214) 555-0603", type: "Texas",   direction: "Inbound",  status: "Missed",      duration: "—",    time: "Today, 3:15 PM",   topic: "New lead follow-up" },
  { id: 29, name: "Kayla Thornton",      phone: "(212) 555-0418", type: "NewYork", direction: "Inbound",  status: "Missed",      duration: "—",    time: "Today, 3:17 PM",   topic: "New lead follow-up" },
  { id: 14, name: "Crystal Dunn",        phone: "(972) 555-0716", type: "Texas",   direction: "Outbound", status: "Completed",   duration: "8:12", time: "Today, 3:42 PM",   topic: "Claim filing assistance" },
  { id: 30, name: "Rebecca Allen",       phone: "(718) 555-0523", type: "NewYork", direction: "Outbound", status: "Completed",   duration: "3:44", time: "Today, 3:48 PM",   topic: "Home insurance quote" },
  { id: 15, name: "Alyssa Naeher",       phone: "(469) 555-0829", type: "Texas",   direction: "Inbound",  status: "Completed",   duration: "3:19", time: "Today, 4:07 PM",   topic: "Policy renewal" },
  { id: 31, name: "Rebekah Gardner",     phone: "(646) 555-0637", type: "NewYork", direction: "Inbound",  status: "Completed",   duration: "6:08", time: "Today, 4:12 PM",   topic: "Coverage question" },
  { id: 16, name: "Abby Dahlkemper",     phone: "(214) 555-0942", type: "Texas",   direction: "Outbound", status: "Voicemail",   duration: "0:38", time: "Today, 4:33 PM",   topic: "Referral follow-up" },
  { id: 32, name: "Kennedy Burke",       phone: "(212) 555-0741", type: "NewYork", direction: "Outbound", status: "Voicemail",   duration: "0:44", time: "Today, 4:39 PM",   topic: "EverQuote lead" },
];

const statusConfig: Record<CallStatus, { label: string; className: string }> = {
  Completed:   { label: "Completed",   className: "bg-green-50 text-green-700 border border-green-200" },
  Missed:      { label: "Missed",      className: "bg-red-50 text-red-600 border border-red-200" },
  Voicemail:   { label: "Voicemail",   className: "bg-orange-50 text-orange-600 border border-orange-200" },
  "In Progress": { label: "In Progress", className: "bg-blue-50 text-blue-600 border border-blue-200" },
};

const typeBadge: Record<string, string> = {
  Texas:   "bg-blue-50 text-blue-600 border border-blue-200",
  NewYork: "bg-gray-50 text-gray-600 border border-gray-200",
};

const typeLabel: Record<string, string> = {
  Texas:   "Texas FC",
  NewYork: "NY Liberty",
};

function DirectionIcon({ direction }: { direction: CallDirection }) {
  if (direction === "Inbound") {
    return <PhoneIncoming className="size-3.5 text-green-500" />;
  }
  return <PhoneOutgoing className="size-3.5 text-blue-500" />;
}

export default function CallAgentPage() {
  const router = useRouter();
  const completed = calls.filter((c) => c.status === "Completed").length;
  const missed = calls.filter((c) => c.status === "Missed").length;
  const voicemail = calls.filter((c) => c.status === "Voicemail").length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#37322F]">Call Activity</h2>
          <img src="/RingCentral_logo.png" alt="RingCentral" className="h-7 object-contain" />
        </div>
        <p className="text-sm text-gray-500 mt-1">{calls.length} calls today</p>
      </div>

      {/* Summary pills */}
      <div className="flex gap-3 mb-6">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-50 border border-green-200 text-sm text-green-700">
          <Phone className="size-3.5" />
          <span>{completed} completed</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">
          <PhoneMissed className="size-3.5" />
          <span>{missed} missed</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-50 border border-orange-200 text-sm text-orange-600">
          <Clock className="size-3.5" />
          <span>{voicemail} voicemail</span>
        </div>
      </div>

      <style>{`
        @keyframes demo-glow {
          0%, 100% { box-shadow: 0 0 6px 1px rgba(108, 112, 186, 0.35); }
          50% { box-shadow: 0 0 14px 4px rgba(108, 112, 186, 0.65); }
        }
        .demo-row { animation: demo-glow 2s ease-in-out infinite; }
      `}</style>

      {/* Table */}
      <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Caller</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Phone</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Direction</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Topic</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Duration</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Time</th>
            </tr>
          </thead>
          <tbody>
            {calls.map((call, i) => {
              const isDemo = DEMO_IDS.includes(call.id);
              const row = (
                <tr
                  key={call.id}
                  onClick={isDemo ? () => router.push(`/call-agent/${call.id}`) : undefined}
                  className={`border-b border-gray-100 last:border-0 transition-colors ${isDemo ? "demo-row cursor-pointer hover:bg-purple-50/40" : `hover:bg-gray-50 ${i % 2 === 0 ? "" : "bg-gray-50/40"}`}`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${isDemo ? "text-[#6c70ba]" : "text-[#37322F]"}`}>{call.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${typeBadge[call.type]}`}>
                        {typeLabel[call.type]}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{call.phone}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <DirectionIcon direction={call.direction} />
                      <span className="text-gray-600">{call.direction}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{call.topic}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusConfig[call.status].className}`}>
                      {statusConfig[call.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{call.duration}</td>
                  <td className="px-4 py-3 text-gray-400 whitespace-nowrap">{call.time}</td>
                </tr>
              );
              return row;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
