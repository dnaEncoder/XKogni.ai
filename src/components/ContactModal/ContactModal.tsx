import React, { useEffect, useRef, useState } from "react";
import { X, CheckCircle2 } from "lucide-react";
import styles from "./ContactModal.module.css";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [inquiryType, setInquiryType] = useState("demo");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const modalRef = useRef<HTMLDivElement>(null);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid work email address";
    }
    if (!company.trim()) {
      newErrors.company = "Company name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus("sending");

    // Simulate API request to server
    setTimeout(() => {
      setStatus("success");
      // Reset fields after successful submit
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
      setInquiryType("demo");
      setErrors({});
    }, 1200);
  };

  const handleOutsideClick = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      className={styles.overlay}
      onClick={handleOutsideClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={styles.modal} ref={modalRef}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {status === "success" ? (
          <div className={styles.successContainer}>
            <div className={styles.successIconContainer}>
              <CheckCircle2 size={48} className={styles.successIcon} />
            </div>
            <h2 id="modal-title" className={styles.successTitle}>
              Enquiry Submitted
            </h2>
            <p className={styles.successText}>
              Thank you for reaching out to XKogni.ai. Our team has received your details and will
              get back to you shortly to schedule your demo.
            </p>
            <button
              type="button"
              className={styles.successCloseBtn}
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className={styles.header}>
              <h2 id="modal-title" className={styles.title}>
                Get in Touch
              </h2>
              <p className={styles.subtitle}>
                Submit an enquiry and see how XKogni.ai can automate your operations.
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form} noValidate>
              <div className={styles.inputGroup}>
                <label htmlFor="modal-name" className={styles.label}>
                  Full Name
                </label>
                <input
                  id="modal-name"
                  type="text"
                  className={styles.input}
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                  }}
                  disabled={status === "sending"}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <span id="name-error" className={styles.errorText}>
                    {errors.name}
                  </span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="modal-email" className={styles.label}>
                  Work Email
                </label>
                <input
                  id="modal-email"
                  type="email"
                  className={styles.input}
                  placeholder="jane@company.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  disabled={status === "sending"}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <span id="email-error" className={styles.errorText}>
                    {errors.email}
                  </span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="modal-company" className={styles.label}>
                  Company Name
                </label>
                <input
                  id="modal-company"
                  type="text"
                  className={styles.input}
                  placeholder="Acme Corp"
                  value={company}
                  onChange={(e) => {
                    setCompany(e.target.value);
                    if (errors.company) setErrors((prev) => ({ ...prev, company: "" }));
                  }}
                  disabled={status === "sending"}
                  aria-invalid={!!errors.company}
                  aria-describedby={errors.company ? "company-error" : undefined}
                />
                {errors.company && (
                  <span id="company-error" className={styles.errorText}>
                    {errors.company}
                  </span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="modal-type" className={styles.label}>
                  Inquiry Type
                </label>
                <select
                  id="modal-type"
                  className={styles.select}
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  disabled={status === "sending"}
                >
                  <option value="demo">Request a Demo</option>
                  <option value="general">General Enquiry</option>
                  <option value="security">Security &amp; Compliance</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="modal-message" className={styles.label}>
                  Message (Optional)
                </label>
                <textarea
                  id="modal-message"
                  className={styles.textarea}
                  placeholder="Tell us about your requirements..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={status === "sending"}
                  rows={4}
                />
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending enquiry..." : "Submit Enquiry"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
