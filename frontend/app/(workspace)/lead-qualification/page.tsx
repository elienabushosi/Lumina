"use client";

import { useState } from "react";
import { Sparkles, CheckCircle, Clock, AlertCircle, ChevronRight } from "lucide-react";

type QualStatus = "Qualified" | "In Progress" | "Needs Follow-up" | "Unresponsive";

const conversations: {
  id: number;
  name: string;
  type: "Dallas" | "NewYork";
  phone: string;
  status: QualStatus;
  lastMessage: string;
  lastMessageFrom: "AI" | "Lead";
  time: string;
  unread: boolean;
  messages: { speaker: "AI" | "Lead"; text: string; ts: string }[];
}[] = [
  {
    id: 1,
    name: "Jason Robertson",
    type: "Dallas",
    phone: "(214) 555-0181",
    status: "Qualified",
    lastMessage: "That all looks correct. Looking forward to hearing from you.",
    lastMessageFrom: "Lead",
    time: "9:14 AM",
    unread: false,
    messages: [
      { speaker: "AI",   ts: "9:00 AM", text: "Hi Jason, this is the AI assistant from Taylor Appleseed Farmers Insurance. We received your inquiry about home insurance and wanted to quickly verify a few details. Is now a good time?" },
      { speaker: "Lead", ts: "9:02 AM", text: "Sure, go ahead." },
      { speaker: "AI",   ts: "9:02 AM", text: "Great! Can you confirm your home address for me?" },
      { speaker: "Lead", ts: "9:04 AM", text: "It's 9808 Coolidge Drive, McKinney, TX 75072." },
      { speaker: "AI",   ts: "9:05 AM", text: "Perfect. Our records show a single-family home built in 2003, about 1,914 sq ft with an attached garage. Does that sound right?" },
      { speaker: "Lead", ts: "9:07 AM", text: "Yep, that's accurate." },
      { speaker: "AI",   ts: "9:08 AM", text: "And are you currently insured? If so, do you know your annual premium?" },
      { speaker: "Lead", ts: "9:10 AM", text: "I'm with Allstate, paying around $3,200 a year." },
      { speaker: "AI",   ts: "9:11 AM", text: "Noted. Would you be interested in bundling home with auto insurance for additional savings?" },
      { speaker: "Lead", ts: "9:13 AM", text: "Definitely, yes." },
      { speaker: "AI",   ts: "9:13 AM", text: "Wonderful! I've flagged you as qualified for a full proposal. An agent will follow up with a personalized quote by end of day. Is there anything specific you'd like included?" },
      { speaker: "Lead", ts: "9:14 AM", text: "That all looks correct. Looking forward to hearing from you." },
    ],
  },
  {
    id: 2,
    name: "Brianne Jenner",
    type: "NewYork",
    phone: "(212) 555-0192",
    status: "Qualified",
    lastMessage: "Perfect, thank you so much!",
    lastMessageFrom: "Lead",
    time: "9:22 AM",
    unread: false,
    messages: [
      { speaker: "AI",   ts: "9:08 AM", text: "Hi Brianne! I'm reaching out from Taylor Appleseed Farmers Insurance about your home insurance inquiry. Could I ask a few quick questions?" },
      { speaker: "Lead", ts: "9:10 AM", text: "Of course!" },
      { speaker: "AI",   ts: "9:10 AM", text: "What's your current home address?" },
      { speaker: "Lead", ts: "9:12 AM", text: "9808 Coolidge Drive, McKinney, TX 75072." },
      { speaker: "AI",   ts: "9:13 AM", text: "Got it. And is this your primary residence that you own?" },
      { speaker: "Lead", ts: "9:14 AM", text: "Yes, I've owned it for two years." },
      { speaker: "AI",   ts: "9:15 AM", text: "Great. Who's your current carrier and roughly what are you paying annually?" },
      { speaker: "Lead", ts: "9:17 AM", text: "State Farm, about $2,800 a year. But they raised rates at renewal." },
      { speaker: "AI",   ts: "9:18 AM", text: "That's common lately — we should be able to do better. Any specific coverage needs like flood, jewelry, or umbrella?" },
      { speaker: "Lead", ts: "9:20 AM", text: "Flood would be great, and I have some nice jewelry." },
      { speaker: "AI",   ts: "9:21 AM", text: "Noted — I'll flag both for your proposal. You're all set! An agent will be in touch shortly." },
      { speaker: "Lead", ts: "9:22 AM", text: "Perfect, thank you so much!" },
    ],
  },
  {
    id: 3,
    name: "Roope Hintz",
    type: "Dallas",
    phone: "(972) 555-0203",
    status: "In Progress",
    lastMessage: "Let me check on that and get back to you.",
    lastMessageFrom: "Lead",
    time: "10:05 AM",
    unread: true,
    messages: [
      { speaker: "AI",   ts: "9:45 AM", text: "Hi Roope! I'm contacting you from Taylor Appleseed Farmers Insurance about your home insurance inquiry. Quick question — can I confirm your property address?" },
      { speaker: "Lead", ts: "9:48 AM", text: "Hi, yes it's 9808 Coolidge Dr, McKinney TX." },
      { speaker: "AI",   ts: "9:49 AM", text: "Perfect. Do you know roughly when the home was built and the square footage?" },
      { speaker: "Lead", ts: "9:52 AM", text: "I think around 2003 but I'd need to double check the exact square footage." },
      { speaker: "AI",   ts: "9:53 AM", text: "No worries, we can verify that from records. Are you currently insured?" },
      { speaker: "Lead", ts: "10:01 AM", text: "Yes, I have a policy but I'm not sure who it's through — my wife handles that. Let me check on that and get back to you." },
    ],
  },
  {
    id: 4,
    name: "Natalie Spooner",
    type: "NewYork",
    phone: "(646) 555-0214",
    status: "Qualified",
    lastMessage: "Sounds great, I'll keep an eye out for the proposal.",
    lastMessageFrom: "Lead",
    time: "10:18 AM",
    unread: false,
    messages: [
      { speaker: "AI",   ts: "10:00 AM", text: "Hi Natalie! Reaching out from Taylor Appleseed Farmers Insurance. We'd love to put together a home insurance proposal for you. Can I verify a few details?" },
      { speaker: "Lead", ts: "10:02 AM", text: "Sure thing." },
      { speaker: "AI",   ts: "10:02 AM", text: "Can you confirm your home address?" },
      { speaker: "Lead", ts: "10:03 AM", text: "9808 Coolidge Drive, McKinney, TX 75072." },
      { speaker: "AI",   ts: "10:04 AM", text: "And is it a single-family home you own?" },
      { speaker: "Lead", ts: "10:05 AM", text: "Yes, just bought it last year actually." },
      { speaker: "AI",   ts: "10:06 AM", text: "Congrats on the new home! Are you looking to get first-time homeowner coverage or switching from a prior carrier?" },
      { speaker: "Lead", ts: "10:08 AM", text: "Switching — I had coverage through my landlord before and just got my own policy with Progressive but I'm not happy with it." },
      { speaker: "AI",   ts: "10:10 AM", text: "Understood. We can definitely improve on that. Would you be open to bundling with auto for extra savings?" },
      { speaker: "Lead", ts: "10:13 AM", text: "Yes, absolutely." },
      { speaker: "AI",   ts: "10:14 AM", text: "Perfect! I've got everything I need. An agent will follow up shortly with a full proposal including a bundle comparison." },
      { speaker: "Lead", ts: "10:18 AM", text: "Sounds great, I'll keep an eye out for the proposal." },
    ],
  },
  {
    id: 5,
    name: "Wyatt Johnston",
    type: "Dallas",
    phone: "(469) 555-0225",
    status: "Needs Follow-up",
    lastMessage: "I'll have to call you back — something came up.",
    lastMessageFrom: "Lead",
    time: "10:33 AM",
    unread: true,
    messages: [
      { speaker: "AI",   ts: "10:20 AM", text: "Hi Wyatt! This is the AI assistant from Taylor Appleseed Farmers Insurance. Is this a good time to go over a few quick questions for your home insurance quote?" },
      { speaker: "Lead", ts: "10:22 AM", text: "Sure, but make it quick." },
      { speaker: "AI",   ts: "10:22 AM", text: "Of course! Can you confirm your home address?" },
      { speaker: "Lead", ts: "10:24 AM", text: "9808 Coolidge Dr, McKinney TX 75072." },
      { speaker: "AI",   ts: "10:25 AM", text: "Got it. And are you currently insured on the property?" },
      { speaker: "Lead", ts: "10:33 AM", text: "I'll have to call you back — something came up." },
    ],
  },
  {
    id: 6,
    name: "Amanda Kessel",
    type: "NewYork",
    phone: "(718) 555-0236",
    status: "In Progress",
    lastMessage: "What does umbrella coverage actually cover?",
    lastMessageFrom: "Lead",
    time: "10:47 AM",
    unread: true,
    messages: [
      { speaker: "AI",   ts: "10:30 AM", text: "Hi Amanda! I'm reaching out from Taylor Appleseed Farmers Insurance. We'd love to help with your home insurance. Can I ask a few quick questions?" },
      { speaker: "Lead", ts: "10:32 AM", text: "Yes, sure." },
      { speaker: "AI",   ts: "10:32 AM", text: "Can you confirm your property address?" },
      { speaker: "Lead", ts: "10:34 AM", text: "9808 Coolidge Drive, McKinney, TX 75072." },
      { speaker: "AI",   ts: "10:35 AM", text: "Is it a home you own and live in as your primary residence?" },
      { speaker: "Lead", ts: "10:36 AM", text: "Yes." },
      { speaker: "AI",   ts: "10:37 AM", text: "Great. Do you have any specific coverage priorities — high-value personal items, liability, flood, or umbrella?" },
      { speaker: "Lead", ts: "10:47 AM", text: "What does umbrella coverage actually cover?" },
    ],
  },
  {
    id: 7,
    name: "Miro Heiskanen",
    type: "Dallas",
    phone: "(214) 555-0247",
    status: "Qualified",
    lastMessage: "All good. Looking forward to the proposal.",
    lastMessageFrom: "Lead",
    time: "11:02 AM",
    unread: false,
    messages: [
      { speaker: "AI",   ts: "10:50 AM", text: "Hi Miro! Taylor Appleseed Farmers Insurance here. We received your inquiry and just need to verify a few things. Is this a good time?" },
      { speaker: "Lead", ts: "10:52 AM", text: "Yes, go ahead." },
      { speaker: "AI",   ts: "10:52 AM", text: "Can you confirm your home address?" },
      { speaker: "Lead", ts: "10:53 AM", text: "9808 Coolidge Drive, McKinney, TX 75072." },
      { speaker: "AI",   ts: "10:54 AM", text: "And do you know when the home was built?" },
      { speaker: "Lead", ts: "10:55 AM", text: "2003 I believe." },
      { speaker: "AI",   ts: "10:56 AM", text: "Perfect. Current carrier and annual premium?" },
      { speaker: "Lead", ts: "10:58 AM", text: "Travelers Insurance, $3,450 per year." },
      { speaker: "AI",   ts: "10:59 AM", text: "Great. Would you like to explore bundling with auto?" },
      { speaker: "Lead", ts: "11:01 AM", text: "I would, yes." },
      { speaker: "AI",   ts: "11:01 AM", text: "Wonderful — you're all set. An agent will follow up today with a full proposal." },
      { speaker: "Lead", ts: "11:02 AM", text: "All good. Looking forward to the proposal." },
    ],
  },
  {
    id: 8,
    name: "Sydney Brodt",
    type: "NewYork",
    phone: "(212) 555-0258",
    status: "Unresponsive",
    lastMessage: "Hi Sydney! I'm reaching out from Taylor Appleseed Farmers Insurance...",
    lastMessageFrom: "AI",
    time: "11:15 AM",
    unread: false,
    messages: [
      { speaker: "AI",   ts: "11:00 AM", text: "Hi Sydney! I'm reaching out from Taylor Appleseed Farmers Insurance about your home insurance inquiry. Could I verify a few details to get your quote started?" },
      { speaker: "AI",   ts: "11:15 AM", text: "Just following up — happy to answer any questions you might have! Feel free to reply whenever convenient." },
    ],
  },
  {
    id: 9,
    name: "Logan Stankoven",
    type: "Dallas",
    phone: "(972) 555-0269",
    status: "Qualified",
    lastMessage: "Great, I appreciate the quick turnaround.",
    lastMessageFrom: "Lead",
    time: "11:38 AM",
    unread: false,
    messages: [
      { speaker: "AI",   ts: "11:20 AM", text: "Hi Logan! Quick check-in from Taylor Appleseed Farmers Insurance. We got your quote request — can I verify your address real quick?" },
      { speaker: "Lead", ts: "11:22 AM", text: "Sure — 9808 Coolidge Drive, McKinney TX 75072." },
      { speaker: "AI",   ts: "11:23 AM", text: "Perfect. Single-family, owned?" },
      { speaker: "Lead", ts: "11:24 AM", text: "Yes." },
      { speaker: "AI",   ts: "11:25 AM", text: "Current carrier?" },
      { speaker: "Lead", ts: "11:26 AM", text: "Nationwide, $2,600 a year." },
      { speaker: "AI",   ts: "11:27 AM", text: "Great. Interested in a bundle?" },
      { speaker: "Lead", ts: "11:28 AM", text: "Yes." },
      { speaker: "AI",   ts: "11:29 AM", text: "You're all set — proposal coming your way today." },
      { speaker: "Lead", ts: "11:38 AM", text: "Great, I appreciate the quick turnaround." },
    ],
  },
  {
    id: 10,
    name: "Ella Shelton",
    type: "NewYork",
    phone: "(646) 555-0270",
    status: "Needs Follow-up",
    lastMessage: "Can you text me instead? I don't usually check messages here.",
    lastMessageFrom: "Lead",
    time: "11:51 AM",
    unread: true,
    messages: [
      { speaker: "AI",   ts: "11:40 AM", text: "Hi Ella! Reaching out from Taylor Appleseed Farmers Insurance about your home insurance inquiry. Are you available to answer a few quick questions?" },
      { speaker: "Lead", ts: "11:51 AM", text: "Can you text me instead? I don't usually check messages here." },
    ],
  },
  {
    id: 11,
    name: "Jake Oettinger",
    type: "Dallas",
    phone: "(469) 555-0281",
    status: "Qualified",
    lastMessage: "Sounds perfect. I'll wait for your agent to reach out.",
    lastMessageFrom: "Lead",
    time: "12:10 PM",
    unread: false,
    messages: [
      { speaker: "AI",   ts: "11:55 AM", text: "Hi Jake! I'm the AI assistant at Taylor Appleseed Farmers Insurance. We'd love to help with your home insurance. Can I ask a few questions?" },
      { speaker: "Lead", ts: "11:57 AM", text: "Go for it." },
      { speaker: "AI",   ts: "11:57 AM", text: "Address?" },
      { speaker: "Lead", ts: "11:58 AM", text: "9808 Coolidge Drive, McKinney, TX 75072." },
      { speaker: "AI",   ts: "11:59 AM", text: "Year built and square footage if you have it?" },
      { speaker: "Lead", ts: "12:01 PM", text: "2003, around 1,900 square feet." },
      { speaker: "AI",   ts: "12:02 PM", text: "Current carrier and premium?" },
      { speaker: "Lead", ts: "12:04 PM", text: "USAA, $3,800 a year." },
      { speaker: "AI",   ts: "12:06 PM", text: "Interested in bundling home and auto?" },
      { speaker: "Lead", ts: "12:07 PM", text: "Yes please." },
      { speaker: "AI",   ts: "12:08 PM", text: "All verified — you're qualified for a full proposal. An agent will reach out today!" },
      { speaker: "Lead", ts: "12:10 PM", text: "Sounds perfect. I'll wait for your agent to reach out." },
    ],
  },
  {
    id: 12,
    name: "Claire Thompson",
    type: "NewYork",
    phone: "(718) 555-0292",
    status: "In Progress",
    lastMessage: "I do have a condo — does that change anything?",
    lastMessageFrom: "Lead",
    time: "12:28 PM",
    unread: true,
    messages: [
      { speaker: "AI",   ts: "12:10 PM", text: "Hi Claire! I'm contacting you from Taylor Appleseed Farmers Insurance. We got your inquiry for a home insurance quote. Can I ask a few questions to get started?" },
      { speaker: "Lead", ts: "12:12 PM", text: "Of course." },
      { speaker: "AI",   ts: "12:12 PM", text: "Can you confirm your home address?" },
      { speaker: "Lead", ts: "12:14 PM", text: "9808 Coolidge Drive, McKinney TX 75072." },
      { speaker: "AI",   ts: "12:15 PM", text: "And is this a single-family home or another type of property?" },
      { speaker: "Lead", ts: "12:28 PM", text: "I do have a condo — does that change anything?" },
    ],
  },
  {
    id: 13,
    name: "Tyler Seguin",
    type: "Dallas",
    phone: "(214) 555-0303",
    status: "Qualified",
    lastMessage: "Perfect. Thank you!",
    lastMessageFrom: "Lead",
    time: "1:05 PM",
    unread: false,
    messages: [
      { speaker: "AI",   ts: "12:45 PM", text: "Hi Tyler! AI assistant here at Taylor Appleseed Farmers Insurance. Mind if I ask a few quick questions for your home insurance quote?" },
      { speaker: "Lead", ts: "12:47 PM", text: "Not at all." },
      { speaker: "AI",   ts: "12:47 PM", text: "Home address?" },
      { speaker: "Lead", ts: "12:48 PM", text: "9808 Coolidge Drive, McKinney TX 75072." },
      { speaker: "AI",   ts: "12:49 PM", text: "Primary home, owned?" },
      { speaker: "Lead", ts: "12:50 PM", text: "Yes." },
      { speaker: "AI",   ts: "12:51 PM", text: "Current carrier and annual cost?" },
      { speaker: "Lead", ts: "12:54 PM", text: "Chubb, $4,200 a year." },
      { speaker: "AI",   ts: "12:55 PM", text: "Good to know. Bundle with auto?" },
      { speaker: "Lead", ts: "12:57 PM", text: "Yes, I'd want that." },
      { speaker: "AI",   ts: "1:00 PM", text: "You're all set — proposal will include home, auto bundle, and a comparison. Agent will follow up today." },
      { speaker: "Lead", ts: "1:05 PM", text: "Perfect. Thank you!" },
    ],
  },
  {
    id: 14,
    name: "Blayre Turnbull",
    type: "NewYork",
    phone: "(212) 555-0314",
    status: "Unresponsive",
    lastMessage: "Hi Blayre! I'm reaching out from Taylor Appleseed Farmers Insurance...",
    lastMessageFrom: "AI",
    time: "1:20 PM",
    unread: false,
    messages: [
      { speaker: "AI",   ts: "1:10 PM", text: "Hi Blayre! I'm reaching out from Taylor Appleseed Farmers Insurance about your home insurance inquiry. I just need to verify a couple of quick details — are you available?" },
      { speaker: "AI",   ts: "1:20 PM", text: "No worries if now isn't a great time! Feel free to reply whenever works for you and we'll pick right back up." },
    ],
  },
  {
    id: 15,
    name: "Joe Pavelski",
    type: "Dallas",
    phone: "(972) 555-0325",
    status: "Qualified",
    lastMessage: "Appreciate it. I'll watch for the email.",
    lastMessageFrom: "Lead",
    time: "2:14 PM",
    unread: false,
    messages: [
      { speaker: "AI",   ts: "2:00 PM", text: "Hi Joe! Taylor Appleseed Farmers Insurance here. We'd love to get a home insurance proposal out to you. Mind if I verify a few details?" },
      { speaker: "Lead", ts: "2:02 PM", text: "Go right ahead." },
      { speaker: "AI",   ts: "2:02 PM", text: "Home address?" },
      { speaker: "Lead", ts: "2:03 PM", text: "9808 Coolidge Drive, McKinney, TX 75072." },
      { speaker: "AI",   ts: "2:04 PM", text: "Year built?" },
      { speaker: "Lead", ts: "2:05 PM", text: "2003." },
      { speaker: "AI",   ts: "2:06 PM", text: "Current insurer and annual premium?" },
      { speaker: "Lead", ts: "2:08 PM", text: "Farmers, $3,600 a year but I was quoted cheaper elsewhere." },
      { speaker: "AI",   ts: "2:09 PM", text: "We'll make sure to beat that. Bundle with auto?" },
      { speaker: "Lead", ts: "2:11 PM", text: "Yes." },
      { speaker: "AI",   ts: "2:12 PM", text: "All set! Proposal will be sent to your email today." },
      { speaker: "Lead", ts: "2:14 PM", text: "Appreciate it. I'll watch for the email." },
    ],
  },
  {
    id: 16,
    name: "Sarah Nurse",
    type: "NewYork",
    phone: "(646) 555-0336",
    status: "Needs Follow-up",
    lastMessage: "I'm actually moving next month — should I wait?",
    lastMessageFrom: "Lead",
    time: "2:40 PM",
    unread: true,
    messages: [
      { speaker: "AI",   ts: "2:25 PM", text: "Hi Sarah! I'm the AI assistant at Taylor Appleseed Farmers Insurance. We received your home insurance inquiry. Quick question — can I confirm your home address?" },
      { speaker: "Lead", ts: "2:28 PM", text: "9808 Coolidge Drive, McKinney TX 75072." },
      { speaker: "AI",   ts: "2:29 PM", text: "Is this your current home or a new purchase?" },
      { speaker: "Lead", ts: "2:40 PM", text: "I'm actually moving next month — should I wait?" },
    ],
  },
];

