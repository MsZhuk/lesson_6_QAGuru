import { test, expect } from '@playwright/test';
import { fa, faker } from '@faker-js/faker';
const url = 'https://realworld.qa.guru/#/';
//describe - for test suit
let newUser;

test.describe('Демо', () => {
  test.beforeEach(async ({ page }) => {
newUser = {
  userBio : faker.music.genre(),
  getUserName : faker.person.firstName('female'),
  getUserEmail : faker.internet.email(),
  getUserPassword : faker.internet.password()
};
  await page.goto(url);
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByPlaceholder('Your name').click();
  await page.getByPlaceholder('Your name').fill(newUser.getUserName);
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(newUser.getUserEmail);
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill(newUser.getUserPassword);
  await page.getByRole('button', { name: 'Sign up'}).click();
});

test('Пользователь может изменить bio', async ({ page }) => {
await page.locator('.dropdown-toggle').click();
const demo = await page.getByRole('link').all();
console.log(demo);
await page.getByRole('link', { name: 'Settings'}).click();
await page.getByPlaceholder('Short bio about you').click();
await page.getByPlaceholder('Short bio about you').fill(newUser.userBio);
await page.getByRole('button', 'Update Settings');
await expect(page.getByPlaceholder('Short bio about you')).toContainText(newUser.userBio);
});
});



