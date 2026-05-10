import { test, expect } from '@playwright/test';

// تنظيم الاختبارات تحت اسم النظام أو القسم
test.describe('نظام مدار - واجهة برمجة المشاريع (Projects API)', () => {

    const BASE_URL = 'https://api.madar.com'; // استبدليه برابط السيرفر الحقيقي

    // اختبار 1: التحقق من جلب كل المشاريع بنجاح
    test('يجب أن يجلب قائمة المشاريع بنجاح - Happy Path', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/projects`);
        
        // التأكد من حالة الرد
        expect(response.status()).toBe(200);
        
        const body = await response.json();
        
        // التحقق الاحترافي من هيكلية البيانات (Schema Validation)
        expect(Array.isArray(body)).toBeTruthy(); // هل هي مصفوفة؟
        if (body.length > 0) {
            expect(body[0]).toHaveProperty('id');
            expect(body[0]).toHaveProperty('name');
            expect(typeof body[0].name).toBe('string'); // التأكد من نوع البيانات
        }
    });

    // اختبار 2: إنشاء مشروع جديد والتحقق من البيانات المرسلة
    test('يجب أن يسمح بإنشاء مشروع جديد - POST Request', async ({ request }) => {
        const newProject = {
            name: "مشروع تطوير مدار 2024",
            description: "اختبار آلي للنظام"
        };

        const response = await request.post(`${BASE_URL}/projects`, {
            data: newProject
        });

        expect(response.status()).toBe(201); // Created
        const body = await response.json();
        expect(body.name).toBe(newProject.name);
    });

    // اختبار 3: حالة الفشل (Edge Case) - إرسال بيانات ناقصة
    test('يجب أن يرفض إنشاء مشروع بدون اسم - Error Handling', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/projects`, {
            data: { description: "مشروع بدون اسم" }
        });

        // نتوقع أن يرفض السيرفر الطلب (Bad Request)
        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body.message).toContain('required'); // التأكد من رسالة الخطأ
    });
});