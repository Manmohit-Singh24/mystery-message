import { constants } from "@/lib/constants";
import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Section,
	Text,
	Button,
} from "@react-email/components";

interface PasswordResetEmailProps {
	name: string;
	resetUrl: string;
}

const {appName } = constants

export const PasswordResetEmailTemplate = ({
	name,
	resetUrl,
}: PasswordResetEmailProps) => (
	<Html>
		<Head />
		<Body style={main}>
			<Container style={container}>
				{/* App Header */}
				<Text style={tertiary}>{appName}</Text>

				{/* Heading */}
				<Heading style={secondary}>Reset Your Password</Heading>

				{/* Instructions */}
				<Text style={paragraph}>
					Hi {name}, we received a request to reset your password. Click the
					button below to set a new password.
				</Text>

				{/* Reset Button */}
				<Section style={{ textAlign: "center", margin: "20px 0" }}>
					<Button href={resetUrl} style={{...button , padding: "12px 20px"} }>
						Reset Password
					</Button>
				</Section>

				{/* Fallback URL */}
				<Text style={paragraph}>
					If the button above doesn’t work, copy and paste this link into your
					browser:
				</Text>
				<Text style={link}>{resetUrl}</Text>

				{/* Extra Info */}
				<Text style={paragraph}>
					If you did not request a password reset, you can safely ignore this
					email.
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
	color: "#6b21a8",
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

const button = {
	backgroundColor: "#6b21a8",
	color: "#ffffff",
	fontWeight: 600,
	textDecoration: "none",
	borderRadius: "6px",
	display: "inline-block",
	textAlign: "center" as const,
};

const link = {
	color: "#6b21a8",
	textDecoration: "underline",
    wordBreak: "break-all" as const,
    textAlign: "center" as const
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
