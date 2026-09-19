import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Update username from settings', async ({ page, settingsPage, user }) => {
  const updatedUsername = `${user.username}updated`;

  await settingsPage.open();

  await settingsPage.fillUsernameInput(updatedUsername);

  await settingsPage.clickUpdateSettingsButton();

  await settingsPage.open();

  await settingsPage.assertUsernameInputHasValue(updatedUsername);
});
