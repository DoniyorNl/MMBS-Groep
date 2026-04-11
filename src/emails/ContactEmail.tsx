import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ContactEmailProps {
  name: string;
  email: string;
  phone?: string;
  message: string;
  vacatureId?: string;
  vacatureTitle?: string;
}

export function ContactEmail({
  name,
  email,
  phone,
  message,
  vacatureId,
  vacatureTitle,
}: ContactEmailProps) {
  const isApplication = Boolean(vacatureId || vacatureTitle);
  const preview = isApplication
    ? `Sollicitatie${vacatureTitle ? ` — ${vacatureTitle}` : ""} — ${name}`
    : `Nieuw bericht via contactformulier — ${name}`;

  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>
            {isApplication ? "Sollicitatie — MMBS Groep" : "Contactformulier — MMBS Groep"}
          </Heading>
          {vacatureTitle ? (
            <Text style={text}>
              <strong>Vacature:</strong> {vacatureTitle}
            </Text>
          ) : null}
          {vacatureId && !vacatureTitle ? (
            <Text style={text}>
              <strong>Vacature-ID:</strong> {vacatureId}
            </Text>
          ) : null}
          <Text style={text}>
            <strong>Naam:</strong> {name}
          </Text>
          <Text style={text}>
            <strong>E-mail:</strong> {email}
          </Text>
          {phone ? (
            <Text style={text}>
              <strong>Telefoon:</strong> {phone}
            </Text>
          ) : null}
          <Hr style={hr} />
          <Text style={label}>Bericht</Text>
          <Section style={messageBox}>
            <Text style={messageText}>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f7f7f7",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "32px 24px",
  maxWidth: "560px",
};

const h1 = {
  color: "#0a0a0a",
  fontSize: "20px",
  fontWeight: "700",
  margin: "0 0 24px",
};

const text = {
  color: "#333333",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "0 0 8px",
};

const label = {
  color: "#555555",
  fontSize: "12px",
  fontWeight: "600",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  margin: "0 0 8px",
};

const messageBox = {
  backgroundColor: "#ffffff",
  border: "1px solid #e0e0e0",
  borderRadius: "8px",
  padding: "16px",
};

const messageText = {
  color: "#0a0a0a",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const hr = {
  borderColor: "#e0e0e0",
  margin: "20px 0",
};
