export const passwordResetTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="{{styles.main}}">
  <div style="{{styles.container}}">
    <p style="{{styles.tertiary}}">{{appName}}</p>

    <h1 style="{{styles.secondary}}">Reset Your Password</h1>

    <p style="{{styles.paragraph}}">
      Hi {{name}}, we received a request to reset your password. Click the button below to set a
      new password.
    </p>

    <div style="{{styles.centeredSection}}">
      <a href="{{resetUrl}}" style="{{styles.button}}">
        Reset Password
      </a>
    </div>

    <p style="{{styles.paragraph}}">
      This link/button is valid for next 10 mins only.
    </p>

    <p style="{{styles.paragraph}}">
      If you did not request a password reset, you can safely ignore this email.
    </p>
    <br>
  </div>

  <p style="{{styles.footer}}">Securely powered by {{appName}}</p>
</body>
</html>
`;
