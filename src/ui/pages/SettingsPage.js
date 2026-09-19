import { expect, testStep } from '../../common/helpers/pw';

export class SettingsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.profilePictureUrlInput = page.getByPlaceholder(
      'URL of profile picture',
    );
    this.usernameInput = page.getByPlaceholder('Username');
    this.bioInput = page.getByPlaceholder('Short bio about you');
    this.emailInput = page.getByPlaceholder('Email');
    this.passwordInput = page.getByPlaceholder('New Password');

    this.updateSettingsButton = page.getByRole('button', {
      name: 'Update Settings',
    });

    this.logoutButton = page.getByRole('button', {
      name: 'Or click here to logout.',
    });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Settings' page`, async () => {
      await this.page.goto('/settings');
    });
  }

  async fillUsernameInput(username) {
    await this.step(`Fill the 'Username' field`, async () => {
      await this.usernameInput.fill(username);
    });
  }

  async fillEmailInput(email) {
    await this.step(`Fill the 'Email' field`, async () => {
      await this.emailInput.fill(email);
    });
  }

  async fillPasswordInput(password) {
    await this.step(`Fill the 'New Password' field`, async () => {
      await this.passwordInput.fill(password);
    });
  }

  async fillProfilePictureUrlInput(profilePictureUrl) {
    await this.step(`Fill the 'Profile picture URL' field`, async () => {
      await this.profilePictureUrlInput.fill(profilePictureUrl);
    });
  }

  async fillBioInput(bio) {
    await this.step(`Fill the 'Short bio' field`, async () => {
      await this.bioInput.fill(bio);
    });
  }

  async clickLogoutButton() {
    await this.step(`Click the 'Logout' button`, async () => {
      await this.logoutButton.click();
    });
  }

  async clickUpdateSettingsButton() {
    await this.step(`Click the 'Update Settings' button`, async () => {
      const updateUserResponsePromise = this.page.waitForResponse(
        response =>
          response.url().includes('/api/user') &&
          response.request().method() === 'PUT',
      );

      await this.updateSettingsButton.click();

      const updateUserResponse = await updateUserResponsePromise;

      expect(updateUserResponse.ok()).toBeTruthy();
    });
  }

  async assertUsernameInputHasValue(username) {
    await this.step(
      `Assert the 'Username' field has correct value`,
      async () => {
        await expect(this.usernameInput).toHaveValue(username);
      },
    );
  }

  async assertEmailInputHasValue(email) {
    await this.step(`Assert the 'Email' field has correct value`, async () => {
      await expect(this.emailInput).toHaveValue(email);
    });
  }

  async assertProfilePictureUrlInputHasValue(profilePictureUrl) {
    await this.step(
      `Assert the 'Profile picture URL' field has correct value`,
      async () => {
        await expect(this.profilePictureUrlInput).toHaveValue(
          profilePictureUrl,
        );
      },
    );
  }

  async assertBioInputHasValue(bio) {
    await this.step(
      `Assert the 'Short bio' field has correct value`,
      async () => {
        await expect(this.bioInput).toHaveValue(bio);
      },
    );
  }
}
