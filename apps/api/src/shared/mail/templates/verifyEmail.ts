export const verifyEmailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="{{styles.main}}">
  <div style="{{styles.container}}">
    <p style="{{styles.tertiary}}">{{appName}}</p>

    <h1 style="{{styles.secondary}}">Verify Your Email</h1>

    <p style="{{styles.paragraph}}">
      Hi {{name}}, welcome to {{appName}}.
    </p>

    <p style="{{styles.paragraph}}">
      Click the button below to verify your email and activate your Just Say account.
    </p>

    <div style="{{styles.centeredSection}}">
      <a href="{{verificationUrl}}" style="{{styles.button}}">
        Verify Your Email
      </a>
    </div>

    <p style="{{styles.paragraph}}">
      This verification link is valid till {{formatDate date}}.
    </p>

    <p style="{{styles.paragraph}}">
      If the button doesn't work, copy and paste the following link into your browser:
    </p>

    <p style="{{styles.link}}">
      {{verificationUrl}}
    </p>
  </div>

  <p style="{{styles.footer}}">Securely powered by {{appName}}</p>
</body>
</html>
`;
