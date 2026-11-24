# ZazoBrain

واجهة React/Vite لعرض المشاريع والفيديوهات. تُنشر على Cloudflare Pages باسم `zazobrain`، ويعمل الـAPI في Cloudflare Worker مستقل داخل مستودع `zazobrain-backend` مع D1 للمحتوى الوصفي وروابط الوسائط. تُرفع الصور والفيديوهات من لوحة الإدارة مباشرةً إلى Cloudinary؛ لا تحفظ الواجهة ملفات الوسائط أو أسرار Cloudinary.

## الإعداد والبناء

اضبط `VITE_CONTENT_API_URL` على عنوان Worker، مثل `https://zazobrain-api.<account-subdomain>.workers.dev`، ثم نفّذ:

```sh
npm ci
npm run build
npm run lint
```

انشر محتويات `dist/` إلى مشروع Cloudflare Pages `zazobrain`.

## لوحة الإدارة

لوحة الإدارة في `/admin`، والمسار `/control-panel` متاح للتوافق. تتطلب الإضافة والحذف تسجيل دخول صالحًا. عند رفع صورة أو فيديو، تطلب اللوحة توقيع رفع مقيّدًا من Worker، ثم ترفع الملف مباشرة إلى Cloudinary. تُحفظ الروابط ومعرّفات Cloudinary وسائر بيانات المحتوى في D1. يُحذف سجل المحتوى من D1، ويحاول Worker حذف أصول Cloudinary المرتبطة به.

لا تضع `CLOUDINARY_API_SECRET` أو كلمة مرور الإدارة داخل ملفات الواجهة أو Git. تُضبط كأسرار Worker منفصلة.
