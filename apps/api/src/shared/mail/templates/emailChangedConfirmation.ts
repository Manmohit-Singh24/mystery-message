export const emailChangedConfirmationTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Address Changed</title>
</head>
<body style="{{styles.main}}">
  <div style="{{styles.container}}">
    <p style="{{styles.tertiary}}">{{appName}}</p>

    <h1 style="{{styles.secondary}}">Your {{appName}} email address was changed</h1>

    <p style="{{styles.paragraph}}">
      Hey {{name}}<br>
    </p>

    <p style="{{styles.paragraph}}">
      Your {{appName}} account email address was successfully changed to this email address.
    </p>

    <p style="{{styles.paragraph}}">
      New email: <b>{{newEmail}}</b>
    </p>

    <p style="{{styles.paragraph}}">
      Time: <b>{{formatDate time}}</b>
    </p>

    <p style="{{styles.paragraph}}">
      If you made this change, no action is needed.<br>
      If you did NOT change your email address, please secure your account immediately.
    </p>
  </div>

  <p style="{{styles.footer}}">Securely powered by {{appName}}</p>
</body>
</html>
`;
