import {BasePage} from './base.page';

export class SettingsPage extends BasePage {
constructor (page) {
    super(page);
    this.updateButton = page.getByRole('button','Update Settings');
    this.bioField = this.page.getByPlaceholder('Short bio about you');
    this.urlString = this.page.getByPlaceholder('URL of profile picture');
};

async enterUserBio (bio) {
    await this.bioField.click();
    await this.bioField.fill(bio);
};

async updateProfileButton() {
    await this.updateButton.click();
};

async getProfile () {
    const user = {
        bio: await this.bioField
    }
  return user;
};

async updateProfile (bio = '') {
    await this.bioField.click();
    await this.bioField.fill(bio);
    await this.updateButton.click();
};

async enterUrl(urlPicture){
    await this.urlString.click();
    await this.urlString.fill(urlPicture);
  };

}
