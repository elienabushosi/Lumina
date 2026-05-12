"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft, Phone, Mail, Calendar, MapPin, FileText, Tag,
  DollarSign, Layers, ChevronDown, ChevronUp, Sparkles,
  PhoneIncoming, Clock, MicVocal,
} from "lucide-react";

const callData: Record<string, {
  name: string;
  phone: string;
  email: string;
  dob: string;
  type: "Texas" | "NewYork";
  direction: "Inbound" | "Outbound";
  duration: string;
  time: string;
  topic: string;
  priorCarrier: string;
  currentPremium: string;
  notes: string;
  transcript: { speaker: "Agent" | "Caller"; ts: string; text: string }[];
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
}> = {
  "1": {
    name: "Trinity Rodman",
    phone: "(214) 555-0182",
    email: "trinity.rodman@email.com",
    dob: "May 20, 2002",
    type: "Texas",
    direction: "Inbound",
    duration: "4:32",
    time: "Today, 9:14 AM",
    topic: "Home insurance quote",
    priorCarrier: "State Auto",
    currentPremium: "$2,950/yr",
    notes: "Inbound call, first-time homeowner. Very motivated to switch — current carrier raised rates at renewal. Interested in bundling with auto. Follow up with proposal same day.",
    transcript: [
      { speaker: "Agent",  ts: "0:00", text: "Thank you for calling Taylor Appleseed Farmers Insurance, this is Linda speaking. How can I help you today?" },
      { speaker: "Caller", ts: "0:06", text: "Hi Linda, my name is Trinity Rodman. I'm calling because I just got my renewal notice and my rate jumped up a lot. I wanted to see if you could give me a quote." },
      { speaker: "Agent",  ts: "0:16", text: "Absolutely, Trinity. I'm sorry to hear about that increase — it's been a common issue this year. I'd be happy to run a quote for you. Can I start with your property address?" },
      { speaker: "Caller", ts: "0:26", text: "Sure, it's 9808 Coolidge Drive, McKinney, Texas, 75072." },
      { speaker: "Agent",  ts: "0:33", text: "Perfect. And is this a single-family home that you own and live in?" },
      { speaker: "Caller", ts: "0:38", text: "Yes, I bought it about a year ago. It's my first home." },
      { speaker: "Agent",  ts: "0:43", text: "Congratulations! Do you know roughly when it was built?" },
      { speaker: "Caller", ts: "0:47", text: "I think 2003, I can double-check the closing docs." },
      { speaker: "Agent",  ts: "0:52", text: "That's helpful, thank you. I'm also pulling up your property details now. I'm seeing about 1,914 square feet of living space, hip-style shingle roof — does that sound right?" },
      { speaker: "Caller", ts: "1:03", text: "Yeah that sounds about right. It has a big attached garage too." },
      { speaker: "Agent",  ts: "1:09", text: "Got it — 465 square feet attached garage, noted. And no pool on the property?" },
      { speaker: "Caller", ts: "1:15", text: "No pool, correct." },
      { speaker: "Agent",  ts: "1:18", text: "Great. Who are you currently insured with, and do you know your current annual premium?" },
      { speaker: "Caller", ts: "1:24", text: "I'm with State Auto. I was paying around $2,950 a year and they just bumped it to almost $3,600." },
      { speaker: "Agent",  ts: "1:34", text: "That's a significant jump. I want to make sure we get you better coverage at a more competitive rate. Are you interested in bundling with auto insurance as well?" },
      { speaker: "Caller", ts: "1:44", text: "Actually yes, that would be great. I've been meaning to look into that." },
      { speaker: "Agent",  ts: "1:49", text: "Bundling typically saves our clients 10 to 15 percent, so I'll include that in the quote. I have everything I need — I'll put together a proposal and send it over by end of day. Does that work for you?" },
      { speaker: "Caller", ts: "2:01", text: "That works perfectly. And can you send it to my email?" },
      { speaker: "Agent",  ts: "2:05", text: "Of course. What's the best email address for you?" },
      { speaker: "Caller", ts: "2:09", text: "trinity.rodman@email.com" },
      { speaker: "Agent",  ts: "2:14", text: "Got it. Is there anything else you'd like me to include — flood coverage, liability riders, anything like that?" },
      { speaker: "Caller", ts: "2:21", text: "I'd be curious about umbrella coverage too, actually." },
      { speaker: "Agent",  ts: "2:25", text: "Smart ask. I'll add an umbrella option to the proposal. Trinity, we appreciate you calling in and I look forward to getting you a great rate. You'll hear from us soon." },
      { speaker: "Caller", ts: "2:35", text: "Perfect, thank you so much Linda." },
      { speaker: "Agent",  ts: "2:38", text: "Have a wonderful day!" },
    ],
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
  "17": {
    name: "Breanna Stewart",
    phone: "(212) 555-0154",
    email: "breanna.stewart@email.com",
    dob: "August 27, 1994",
    type: "NewYork",
    direction: "Inbound",
    duration: "6:44",
    time: "Today, 9:08 AM",
    topic: "Home insurance quote",
    priorCarrier: "Allstate",
    currentPremium: "$4,100/yr",
    notes: "Inbound call. Currently with Allstate, unhappy with claim handling. Interested in comprehensive home coverage including personal property riders. High-value client — handle with priority.",
    transcript: [
      { speaker: "Agent",  ts: "0:00", text: "Thank you for calling Taylor Appleseed Farmers Insurance, this is Linda speaking. How can I help you today?" },
      { speaker: "Caller", ts: "0:06", text: "Hi, good morning. My name is Breanna Stewart. I'm looking to get a home insurance quote. I've been with my current provider for a few years but I'm not happy with how they handled a claim I filed last year." },
      { speaker: "Agent",  ts: "0:19", text: "Good morning Breanna! I'm sorry to hear about that experience — you deserve a carrier that's there when you need them. I'd love to help. Can I get your property address to get started?" },
      { speaker: "Caller", ts: "0:30", text: "Of course. It's 9808 Coolidge Drive, McKinney, Texas, 75072." },
      { speaker: "Agent",  ts: "0:38", text: "Thank you. And just to confirm, is this your primary residence?" },
      { speaker: "Caller", ts: "0:42", text: "Yes, primary home. I own it." },
      { speaker: "Agent",  ts: "0:45", text: "Great. I'm pulling up the property records now. I'm seeing a single-family home, built in 2003, about 1,914 square feet of living area. Does that match what you have?" },
      { speaker: "Caller", ts: "0:57", text: "Yeah, that sounds right. I haven't memorized all the specs but that's in the ballpark." },
      { speaker: "Agent",  ts: "1:03", text: "No worries — we can verify most of it from public records. I'm also seeing a hip-style architectural shingle roof and a slab foundation, no pool. Is that accurate?" },
      { speaker: "Caller", ts: "1:15", text: "Correct, no pool. And yeah the roof was one of the things they gave me trouble on with the claim — I had some hail damage and they tried to lowball the payout." },
      { speaker: "Agent",  ts: "1:26", text: "That's unfortunately not uncommon. At Farmers we have a dedicated claims team and we prioritize fair assessments. I'll make sure your quote includes replacement cost coverage for the roof so you're fully protected going forward." },
      { speaker: "Caller", ts: "1:40", text: "That's exactly what I want. What about personal property — I have quite a bit of valuable items in the home." },
      { speaker: "Agent",  ts: "1:48", text: "Absolutely. We offer scheduled personal property riders that cover high-value items like jewelry, art, or electronics at agreed value. I'll include a few options in your proposal. Who are you currently with so I can make sure we beat their terms?" },
      { speaker: "Caller", ts: "2:02", text: "Allstate. I'm paying around $4,100 a year." },
      { speaker: "Agent",  ts: "2:08", text: "Got it. And did you say you had a recent claim on file with them?" },
      { speaker: "Caller", ts: "2:13", text: "Yes, last spring. Hail damage to the roof and some gutters." },
      { speaker: "Agent",  ts: "2:18", text: "Noted. That won't disqualify you — we evaluate on a case-by-case basis and a single weather-related claim typically doesn't impact your rate significantly with us. Do you have any other properties or vehicles you'd want to bundle?" },
      { speaker: "Caller", ts: "2:33", text: "I do have a vehicle. Would bundling save me money?" },
      { speaker: "Agent",  ts: "2:38", text: "Yes — bundling home and auto typically saves 10 to 15 percent off both policies. I'll run the numbers both ways so you can see the comparison." },
      { speaker: "Caller", ts: "2:48", text: "Perfect. I'd also want flood coverage if it's available in my area." },
      { speaker: "Agent",  ts: "2:54", text: "We can definitely explore that. McKinney has some zones that qualify — I'll check your specific address and include a flood rider option in the quote. Can I grab a good email for you?" },
      { speaker: "Caller", ts: "3:05", text: "Sure, it's breanna.stewart@email.com." },
      { speaker: "Agent",  ts: "3:12", text: "Perfect. And is there a preferred time for our agent to follow up if you have questions about the proposal?" },
      { speaker: "Caller", ts: "3:19", text: "Mornings are best for me, before noon." },
      { speaker: "Agent",  ts: "3:23", text: "I'll note that. Breanna, I have everything I need. I'll put together a comprehensive proposal — home with replacement cost roof coverage, personal property riders, flood rider option, and the auto bundle comparison. You'll receive it by end of business today." },
      { speaker: "Caller", ts: "3:40", text: "That's great, thank you so much Linda. I really appreciate how thorough you've been." },
      { speaker: "Agent",  ts: "3:46", text: "It's our pleasure — that's the Farmers difference. Have a wonderful morning and we'll be in touch soon!" },
      { speaker: "Caller", ts: "3:53", text: "Thank you, you too. Bye." },
    ],
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
  Texas:   "Texas FC",
  NewYork: "NY Liberty",
};

export default function CallDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [transcriptOpen, setTranscriptOpen] = useState(true);
  const call = callData[id];

  if (!call) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Call not found.</p>
        <Link href="/call-agent" className="text-sm text-[#37322F] underline mt-2 inline-block">Back to Call Activity</Link>
      </div>
    );
  }

  const p = call.property;

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
      <Link href="/call-agent" className="animate-section inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#37322F] mb-6" style={{ animationDelay: "0ms" }}>
        <ArrowLeft className="size-4" />
        Back to Call Activity
      </Link>

      {/* Header */}
      <div className="animate-section flex items-center justify-between mb-6" style={{ animationDelay: "100ms" }}>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-semibold text-[#37322F]">{call.name}</h2>
            <span className={`text-xs px-2 py-0.5 rounded-full ${typeBadge[call.type]}`}>
              {typeLabel[call.type]}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <PhoneIncoming className="size-3.5 text-green-500" />
              {call.direction} · {call.time}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5 text-gray-400" />
              {call.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <MicVocal className="size-3.5 text-gray-400" />
              {call.topic}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <Link
            href="/research-browser-run"
            className="inline-flex items-center gap-2 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            style={{ backgroundColor: "#6c70ba" }}
          >
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

        {/* Call Transcript */}
        <section className="animate-section bg-white border border-gray-200 rounded-xl p-5" style={{ animationDelay: "200ms" }}>
          <button
            onClick={() => setTranscriptOpen(!transcriptOpen)}
            className="flex items-center justify-between w-full mb-4 group"
          >
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Call Transcript</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">AI Transcribed</span>
              <span className="inline-flex items-center gap-1 text-xs text-purple-600 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
                <Sparkles className="size-3" />
                Ready to start a proposal
              </span>
              {transcriptOpen ? <ChevronUp className="size-4 text-gray-400" /> : <ChevronDown className="size-4 text-gray-400" />}
            </div>
          </button>
          {transcriptOpen && (
            <div className="flex flex-col gap-3">
              {call.transcript.map((line, i) => (
                line.speaker === "Agent" ? (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center gap-1 shrink-0 mt-0.5">
                      <img
                        src="/professional-woman-avatar-with-short-brown-hair-an.jpg"
                        alt="Linda"
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <span className="text-[9px] text-gray-400 text-center leading-tight w-14">Linda</span>
                    </div>
                    <div className="flex flex-col gap-0.5 max-w-xl">
                      <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-[#37322F]">
                        {line.text}
                      </div>
                      <span className="text-[10px] text-gray-300 pl-2">{line.ts}</span>
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex gap-3 justify-end">
                    <div className="flex flex-col gap-0.5 items-end max-w-xl">
                      <div className="bg-[#37322F] rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm text-white">
                        {line.text}
                      </div>
                      <span className="text-[10px] text-gray-300 pr-2">{line.ts}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 shrink-0 mt-0.5">
                      <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-700 text-xs font-bold">
                          {call.name.split(" ")[0][0]}{call.name.split(" ")[1][0]}
                        </span>
                      </div>
                      <span className="text-[9px] text-gray-400 text-center leading-tight w-14">
                        {call.name.split(" ")[0]}
                      </span>
                    </div>
                  </div>
                )
              ))}
            </div>
          )}
        </section>

        {/* Property Images */}
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
                alt="Street view"
                className="w-full h-44 object-cover rounded-lg border border-gray-100"
              />
              <p className="text-xs text-gray-400 text-center">Street view</p>
            </div>
            <div className="flex flex-col gap-1">
              <img
                src="/9808CoolidgeGooglemapsBirds.png"
                alt="Bird's eye view"
                className="w-full h-44 object-cover rounded-lg border border-gray-100"
              />
              <p className="text-xs text-gray-400 text-center">Bird's eye view</p>
            </div>
            <div className="flex flex-col gap-1">
              <img
                src="/Livingroom.jpg"
                alt="Living room"
                className="w-full h-44 object-cover rounded-lg border border-gray-100"
              />
              <p className="text-xs text-gray-400 text-center">Living room (Zillow)</p>
            </div>
            <div className="flex flex-col gap-1">
              <img
                src="/Bathroom.jpg"
                alt="Bathroom"
                className="w-full h-44 object-cover rounded-lg border border-gray-100"
              />
              <p className="text-xs text-gray-400 text-center">Bathroom (Zillow)</p>
            </div>
          </div>
        </section>

        {/* Two-column grid */}
        <div className="animate-section grid grid-cols-2 gap-6" style={{ animationDelay: "440ms" }}>

          {/* Property Details */}
          <section className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Property Details</h3>
              <div className="flex items-center gap-2">
                <img src="/collin-cad%20simple%20logo.png" alt="Collin CAD" className="h-5 object-contain" />
                <span className="text-xs text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                  Pulled automatically from CAD
                </span>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm text-[#37322F] mb-4">
              <MapPin className="size-4 text-gray-400 shrink-0 mt-0.5" />
              <span className="font-medium">9808 Coolidge Dr, McKinney, TX 75072</span>
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

          {/* Right column */}
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
                  {call.phone}
                </div>
                <div className="flex items-center gap-3 text-sm text-[#37322F]">
                  <Mail className="size-4 text-gray-400 shrink-0" />
                  {call.email}
                </div>
                <div className="flex items-center gap-3 text-sm text-[#37322F]">
                  <Calendar className="size-4 text-gray-400 shrink-0" />
                  DOB: {call.dob}
                </div>
              </div>
            </section>

            {/* Prior Coverage */}
            <section className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Prior Coverage</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-sm text-[#37322F]">
                  <Tag className="size-4 text-gray-400 shrink-0" />
                  {call.priorCarrier}
                </div>
                <div className="flex items-center gap-3 text-sm text-[#37322F]">
                  <DollarSign className="size-4 text-gray-400 shrink-0" />
                  Current premium: {call.currentPremium}
                </div>
              </div>
            </section>

            {/* Notes */}
            <section className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Notes</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{call.notes}</p>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
}
