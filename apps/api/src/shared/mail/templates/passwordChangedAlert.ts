export const passwordChangedAlertTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Changed</title>
</head>
<body style="{{styles.main}}">
  <div style="{{styles.container}}">
    <p style="{{styles.tertiary}}">{{appName}}</p>

    <h1 style="{{styles.secondary}}">Your {{appName}} password was changed</h1>

    <p style="{{styles.paragraph}}">
      Hey {{name}}<br>
    </p>

    <p style="{{styles.paragraph}}">
      Your {{appName}} account password was successfully changed.
    </p>

    <p style="{{styles.paragraph}}">
      Time: <b>{{formatDate time}}</b>
    </p>

    <p style="{{styles.paragraph}}">
      If this was you, no action is needed.<br>
      If you did NOT change your password, please secure your account immediately by resetting your password.
    </p>
    <br>
  </div>

  <p style="{{styles.footer}}">Securely powered by {{appName}}</p>
</body>
</html>
`;
