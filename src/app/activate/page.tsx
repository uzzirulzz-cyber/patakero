"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { ShieldCheck, User, Mail, Phone, KeyRound, Loader2 } from "lucide-react";

export default function ActivatePage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [loading, setLoading] = useState(true);
  const [validating, setValidating] = useState(false);
  const [inviteData, setInviteData] = useState<any>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setError("Invalid invitation link. No token provided.");
      setLoading(false);
      return;
    }

    fetch(`/api/activate?token=${encodeURIComponent(token)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setInviteData(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to validate invitation link");
        setLoading(false);
      });
  }, [token]);

  const handleActivate = async () => {
    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setValidating(true);
    try {
      const res = await fetch("/api/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Activation failed");
      } else {
        toast.success("Account activated successfully!");
        window.location.href = "/admin";
      }
    } catch {
      toast.error("Network error");
    } finally {
      setValidating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <ShieldCheck className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">Invalid Link</h2>
            <p className="text-sm text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary/30 via-primary/10 to-accent/25 ring-1 ring-primary/30 shadow-lg mb-4">
            <ShieldCheck className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Activate Your Account</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Join {inviteData?.organization?.name || "your organization"}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Invitation Details</CardTitle>
            <CardDescription>Review your information and set a password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/40">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-xs text-muted-foreground">Name</div>
                  <div className="text-sm font-medium">{inviteData?.invitee?.name}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/40">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-xs text-muted-foreground">Email</div>
                  <div className="text-sm font-medium">{inviteData?.invitee?.email}</div>
                </div>
              </div>
              {inviteData?.invitee?.phone && (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/40">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Phone</div>
                    <div className="text-sm font-medium">{inviteData?.invitee?.phone}</div>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/40">
                <KeyRound className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-xs text-muted-foreground">Role</div>
                  <div className="text-sm font-medium capitalize">{inviteData?.invitee?.role}</div>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-border/40">
              <div className="space-y-1.5">
                <label className="text-xs font-medium">Set Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium">Confirm Password</label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat password"
                />
              </div>
            </div>

            <Button
              className="w-full"
              onClick={handleActivate}
              disabled={validating}
            >
              {validating ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Activate Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
