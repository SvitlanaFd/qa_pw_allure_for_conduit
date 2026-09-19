import { test } from '../../_fixtures/fixtures';

import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Add short bio from settings', async ({ settingsPage }) => {
  const shortBio = 'I am a QA Automation Engineer.';

  await settingsPage.open();

  await settingsPage.fillBioInput(shortBio);

  await settingsPage.clickUpdateSettingsButton();

  await settingsPage.open();

  await settingsPage.assertBioInputHasValue(shortBio);
});
