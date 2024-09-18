import { th } from '@faker-js/faker';
import {BasePage} from './base.page';

export class ArticlePage extends BasePage {
  constructor(page){
    super(page);
    this.articleTitle = this.page.getByPlaceholder('Article Title');
    this.articleAbout = this.page.getByPlaceholder("What's this article about?");
    this.articleText = this.page.getByPlaceholder('Write your article (in markdown)');
    this.articleTag = this.page.getByPlaceholder('Enter tags');
    this.articleButtonSend = this.page.getByRole('button', 'Update Publish Article');
  }

  async writeArticleTitle(){
    await this.articleTitle.click();
    await this.articleTitle.fill('My first article');
  };

  async writeArticleAbout(){
    await this.articleAbout.click();
    await this.articleAbout.fill('About something');
  };

  async writeArticleText(textArticle){
    await this.articleText.click();
    await this.articleText.fill(textArticle);
  };

  async writeArticleTag(){
    await this.articleTag.click();
    await this.articleTag.fill('mytag');
  };

  async sendArticle(){
    await this.articleButtonSend.click();
  };


}



 