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
    lastMessage: "Sounds great, Mason. Looking forward to it!",
    lastMessageFrom: "Lead",
    time: "9:22 AM",
    unread: false,
    messages: [
      { speaker: "AI",   ts: "9:00 AM", text: "Hi Jason, this is Linda from Taylor Appleseed Farmers Insurance. We received your inquiry about home insurance — great timing! I'd love to gather a few quick details about your property so we can get an accurate proposal together. Is now a good time?" },
      { speaker: "Lead", ts: "9:02 AM", text: "Yeah, go for it." },
      { speaker: "AI",   ts: "9:03 AM", text: "Perfect. Can you confirm the address of the home you're looking to insure?" },
      { speaker: "Lead", ts: "9:04 AM", text: "9808 Coolidge Drive, McKinney, TX 75072." },
      { speaker: "AI",   ts: "9:05 AM", text: "Got it. And is this a single-family home that you own and use as your primary residence?" },
      { speaker: "Lead", ts: "9:06 AM", text: "Yes, it is." },
      { speaker: "AI",   ts: "9:07 AM", text: "Great. Do you know roughly when it was built? And does the home have any notable features — like a pool, solar panels, or a finished basement?" },
      { speaker: "Lead", ts: "9:09 AM", text: "Built around 2003. No pool, no solar. Just a standard attached garage and a covered back patio." },
      { speaker: "AI",   ts: "9:10 AM", text: "That's really helpful. What type of roof does it have — do you know if it's a shingle roof or something else?" },
      { speaker: "Lead", ts: "9:11 AM", text: "Shingle roof, yeah. I had it inspected when I bought it." },
      { speaker: "AI",   ts: "9:12 AM", text: "Perfect. And are you currently insured on the home? If so, who's your carrier and roughly what are you paying per year?" },
      { speaker: "Lead", ts: "9:14 AM", text: "I'm with Allstate, about $3,200 a year. The rate went up a lot at renewal so I started looking around." },
      { speaker: "AI",   ts: "9:15 AM", text: "That's a common story lately — we should be able to do better. Would you also be interested in bundling with auto insurance? It typically saves clients 10–15% on both policies." },
      { speaker: "Lead", ts: "9:17 AM", text: "Definitely, yes. That would be great." },
      { speaker: "AI",   ts: "9:18 AM", text: "Excellent. I have everything I need. Mason will email you with a proposal in a few minutes — it'll include a home quote, an auto bundle option, and a side-by-side comparison with your current rate. Is your email the best way to reach you?" },
      { speaker: "Lead", ts: "9:20 AM", text: "Yep, email works perfectly." },
      { speaker: "AI",   ts: "9:21 AM", text: "Wonderful — you're all set, Jason. Keep an eye on your inbox!" },
      { speaker: "Lead", ts: "9:22 AM", text: "Sounds great, Mason. Looking forward to it!" },
    ],
  },
  {
    id: 2,
    name: "Brianne Jenner",
    type: "NewYork",
    phone: "(212) 555-0192",
    status: "Qualified",
    lastMessage: "Perfect, thanks Linda!",
    lastMessageFrom: "Lead",
    time: "9:31 AM",
    unread: false,
    messages: [
      { speaker: "AI",   ts: "9:08 AM", text: "Hi Brianne! This is Linda from Taylor Appleseed Farmers Insurance. We received your inquiry and I'd love to ask a few quick questions about your property to get your quote started. Do you have a couple of minutes?" },
      { speaker: "Lead", ts: "9:10 AM", text: "Of course, go ahead!" },
      { speaker: "AI",   ts: "9:10 AM", text: "Great! What's the address of the home you'd like to insure?" },
      { speaker: "Lead", ts: "9:11 AM", text: "9808 Coolidge Drive, McKinney, TX 75072." },
      { speaker: "AI",   ts: "9:12 AM", text: "And is it a single-family home you own? How long have you lived there?" },
      { speaker: "Lead", ts: "9:13 AM", text: "Yes, single-family. I've owned it for about two years now." },
      { speaker: "AI",   ts: "9:14 AM", text: "Nice! Do you know the approximate year it was built and the square footage?" },
      { speaker: "Lead", ts: "9:15 AM", text: "Built in 2003. I want to say around 1,900 square feet — I'd have to check the exact number." },
      { speaker: "AI",   ts: "9:16 AM", text: "That's close enough — we pull records to confirm the details. Does the home have any special features? A pool, finished basement, trampoline, anything like that?" },
      { speaker: "Lead", ts: "9:17 AM", text: "No pool, no trampoline. It has an attached garage and I think a small covered porch out back." },
      { speaker: "AI",   ts: "9:18 AM", text: "Perfect. And who is your current carrier? Are you switching or is this your first policy on this home?" },
      { speaker: "Lead", ts: "9:20 AM", text: "Switching from State Farm. They raised my rate at renewal — I was paying about $2,800 a year and now they want closer to $3,500." },
      { speaker: "AI",   ts: "9:21 AM", text: "That's a big jump. I also want to ask — do you have any high-value items in the home, like jewelry or electronics, that you'd want specifically covered?" },
      { speaker: "Lead", ts: "9:23 AM", text: "Yes actually, I have some jewelry I'd want to make sure is covered." },
      { speaker: "AI",   ts: "9:24 AM", text: "Good call. I'll flag that for a scheduled personal property rider. One last thing — any interest in bundling with auto?" },
      { speaker: "Lead", ts: "9:25 AM", text: "Yes, let's include that." },
      { speaker: "AI",   ts: "9:27 AM", text: "You're all set, Brianne! Mason will email you a full proposal in a few minutes — home coverage with a jewelry rider, auto bundle, and a comparison against your State Farm rate." },
      { speaker: "Lead", ts: "9:31 AM", text: "Perfect, thanks Linda!" },
    ],
  },
  {
    id: 3,
    name: "Roope Hintz",
    type: "Dallas",
    phone: "(972) 555-0203",
    status: "In Progress",
    lastMessage: "Let me check and text you back in a bit.",
    lastMessageFrom: "Lead",
    time: "10:12 AM",
    unread: true,
    messages: [
      { speaker: "AI",   ts: "9:45 AM", text: "Hi Roope! This is Linda from Taylor Appleseed Farmers Insurance. We got your inquiry and wanted to ask a few quick questions about your home so we can put together an accurate quote. Is now okay?" },
      { speaker: "Lead", ts: "9:47 AM", text: "Sure, go ahead." },
      { speaker: "AI",   ts: "9:47 AM", text: "Great! Can you confirm the address of the property?" },
      { speaker: "Lead", ts: "9:49 AM", text: "9808 Coolidge Drive, McKinney TX 75072." },
      { speaker: "AI",   ts: "9:50 AM", text: "And is this a home you own? Single-family?" },
      { speaker: "Lead", ts: "9:51 AM", text: "Yes, single-family, I own it." },
      { speaker: "AI",   ts: "9:52 AM", text: "Do you know roughly when it was built and the type of roof — shingle, tile, metal?" },
      { speaker: "Lead", ts: "9:54 AM", text: "I believe 2003. Shingle roof, I think — I'd have to double-check the inspection report." },
      { speaker: "AI",   ts: "9:55 AM", text: "No worries, we can pull most of that from records. Are you currently insured on the property?" },
      { speaker: "Lead", ts: "10:00 AM", text: "Yes, but I honestly don't know all the details — my wife handles the insurance stuff." },
      { speaker: "AI",   ts: "10:01 AM", text: "Totally understandable! Do you happen to know which carrier or roughly what you're paying a year? Even a ballpark helps." },
      { speaker: "Lead", ts: "10:12 AM", text: "Let me check and text you back in a bit." },
    ],
  },
  {
    id: 4,
    name: "Natalie Spooner",
    type: "NewYork",
    phone: "(646) 555-0214",
    status: "Qualified",
    lastMessage: "Will do — thanks so much!",
    lastMessageFrom: "Lead",
    time: "10:29 AM",
    unread: false,
    messages: [
      { speaker: "AI",   ts: "10:05 AM", text: "Hi Natalie! This is Linda from Taylor Appleseed Farmers Insurance. We received your home insurance inquiry — exciting! I'd love to verify a few details about your property so we can build you the right proposal. Got a few minutes?" },
      { speaker: "Lead", ts: "10:07 AM", text: "Sure, happy to help." },
      { speaker: "AI",   ts: "10:07 AM", text: "Wonderful. What's the address of the home?" },
      { speaker: "Lead", ts: "10:08 AM", text: "9808 Coolidge Drive, McKinney, TX 75072." },
      { speaker: "AI",   ts: "10:09 AM", text: "Is this a home you recently purchased or have you owned it for a while?" },
      { speaker: "Lead", ts: "10:10 AM", text: "I just bought it last year — first home!" },
      { speaker: "AI",   ts: "10:11 AM", text: "Congratulations! Do you know the year it was built? And does it have a pool or any large outbuildings?" },
      { speaker: "Lead", ts: "10:12 AM", text: "Built in 2003, I think. No pool, just an attached garage." },
      { speaker: "AI",   ts: "10:13 AM", text: "Got it. What kind of roof does it have — do you know if it's shingle?" },
      { speaker: "Lead", ts: "10:14 AM", text: "Shingle, yes. Hip-style I think the inspector said." },
      { speaker: "AI",   ts: "10:15 AM", text: "Great detail — hip roofs actually qualify for better rates. Are you switching from a prior carrier or is this your first home policy?" },
      { speaker: "Lead", ts: "10:17 AM", text: "Switching. I had a policy with Progressive but I'm not happy with it." },
      { speaker: "AI",   ts: "10:18 AM", text: "Understood — we can definitely improve on that. Would you want to bundle home with auto insurance as well?" },
      { speaker: "Lead", ts: "10:20 AM", text: "Yes, absolutely. That would help a lot." },
      { speaker: "AI",   ts: "10:22 AM", text: "Perfect. I have everything I need, Natalie. Mason will email you a full proposal in a few minutes — home coverage, auto bundle, and a comparison with your current Progressive rate. Keep an eye on your inbox!" },
      { speaker: "Lead", ts: "10:29 AM", text: "Will do — thanks so much!" },
    ],
  },
  {
    id: 5,
    name: "Wyatt Johnston",
    type: "Dallas",
    phone: "(469) 555-0225",
    status: "Needs Follow-up",
    lastMessage: "Sorry, I'll respond later today.",
    lastMessageFrom: "Lead",
    time: "10:44 AM",
    unread: true,
    messages: [
      { speaker: "AI",   ts: "10:20 AM", text: "Hi Wyatt! This is Linda from Taylor Appleseed Farmers Insurance. We got your home insurance inquiry and I just need to gather a few details about the property to get you an accurate quote. Is this a good time?" },
      { speaker: "Lead", ts: "10:22 AM", text: "Can you make it quick? I'm in the middle of something." },
      { speaker: "AI",   ts: "10:22 AM", text: "Absolutely — just a few quick ones. What's the address of the home?" },
      { speaker: "Lead", ts: "10:24 AM", text: "9808 Coolidge Drive, McKinney TX 75072." },
      { speaker: "AI",   ts: "10:25 AM", text: "Perfect. Is it a single-family home you own?" },
      { speaker: "Lead", ts: "10:26 AM", text: "Yes." },
      { speaker: "AI",   ts: "10:27 AM", text: "Do you know the roof type and when it was last replaced?" },
      { speaker: "Lead", ts: "10:44 AM", text: "Sorry, I'll respond later today." },
    ],
  },
  {
    id: 6,
    name: "Amanda Kessel",
    type: "NewYork",
    phone: "(718) 555-0236",
    status: "In Progress",
    lastMessage: "So it would cover me if someone slips at my house?",
    lastMessageFrom: "Lead",
    time: "11:02 AM",
    unread: true,
    messages: [
      { speaker: "AI",   ts: "10:35 AM", text: "Hi Amanda! This is Linda from Taylor Appleseed Farmers Insurance. We received your inquiry and I'd love to ask a few quick questions about your property to get your quote started. Is now a good time?" },
      { speaker: "Lead", ts: "10:37 AM", text: "Yes, sure." },
      { speaker: "AI",   ts: "10:37 AM", text: "Great! What's the address of the home?" },
      { speaker: "Lead", ts: "10:38 AM", text: "9808 Coolidge Drive, McKinney, TX 75072." },
      { speaker: "AI",   ts: "10:39 AM", text: "Is it a single-family home you own and live in as your primary residence?" },
      { speaker: "Lead", ts: "10:40 AM", text: "Yes, been there about three years." },
      { speaker: "AI",   ts: "10:41 AM", text: "Do you know what type of roof it has and roughly when it was built?" },
      { speaker: "Lead", ts: "10:43 AM", text: "Shingle roof — hip style I think. Built in 2003." },
      { speaker: "AI",   ts: "10:44 AM", text: "Perfect. Does the home have any special features like a pool, trampoline, or finished basement?" },
      { speaker: "Lead", ts: "10:45 AM", text: "No pool, no trampoline. Just a standard attached garage." },
      { speaker: "AI",   ts: "10:46 AM", text: "Great. Are you currently insured on the home and do you know your annual premium?" },
      { speaker: "Lead", ts: "10:48 AM", text: "Yes, I'm with Liberty Mutual. Paying around $2,950 a year." },
      { speaker: "AI",   ts: "10:49 AM", text: "Good to know. Any specific coverage priorities? Some clients like to add umbrella liability protection on top of their home policy — it extends your coverage well beyond the standard limits." },
      { speaker: "Lead", ts: "11:02 AM", text: "So it would cover me if someone slips at my house?" },
    ],
  },
  {
    id: 7,
    name: "Miro Heiskanen",
    type: "Dallas",
    phone: "(214) 555-0247",
    status: "Qualified",
    lastMessage: "Perfect. Talk soon.",
    lastMessageFrom: "Lead",
    time: "11:18 AM",
    unread: false,
    messages: [
      { speaker: "AI",   ts: "10:55 AM", text: "Hi Miro! This is Linda from Taylor Appleseed Farmers Insurance. We got your inquiry about home insurance. I just have a few quick questions about your property — do you have a couple of minutes?" },
      { speaker: "Lead", ts: "10:57 AM", text: "Yes, go ahead." },
      { speaker: "AI",   ts: "10:57 AM", text: "What's the address of the home?" },
      { speaker: "Lead", ts: "10:58 AM", text: "9808 Coolidge Drive, McKinney, TX 75072." },
      { speaker: "AI",   ts: "10:59 AM", text: "Is it a single-family home you own?" },
      { speaker: "Lead", ts: "11:00 AM", text: "Yes, been there since 2018." },
      { speaker: "AI",   ts: "11:00 AM", text: "Do you know when it was built and the type of roof?" },
      { speaker: "Lead", ts: "11:02 AM", text: "2003. Shingle roof — hip style I believe." },
      { speaker: "AI",   ts: "11:03 AM", text: "Any pool, solar panels, or outbuildings we should know about?" },
      { speaker: "Lead", ts: "11:04 AM", text: "No pool, no solar. Just the attached garage." },
      { speaker: "AI",   ts: "11:05 AM", text: "Perfect. What's your current carrier and roughly what are you paying annually?" },
      { speaker: "Lead", ts: "11:07 AM", text: "Travelers, $3,450 a year. Looking to see if I can get a better deal." },
      { speaker: "AI",   ts: "11:08 AM", text: "We should be able to help with that. Any interest in adding auto to the policy for a bundle discount?" },
      { speaker: "Lead", ts: "11:10 AM", text: "Yes, that would be great." },
      { speaker: "AI",   ts: "11:12 AM", text: "Excellent — I have everything I need. Mason will email you a full proposal in a few minutes with a home quote, the auto bundle, and a breakdown versus your current Travelers rate." },
      { speaker: "Lead", ts: "11:18 AM", text: "Perfect. Talk soon." },
    ],
  },
  {
    id: 8,
    name: "Sydney Brodt",
    type: "NewYork",
    phone: "(212) 555-0258",
    status: "Unresponsive",
    lastMessage: "No worries — reply whenever it's convenient and we'll pick right back up!",
    lastMessageFrom: "AI",
    time: "11:30 AM",
    unread: false,
    messages: [
      { speaker: "AI",   ts: "11:05 AM", text: "Hi Sydney! This is Linda from Taylor Appleseed Farmers Insurance. We received your home insurance inquiry and I'd love to ask a few quick questions about your property to get started. Are you available?" },
      { speaker: "AI",   ts: "11:30 AM", text: "No worries — reply whenever it's convenient and we'll pick right back up!" },
    ],
  },
  {
    id: 9,
    name: "Logan Stankoven",
    type: "Dallas",
    phone: "(972) 555-0269",
    status: "Qualified",
    lastMessage: "Great, appreciate the quick response!",
    lastMessageFrom: "Lead",
    time: "11:52 AM",
    unread: false,
    messages: [
      { speaker: "AI",   ts: "11:25 AM", text: "Hi Logan! This is Linda from Taylor Appleseed Farmers Insurance. We got your inquiry about auto insurance. I'd love to ask a few quick questions about your vehicle to get a quote going. Is now okay?" },
      { speaker: "Lead", ts: "11:27 AM", text: "Sure, go ahead." },
      { speaker: "AI",   ts: "11:27 AM", text: "What's the year, make, and model of the vehicle you want to insure?" },
      { speaker: "Lead", ts: "11:28 AM", text: "2022 Ford F-150." },
      { speaker: "AI",   ts: "11:29 AM", text: "Nice truck. And is this your primary vehicle? Do you use it for personal driving only or any business use?" },
      { speaker: "Lead", ts: "11:30 AM", text: "Personal only. It's my daily driver." },
      { speaker: "AI",   ts: "11:31 AM", text: "Got it. Roughly how many miles a year do you put on it?" },
      { speaker: "Lead", ts: "11:32 AM", text: "Probably around 12,000 miles a year." },
      { speaker: "AI",   ts: "11:33 AM", text: "Any accidents or claims in the last 3 years?" },
      { speaker: "Lead", ts: "11:34 AM", text: "No, clean record." },
      { speaker: "AI",   ts: "11:35 AM", text: "That'll work in your favor. Who are you currently insured with and what's your annual premium?" },
      { speaker: "Lead", ts: "11:37 AM", text: "Nationwide, paying about $1,800 a year." },
      { speaker: "AI",   ts: "11:38 AM", text: "Would you want to bundle with home insurance as well for additional savings?" },
      { speaker: "Lead", ts: "11:39 AM", text: "Yes, definitely." },
      { speaker: "AI",   ts: "11:41 AM", text: "Perfect — I have everything I need. Mason will email you a proposal in a few minutes with an auto quote, a home bundle option, and a comparison to your current Nationwide rate." },
      { speaker: "Lead", ts: "11:52 AM", text: "Great, appreciate the quick response!" },
    ],
  },
  {
    id: 10,
    name: "Ella Shelton",
    type: "NewYork",
    phone: "(646) 555-0270",
    status: "Needs Follow-up",
    lastMessage: "Can you reach me by phone instead? I don't check messages often.",
    lastMessageFrom: "Lead",
    time: "11:58 AM",
    unread: true,
    messages: [
      { speaker: "AI",   ts: "11:45 AM", text: "Hi Ella! This is Linda from Taylor Appleseed Farmers Insurance. We received your home insurance inquiry and I have a few quick questions about your property. Are you available to chat?" },
      { speaker: "Lead", ts: "11:58 AM", text: "Can you reach me by phone instead? I don't check messages often." },
    ],
  },
  {
    id: 11,
    name: "Jake Oettinger",
    type: "Dallas",
    phone: "(469) 555-0281",
    status: "Qualified",
    lastMessage: "Sounds good. I'll watch for Mason's email.",
    lastMessageFrom: "Lead",
    time: "12:22 PM",
    unread: false,
    messages: [
      { speaker: "AI",   ts: "12:00 PM", text: "Hi Jake! This is Linda from Taylor Appleseed Farmers Insurance. We got your inquiry about home insurance. I'd love to ask a few quick questions about your property — do you have a few minutes?" },
      { speaker: "Lead", ts: "12:02 PM", text: "Yep, go for it." },
      { speaker: "AI",   ts: "12:02 PM", text: "What's the address of the home?" },
      { speaker: "Lead", ts: "12:03 PM", text: "9808 Coolidge Drive, McKinney, TX 75072." },
      { speaker: "AI",   ts: "12:04 PM", text: "Is it a single-family home you own, and is it your primary residence?" },
      { speaker: "Lead", ts: "12:05 PM", text: "Yes and yes." },
      { speaker: "AI",   ts: "12:06 PM", text: "Do you know the year it was built and the square footage?" },
      { speaker: "Lead", ts: "12:07 PM", text: "2003, around 1,900 square feet." },
      { speaker: "AI",   ts: "12:08 PM", text: "What type of roof does it have? And any features like a pool or trampoline?" },
      { speaker: "Lead", ts: "12:09 PM", text: "Shingle roof, hip style. No pool, no trampoline — just an attached garage and a covered porch." },
      { speaker: "AI",   ts: "12:10 PM", text: "Great details. What's your current carrier and annual premium?" },
      { speaker: "Lead", ts: "12:12 PM", text: "USAA, $3,800 a year. It keeps going up." },
      { speaker: "AI",   ts: "12:14 PM", text: "We see that a lot. Would you like to bundle with auto as well?" },
      { speaker: "Lead", ts: "12:15 PM", text: "Yes, I'd want to explore that." },
      { speaker: "AI",   ts: "12:17 PM", text: "Perfect — I have everything I need. Mason will email you a full proposal in a few minutes. It'll include home, an auto bundle option, and a comparison against your current USAA rate." },
      { speaker: "Lead", ts: "12:22 PM", text: "Sounds good. I'll watch for Mason's email." },
    ],
  },
  {
    id: 12,
    name: "Claire Thompson",
    type: "NewYork",
    phone: "(718) 555-0292",
    status: "In Progress",
    lastMessage: "Okay that makes sense. What info do you need from me?",
    lastMessageFrom: "Lead",
    time: "12:45 PM",
    unread: true,
    messages: [
      { speaker: "AI",   ts: "12:15 PM", text: "Hi Claire! This is Linda from Taylor Appleseed Farmers Insurance. We received your inquiry and I'd love to ask a few quick questions about your property. Do you have a few minutes?" },
      { speaker: "Lead", ts: "12:17 PM", text: "Sure." },
      { speaker: "AI",   ts: "12:17 PM", text: "What's the address of the home you'd like to insure?" },
      { speaker: "Lead", ts: "12:18 PM", text: "9808 Coolidge Drive, McKinney TX 75072." },
      { speaker: "AI",   ts: "12:19 PM", text: "And is this a single-family home or a different property type?" },
      { speaker: "Lead", ts: "12:21 PM", text: "It's actually a condo — does that change things?" },
      { speaker: "AI",   ts: "12:22 PM", text: "Great question — it does a little! With a condo, you'd want an HO-6 policy, which covers your interior unit and personal belongings rather than the building structure itself. The HOA typically covers the exterior. Does that sound like what you're looking for?" },
      { speaker: "Lead", ts: "12:45 PM", text: "Okay that makes sense. What info do you need from me?" },
    ],
  },
  {
    id: 13,
    name: "Tyler Seguin",
    type: "Dallas",
    phone: "(214) 555-0303",
    status: "Qualified",
    lastMessage: "Perfect — thanks, Linda.",
    lastMessageFrom: "Lead",
    time: "1:18 PM",
    unread: false,
    messages: [
      { speaker: "AI",   ts: "12:50 PM", text: "Hi Tyler! This is Linda from Taylor Appleseed Farmers Insurance. We received your auto insurance inquiry. I just have a few quick questions about your vehicle — is now a good time?" },
      { speaker: "Lead", ts: "12:52 PM", text: "Yeah, go ahead." },
      { speaker: "AI",   ts: "12:52 PM", text: "What's the year, make, and model of the car?" },
      { speaker: "Lead", ts: "12:53 PM", text: "2023 BMW 5 Series." },
      { speaker: "AI",   ts: "12:54 PM", text: "Nice. Is it financed or leased, or do you own it outright?" },
      { speaker: "Lead", ts: "12:55 PM", text: "Financed." },
      { speaker: "AI",   ts: "12:56 PM", text: "Got it — lenders typically require comprehensive and collision coverage. Is this your primary vehicle and personal use only?" },
      { speaker: "Lead", ts: "12:57 PM", text: "Yes, personal use. Daily driver." },
      { speaker: "AI",   ts: "12:58 PM", text: "Any accidents or moving violations in the last 3 years?" },
      { speaker: "Lead", ts: "12:59 PM", text: "Nope, clean record." },
      { speaker: "AI",   ts: "1:00 PM", text: "That's great. Who are you currently insured with and what are you paying?" },
      { speaker: "Lead", ts: "1:02 PM", text: "Chubb, around $2,400 a year." },
      { speaker: "AI",   ts: "1:03 PM", text: "Would you like to bundle with home insurance? That could bring the rate down on both." },
      { speaker: "Lead", ts: "1:05 PM", text: "Yes, I have a home I'd want to add too." },
      { speaker: "AI",   ts: "1:07 PM", text: "Perfect. I have everything I need — Mason will email you a proposal in a few minutes covering both your auto and home, with a bundle comparison against your current Chubb rate." },
      { speaker: "Lead", ts: "1:18 PM", text: "Perfect — thanks, Linda." },
    ],
  },
  {
    id: 14,
    name: "Blayre Turnbull",
    type: "NewYork",
    phone: "(212) 555-0314",
    status: "Unresponsive",
    lastMessage: "Feel free to reply whenever — we're here when you're ready!",
    lastMessageFrom: "AI",
    time: "1:35 PM",
    unread: false,
    messages: [
      { speaker: "AI",   ts: "1:10 PM", text: "Hi Blayre! This is Linda from Taylor Appleseed Farmers Insurance. We received your home insurance inquiry — I just have a few quick questions about your property to get a quote started. Are you available?" },
      { speaker: "AI",   ts: "1:35 PM", text: "Feel free to reply whenever — we're here when you're ready!" },
    ],
  },
  {
    id: 15,
    name: "Joe Pavelski",
    type: "Dallas",
    phone: "(972) 555-0325",
    status: "Qualified",
    lastMessage: "Will do. Thanks a lot, Linda.",
    lastMessageFrom: "Lead",
    time: "2:21 PM",
    unread: false,
    messages: [
      { speaker: "AI",   ts: "2:00 PM", text: "Hi Joe! This is Linda from Taylor Appleseed Farmers Insurance. We received your home insurance inquiry and I'd love to gather a few details about your property so we can get an accurate quote together. Is now a good time?" },
      { speaker: "Lead", ts: "2:02 PM", text: "Yes, go right ahead." },
      { speaker: "AI",   ts: "2:02 PM", text: "What's the address of the home?" },
      { speaker: "Lead", ts: "2:03 PM", text: "9808 Coolidge Drive, McKinney, TX 75072." },
      { speaker: "AI",   ts: "2:04 PM", text: "Is it a single-family home you own and use as your primary residence?" },
      { speaker: "Lead", ts: "2:05 PM", text: "Yes, been here about five years." },
      { speaker: "AI",   ts: "2:06 PM", text: "Do you know when it was built and the type of roof?" },
      { speaker: "Lead", ts: "2:07 PM", text: "2003. Shingle roof — I replaced it about four years ago." },
      { speaker: "AI",   ts: "2:08 PM", text: "A newer roof is a great asset — that could actually lower your rate. Does the home have a pool or any large structures?" },
      { speaker: "Lead", ts: "2:09 PM", text: "No pool. Attached two-car garage and a covered back porch." },
      { speaker: "AI",   ts: "2:10 PM", text: "Perfect. Who are you currently insured with and what are you paying annually?" },
      { speaker: "Lead", ts: "2:12 PM", text: "Still with Farmers actually, but I was recently quoted cheaper elsewhere. Paying $3,600 a year now." },
      { speaker: "AI",   ts: "2:13 PM", text: "We'll make sure to beat that — especially with a newer roof working in your favor. Would you like to bundle home and auto?" },
      { speaker: "Lead", ts: "2:15 PM", text: "Yes, please include the auto." },
      { speaker: "AI",   ts: "2:17 PM", text: "Great. I have everything I need, Joe. Mason will email you a proposal in a few minutes — home quote with credit for the new roof, an auto bundle, and a direct comparison to your current rate." },
      { speaker: "Lead", ts: "2:21 PM", text: "Will do. Thanks a lot, Linda." },
    ],
  },
  {
    id: 16,
    name: "Sarah Nurse",
    type: "NewYork",
    phone: "(646) 555-0336",
    status: "Needs Follow-up",
    lastMessage: "That's really helpful — let me confirm the closing date and I'll get back to you.",
    lastMessageFrom: "Lead",
    time: "2:55 PM",
    unread: true,
    messages: [
      { speaker: "AI",   ts: "2:30 PM", text: "Hi Sarah! This is Linda from Taylor Appleseed Farmers Insurance. We received your inquiry about home insurance. I'd love to ask a few quick questions about the property — do you have a couple of minutes?" },
      { speaker: "Lead", ts: "2:32 PM", text: "Yes, sure." },
      { speaker: "AI",   ts: "2:32 PM", text: "What's the address of the home you'd like to insure?" },
      { speaker: "Lead", ts: "2:33 PM", text: "9808 Coolidge Drive, McKinney TX 75072." },
      { speaker: "AI",   ts: "2:34 PM", text: "Is this a home you currently own, or are you purchasing it?" },
      { speaker: "Lead", ts: "2:36 PM", text: "I'm actually in the process of buying it — closing is next month." },
      { speaker: "AI",   ts: "2:37 PM", text: "Congratulations on the purchase! Just so you know, your lender will require proof of insurance before closing — so it's actually perfect timing to get a quote now. Do you know the closing date yet?" },
      { speaker: "Lead", ts: "2:40 PM", text: "I think it's around the 15th but I need to confirm." },
      { speaker: "AI",   ts: "2:42 PM", text: "No problem — we can set the policy start date to align with your closing so there's no gap. Do you know if the home has a pool or any special features?" },
      { speaker: "Lead", ts: "2:44 PM", text: "No pool. It has an attached garage and a covered porch." },
      { speaker: "AI",   ts: "2:46 PM", text: "Perfect. And do you know the roof type or year built? Our team can pull a lot from public records, but anything you have helps." },
      { speaker: "Lead", ts: "2:48 PM", text: "Built in 2003. I think it's a shingle roof based on the inspection." },
      { speaker: "AI",   ts: "2:50 PM", text: "That's great. Once you confirm your closing date, Mason can get a formal proposal ready that's timed to your closing. Would you want to bundle home and auto as well?" },
      { speaker: "Lead", ts: "2:55 PM", text: "That's really helpful — let me confirm the closing date and I'll get back to you." },
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
      {/* Page heading */}
      <div className="flex items-center gap-3 px-6 pt-4 pb-2 bg-white shrink-0">
        <h2 className="text-xl font-semibold text-[#37322F]">Lead Qualifier</h2>
        <p className="text-xs text-gray-400"><span className="font-medium text-gray-500">How it works:</span> Ensures all information pulled regarding a lead is accurate using real-time back-and-forth conversation.</p>
      </div>
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
