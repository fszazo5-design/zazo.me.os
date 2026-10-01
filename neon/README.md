# Neon setup

1. أنشئ قاعدة بيانات Neon وانسخ `DATABASE_URL` إلى Vercel Environment Variables.
2. نفّذ محتوى `schema.sql` مرة واحدة داخل Neon SQL Editor.
3. لا تضع `DATABASE_URL` داخل ملفات `VITE_*` أو GitHub؛ يبقى داخل بيئة API في Vercel.

الموقع يحفظ الروابط فقط (`imageUrl` و`contentUrl`) ولا يرفع ملفات ثنائية إلى Neon.
