import { test, expect } from '@playwright/test';
import { fa, faker } from '@faker-js/faker';
import { MainPage, RegisterPage, SettingsPage} from "../src/pages/index";


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
  const settingsPage = new SettingsPage(page);

  await mainPage.clickArticle();
  await page.getByPlaceholder('Article Title').click();
  await page.getByPlaceholder('Article Title').fill('My first article');
  await page.getByPlaceholder("What's this article about?").click();
  await page.getByPlaceholder("What's this article about?").fill('About something');
  await page.getByPlaceholder('Write your article (in markdown)').click();
  await page.getByPlaceholder('Write your article (in markdown)').fill(newUser.textArticle);
  await page.getByPlaceholder('Enter tags').click();
  await page.getByPlaceholder('Enter tags').fill('mytag');
  await page.getByRole('button', 'Update Publish Article').click();
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
 
  await mainPage.goToSettings();
  await page.getByPlaceholder('URL of profile picture').click();
  await page.getByPlaceholder('URL of profile picture').fill(newUser.urlPicture);
  await mainPage.updateSettings();  
});

test('Переход на стартовую страницу', async ({ page }) => {
  await page.locator('.navbar-brand').click();
});

test('проверка logout', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.goToSettings();
  await mainPage.logout();
});

});
