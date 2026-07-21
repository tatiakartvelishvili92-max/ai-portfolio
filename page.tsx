"use client";

import { useMemo, useState } from "react";

type Category = "All" | "Automation" | "RAG";

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
];

const stackGroups = [
  { label: "Orchestration", tools: ["n8n", "Latenode", "Telegram Bots", "Workflow Design"] },
  { label: "AI & Knowledge", tools: ["Gemini", "IBM Watson AI", "ElevenLabs", "RAG", "Chroma", "Embeddings"] },
  { label: "Data & Integration", tools: ["REST APIs", "JSON", "Google Sheets", "Webhooks", "JavaScript"] },
  { label: "Enterprise Context", tools: ["Genesys Cloud", "Verint", "SaaS Delivery", "Solution Design"] },
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
        <nav aria-label="Main navigation"><a href="#work">Work</a><a href="#labs">Labs</a><a href="#stack">Stack</a><a href="#about">About</a><a href="#contact">Contact</a></nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy reveal">
          <p className="eyebrow">AI AUTOMATION · RAG · ENTERPRISE SYSTEMS</p>
          <h1>I turn complex business processes into working AI systems<span>.</span></h1>
          <p className="hero-intro">I design enterprise SaaS, automation and AI solutions that move from complex requirements to clear, usable outcomes.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">Explore projects <Arrow /></a>
            <a className="button button-secondary" href="#stack">View technology stack <Arrow diagonal /></a>
          </div>
        </div>

        <div className="system-map" aria-label="Diagram showing a retrieval augmented AI system">
          <div className="map-label map-label-sources">SOURCES</div>
          <div className="source-list"><span>Documents</span><span>Databases</span><span>APIs</span><span>Web</span></div>
          <div className="flow-line line-a" /><div className="flow-line line-b" /><div className="flow-line line-c" />
          <div className="flow-node ingest">Ingest<br />&amp; prepare</div>
          <div className="flow-node rag">RAG<br />engine</div>
          <div className="flow-node response">Response<br />generation</div>
          <div className="flow-node retrieval">Retrieval</div>
          <div className="flow-node knowledge">Knowledge store</div>
          <div className="map-output">Answers<br />&amp; actions <Arrow /></div>
          <div className="status-dot status-blue" /><div className="status-dot status-coral" />
          <p className="diagram-note">Strategy → system → measurable outcome</p>
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-heading">
          <div><p className="section-kicker">SELECTED SYSTEMS / 2026</p><h2>Projects built around real decisions.</h2></div>
          <p>Each project combines business logic, automation and AI where it adds value — while keeping critical decisions explainable and reviewable.</p>
        </div>
        <div className="filter-row" aria-label="Filter projects">
          {(["All", "Automation", "RAG"] as Category[]).map((item) => (
            <button className={filter === item ? "filter active" : "filter"} key={item} onClick={() => { setFilter(item); setOpenProject(null); }} type="button" aria-pressed={filter === item}>{item}</button>
          ))}
          <span className="project-count">{visibleProjects.length.toString().padStart(2, "0")} projects</span>
        </div>
        <div className="project-list">
          {visibleProjects.map((project) => {
            const isOpen = openProject === project.title;
            return (
              <article className={isOpen ? "project-card open" : "project-card"} key={project.title}>
                <button className="project-summary" type="button" aria-expanded={isOpen} onClick={() => setOpenProject(isOpen ? null : project.title)}>
                  <span className="project-number">{project.number}</span>
                  <span className="project-main"><span className="project-meta">{project.category}</span><strong>{project.title}</strong><span className="project-description">{project.summary}</span></span>
                  <span className="project-toggle" aria-hidden="true">{isOpen ? "−" : "+"}</span>
                </button>
                <div className="project-details" aria-hidden={!isOpen}>
                  <div><span>Challenge</span><p>{project.challenge}</p></div>
                  <div><span>System</span><p>{project.system}</p></div>
                  <div className="result-cell"><span>Result</span><p>{project.result}</p></div>
                  <div className="tag-row">{project.stack.map((tool) => <span key={tool}>{tool}</span>)}</div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="labs-section" id="labs">
        <div className="labs-heading">
          <div>
            <p className="section-kicker">AI LABS / SMALL EXPERIMENTS</p>
            <h2>Learning by building.</h2>
          </div>
          <p>
            Focused n8n builds for testing conversational AI, voice services and
            audio processing across different platforms.
          </p>
        </div>
        <div className="labs-grid">
          {labs.map((lab) => (
            <article className="lab-card" key={lab.title}>
              <div className="lab-card-top">
                <span>{lab.number}</span>
                <span className="lab-status"><i /> EXPERIMENT</span>
              </div>
              <div className="lab-signal" aria-hidden="true">
                <span />
                <b>{lab.signal}</b>
                <span />
              </div>
              <h3>{lab.title}</h3>
              <p>{lab.description}</p>
              <div className="lab-tags">
                {lab.stack.map((tool) => <span key={tool}>{tool}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="stack-section" id="stack">
        <div className="stack-intro"><p className="section-kicker">TECHNOLOGY WITH A JOB TO DO</p><h2>From business rule to reliable workflow.</h2><p>The stack changes with the problem. The method stays consistent: understand the decision, make the logic explicit, connect the data and add AI only where it improves the outcome.</p></div>
        <div className="stack-grid">{stackGroups.map((group, index) => <article className="stack-group" key={group.label}><span className="stack-index">0{index + 1}</span><h3>{group.label}</h3><div className="stack-tools">{group.tools.map((tool) => <span key={tool}>{tool}</span>)}</div></article>)}</div>
      </section>

      <section className="about-section" id="about">
        <div className="about-statement">
          <p className="section-kicker">ABOUT ME</p>
          <h2>Business perspective.<br />Builder mindset.</h2>
          <p className="about-lead">I&apos;m Tatia Kartvelishvili, Head of Business Solutions Sales at VEZIRI, based in Tbilisi, Georgia.</p>
        </div>
        <div className="about-profile">
          <p>My background spans business consulting, enterprise software, solution design and project delivery. I work at the point where business needs meet technology, translating complex requirements into practical systems people can understand and use.</p>
          <p>Today, I&apos;m expanding that experience into AI automation and RAG: designing workflows that combine clear business logic, connected data and applied AI to solve real operational problems.</p>
          <div className="credential-list">
            <div><span>Current focus</span><strong>AI Automation · RAG · Generative AI</strong></div>
            <div><span>Professional context</span><strong>Enterprise SaaS · Genesys · Verint</strong></div>
            <div><span>In progress</span><strong>IBM Generative AI Engineering Professional Certificate</strong></div>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div>
          <p className="section-kicker">LET&apos;S CONNECT</p>
          <h2>Have a problem worth automating?</h2>
          <p>I&apos;m interested in AI automation, RAG and enterprise solution opportunities, including remote collaboration.</p>
        </div>
        <div className="contact-links">
          <a href="mailto:tatiakartvelishvili92@gmail.com"><span>Email</span><strong>tatiakartvelishvili92@gmail.com</strong><Arrow diagonal /></a>
          <a href="https://www.linkedin.com/in/tatiakartvelishvili/" target="_blank" rel="noreferrer"><span>LinkedIn</span><strong>View professional profile</strong><Arrow diagonal /></a>
          <a href="https://github.com/tatiakartvelishvili92-max" target="_blank" rel="noreferrer"><span>GitHub</span><strong>Explore my GitHub profile</strong><Arrow diagonal /></a>
        </div>
      </section>

      <footer><a className="wordmark" href="#top">TATIA <span>/</span> AI SYSTEMS</a><p>AI automation, RAG and enterprise solution design.</p><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}
