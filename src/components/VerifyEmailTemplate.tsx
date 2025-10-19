import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Link,
	Section,
	Text,
} from "@react-email/components";
import { constants } from "@/lib/constants";

interface VerificationEmail {
	name: string;
	validationCode: string;
}

const { appName, supportEmail } = constants;

export const VerificationEmailTemplate = ({
	name,
	validationCode,
}: VerificationEmail) => (
	<Html>
		<Head />
		<Body style={main}>
			<Container style={container}>
				{/* App Header */}
				<Text style={tertiary}>{appName}</Text>

				{/* Greeting */}
				<Heading style={secondary}>Verify Your Email</Heading>

				{/* Instructions */}
				<Text style={paragraph}>
					Hi {name}, enter the following code to verify your email and activate
					your Mystery Message account.
				</Text>

				{/* OTP Code */}
				<Section style={codeContainer}>
					<Text style={code}>{validationCode}</Text>
				</Section>
				<Text style={paragraph}>This code is valid for next 1 hour only.</Text>

				{/* Additional Info */}
				<Text style={paragraph}>Not expecting this email?</Text>
				<Text style={paragraph}>
					Contact{" "}
					<Link href={`mailto:support@${supportEmail}`} style={link}>
						{supportEmail}
					</Link>{" "}
					if you did not request this code.
				</Text>
			</Container>

			{/* Footer */}
			<Text style={footer}>Securely powered by {appName}</Text>
		</Body>
	</Html>
);

// --- Styles ---

const main = {
	backgroundColor: "#f3f4f6",
	fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
};

const container = {
	backgroundColor: "#ffffff",
	borderRadius: "10px",
	boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
	margin: "40px auto",
	maxWidth: "400px",
	padding: "60px 20px 80px",
};

const tertiary = {
	color: "#6b21a8", // brand purple
	fontSize: "11px",
	fontWeight: 700,
	textTransform: "uppercase" as const,
	textAlign: "center" as const,
	margin: "16px 0 8px",
	letterSpacing: "0",
	lineHeight: "16px",
};

const secondary = {
	color: "#111827",
	fontFamily: "HelveticaNeue-Medium,Helvetica,Arial,sans-serif",
	fontSize: "22px",
	fontWeight: 600,
	lineHeight: "28px",
	textAlign: "center" as const,
	margin: "0 0 16px",
};

const paragraph = {
	color: "#374151",
	fontSize: "16px",
	lineHeight: "24px",
	textAlign: "center" as const,
	margin: "0 0 16px",
	padding: "0 20px",
};

const codeContainer = {
	background: "#f9fafb",
	borderRadius: "6px",
	margin: "16px auto",
	width: "280px",
};

const code = {
	color: "#111827",
	fontFamily: "HelveticaNeue-Bold",
	fontSize: "32px",
	fontWeight: 700,
	letterSpacing: "6px",
	lineHeight: "40px",
	padding: "12px 0",
	textAlign: "center" as const,
	display: "block",
};

const link = {
	color: "#6b21a8",
	textDecoration: "underline",
};

const footer = {
	color: "#6b21a8",
	fontSize: "12px",
	fontWeight: 700,
	lineHeight: "20px",
	textAlign: "center" as const,
	textTransform: "uppercase" as const,
	marginTop: "20px",
};
