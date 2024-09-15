import { test, expect } from '@playwright/test';
import { fa, faker } from '@faker-js/faker';
import { ArticlePage, MainPage, RegisterPage, SettingsPage} from "../src/pages/index";
import { UrlPage } from '../src/pages/url.page';
import { ADDRGETNETWORKPARAMS } from 'dns';


const url = 'https://realworld.qa.guru/#/';
//describe - for test suit
let newUser;

test.describe.only('Первые тесты', () => {
  test.beforeEach(async ({ page }) => {
newUser = {
  userBio : faker.music.genre(),
  userName : faker.person.firstName('female'),
  userEmail : faker.internet.email(),
  userPassword : faker.internet.password(),
  textArticle : faker.lorem.text(),
  urlPicture : faker.image.url()

};
  const mainPage = new MainPage(page);
  const registerPage = new RegisterPage(page);

  await mainPage.open(url);
  await mainPage.register();
  await registerPage.register(newUser.userName, newUser.userEmail, newUser.userPassword);
});

test('Пользователь может изменить bio', async ({ page }) => {
  const mainPage = new MainPage(page);
  const settingsPage = new SettingsPage(page);

  await mainPage.goToSettings();
  await settingsPage.enterUserBio(newUser.userBio);
  await settingsPage.updateProfileSimple();
  await expect(settingsPage.bioField).toContainText(newUser.userBio);
});

test('Добавить первую статью', async ({ page }) => {
  const mainPage = new MainPage(page);
  const articlePage = new ArticlePage(page);
  await mainPage.clickArticle();
  await articlePage.writeArticleTitle();
  await articlePage.writeArticleAbout();
  await articlePage.writeArticleText(newUser.textArticle);
  await articlePage.writeArticleTag();
  await articlePage.sendArticle();
});

test('Обновить имя пользователя', async ({ page }) => {
  const mainPage = new MainPage(page);

  await mainPage.goToSettings();
  await page.getByPlaceholder('Your Name').click();
  await page.getByPlaceholder('Your Name').clear();
  await page.getByPlaceholder('Your Name').fill('Olga');
  await mainPage.updateSettings(); 
});

test('Добавить url', async ({ page }) => {
  const mainPage = new MainPage(page);
  const urlPage = new UrlPage(page);
  await mainPage.goToSettings();
  await urlPage.enterUrl(newUser.urlPicture);
  await mainPage.updateSettings();  
});

test('Переход на стартовую страницу', async ({ page }) => {
  await page.locator('.navbar-brand').click();
});

test('Проверка logout', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.goToSettings();
  await mainPage.logout();
});

});
