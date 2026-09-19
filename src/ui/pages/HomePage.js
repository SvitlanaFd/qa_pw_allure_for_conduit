import { expect, testStep } from '../../common/helpers/pw';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.settingsLink = page.getByRole('link', { name: 'Settings' });
    this.signInLink = page.getByRole('link', { name: 'Sign in' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async clickNewArticleLink() {
    await this.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await this.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async assertSettingsLinkIsVisible() {
    await this.step(`Assert the 'Settings' link is visible`, async () => {
      await expect(this.settingsLink).toBeVisible();
    });
  }

  async assertSignInLinkIsVisible() {
    await this.step(`Assert the 'Sign in' link is visible`, async () => {
      await expect(this.signInLink).toBeVisible();
    });
  }
}
