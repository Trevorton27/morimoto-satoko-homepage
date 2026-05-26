"use client";

import { useRef, useState } from "react";
import GoldDivider from "./GoldDivider";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type Status = "idle" | "submitting" | "success" | "error";

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "お名前を入力してください";
  if (!data.email.trim()) {
    errors.email = "有効なメールアドレスを入力してください";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "有効なメールアドレスを入力してください";
  }
  if (!data.message.trim() || data.message.trim().length < 10) {
    errors.message = "お問い合わせ内容を入力してください（10文字以上）";
  }
  return errors;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "", email: "", phone: "", message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [networkError, setNetworkError] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const newErrors = validate({ ...formData, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate(formData);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allErrors = validate(formData);
    setErrors(allErrors);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(allErrors).length > 0) {
      const firstError = document.querySelector("[aria-invalid='true']") as HTMLElement;
      firstError?.focus();
      return;
    }
    setStatus("submitting");
    setNetworkError(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Server error");
      setStatus("success");
      setTimeout(() => successRef.current?.focus(), 100);
    } catch {
      setStatus("error");
      setNetworkError(true);
    }
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full rounded-lg border px-4 py-3 text-sm text-navy bg-white transition-colors duration-150 outline-none focus:ring-2 focus:ring-gold/40 focus:ring-offset-1 ${
      errors[field] && touched[field]
        ? "border-red-400"
        : "border-navy/15 focus:border-gold"
    }`;

  if (status === "success") {
    return (
      <section id="contact" className="bg-blue-light py-20 px-6">
        <div className="mx-auto max-w-xl">
          <div
            ref={successRef}
            tabIndex={-1}
            role="status"
            className="flex flex-col items-center gap-4 rounded-2xl border border-gold/30 bg-white p-10 text-center shadow-sm focus:outline-none"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/10">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d4a843" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-navy">送信が完了しました</h3>
            <p className="text-sm leading-7 text-text-muted">
              お問い合わせありがとうございます。<br />
              担当者より近日中にご連絡いたします。
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="bg-blue-light py-20 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
            Contact
          </p>
          <h2 className="mt-2 text-2xl font-bold text-navy md:text-3xl">
            お問い合わせ
          </h2>
          <GoldDivider />
          <p className="mt-2 text-sm text-text-muted">
            ご意見・ご相談・ご要望はこちらからお気軽にどうぞ
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Contact info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-base font-bold text-navy mb-4">事務所情報</h3>
              <address className="not-italic space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-navy/5 text-gold">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gold mb-0.5">住所</p>
                    <p className="text-sm text-text-muted leading-6">
                      〒770-8064<br />
                      徳島市城南町3丁目2−20<br />
                      森本さとこ後援会事務所
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-navy/5 text-gold">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.72A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.14a16 16 0 006.95 6.95l1.41-1.41a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gold mb-0.5">電話</p>
                    <a href="tel:09031938738" className="text-sm text-text-muted hover:text-navy transition-colors">
                      090-3193-8738
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-navy/5 text-gold">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gold mb-0.5">メール</p>
                    <a href="mailto:satokomorimoto55@gmail.com" className="text-sm text-text-muted hover:text-navy transition-colors break-all">
                      satokomorimoto55@gmail.com
                    </a>
                  </div>
                </div>
              </address>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-base font-bold text-navy mb-4">SNS</h3>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagramページを開く"
                  className="flex items-center gap-2 rounded-lg border border-navy/15 bg-white px-4 py-2.5 text-sm text-text-muted transition-all hover:border-gold/40 hover:text-navy hover:shadow-sm"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                  </svg>
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebookページを開く"
                  className="flex items-center gap-2 rounded-lg border border-navy/15 bg-white px-4 py-2.5 text-sm text-text-muted transition-all hover:border-gold/40 hover:text-navy hover:shadow-sm"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                  Facebook
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {networkError && (
              <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                送信に失敗しました。もう一度お試しください。
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-navy mb-1.5">
                お名前 <span className="text-red-500">*</span>
              </label>
              <input
                id="name" name="name" type="text" required
                aria-required="true"
                aria-invalid={!!(errors.name && touched.name)}
                aria-describedby={errors.name && touched.name ? "name-error" : undefined}
                value={formData.name} onChange={handleChange} onBlur={handleBlur}
                placeholder="山田 花子"
                className={inputClass("name")}
              />
              {errors.name && touched.name && (
                <p id="name-error" role="alert" className="mt-1 text-xs text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-navy mb-1.5">
                メールアドレス <span className="text-red-500">*</span>
              </label>
              <input
                id="email" name="email" type="email" required
                aria-required="true"
                aria-invalid={!!(errors.email && touched.email)}
                aria-describedby={errors.email && touched.email ? "email-error" : undefined}
                value={formData.email} onChange={handleChange} onBlur={handleBlur}
                placeholder="yamada@example.com"
                className={inputClass("email")}
              />
              {errors.email && touched.email && (
                <p id="email-error" role="alert" className="mt-1 text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-navy mb-1.5">
                電話番号
                <span className="ml-2 text-xs font-normal text-text-muted">（任意）</span>
              </label>
              <input
                id="phone" name="phone" type="tel"
                value={formData.phone} onChange={handleChange}
                placeholder="090-0000-0000"
                className="w-full rounded-lg border border-navy/15 px-4 py-3 text-sm text-navy bg-white outline-none focus:border-gold focus:ring-2 focus:ring-gold/40 focus:ring-offset-1 transition-colors duration-150"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-navy mb-1.5">
                お問い合わせ内容 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message" name="message" required rows={5}
                aria-required="true"
                aria-invalid={!!(errors.message && touched.message)}
                aria-describedby={errors.message && touched.message ? "message-error" : undefined}
                value={formData.message} onChange={handleChange} onBlur={handleBlur}
                placeholder="ご意見・ご相談・ご要望をご自由にお書きください。"
                className={`${inputClass("message")} resize-none`}
              />
              {errors.message && touched.message && (
                <p id="message-error" role="alert" className="mt-1 text-xs text-red-600">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-6 py-3.5 text-sm font-semibold tracking-wider text-white transition-all duration-150 hover:bg-navy-mid disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "submitting" ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  送信中...
                </>
              ) : (
                "送信する"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
