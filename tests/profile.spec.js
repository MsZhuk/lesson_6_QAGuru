import { fa, faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';
 
const url = 'https://realworld.qa.guru/#/';
//describe - for test suite
test.describe('Профиль пользователя', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(url);
        let userName = faker.person.firstName('female');
        let userEmail = faker.internet.email();
        let userPassword = faker.internet.password();
        await page.getByRole('link', { name: 'Sign up' }).click();
        await page.getByPlaceholder('Your name').click();
        await page.getByPlaceholder('Your name').fill(userName);
        await page.getByPlaceholder('Email').click();
        await page.getByPlaceholder('Email').fill(userEmail);
        await page.getByPlaceholder('Password').click();
        await page.getByPlaceholder('Password').fill(userPassword);
        await page.getByRole('button', { name: 'Sign up' }).click();
    })
 
 
    test('Пользователь может изменить bio', async ({ page }) => {
        let userBio = faker.music.genre();
 
        await page.locator('.dropdown-toggle').click();
        await page.getByRole('link', { name: 'Settings' }).click();
        await page.getByPlaceholder('Short bio about you').click();
        await page.getByPlaceholder('Short bio about you').fill(userBio);
        await page.getByRole('button', 'Update Settings');
        await expect(page.getByPlaceholder('Short bio about you')).toContainText(userBio);
    }
    );
 
});