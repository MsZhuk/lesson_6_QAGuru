import { th } from '@faker-js/faker';
import {BasePage} from './base.page';

export class UrlPage extends BasePage {
  constructor(page) {
    super(page);
    this.urlString = this.page.getByPlaceholder('URL of profile picture');

  };

  async enterUrl(urlPicture){
    await this.urlString.click();
    await this.urlString.fill(urlPicture);
  };
};

