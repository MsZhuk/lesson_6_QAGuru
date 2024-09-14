import { test, expect } from '@playwright/test';
import { fa, faker } from '@faker-js/faker';
import { MainPage, RegisterPage } from "../src/pages/index";


const url = 'https://realworld.qa.guru/#/';
//describe - for test suit
let newUser;

test.describe.only('Демо', () => {
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
await page.locator('.dropdown-toggle').click();
//const demo = await page.getByRole('link').all();
await page.getByRole('link', { name: 'Settings'}).click();
await page.getByPlaceholder('Short bio about you').click();
await page.getByPlaceholder('Short bio about you').fill(newUser.userBio);
await page.getByRole('button', 'Update Settings');
await expect(page.getByPlaceholder('Short bio about you')).toContainText(newUser.userBio);
});

test('Добавить первую статью', async ({ page }) => {
  await page.getByRole('link', { name: 'New Article' }).click();
  await page.getByPlaceholder('Article Title').click();
  await page.getByPlaceholder('Article Title').fill('My first article');
  await page.getByPlaceholder("What's this article about?").click();
  await page.getByPlaceholder("What's this article about?").fill('About something');
  await page.getByPlaceholder('Write your article (in markdown)').click();
  await page.getByPlaceholder('Write your article (in markdown)').fill(newUser.textArticle);
  await page.getByPlaceholder('Enter tags').click();
  await page.getByPlaceholder('Enter tags').fill('mytag');
  await page.getByRole('button', 'Update Publish Article');
});

test('Обновить имя пользователя', async ({ page }) => {
  await page.locator('.dropdown-toggle').click();
  await page.getByRole('link', { name: 'Settings'}).click();
  await page.getByPlaceholder('Your Name').click();
  await page.getByPlaceholder('Your Name').clear();
  await page.getByPlaceholder('Your Name').fill('Olga');
  await page.getByRole('button', 'Update Settings'); 
});

test('Добавить url', async ({ page }) => {
  await page.locator('.dropdown-toggle').click();
  await page.getByRole('link', { name: 'Settings'}).click();
  await page.getByPlaceholder('URL of profile picture').click();
  await page.getByPlaceholder('URL of profile picture').fill(newUser.urlPicture);
  await page.getByRole('button', 'Update Settings'); 
});

test('Переход на стартовую страницу', async ({ page }) => {
  await page.locator('.navbar-brand').click();
});

test('проверка logout', async ({ page }) => {
  await page.locator('.dropdown-toggle').click();
  await page.getByRole('link', { name: 'Logout'}).click();
});

});
