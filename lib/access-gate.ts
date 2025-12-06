// lib/access-gate.ts

export function openAccessGate() {
  if (typeof window === 'undefined') return;

  // Preferred: direct call (no race conditions)
  const fn = (window as any).__openAccessGate;
  if (typeof fn === 'function') {
    fn();
    return;
  }

  // Fallback: broadcast event
  window.dispatchEvent(new CustomEvent('open-access-gate'));

  // move focus to the navbar trigger so users see where it appears
  try {
    const trigger = document.querySelector<HTMLButtonElement>(
      'button[aria-label="Open access gate"],button[aria-label="Tenant access granted"]'
    );
    trigger?.focus();
  } catch {}
}
