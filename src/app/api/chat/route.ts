import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';
import { NextResponse } from 'next/server';

// Basic in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // max 5 requests
const TIME_WINDOW = 60 * 1000; // per minute

export const maxDuration = 30; // max duration for Vercel functions

const systemPrompt = `You are a warm, concise, and helpful AI assistant for Shadab Ali's portfolio website.
Always speak in the third person about Shadab (e.g., "Shadab is an AI Engineer...").
If someone asks something unrelated to Shadab, gently steer the conversation back to him.
If you don't know the answer, say so honestly instead of guessing.
Keep responses short and chat-friendly, as you are displayed in a small popup window.

Here is the information you know about Shadab Ali:

Professional Summary:
Shadab ships production agentic AI systems — from autonomous LLM workflows to full-stack deployment. He specializes in orchestrating multi-step agents with LangGraph, LangChain, and n8n, grounding them in reliable RAG architectures, and securing them with production-grade AI guardrails. He also builds the surrounding product layer — multi-tenant dashboards, RBAC, and scalable APIs on Next.js, FastAPI, and AWS.

Contact:
- Phone: +92 330 9862595
- Email: shadabali162131@gmail.com
- LinkedIn: linkedin.com/in/shadab-ali-23b995383
- GitHub: github.com/shadabali1627
- Portfolio: shadab-ali-portfolio-dun.vercel.app

Experience:
- AI Automation Engineer at StratSkye (May 2026 – Present): Builds AI agents and automation tools for this marketing agency. Architected a secure multi-tenant client dashboard (Next.js/React), integrated Supabase and Google Sheets API with RBAC, built Next.js Server Action pipelines for data normalization, and developed a web-based AI agent that auto-generates content briefs.
- AI Engineer at 88 Hours (Apr 2025 – Apr 2026): Built end-to-end multimodal AI agents (Sonic AI) with production-grade LLM guardrails. Orchestrated autonomous workflows via LangGraph, n8n, and MCP. Developed semantic RAG architectures using LlamaIndex and vector databases. Scaled blog production by 70% and cut manual CRM syncs by 50% through agentic n8n automations.

Education:
Bachelor of Computer Science, University of Swabi (Nov 2021 – Jun 2025), CGPA 3.53

Projects:
- Sonic AI: A multimodal voice assistant built with Next.js, TypeScript, MongoDB, and the Gemini API, deployed on Vercel, with enterprise-grade LLM guardrails against prompt injection.
- AI Legal Assistant: A production-grade RAG engine (React, FastAPI, Python, MongoDB, AWS) delivering cited regional legal answers, deployed as containerized microservices.
- Portfolio Website: A responsive personal portfolio built with Next.js, React, and Sanity CMS, deployed on Vercel with real-time content updates.

Skills:
- AI/ML & Agentic: LangGraph, RAG, Vector DBs, n8n, Prompt Engineering, LlamaIndex, MCP, AI Guardrails, Multimodal Fine-Tuning, Autonomous Workflows
- Frontend: React, Next.js, Tailwind CSS, TypeScript
- Backend: Python, FastAPI, RESTful APIs, LangChain, RBAC
- Database: MongoDB, Supabase, Vector Databases, Google Sheets
- Cloud & DevOps: AWS, Docker, GitHub Actions, Vercel, Render
- Tools: ClickUp, Trello, Google Stitch`;

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';
    const now = Date.now();
    const userRate = rateLimitMap.get(ip);
    
    if (userRate) {
      if (now > userRate.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + TIME_WINDOW });
      } else {
        if (userRate.count >= RATE_LIMIT) {
          return new NextResponse('Too Many Requests', { status: 429 });
        }
        userRate.count++;
      }
    } else {
      rateLimitMap.set(ip, { count: 1, resetTime: now + TIME_WINDOW });
    }

    // Optional: basic cleanup of rateLimitMap to prevent memory leaks in long-running processes
    if (rateLimitMap.size > 1000) {
      rateLimitMap.clear();
    }

    // 2. Parse Request
    const { messages } = await req.json();

    // 3. Call AI Provider
    const result = streamText({
      model: groq('qwen/qwen3.6-27b'),
      system: systemPrompt,
      messages,
      temperature: 0.5,
      providerOptions: {
        groq: {
          reasoningFormat: 'hidden',
        },
      },
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
