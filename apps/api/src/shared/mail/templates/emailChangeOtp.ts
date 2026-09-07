export const emailChangeOtpTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your New Email</title>
</head>
<body style="{{styles.main}}">
  <div style="{{styles.container}}">
    <p style="{{styles.tertiary}}">{{appName}}</p>

    <h1 style="{{styles.secondary}}">Verify Your New Email</h1>

    <p style="{{styles.paragraph}}">
      Hi {{name}}, we received a request to change the email address associated with your
      {{appName}} account.
    </p>

    <p style="{{styles.paragraph}}">
      Enter the verification code below to confirm your new email address:
    </p>

    <div style="{{styles.centeredSection}}">
      <p style="{{styles.secondary}}">
        <strong>{{otp}}</strong>
      </p>
    </div>

    <p style="{{styles.paragraph}}">
      This verification code is valid for next 5 mins only.
    </p>

    <p style="{{styles.paragraph}}">
      If you did not request to change your email address, you can safely ignore this email.
    </p>
  </div>

  <p style="{{styles.footer}}">Securely powered by {{appName}}</p>
</body>
</html>
`;
