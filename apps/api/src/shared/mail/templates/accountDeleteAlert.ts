export const accountDeleteAlertTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Deletion Alert</title>
</head>
<body style="{{styles.main}}">
  <div style="{{styles.container}}">
    <p style="{{styles.tertiary}}">{{appName}}</p>

    <h1 style="{{styles.secondary}}">Account Deletion Alert</h1>

    <p style="{{styles.paragraph}}">
      Hey {{name}}<br>
    </p>

    <p style="{{styles.paragraph}}">
      We received a request to delete your {{appName}}'s account. If this was you, no action is
      needed — your account is scheduled for deletion in
      <i><b>7 days</b></i>.
    </p>

    <p style="{{styles.paragraph}}">
      You can still change your mind. Simply log in again before
      <i><b>{{formatDate date}}</b></i>
      to cancel the deletion and restore your account.
    </p>

    <div style="{{styles.codeContainer}}">
      <p style="{{styles.tertiaryDeletionDate}}">
        Account Deletion Date:
      </p>
      <p style="{{styles.secondary}}">{{formattedDeletionDate}}</p>
    </div>

    <p style="{{styles.paragraph}}">
      If this wasn’t you, we recommend logging in and securing your account immediately.
    </p>
    <br>
  </div>

  <p style="{{styles.footer}}">Securely powered by {{appName}}</p>
</body>
</html>
`;
