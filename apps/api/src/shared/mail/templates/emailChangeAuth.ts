export const emailChangeAuthTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Change Your Email</title>
</head>
<body style="{{styles.main}}">
  <div style="{{styles.container}}">
    <p style="{{styles.tertiary}}">{{appName}}</p>

    <h1 style="{{styles.secondary}}">Change Your Email</h1>

    <p style="{{styles.paragraph}}">
      Hi {{name}}, we received a request to change the email address associated with your
      {{appName}} account. Click the button below to continue.
    </p>

    <div style="{{styles.centeredSection}}">
      <a href="{{changeEmailUrl}}" style="{{styles.button}}">
        Change Email
      </a>
    </div>

    <p style="{{styles.paragraph}}">
      This link is valid for the next 15 mins only.
    </p>

    <p style="{{styles.paragraph}}">
      If you did not request to change your email, you can safely ignore this email.
    </p>
    <br>
  </div>

  <p style="{{styles.footer}}">Securely powered by {{appName}}</p>
</body>
</html>
`;