const statusConfig: Record<QualStatus, { label: string; className: string; icon: React.ReactNode }> = {
  "Qualified":       { label: "Qualified",       className: "bg-green-50 text-green-700 border border-green-200",   icon: <CheckCircle className="size-3" /> },
  "In Progress":     { label: "In Progress",     className: "bg-blue-50 text-blue-600 border border-blue-200",      icon: <Clock className="size-3" /> },
  "Needs Follow-up": { label: "Needs Follow-up", className: "bg-orange-50 text-orange-600 border border-orange-200", icon: <AlertCircle className="size-3" /> },
  "Unresponsive":    { label: "Unresponsive",    className: "bg-gray-100 text-gray-500 border border-gray-200",     icon: <AlertCircle className="size-3" /> },
};

const typeBadge: Record<string, string> = {
  Dallas:  "bg-green-50 text-green-700 border border-green-200",
  NewYork: "bg-gray-50 text-gray-600 border border-gray-200",
};

const typeLabel: Record<string, string> = {
  Dallas:  "Dallas Stars",
  NewYork: "NY Sirens",
};

export default function LeadQualificationPage() {
  const [selected, setSelected] = useState<number>(1);

  const active = conversations.find((c) => c.id === selected)!;

  const qualified    = conversations.filter((c) => c.status === "Qualified").length;
  const inProgress   = conversations.filter((c) => c.status === "In Progress").length;
  const followUp     = conversations.filter((c) => c.status === "Needs Follow-up").length;
  const unresponsive = conversations.filter((c) => c.status === "Unresponsive").length;

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Top summary bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white shrink-0">
        <div className="flex gap-3">
          <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
            <CheckCircle className="size-3" /> {qualified} Qualified
          </span>
          <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
            <Clock className="size-3" /> {inProgress} In Progress
          </span>
          <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-200">
            <AlertCircle className="size-3" /> {followUp} Needs Follow-up
          </span>
          <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
            <AlertCircle className="size-3" /> {unresponsive} Unresponsive
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-purple-600 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-full">
          <Sparkles className="size-3" />
          AI Lead Qualification Agent
        </div>
      </div>

      {/* Two-panel layout */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left: conversation list */}
        <div className="w-80 shrink-0 border-r border-gray-200 bg-white overflow-y-auto">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelected(conv.id)}
              className={`w-full text-left px-4 py-3.5 border-b border-gray-100 hover:bg-gray-50 transition-colors ${selected === conv.id ? "bg-purple-50/60 border-l-2 border-l-[#6c70ba]" : ""}`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`font-medium text-sm truncate ${selected === conv.id ? "text-[#6c70ba]" : "text-[#37322F]"}`}>
                    {conv.name}
                  </span>
                  {conv.unread && (
                    <span className="w-2 h-2 rounded-full bg-[#6c70ba] shrink-0" />
                  )}
                </div>
                <span className="text-[10px] text-gray-400 whitespace-nowrap shrink-0">{conv.time}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs text-gray-400 truncate leading-snug">{conv.lastMessage}</p>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full whitespace-nowrap shrink-0 flex items-center gap-1 ${statusConfig[conv.status].className}`}>
                  {statusConfig[conv.status].icon}
                  {statusConfig[conv.status].label}
                </span>
              </div>
              <div className="mt-1.5">
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${typeBadge[conv.type]}`}>
                  {typeLabel[conv.type]}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Right: conversation detail */}
        <div className="flex-1 flex flex-col bg-[#F7F5F3] overflow-hidden">
          {/* Conversation header */}
          <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shrink-0">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-[#37322F]">{active.name}</h3>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${typeBadge[active.type]}`}>
                  {typeLabel[active.type]}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">{active.phone} · {active.topic}</p>
            </div>
            <span className={`text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 ${statusConfig[active.status].className}`}>
              {statusConfig[active.status].icon}
              {statusConfig[active.status].label}
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-3">
            {active.messages.map((msg, i) => (
              msg.speaker === "AI" ? (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center gap-1 shrink-0 mt-0.5">
                    <img
                      src="/professional-woman-avatar-with-short-brown-hair-an.jpg"
                      alt="Linda"
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <span className="text-[9px] text-gray-400 text-center leading-tight w-14">Linda</span>
                  </div>
                  <div className="flex flex-col gap-0.5 max-w-lg">
                    <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-[#37322F] shadow-sm">
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-gray-300 pl-2">{msg.ts}</span>
                  </div>
                </div>
              ) : (
                <div key={i} className="flex gap-3 justify-end">
                  <div className="flex flex-col gap-0.5 items-end max-w-lg">
                    <div className="bg-[#37322F] rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm text-white shadow-sm">
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-gray-300 pr-2">{msg.ts}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 shrink-0 mt-0.5">
                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-700 text-xs font-bold">
                        {active.name.split(" ")[0][0]}{active.name.split(" ")[1][0]}
                      </span>
                    </div>
                    <span className="text-[9px] text-gray-400 text-center leading-tight w-14">
                      {active.name.split(" ")[0]}
                    </span>
                  </div>
                </div>
              )
            ))}
          </div>

          {/* Input bar (visual only) */}
          <div className="px-6 py-4 bg-white border-t border-gray-200 shrink-0">
            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
              <span className="text-sm text-gray-300 flex-1">Linda is handling this conversation…</span>
              <span className="inline-flex items-center gap-1 text-xs text-purple-600">
                <Sparkles className="size-3" />
                Auto-responding
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
