"use client";

import { useMemo, useState } from "react";

type Category = "All" | "Automation" | "RAG" | "Voice AI";

const projects = [
  {
    number: "01", title: "License Risk Monitor", category: "Automation" as const,
    summary: "A multi-client renewal tracker that separates annual payment risk from final contract expiration and turns each scenario into a clear next action.",
    challenge: "Renewal dates, payment status, notice periods and client-specific details lived in spreadsheets but required repeated manual interpretation.",
    system: "Rule-based JavaScript classifies risk first; an AI layer then creates a concise summary, recommended action and review-ready client or vendor message.",
    result: "One explainable monitoring flow for contracts, payment dates and reminders — without asking the model to re-decide established business rules.",
    stack: ["n8n", "Google Sheets", "Gemini", "JavaScript", "Telegram"],
  },
  {
    number: "02", title: "RAG Business Analyst", category: "RAG" as const,
    summary: "A retrieval-augmented assistant that searches a controlled knowledge base before answering business-analysis questions.",
    challenge: "Generic model answers were not enough for questions that depended on project documents, requirements and organisation-specific context.",
    system: "Documents are chunked and indexed for semantic retrieval; the model receives the most relevant context and responds within that evidence boundary.",
    result: "Grounded, context-aware answers that connect business questions to the underlying source material instead of relying on model memory alone.",
    stack: ["Gemini", "Chroma", "Embeddings", "Prompt Design", "RAG"],
  },
  {
    number: "03", title: "Nutrition Intelligence", category: "Automation" as const,
    summary: "A conversational food tracker that converts a Telegram message into a structured calorie and macro log.",
    challenge: "Natural-language portions, personal products and generic foods all needed different matching and conversion logic before nutrition data could be trusted.",
    system: "The workflow checks a personal product list first, falls back to USDA data, normalises quantities and generates a daily intake summary.",
    result: "A single chat-based flow for product matching, nutrient lookup, unit normalisation, logging and progress reporting.",
    stack: ["n8n", "Telegram", "Google Sheets", "USDA API", "JavaScript"],
  },
  {
    number: "04", title: "Job Search Automation", category: "Automation" as const,
    summary: "An AI-assisted workflow for collecting opportunities, screening relevance and structuring the next step in a remote-role search.",
    challenge: "Finding strong-fit roles repeatedly meant moving between multiple sources and re-evaluating the same criteria by hand.",
    system: "The workflow collects role data, applies relevance criteria and uses an LLM to turn raw listings into a consistent, reviewable shortlist.",
    result: "A repeatable pipeline that reduces scanning overhead while keeping final role selection and outreach decisions human-controlled.",
    stack: ["Latenode", "Gemini", "APIs", "Structured Data", "Automation"],
  },
  {
    number: "05", title: "Spotify Playlist Generator", category: "Automation" as const,
    summary: "A personal n8n automation that turns a natural-language music request into a ready Spotify playlist.",
    challenge: "Building a playlist around a mood or activity required repeated searching, reviewing and adding tracks by hand.",
    system: "The workflow interprets the request, searches Spotify, assembles matching tracks and creates the playlist through authenticated Spotify actions.",
    result: "A reusable personal workflow that moves from a short prompt to a playlist and adapts to different moods and listening contexts.",
    stack: ["n8n", "Spotify API", "AI Agent", "OAuth", "Prompting"],
  },
  {
    number: "06", title: "Georgian AI Voice Agent", category: "Voice AI" as const,
    summary: "An end-to-end Georgian-speaking AI phone agent that handles customer conversations, captures sales interest and turns calls into actionable follow-ups.",
    challenge: "Delivering a natural Georgian-language phone conversation meant connecting real-time telephony, speech recognition, conversational AI, speech synthesis and downstream business actions without losing context.",
    system: "Genesys Cloud CX receives and manages the customer call, then connects over SIP to AudioCodes Live Hub, the AI-agent orchestrator. Google Chirp 3 transcribes Georgian speech; a Gemini language model generates context-aware replies; ElevenLabs converts replies into natural-sounding speech. After the conversation, automation delivers a sales-lead notification to Telegram and generates a structured post-call summary and analysis.",
    result: "Designed, integrated and demonstrated a working proof of concept with an insurance sales conversation in Georgian, Telegram lead notification and AI-generated post-call insights. This is an independently built demo, not a production customer deployment.",
    stack: ["Genesys Cloud CX", "AudioCodes Live Hub", "SIP", "Google Chirp 3", "Gemini", "ElevenLabs", "Telegram"],
  },
];

const stackGroups = [
  { label: "Orchestration", tools: ["n8n", "Latenode", "Telegram Bots", "Workflow Design"] },
  { label: "AI & Knowledge", tools: ["Gemini", "IBM Watson AI", "ElevenLabs", "RAG", "Chroma", "Embeddings"] },
  { label: "Data & Integration", tools: ["REST APIs", "JSON", "Google Sheets", "Webhooks", "JavaScript"] },
  { label: "Enterprise Context", tools: ["Genesys Cloud", "AudioCodes Live Hub", "Voice AI", "Verint", "SaaS Delivery", "Solution Design"] },
];

const labs = [
  {
    number: "L/01",
    title: "AI Chatbot Workflow",
    description:
      "An n8n chatbot workflow built to explore conversational logic, AI-generated responses and voice interaction using ElevenLabs and IBM Watson AI.",
    stack: ["n8n", "ElevenLabs", "IBM Watson AI", "Webhooks"],
    signal: "MESSAGE → AI LOGIC → VOICE RESPONSE",
  },
  {
    number: "L/02",
    title: "Speech-to-Text Workflow",
    description:
      "An n8n audio workflow using ElevenLabs and IBM Watson AI to turn spoken input into structured text ready for downstream automation.",
    stack: ["n8n", "ElevenLabs", "IBM Watson AI", "Speech-to-Text"],
    signal: "AUDIO → TRANSCRIPT → ACTION",
  },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

export default function Home() {
  const [filter, setFilter] = useState<Category>("All");
  const [openProject, setOpenProject] = useState<string | null>(null);
  const visibleProjects = useMemo(() => filter === "All" ? projects : projects.filter((project) => project.category === filter), [filter]);

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Tatia AI Systems home">TATIA <span>/</span> AI SYSTEMS</a>
