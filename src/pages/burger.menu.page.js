import { th } from "@faker-js/faker";
import { BasePage } from "./base.page";

export class BurgerMenuPage extends BasePage {
  constructor
  (page){
    super(page);
    this.menuButton = this.page.locator('.dropdown-toggle');
    this.settingsButton = page.getByRole('link', { name: 'Settings'});
    this.logoutButton = page.getByRole('link', { name: 'Logout'});
  };
  async goToSettings () {
    await this.menuButton.click();
    await this.settingsButton.click();
  }; 

  async logout () {
    await this.logoutButton.click(); 
   }
}