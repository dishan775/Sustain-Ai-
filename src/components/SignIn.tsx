import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Lock,
  Mail,
  Building2,
  User,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  KeyRound,
  AlertCircle,
  Leaf,
  TreePine,
  Wind,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import authIllustration from '@/assets/auth_illustration.png';

interface SignInProps {
  onBack: () => void;
}

type AuthMode = 'signin' | 'signup';

/* ── Floating clay blob decoration ── */
function ClayBlob({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -8, 0], rotate: [0, 2, -2, 0] }}
      transition={{ duration: 6, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}

/* ── Animated leaf particles for left panel ── */
function FloatingLeaf({ style, delay }: { style: React.CSSProperties; delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={style}
      animate={{
        y: [0, -20, 0],
        x: [0, 10, -5, 0],
        rotate: [0, 15, -10, 0],
        opacity: [0.4, 0.8, 0.4],
      }}
      transition={{ duration: 8, repeat: Infinity, delay, ease: 'easeInOut' }}
    >
      <Leaf size={16} className="text-sustain-emerald/60" />
    </motion.div>
  );
}

/* ── Clay Morph Input Component ── */
const ClayInput = ({
  icon: Icon,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = true,
  showToggle,
  onToggle,
  isVisible,
}: {
  icon: React.ComponentType<any>;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  showToggle?: boolean;
  onToggle?: () => void;
  isVisible?: boolean;
}) => (
  <div className="group">
    <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-sustain-muted/80 mb-1.5 ml-1">
      {label}
    </label>
    <div className="relative">
      <Icon
        size={16}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sustain-emerald transition-colors duration-300"
      />
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-11 pr-4 py-3 bg-[#F1F5F3] border-2 border-transparent rounded-2xl text-sm text-sustain-ink placeholder:text-slate-400/70 focus:bg-white focus:border-sustain-emerald/40 focus:shadow-[0_0_0_4px_rgba(34,197,94,0.08),0_8px_24px_-8px_rgba(34,197,94,0.12)] transition-all duration-300 outline-none font-medium"
        style={{
          paddingRight: showToggle ? '44px' : '16px',
        }}
      />
      {showToggle && (
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-sustain-emerald p-1.5 rounded-xl hover:bg-sustain-emerald/10 transition-all duration-200"
          aria-label="Toggle visibility"
        >
          {isVisible ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      )}
    </div>
  </div>
);

export default function SignIn({ onBack }: SignInProps) {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [organization, setOrganization] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeNewsletter, setAgreeNewsletter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotEmailSent, setForgotEmailSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('Please enter your email address');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password');
      return;
    }
    if (mode === 'signup') {
      if (!firstName || !lastName) {
        setErrorMessage('Please enter your full name');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match');
        return;
      }
      if (!agreeTerms) {
        setErrorMessage('Please agree to the Terms & Privacy Policy');
        return;
      }
    }

    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1800);
    }, 1200);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('Please provide your email to reset password');
      return;
    }
    setForgotEmailSent(true);
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setErrorMessage('');
    setIsSuccess(false);
  };



  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 md:p-6 selection:bg-sustain-emerald/30 selection:text-sustain-ink relative overflow-hidden">
      {/* ── Subtle ambient background ── */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-[30%] -right-[10%] w-[800px] h-[800px] rounded-full bg-sustain-emerald/[0.04] blur-[120px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-sustain-ocean/[0.03] blur-[100px]" />
      </div>

      {/* ── Back Button (floating) ── */}
      <motion.button
        onClick={onBack}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="fixed top-6 left-6 z-50 inline-flex items-center gap-2 text-sm font-medium text-sustain-muted hover:text-sustain-ink bg-white/90 backdrop-blur-xl px-4 py-2.5 rounded-2xl border border-slate-200/60 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)] transition-all hover:bg-white hover:shadow-[0_8px_24px_-6px_rgba(0,0,0,0.1)] active:scale-95 group"
      >
        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
        <span>Home</span>
      </motion.button>

      {/* ── Main Card Container ── */}
      <motion.div
        className="relative z-10 w-full max-w-[1080px] min-h-[640px] grid lg:grid-cols-2 bg-white rounded-[32px] shadow-[0_40px_100px_-20px_rgba(15,23,42,0.08),0_0_0_1px_rgba(15,23,42,0.04)] overflow-hidden"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ════════════════════════════════════════════════════ */}
        {/* ── LEFT PANEL: Illustration Showcase ── */}
        {/* ════════════════════════════════════════════════════ */}
        <div className="relative hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-[#E8F5E9] via-[#E0F2E9] to-[#D1FAE5] overflow-hidden">
          {/* Clay morph decorative blobs */}
          <ClayBlob
            className="absolute top-[10%] right-[8%] w-20 h-20 rounded-[40%_60%_50%_50%] bg-sustain-emerald/15 blur-sm"
            delay={0}
          />
          <ClayBlob
            className="absolute bottom-[20%] left-[5%] w-16 h-16 rounded-[55%_45%_60%_40%] bg-sustain-ocean/10 blur-sm"
            delay={2}
          />
          <ClayBlob
            className="absolute top-[60%] right-[15%] w-12 h-12 rounded-[45%_55%_50%_50%] bg-sustain-amber/15 blur-[2px]"
            delay={4}
          />

          {/* Floating leaves */}
          <FloatingLeaf style={{ top: '15%', left: '75%' }} delay={0} />
          <FloatingLeaf style={{ top: '45%', left: '10%' }} delay={3} />
          <FloatingLeaf style={{ top: '70%', left: '80%' }} delay={1.5} />
          <FloatingLeaf style={{ top: '25%', left: '25%' }} delay={5} />

          {/* Dot grid subtle pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `radial-gradient(#0F172A 0.8px, transparent 0.8px)`,
              backgroundSize: '24px 24px',
            }}
          />

          {/* Top branding */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <span className="font-sans text-[28px] font-bold text-sustain-ink tracking-[-0.02em]">
                Sustain<span className="text-sustain-emerald">AI</span>
              </span>
            </motion.div>
          </div>

          {/* Center illustration */}
          <motion.div
            className="relative z-10 flex-1 flex items-center justify-center py-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              {/* Soft glow behind illustration */}
              <div className="absolute inset-0 scale-[0.85] rounded-full bg-sustain-emerald/10 blur-[50px]" />
              <img
                src={authIllustration}
                alt="SustainAI illustration"
                className="relative z-10 max-h-[340px] w-auto object-contain drop-shadow-[0_20px_40px_rgba(34,197,94,0.15)]"
              />
            </div>
          </motion.div>

          {/* Bottom text */}
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h2 className="text-[clamp(24px,3vw,32px)] font-bold text-sustain-ink tracking-[-0.03em] leading-[1.15]">
              Intelligence for
              <br />
              <span className="text-sustain-emerald">Sustainable</span> Cities
            </h2>
            <p className="mt-3 text-sm text-sustain-muted/80 leading-relaxed max-w-[320px]">
              Fusing computer vision, forecasting & reinforcement learning to help cities see, predict and act — in real time.
            </p>

            {/* Floating stat pills */}
            <div className="flex items-center gap-2.5 mt-5">
              {[
                { icon: TreePine, label: '18% Carbon Cut', color: 'text-sustain-emerald' },
                { icon: Wind, label: '24/7 Watch', color: 'text-sustain-ocean' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/70 backdrop-blur-sm rounded-full border border-white/80 shadow-[0_4px_12px_-4px_rgba(34,197,94,0.1)]"
                >
                  <stat.icon size={13} className={stat.color} />
                  <span className="text-[11px] font-semibold text-sustain-ink">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ════════════════════════════════════════════════════ */}
        {/* ── RIGHT PANEL: Auth Form ── */}
        {/* ════════════════════════════════════════════════════ */}
        <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-y-auto max-h-[90vh] lg:max-h-none">
          {/* Mobile logo */}
          <div className="lg:hidden mb-6 flex items-center justify-center">
            <span className="font-sans text-[24px] font-bold text-sustain-ink tracking-[-0.02em]">
              Sustain<span className="text-sustain-emerald">AI</span>
            </span>
          </div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-[clamp(22px,3vw,28px)] font-bold text-sustain-ink tracking-[-0.02em]">
              {mode === 'signin' ? 'Welcome back.' : 'Welcome to SustainAI.'}
            </h1>
            <p className="text-sm text-sustain-muted mt-1.5">
              {mode === 'signin' ? (
                <>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => switchMode('signup')}
                    className="text-sustain-emerald font-semibold hover:text-sustain-emeraldDark transition-colors underline underline-offset-2"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Let's help you get started.
                  <br />
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => switchMode('signin')}
                    className="text-sustain-emerald font-semibold hover:text-sustain-emeraldDark transition-colors underline underline-offset-2"
                  >
                    Log in
                  </button>
                </>
              )}
            </p>
          </motion.div>

          {/* Form */}
          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: mode === 'signup' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: mode === 'signup' ? -20 : 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 flex flex-col justify-center mt-6 lg:mt-0"
            >
              {/* Error message */}
              <AnimatePresence>
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                    className="mb-4 p-3 bg-red-50/80 border border-red-200/60 rounded-2xl text-red-600 text-xs flex items-center gap-2"
                  >
                    <AlertCircle size={15} className="shrink-0" />
                    <span className="font-medium">{errorMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-3.5">
                {/* Sign Up: Name fields */}
                {mode === 'signup' && (
                  <motion.div
                    className="grid grid-cols-2 gap-3"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <ClayInput
                      icon={User}
                      label="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name"
                    />
                    <ClayInput
                      icon={User}
                      label="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
                    />
                  </motion.div>
                )}

                {/* Sign Up: Phone & Email row */}
                {mode === 'signup' ? (
                  <div className="grid grid-cols-2 gap-3">
                    <ClayInput
                      icon={Building2}
                      label="Organization"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="Organization"
                      required={false}
                    />
                    <ClayInput
                      icon={Mail}
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                  </div>
                ) : (
                  <ClayInput
                    icon={Mail}
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                )}

                {/* Password fields */}
                {mode === 'signup' ? (
                  <div className="grid grid-cols-2 gap-3">
                    <ClayInput
                      icon={Lock}
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      showToggle
                      onToggle={() => setShowPassword(!showPassword)}
                      isVisible={showPassword}
                    />
                    <ClayInput
                      icon={Lock}
                      label="Confirm Password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm Password"
                      showToggle
                      onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                      isVisible={showConfirmPassword}
                    />
                  </div>
                ) : (
                  <div>
                    <ClayInput
                      icon={Lock}
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      showToggle
                      onToggle={() => setShowPassword(!showPassword)}
                      isVisible={showPassword}
                    />
                    {/* Forgot password link for sign in */}
                    <div className="flex justify-end mt-1.5">
                      <button
                        type="button"
                        onClick={() => setForgotPasswordOpen(true)}
                        className="text-[12px] font-medium text-sustain-emerald hover:text-sustain-emeraldDark transition-colors"
                      >
                        Forgot password?
                      </button>
                    </div>
                  </div>
                )}

                {/* Sign Up: Checkboxes */}
                {mode === 'signup' && (
                  <motion.div
                    className="space-y-2.5 pt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="flex items-start gap-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={agreeNewsletter}
                        onChange={(e) => setAgreeNewsletter(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded-md border-2 border-slate-300 text-sustain-emerald focus:ring-sustain-emerald/30 accent-sustain-emerald cursor-pointer transition-all"
                      />
                      <span className="text-[12px] text-sustain-muted leading-relaxed group-hover:text-sustain-ink transition-colors">
                        I want to receive latest news and platform updates from SustainAI.
                      </span>
                    </label>
                    <label className="flex items-start gap-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded-md border-2 border-slate-300 text-sustain-emerald focus:ring-sustain-emerald/30 accent-sustain-emerald cursor-pointer transition-all"
                      />
                      <span className="text-[12px] text-sustain-muted leading-relaxed group-hover:text-sustain-ink transition-colors">
                        I agree to the{' '}
                        <a href="#" className="text-sustain-emerald font-semibold hover:underline">
                          Terms & Privacy Policy
                        </a>
                        .
                      </span>
                    </label>
                  </motion.div>
                )}
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={isLoading || isSuccess}
                className="w-full mt-6 bg-sustain-ink hover:bg-sustain-emeraldDark text-white py-3.5 px-6 rounded-2xl font-semibold text-[15px] transition-all duration-300 shadow-[0_8px_24px_-6px_rgba(15,23,42,0.3)] hover:shadow-[0_12px_32px_-6px_rgba(22,163,74,0.35)] active:scale-[0.98] flex items-center justify-center gap-2.5 group disabled:opacity-80 disabled:cursor-not-allowed relative overflow-hidden"
                whileTap={{ scale: 0.98 }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{mode === 'signin' ? 'Signing in...' : 'Creating account...'}</span>
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 size={18} className="text-sustain-emerald" />
                    <span>Success! Redirecting...</span>
                  </>
                ) : (
                  <>
                    <span>{mode === 'signin' ? 'Sign In' : 'Sign Up'}</span>
                    <KeyRound size={16} className="transition-transform group-hover:translate-x-1 relative z-10" />
                  </>
                )}
              </motion.button>

              {/* SSO Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200/80" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-[11px] text-sustain-muted uppercase tracking-[0.1em] font-semibold">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* SSO Buttons */}
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  {
                    name: 'Google',
                    icon: (
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                    ),
                  },
                  {
                    name: 'Microsoft',
                    icon: (
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <rect x="1" y="1" width="10" height="10" fill="#F25022" />
                        <rect x="13" y="1" width="10" height="10" fill="#7FBA00" />
                        <rect x="1" y="13" width="10" height="10" fill="#00A4EF" />
                        <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
                      </svg>
                    ),
                  },
                  {
                    name: 'SSO',
                    icon: <ShieldCheck size={16} className="text-sustain-emeraldDark" />,
                  },
                ].map((provider) => (
                  <button
                    key={provider.name}
                    type="button"
                    className="flex items-center justify-center gap-2 py-3 px-3 border-2 border-slate-200/60 hover:border-sustain-emerald/30 rounded-2xl text-xs font-semibold text-sustain-ink bg-[#F9FAFB] hover:bg-sustain-emerald/[0.04] transition-all duration-200 active:scale-95 hover:shadow-[0_4px_12px_-4px_rgba(34,197,94,0.1)]"
                  >
                    {provider.icon}
                    <span className="hidden sm:inline">{provider.name}</span>
                  </button>
                ))}
              </div>
              
              {/* Guest Login */}
              <div className="mt-5 flex justify-center">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="text-[13px] font-semibold text-sustain-emerald hover:text-sustain-emeraldDark transition-colors flex items-center gap-1.5 px-4 py-2 rounded-xl hover:bg-sustain-emerald/10"
                >
                  Continue as Guest <ArrowRight size={14} />
                </button>
              </div>
            </motion.form>
          </AnimatePresence>

          {/* Bottom compliance */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-sustain-muted/60">
            <span className="flex items-center gap-1">
              <ShieldCheck size={11} className="text-sustain-emerald/60" />
              ISO 27001 & SOC2 Certified
            </span>
            <span>256-Bit Encryption</span>
          </div>
        </div>
      </motion.div>



      {/* ── Forgot Password Modal ── */}
      <AnimatePresence>
        {forgotPasswordOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-sustain-ink/40 backdrop-blur-md"
              onClick={() => { setForgotPasswordOpen(false); setForgotEmailSent(false); }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-white rounded-[28px] max-w-md w-full p-8 shadow-[0_40px_80px_-20px_rgba(15,23,42,0.2)] border border-slate-200/50"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="text-lg font-bold text-sustain-ink tracking-tight">Reset Password</h3>
                <button
                  type="button"
                  onClick={() => { setForgotPasswordOpen(false); setForgotEmailSent(false); }}
                  className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-sustain-ink hover:bg-slate-100 transition-all text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              {forgotEmailSent ? (
                <div className="py-8 text-center">
                  <div className="w-14 h-14 rounded-full bg-sustain-emerald/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={28} className="text-sustain-emerald" />
                  </div>
                  <h4 className="text-base font-bold text-sustain-ink">Check Your Email</h4>
                  <p className="text-xs text-sustain-muted mt-2 max-w-xs mx-auto leading-relaxed">
                    We sent a secure reset link to <strong>{email || 'your email'}</strong>. Please check your inbox.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setForgotPasswordOpen(false); setForgotEmailSent(false); }}
                    className="mt-6 w-full bg-sustain-ink text-white py-3 rounded-2xl text-sm font-semibold hover:bg-sustain-emeraldDark transition-all"
                  >
                    Back to Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotPassword} className="mt-5 space-y-4">
                  <p className="text-xs text-sustain-muted leading-relaxed">
                    Enter the email associated with your account and we'll send you a password reset link.
                  </p>
                  <ClayInput
                    icon={Mail}
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                  <div className="flex gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setForgotPasswordOpen(false)}
                      className="w-1/2 py-3 rounded-2xl text-sm font-medium text-sustain-muted hover:bg-slate-100 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 bg-sustain-ink text-white py-3 rounded-2xl text-sm font-semibold hover:bg-sustain-emeraldDark transition-all"
                    >
                      Send Reset Link
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
