import { useState } from 'preact/hooks';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle');
  const [error, setError] = useState('');
  const [formStarted, setFormStarted] = useState(false);

  const trackEvent = (name: string, data?: Record<string, string>) => {
    if (typeof window !== 'undefined' && (window as any).va) {
      (window as any).va('event', { name, data });
    }
  };

  const handleFocus = (field: string) => {
    if (!formStarted) {
      setFormStarted(true);
      trackEvent('Contact Form Started');
    }
    trackEvent('Contact Form Field Focus', { field });
  };

  const handleBlur = (field: string) => {
    trackEvent('Contact Form Field Blur', { field });
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Basic validation
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
      setError('Please fill in all fields');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    setState('loading');
    setError('');

    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        setState('success');
        form.reset();
        trackEvent('Contact Form Submitted');
      } else {
        throw new Error('Failed to send');
      }
    } catch {
      setState('error');
      setError('Failed to send message. Please try again.');
    }
  };

  if (state === 'success') {
    return (
      <div class="form-success glass" style={{ padding: '2rem', textAlign: 'center' }}>
        <img src="/icons/check.svg" alt="" width="48" height="48" loading="lazy" style={{ marginBottom: '1rem' }} />
        <p style={{ color: '#10b981', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Message sent!</p>
        <p style={{ color: '#a0a0b0' }}>I'll get back to you soon.</p>
        <button
          class="btn btn-ghost"
          style={{ marginTop: '1rem' }}
          onClick={() => setState('idle')}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form class="contact-form" onSubmit={handleSubmit}>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required onFocus={() => handleFocus('name')} onBlur={() => handleBlur('name')} />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required onFocus={() => handleFocus('email')} onBlur={() => handleBlur('email')} />
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" name="message" rows={5} required onFocus={() => handleFocus('message')} onBlur={() => handleBlur('message')} />
      </div>
      {error && <p class="form-error">{error}</p>}
      <button
        type="submit"
        class="btn btn-primary"
        disabled={state === 'loading'}
      >
        {state === 'loading' ? (
          <>
            Sending...
            <img src="/icons/spinner.svg" alt="" width="16" height="16" loading="lazy" class="spinner" />
          </>
        ) : (
          <>
            Send Message
            <img src="/icons/send.svg" alt="" width="16" height="16" loading="lazy" class="icon" />
          </>
        )}
      </button>
      <style>{`
        .spinner { animation: spin 1s linear infinite; }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </form>
  );
}
