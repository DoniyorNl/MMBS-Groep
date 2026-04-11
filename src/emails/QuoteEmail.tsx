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

interface QuoteEmailProps {
  name: string;
  email: string;
  phone?: string;
  service: string;
  surface: string;
  floors: string;
  condition: string;
  estimateMin?: number;
  estimateMax?: number;
}

export function QuoteEmail({
  name,
  email,
  phone,
  service,
  surface,
  floors,
  condition,
  estimateMin,
  estimateMax,
}: QuoteEmailProps) {
  const hasEstimate =
    typeof estimateMin === "number" &&
    typeof estimateMax === "number" &&
    !Number.isNaN(estimateMin) &&
    !Number.isNaN(estimateMax);

  return (
    <Html>
      <Head />
      <Preview>Nieuwe offerteaanvraag — {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Offerteaanvraag — MMBS Groep</Heading>
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
          <Text style={label}>Project</Text>
          <Section style={box}>
            <Text style={messageText}>
              <strong>Dienst:</strong> {service}
              {"\n"}
              <strong>Oppervlakte (m²):</strong> {surface}
              {"\n"}
              <strong>Verdiepingen:</strong> {floors}
              {"\n"}
              <strong>Conditie:</strong> {condition}
            </Text>
          </Section>
          {hasEstimate ? (
            <>
              <Text style={label}>Indicatieve prijs (calculator)</Text>
              <Section style={box}>
                <Text style={estimate}>
                  € {estimateMin!.toLocaleString("nl-NL")} — € {estimateMax!.toLocaleString("nl-NL")}
                </Text>
              </Section>
            </>
          ) : null}
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
  margin: "16px 0 8px",
};

const box = {
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

const estimate = {
  color: "#0a0a0a",
  fontSize: "18px",
  fontWeight: "700",
  margin: "0",
};

const hr = {
  borderColor: "#e0e0e0",
  margin: "20px 0",
};
