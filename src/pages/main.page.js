import { th } from "@faker-js/faker";
import { BasePage } from "./base.page";

export class MainPage extends BasePage {
  constructor (page) {
    super(page);
    this.menuButton = this.page.locator('.dropdown-toggle');
    this.signupButton = page.getByRole('link', { name: 'Sign up' });
    this.settingsButton = page.getByRole('link', { name: 'Settings'});
    this.article = page.getByRole('link', { name: 'New Article' });
    this.updateButton = page.getByRole('button', 'Update Settings');
    this.logoutButton = page.getByRole('link', { name: 'Logout'});
  }
  
  async register () {
    await this.signupButton.click();
  }

  async goToSettings () {
    await this.menuButton.click();
    await this.settingsButton.click();
  }; 

  async clickArticle () {
    await this.article.click();
  };

  async updateSettings () {
    await this.updateButton.click(); 
   };

   async logout () {
    await this.logoutButton.click(); 
   }
};
