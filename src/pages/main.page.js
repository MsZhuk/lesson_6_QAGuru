import { th } from "@faker-js/faker";
import { BasePage } from "./base.page";

export class MainPage extends BasePage {
  constructor (page) {
    super(page);
    this.menuButton = this.page.locator('.dropdown-toggle');
    this.signupButton = page.getByRole('link', { name: 'Sign up' });
    this.article = page.getByRole('link', { name: 'New Article' });
    this.startpage = page.locator('.navbar-brand');
  }
  
  async register () {
    await this.signupButton.click();
  }

  async clickArticle () {
    await this.article.click();
  };

  async goStartPage () {
    await this.startpage.click();
  }

};
