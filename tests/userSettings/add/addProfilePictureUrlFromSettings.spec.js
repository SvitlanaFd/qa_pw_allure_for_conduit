import { test } from '../../_fixtures/fixtures';

import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Add profile picture URL from settings', async ({ settingsPage }) => {
  const profilePictureUrl = 'https://example.com/avatar.png';

  await settingsPage.open();

  await settingsPage.fillProfilePictureUrlInput(profilePictureUrl);

  await settingsPage.clickUpdateSettingsButton();

  await settingsPage.open();

  await settingsPage.assertProfilePictureUrlInputHasValue(profilePictureUrl);
});
