'use client';

// STITCH PROJECT: 4229877773298364915
// MCP SYNC: PENDING — scaffold generated from spec
// Re-run import prompt after MCP connection is restored

import React, { useState } from 'react';
import { SectionLabel, Button, Input, Textarea } from '@/components/ui';
import { submitContactForm } from '@/app/actions/contact';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface ContactSectionProps {
  data?: any;
  profile?: any;
}

export function ContactSection({ data, profile }: ContactSectionProps) {
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setStatus({ type: null, message: '' });
    
    const result = await submitContactForm(formData);
    
    if (result.error) {
      setStatus({ type: 'error', message: result.error });
    } else {
      setStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
    }
    
    setPending(false);
  }

  const email = data?.email || "hello@example.com";
  const socialLinks = profile?.socialLinks || [];

  return (
    <section id="contact" className="py-24 bg-[#030305] relative border-t border-white/[0.06] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute left-1/4 top-1/2 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-14">
          <SectionLabel label="CONTACT" className="mb-3" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mt-3">
            Let's build something together.
          </h2>
          <p className="mt-2 text-slate-400 text-base md:text-lg max-w-xl">
            Interested in collaborating on AI agents, distributed systems, or engineering leadership? Drop me a line below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Info Bento Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Email Card */}
            <a 
              href={`mailto:${email}`} 
              className="group p-6 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl hover:border-indigo-500/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.12)] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-5"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/40 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Direct Email</p>
                <p className="text-white font-medium text-sm sm:text-base truncate group-hover:text-indigo-200 transition-colors">{email}</p>
              </div>
            </a>

            {/* Phone Card */}
            {data?.phone && (
              <a 
                href={`tel:${data.phone}`} 
                className="group p-6 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl hover:border-indigo-500/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.12)] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-5"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/40 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Phone / WhatsApp</p>
                  <p className="text-white font-medium text-sm sm:text-base truncate group-hover:text-indigo-200 transition-colors">{data.phone}</p>
                </div>
              </a>
            )}

            {/* Location Card */}
            {data?.location && (
              <div className="group p-6 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl flex items-center gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Current Base</p>
                  <p className="text-white font-medium text-sm sm:text-base truncate">{data.location}</p>
                </div>
              </div>
            )}

            {/* Social Links Bento */}
            {socialLinks.length > 0 && (
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl">
                <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">Connect on Social</p>
                <div className="flex flex-wrap gap-2.5">
                  {socialLinks.map((link: any, idx: number) => (
                    <a 
                      key={idx} 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:bg-white/[0.08] hover:border-indigo-500/40 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] hover:-translate-y-0.5 transition-all duration-300"
                    >
                      {link.platform}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Modern Frosted Glass Form Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-2xl p-6 sm:p-8 md:p-10 shadow-[0_16px_50px_-10px_rgba(0,0,0,0.7)] relative group">
              <div className="mb-6 flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Send Direct Inquiry</span>
                <span className="text-[11px] font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">Response in &lt; 24h</span>
              </div>

              <form className="flex flex-col gap-5" action={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-slate-300 tracking-wide">Your Name</label>
                    <input 
                      name="name" 
                      required 
                      placeholder="e.g. Alex Miller" 
                      className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-indigo-500/60 focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-slate-300 tracking-wide">Your Email</label>
                    <input 
                      name="email" 
                      type="email" 
                      required 
                      placeholder="alex@company.com" 
                      className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-indigo-500/60 focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono text-slate-300 tracking-wide">Message / Project Brief</label>
                  <textarea 
                    name="message" 
                    required 
                    placeholder="Tell me about your project, timeline, or idea..." 
                    rows={4} 
                    className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-indigo-500/60 focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all resize-none"
                  />
                </div>

                {status.message && (
                  <div className={`flex items-start gap-3 p-4 rounded-2xl text-sm border backdrop-blur-md ${status.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
                    {status.type === 'success' ? <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />}
                    <p className="leading-relaxed">{status.message}</p>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={pending}
                  className="w-full mt-2 h-12 flex items-center justify-center gap-2 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 shadow-[0_0_25px_rgba(99,102,241,0.35)] hover:shadow-[0_0_35px_rgba(99,102,241,0.55)] hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 transition-all duration-200 group/btn"
                >
                  {pending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
