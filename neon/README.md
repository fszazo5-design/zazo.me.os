# Neon setup

1. أنشئ قاعدة بيانات Neon وانسخ `DATABASE_URL` إلى Vercel Environment Variables.
2. نفّذ محتوى `schema.sql` مرة واحدة داخل Neon SQL Editor.
3. أضف متغير `ADMIN_SECRET` في Vercel بقيمة طويلة عشوائية، ثم استخدم القيمة نفسها داخل `/control-panel`.
4. لا تضع `DATABASE_URL` أو `ADMIN_SECRET` داخل ملفات `VITE_*` أو GitHub.

الموقع يحفظ الروابط فقط (`imageUrl` و`contentUrl`) ولا يرفع ملفات ثنائية إلى Neon.
