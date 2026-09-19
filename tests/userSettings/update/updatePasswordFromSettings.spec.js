import { expect } from '@playwright/test';
import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Update password from settings', async ({
  settingsPage,
  signInPage,
  user,
  page,
  homePage,
}) => {
  const updatedPassword = `${user.password}Updated123`;

  await settingsPage.open();

  await settingsPage.fillPasswordInput(updatedPassword);

  await settingsPage.clickUpdateSettingsButton();

  await settingsPage.open();

  await settingsPage.clickLogoutButton();

  await signInPage.open();

  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(updatedPassword);

  await signInPage.clickSignInButton();

  await homePage.assertSettingsLinkIsVisible();

  await settingsPage.open();

  await expect(page).toHaveURL(/\/settings/);

  await settingsPage.assertEmailInputHasValue(user.email);
});
