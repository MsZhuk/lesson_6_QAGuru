import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.skip('test', async ({ page }) => {
  await page.goto('https://realworld.qa.guru/');
  await page.getByRole('link', { name: 'Sign up' }).click();
  const userName = faker.person.firstName('female');
  const email1 = faker.internet.email();
  const password1 = faker.internet.password();
  await page.getByPlaceholder('Your Name').click();
  await page.getByPlaceholder('Your Name').fill(userName);
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(email1);
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill(password1);
});

test('Логин пользователя с паролем', async ({ page }) => {
  await page.goto('https://realworld.qa.guru/');

  await page.getByRole('link', { name: 'Login' }).click();

  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('name2@gmail.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('1234567898');
  await page.getByRole('button', { name: 'Login'}).click();
});
