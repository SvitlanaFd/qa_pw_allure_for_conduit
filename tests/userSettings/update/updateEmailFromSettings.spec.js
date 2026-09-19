import { expect } from '@playwright/test';

import { test } from '../../_fixtures/fixtures';

import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Update email from settings', async ({ page, settingsPage, user }) => {
  const updatedEmail = user.email.replace('@', 'updated@');

  await settingsPage.open();

  await settingsPage.fillEmailInput(updatedEmail);

  await settingsPage.clickUpdateSettingsButton();

  await settingsPage.open();

  await settingsPage.assertEmailInputHasValue(updatedEmail);
});
