import Link from "next/link";

/**
 * Root-level 404 — Next.js App Router renders this inside app/layout.tsx,
 * so we must NOT include <html>/<body> tags here.
 */
export default function RootNotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70dvh",
        textAlign: "center",
        padding: "2rem",
        fontFamily:
          '"SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif',
      }}
    >
      <p
        style={{
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#999",
          marginBottom: "1rem",
        }}
      >
        MMBS Groep
      </p>
      <h1
        style={{
          fontSize: "8rem",
          fontWeight: 900,
          lineHeight: 1,
          margin: "0 0 1rem",
        }}
      >
        404
      </h1>
      <p style={{ color: "#555", marginBottom: "2rem" }}>
        Pagina niet gevonden
      </p>
      <Link
        href="/nl"
        style={{
          display: "inline-block",
          padding: "0.75rem 1.75rem",
          backgroundColor: "#0a0a0a",
          color: "#ffffff",
          borderRadius: "0.5rem",
          textDecoration: "none",
          fontSize: "0.875rem",
          fontWeight: 600,
        }}
      >
        Terug naar home
      </Link>
    </div>
  );
}
