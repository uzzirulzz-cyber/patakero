"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignIn } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ShieldCheck, Lock, Globe, Radio } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const signIn = useSignIn();
  const [email, setEmail] = useState("admin");
  const [password, setPassword] = useState("playbeat123");

  const handleSignIn = async () => {
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }
    try {
      await signIn.mutateAsync({ email: email.trim(), password });
      toast.success("Signed in successfully");
      router.push("/admin");
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0f1729 0%, #1a2744 40%, #243656 70%, #0f1729 100%)" }}
    >
      {/* World Map Background SVG */}
      <div className="absolute inset-0 opacity-20">
        <svg viewBox="0 0 1200 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          {/* Simplified world map paths */}
          <defs>
            <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e3a5f" />
              <stop offset="100%" stopColor="#0f1729" />
            </linearGradient>
          </defs>
          {/* North America */}
          <path d="M150,80 Q250,60 320,90 Q350,120 340,180 Q300,220 250,210 Q180,200 140,160 Q120,120 150,80Z" 
            fill="none" stroke="#2d4a6f" strokeWidth="1" />
          {/* South America */}
          <path d="M280,250 Q320,240 340,280 Q350,350 320,420 Q280,450 260,400 Q240,320 280,250Z" 
            fill="none" stroke="#2d4a6f" strokeWidth="1" />
          {/* Europe */}
          <path d="M520,90 Q580,80 600,100 Q610,130 580,150 Q540,160 520,140 Q510,110 520,90Z" 
            fill="none" stroke="#2d4a6f" strokeWidth="1" />
          {/* Africa */}
          <path d="M520,180 Q580,170 600,210 Q610,300 570,360 Q520,380 500,320 Q490,240 520,180Z" 
            fill="none" stroke="#2d4a6f" strokeWidth="1" />
          {/* Asia */}
          <path d="M620,80 Q780,60 850,90 Q900,120 880,180 Q820,220 720,210 Q640,190 620,140Q620,80Z" 
            fill="none" stroke="#2d4a6f" strokeWidth="1" />
          {/* Australia */}
          <path d="M820,320 Q900,310 920,340 Q930,380 900,400 Q840,410 820,380Q810,340 820,320Z" 
            fill="none" stroke="#2d4a6f" strokeWidth="1" />

          {/* Grid lines */}
          {[100,200,300,400,500,600,700,800,900,1000,1100].map(x => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2="600" stroke="#1e3a5f" strokeWidth="0.5" opacity="0.3" />
          ))}
          {[50,150,250,350,450,550].map(y => (
            <line key={`h${y}`} x1="0" y1={y} x2="1200" y2={y} stroke="#1e3a5f" strokeWidth="0.5" opacity="0.3" />
          ))}

          {/* Glowing data points - teal */}
          <circle cx="280" cy="140" r="4" fill="#14b8a6" opacity="0.8">
            <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="560" cy="120" r="3" fill="#14b8a6" opacity="0.6">
            <animate attributeName="r" values="3;6;3" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="750" cy="150" r="5" fill="#14b8a6" opacity="0.7">
            <animate attributeName="r" values="5;10;5" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="300" cy="350" r="4" fill="#14b8a6" opacity="0.6">
            <animate attributeName="r" values="4;7;4" dur="2.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="860" cy="360" r="3" fill="#14b8a6" opacity="0.5">
            <animate attributeName="r" values="3;6;3" dur="2.8s" repeatCount="indefinite" />
          </circle>

          {/* Orange/amber accent circles */}
          <circle cx="450" cy="200" r="6" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.4">
            <animate attributeName="r" values="6;12;6" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0.1;0.4" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="680" cy="280" r="5" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.3">
            <animate attributeName="r" values="5;10;5" dur="3.5s" repeatCount="indefinite" />
          </circle>

          {/* Connection lines */}
          <line x1="280" y1="140" x2="560" y2="120" stroke="#14b8a6" strokeWidth="0.5" opacity="0.2" />
          <line x1="560" y1="120" x2="750" y2="150" stroke="#14b8a6" strokeWidth="0.5" opacity="0.2" />
          <line x1="280" y1="140" x2="300" y2="350" stroke="#14b8a6" strokeWidth="0.5" opacity="0.15" />
          <line x1="750" y1="150" x2="860" y2="360" stroke="#14b8a6" strokeWidth="0.5" opacity="0.15" />

          {/* Hexagonal patterns */}
          <g opacity="0.1" stroke="#14b8a6" strokeWidth="0.5" fill="none">
            <polygon points="400,100 410,90 420,100 420,115 410,125 400,115" />
            <polygon points="650,200 660,190 670,200 670,215 660,225 650,215" />
            <polygon points="900,300 910,290 920,300 920,315 910,325 900,315" />
          </g>

          {/* Data panel rectangles */}
          <rect x="480" y="80" width="40" height="25" rx="2" fill="none" stroke="#2d4a6f" strokeWidth="0.5" opacity="0.4" />
          <rect x="780" y="130" width="35" height="20" rx="2" fill="none" stroke="#2d4a6f" strokeWidth="0.5" opacity="0.4" />
          <rect x="320" y="320" width="30" height="18" rx="2" fill="none" stroke="#2d4a6f" strokeWidth="0.5" opacity="0.4" />
        </svg>
      </div>

      {/* Top gradient fade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0f1729] to-transparent z-10" />

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0f1729] to-transparent z-10" />

      {/* Login Container */}
      <div className="relative z-20 w-full max-w-sm px-6">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{ 
              background: "linear-gradient(135deg, rgba(20,184,166,0.2), rgba(6,182,212,0.1))",
              border: "1px solid rgba(20,184,166,0.3)",
              boxShadow: "0 0 30px rgba(20,184,166,0.15)"
            }}
          >
            <Globe className="h-8 w-8 text-[#14b8a6]" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Staff Portal</h1>
          <p className="text-sm text-[#94a3b8] mt-2">
            Global Operations Command Center
          </p>
        </div>

        {/* Admin Login Card */}
        <div 
          className="rounded-2xl p-6 space-y-5"
          style={{
            background: "linear-gradient(180deg, rgba(30,41,59,0.9), rgba(15,23,41,0.95))",
            border: "1px solid rgba(148,163,184,0.15)",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5), 0 0 40px rgba(20,184,166,0.05)"
          }}
        >
          <div className="flex items-center gap-2 pb-3 border-b border-[#334155]/50">
            <div className="h-8 w-8 rounded-lg flex items-center justify-center" 
              style={{ background: "rgba(20,184,166,0.15)" }}>
              <Lock className="h-4 w-4 text-[#14b8a6]" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Administrator</h2>
              <p className="text-[10px] text-[#64748b]">Secure authentication required</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#94a3b8]">Username</label>
              <Input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
                className="h-11 bg-[#0f1729] border-[#334155] text-white placeholder:text-[#475569] focus:border-[#14b8a6] focus:ring-[#14b8a6]/20"
                placeholder="Enter username"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#94a3b8]">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
                className="h-11 bg-[#0f1729] border-[#334155] text-white placeholder:text-[#475569] focus:border-[#14b8a6] focus:ring-[#14b8a6]/20"
                placeholder="Enter password"
              />
            </div>
          </div>

          <Button
            className="w-full h-11 cursor-pointer font-semibold text-sm"
            style={{ 
              background: "linear-gradient(135deg, #14b8a6, #0d9488)",
              boxShadow: "0 4px 14px rgba(20,184,166,0.3)"
            }}
            onClick={handleSignIn}
            disabled={signIn.isPending}
          >
            {signIn.isPending ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Authenticating…
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Radio className="h-4 w-4" />
                Access Command Center
              </span>
            )}
          </Button>
        </div>

        <p className="text-center text-[11px] text-[#475569] mt-6">
          <ShieldCheck className="h-3 w-3 inline mr-1" />
          Authorized personnel only. All access is logged and monitored.
        </p>
      </div>
    </div>
  );
}
