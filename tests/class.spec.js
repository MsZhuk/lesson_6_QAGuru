import { test, expect } from '@playwright/test';
import { fa, faker } from '@faker-js/faker';
import { ArticlePage, MainPage, RegisterPage, SettingsPage, BurgerMenuPage} from "../src/pages/index";

const url = 'https://realworld.qa.guru/#/';
//describe - for test suit
let newUser;

test.describe('Первые тесты', () => {
  test.beforeEach(async ({ page }) => {
newUser = {
  userBio : faker.music.genre(),
  userName : faker.person.firstName('female'),
  userName2 : faker.person.firstName('female'),
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
  const burgerMenuPage = new BurgerMenuPage(page);
  const settingsPage = new SettingsPage(page);

  await burgerMenuPage.goToSettings();
  await settingsPage.enterUserBio(newUser.userBio);
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
  await expect(articlePage.articleText).toContainText(newUser.textArticle);
});

test('Обновить имя пользователя', async ({ page }) => {
  const burgerMenuPage = new BurgerMenuPage(page);
  const settingsPage = new SettingsPage(page);
  const registerPage = new RegisterPage(page);

  await burgerMenuPage.goToSettings();
  await registerPage.updateUserInfo(newUser.userName2);
  await settingsPage.updateProfileButton(); 
  await expect(registerPage.userName).toContainText(newUser.userName2);
});

test('Добавить url', async ({ page }) => {
  const settingsPage = new SettingsPage(page);
  const burgerMenuPage = new BurgerMenuPage(page);

  await burgerMenuPage.goToSettings();
  await settingsPage.enterUrl(newUser.urlPicture);
  await settingsPage.updateProfileButton();
  await expect(settingsPage.urlString).toContainText(newUser.urlPicture);  
});

test('Переход на стартовую страницу', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.goStartPage();
  await expect(mainPage.startpage).toBeTruthy();
});

test('Проверка logout', async ({ page }) => {
  const burgerMenu = new BurgerMenuPage(page);
  await burgerMenu.goToSettings();
  await burgerMenu.logout();
  await expect(burgerMenu.logoutButton).toBeTruthy();
});

});
