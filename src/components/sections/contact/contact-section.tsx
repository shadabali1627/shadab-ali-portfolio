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
    <section id="contact" className="py-section bg-bg-surface1 relative border-t border-border-default overflow-hidden">
      {/* Subtle ambient background glow */}
      <div className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-accent-indigo/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12 relative z-10">
        
        <div>
          <SectionLabel label="CONTACT" />
          <h2 className="text-h1 font-display text-text-primary mt-4 mb-6">
            Let's build something together.
          </h2>
          <p className="text-text-secondary text-lg mb-10">
            Interested in working together or have a question? Drop me a message and I'll get back to you.
          </p>
          
          <div className="flex flex-col gap-6">
            {/* Email Block */}
            <a href={`mailto:${email}`} className="group flex items-center gap-5 p-4 rounded-xl border border-transparent hover:border-accent-indigo/20 hover:bg-bg-surface2 transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-indigo/10 text-accent-indigo group-hover:bg-accent-indigo/20 group-hover:scale-110 transition-all duration-300">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-mono text-text-muted mb-1">Email</p>
                <p className="text-text-primary font-medium">{email}</p>
              </div>
            </a>

            {/* Phone Block */}
            {data?.phone && (
              <a href={`tel:${data.phone}`} className="group flex items-center gap-5 p-4 rounded-xl border border-transparent hover:border-accent-indigo/20 hover:bg-bg-surface2 transition-all duration-300">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-indigo/10 text-accent-indigo group-hover:bg-accent-indigo/20 group-hover:scale-110 transition-all duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-mono text-text-muted mb-1">Phone</p>
                  <p className="text-text-primary font-medium">{data.phone}</p>
                </div>
              </a>
            )}

            {/* Location Block */}
            {data?.location && (
              <div className="group flex items-center gap-5 p-4 rounded-xl border border-transparent hover:border-accent-indigo/20 hover:bg-bg-surface2 transition-all duration-300 cursor-default">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-indigo/10 text-accent-indigo group-hover:bg-accent-indigo/20 group-hover:scale-110 transition-all duration-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-mono text-text-muted mb-1">Location</p>
                  <p className="text-text-primary font-medium">{data.location}</p>
                </div>
              </div>
            )}
            
            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="mt-6 pt-8 border-t border-border-default">
                <h3 className="text-sm font-medium text-text-primary mb-5 uppercase tracking-wider">Connect on Social</h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((link: any, idx: number) => (
                    <a 
                      key={idx} 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-4 py-2 rounded-full bg-bg-surface2 border border-border-default text-sm text-text-secondary hover:text-white hover:border-accent-indigo hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] hover:-translate-y-0.5 transition-all duration-300"
                    >
                      {link.platform}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="bg-bg-page/50 backdrop-blur-md border border-border-default rounded-2xl p-8 shadow-2xl relative group">
            {/* Form Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-indigo/5 to-accent-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <form className="relative flex flex-col gap-6" action={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-text-primary">Name</label>
                <Input name="name" required placeholder="John Doe" className="bg-bg-surface1" />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-text-primary">Email</label>
                <Input name="email" type="email" required placeholder="john@example.com" className="bg-bg-surface1" />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-text-primary">Message</label>
                <Textarea name="message" required placeholder="How can I help you?" rows={4} className="bg-bg-surface1" />
              </div>

              {status.message && (
                <div className={`flex items-start gap-3 p-4 rounded-lg text-sm border ${status.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                  {status.type === 'success' ? <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />}
                  <p className="leading-relaxed">{status.message}</p>
                </div>
              )}

              <Button type="submit" variant="primary" className="w-full mt-2 h-12 flex items-center justify-center gap-2 group/btn" disabled={pending}>
                {pending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
