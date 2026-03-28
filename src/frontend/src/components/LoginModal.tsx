import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export function LoginModal({ open, onClose }: LoginModalProps) {
  const { login, isLoggingIn, isLoginSuccess, identity } =
    useInternetIdentity();
  const [clicked, setClicked] = useState(false);

  const handleLogin = () => {
    setClicked(true);
    login();
  };

  // Close when login succeeds
  if (isLoginSuccess && identity && clicked) {
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-md"
        style={{
          background: "#1a0000",
          border: "1px solid rgba(255,0,0,0.3)",
          color: "white",
        }}
        data-ocid="login.modal"
      >
        <DialogHeader>
          <DialogTitle className="text-white text-2xl font-heading text-center">
            Sign In to TrendiVault
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6 py-6">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #ff4444, #cc0000)" }}
          >
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>

          <div className="text-center space-y-2">
            <p className="text-white/80 text-sm">
              TrendiVault uses Internet Identity — a secure, passwordless login
              system.
            </p>
            <p className="text-white/60 text-xs">
              No email or password required. Login securely with your device.
            </p>
          </div>

          <Button
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="w-full h-12 text-base font-bold"
            style={{
              background: "linear-gradient(135deg, #ff4444, #cc0000)",
              border: "none",
              color: "white",
            }}
            data-ocid="login.primary_button"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In Securely"
            )}
          </Button>

          <Button
            variant="ghost"
            onClick={onClose}
            className="text-white/60 hover:text-white hover:bg-white/10"
            data-ocid="login.cancel_button"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
