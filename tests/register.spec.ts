import { test, expect, type Page } from '@playwright/test';

/**
 * مشروع MADAR - أتمتة اختبارات صفحة التسجيل الشاملة
 * تم إعداد هذا الملف لتغطية 100% من حالات الاختبار المطلوبة للتسليم.
 */

test.describe('Register Page Comprehensive Testing - MADAR Project', () => {

    test.beforeEach(async ({ page }: { page: Page }) => {
        // 1. فتح الرابط المحلي الخاص بكِ
        await page.goto('http://localhost:5173/login'); 

        // 2. الانتقال من صفحة الـ Login إلى الـ Register
        await page.click('text=Register'); 
        
        // التأكد من جاهزية الصفحة قبل البدء
        await expect(page.locator('input[name="name"]')).toBeVisible();
    });

    // --- 1. حالات اختبار الواجهة (UI Cases) ---
    test.describe('UI & Layout Verification', () => {
        test('Should display all required form fields and labels', async ({ page }: { page: Page }) => {
            await expect(page.locator('input[name="name"]')).toBeVisible();
            await expect(page.locator('input[name="email"]')).toBeVisible();
            await expect(page.locator('input[name="password"]')).toBeVisible();
            await expect(page.locator('input[name="confirmPassword"]')).toBeVisible();
            await expect(page.locator('button[type="submit"]')).toBeVisible();
        });

        test('Check if "Sign In" link redirects back to Login', async ({ page }: { page: Page }) => {
            await page.click('text=Already have account');
            await expect(page).toHaveURL(/.*login/);
        });
    });

    // --- 2. حالات اختبار التحقق من البيانات (Validation Cases) ---
    test.describe('Form Validation & Error Handling', () => {
        
        test('Case: Submit with empty fields', async ({ page }: { page: Page }) => {
            await page.click('button[type="submit"]');
            // التأكد من ظهور رسالة "مطلوب" أو تنبيه
            await expect(page.locator('text=required')).toBeVisible();
        });

        test('Case: Invalid email format (e.g., jomana.com)', async ({ page }: { page: Page }) => {
            await page.fill('input[name="email"]', 'jomana.com');
            await page.click('button[type="submit"]');
            await expect(page.locator('text=Invalid email format')).toBeVisible();
        });

        test('Case: Passwords do not match', async ({ page }: { page: Page }) => {
            await page.fill('input[name="password"]', 'Jomana123!');
            await page.fill('input[name="confirmPassword"]', 'Jomana456!');
            await expect(page.locator('text=Passwords do not match')).toBeVisible();
        });

        test('Case: Password is too short (less than 8 characters)', async ({ page }: { page: Page }) => {
            await page.fill('input[name="password"]', '123');
            await page.click('button[type="submit"]');
            await expect(page.locator('text=minimum')).toBeVisible();
        });
    });

    // --- 3. حالة اختبار النجاح (Positive Case) ---
    test.describe('Successful Flow', () => {
        test('Should register successfully with valid credentials', async ({ page }: { page: Page }) => {
            // استخدام بياناتكِ كمهندسة QA
            await page.fill('input[name="name"]', 'Jumana Malek');
            await page.fill('input[name="email"]', 'qa.jomana@example.com');
            await page.fill('input[name="password"]', 'StrongPass2026!');
            await page.fill('input[name="confirmPassword"]', 'StrongPass2026!');
            
            await page.click('button[type="submit"]');
            
            // الناتج المتوقع: الانتقال لصفحة النجاح
            await expect(page).toHaveURL(/.*success/);
        });
    });
});