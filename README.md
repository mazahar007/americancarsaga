# American Car Saga — ওয়েবসাইট

ক্লাসিক ও মাসল কার নিয়ে আর্টিকেল, রিভিউ, গল্প, সুবিধা-অসুবিধা, বায়িং গাইড আর ভিডিওর ওয়েবসাইট।
**Astro** দিয়ে তৈরি একটা স্ট্যাটিক সাইট। খুব হালকা আর দ্রুত চলে, যেকোনো হোস্টিংয়ে রাখা যায়।

## ডিজাইন
- **কালার:** উষ্ণ আইভরি কাগজের মতো ব্যাকগ্রাউন্ড, হেরিটেজ নেভি, মাসল-কার রেড আর ক্রোম-গোল্ড। ধারণাটা Hagerty, Hemmings আর Classic.com থেকে নেওয়া। চোখে চাপ পড়ে না, আবার লেখা পড়তে সমস্যা হয় না (কনট্রাস্ট ৮:১ থেকে ১৫:১)।
- **৪৫–৭৫ বছরের পাঠকদের জন্য:** লেখার সাইজ বড় (১৯px), বাটনগুলো বড়, আর প্রতিটা পেজে **A− / A / A+ / A++** বাটন দিয়ে লেখা ছোট-বড় করা যায়। আছে **Night mode**, যার রং উষ্ণ, পুরো কালো না।
- **রেসপন্সিভ:** মোবাইল, ট্যাবলেট, ডেস্কটপ আর টিভি (১৬০০px ও ২২০০px-এর বেশি চওড়া স্ক্রিনে সব বড় হয়ে যায়)।
- **হালকা:** কোনো ওয়েব ফন্ট বা ভারী JS নেই। একটা পুরো পেজ মাত্র কয়েক KB। ইউটিউব ভিডিও লোড হয় শুধু Play চাপলে।

## সাইটে যা যা আছে
| অংশ | কোথায় |
|---|---|
| হোমপেজ: ফিচার্ড, টপ স্টোরিজ, ক্যাটাগরি, ভিডিও, নিউজলেটার | `/` |
| ক্যাটাগরি: Reviews, Stories, Pros & Cons, Buying Guides, Tips, Values | `/category/...` |
| আর্টিকেল পেজ: রেটিং, স্পেসিফিকেশন, Pros/Cons বক্স, এফিলিয়েট প্রোডাক্ট, শেয়ার/প্রিন্ট | `/articles/...` |
| ভিডিও: ইউটিউব এম্বেড + **Original Videos (Coming Soon)**, যেখানে সরাসরি ভিডিও আপলোড করা যাবে | `/videos` |
| সার্চ, RSS, Sitemap, robots.txt | `/search`, `/rss.xml`, `/sitemap-index.xml` |
| AdSense ও এফিলিয়েটের জন্য দরকারি পেজ: Privacy Policy, Terms, Affiliate Disclosure, About, Contact | footer-এ লিংক |
| ব্র্যান্ড প্রমোশন: Advertise পেজ + আর্টিকেলে "Sponsored" লেবেল | `/advertise` |
| ব্রাউজার থেকে আর্টিকেল লেখার প্যানেল (Decap CMS) | `/admin` |
| লগইন ও Contact ফর্ম (ছোট দুটো PHP ফাইল) | `/api/auth.php`, `/api/contact.php` |

> `src/content/` ফোল্ডারে যে আর্টিকেল আর ভিডিওগুলো আছে সেগুলো **নমুনা**। নিজের কনটেন্ট দিয়ে বদলে নিন।

## কম্পিউটারে চালানো
```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # পুরো সাইট তৈরি হবে dist/ ফোল্ডারে
```

## আর্টিকেল পাবলিশ
**উপায় ১, ফাইল দিয়ে:** `src/content/articles/` ফোল্ডারে নতুন `.md` ফাইল বানান। কোন কোন ফিল্ড দিতে হয় তা নমুনা ফাইলগুলোতে দেখা যাবে। ফাইলের নামই পেজের URL হয়। ক্যাটাগরি হিসেবে এগুলোর একটা দিন: `reviews`, `stories`, `pros-cons`, `buying-guides`, `guides`, `market`।
- রিভিউ হলে `rating`, `verdict`, `specs` দিন।
- সুবিধা-অসুবিধার জন্য `pros` আর `cons` দিন।
- বায়িং গাইডে `products` দিন (এফিলিয়েট লিংকসহ, বাটন স্বয়ংক্রিয়ভাবে তৈরি হবে)।
- ব্র্যান্ড প্রমোশন হলে `sponsored: true` আর `sponsorName` দিন।
- আর্টিকেলের ভেতরে ইউটিউব ভিডিও দেখাতে চাইলে `youtubeUrl`-এ লিংক দিন।
- ছবি রাখুন `public/images/uploads/` ফোল্ডারে, তারপর লিখুন `heroImage: /images/uploads/ছবি.jpg`।

**উপায় ২, ব্রাউজার থেকে (`/admin`):** `yoursite.com/admin`-এ গিয়ে GitHub দিয়ে লগইন করুন, ফর্ম পূরণ করে Publish চাপুন। কয়েক মিনিটের মধ্যে লেখাটা সাইটে চলে আসবে। চালু করার নিয়ম নিচের "নিজের হোস্টিংয়ে সাইট চালানো" অংশে আছে।

## ভিডিও
- **ইউটিউব:** `src/content/videos/`-এ নতুন ফাইল বানান, `type: youtube` দিন আর `youtubeUrl`-এ পুরো লিংক পেস্ট করুন (watch, youtu.be, shorts সব ধরনের লিংক চলে)। লিংক না দিলে "Video coming soon" দেখাবে।
- **সরাসরি আপলোড (আপকামিং):** `type: upload` দিন। MP4 ফাইলটা `public/videos/`-এ রেখে লিখুন `videoFile: /videos/file.mp4`। ফাইল না দেওয়া পর্যন্ত "Coming soon" দেখাবে। *বড় ভিডিও গিট রিপোতে না রেখে Cloudflare R2 বা Bunny CDN-এ রাখাই ভালো। সেখানকার লিংকটা `videoFile`-এ বসালেই চলবে।*

## AdSense ও এফিলিয়েট
1. AdSense অনুমোদন পেলে `src/config.ts`-এ `adsenseClient: 'ca-pub-XXXX'` বসান। চাইলে `adSlots`-এ স্লট আইডিও দিতে পারেন।
2. Google যে লাইনটা দেবে সেটা `public/ads.txt`-এ বসান।
3. ক্লায়েন্ট আইডি না দেওয়া পর্যন্ত বিজ্ঞাপনের জায়গায় হালকা "Ad space" লেখা দেখা যাবে। এটা বন্ধ করতে `showAdPlaceholders: false` করুন।
4. এফিলিয়েট লিংকে স্বয়ংক্রিয়ভাবে `rel="sponsored nofollow"` যোগ হয়, আর ডিসক্লোজার দেখায়।

## নিজের হোস্টিংয়ে সাইট চালানো (cPanel)
সাইটটা চলে সাধারণ HTML ফাইল দিয়ে। আলাদা করে লাগে শুধু দুটো ছোট PHP ফাইল: `api/auth.php` (অ্যাডমিন প্যানেলের লগইন) আর `api/contact.php` (Contact ফর্মের মেসেজ ইমেইলে পাঠানো)। তাই PHP চলে এমন যেকোনো সাধারণ হোস্টিংয়ে সাইট চলবে। কোনো ডাটাবেস লাগে না।

কাজটা এভাবে হয়: আর্টিকেল লিখে Publish চাপলে → লেখাটা GitHub-এ সেভ হয় → GitHub নিজেই সাইট বিল্ড করে → FTP দিয়ে আপনার হোস্টিংয়ে আপলোড করে দেয়। এতে কয়েক মিনিট লাগে, আপনাকে কিছু করতে হয় না।

### একবারের সেটআপ
1. **ডোমেইন ও SSL:** ডোমেইনের DNS আপনার হোস্টিংয়ের দিকে দিন। তারপর cPanel থেকে SSL চালু করুন (AutoSSL বা Let's Encrypt)। SSL চালু হলে `public/.htaccess` ফাইলে HTTPS redirect-এর লাইনগুলোর শুরুর `#` মুছে দিন।
2. **ডোমেইনের নাম বসানো:** দুটো জায়গায় নিজের ডোমেইন লিখুন: `src/config.ts`-এর `url`, আর `public/admin/config.yml`-এর `base_url`, `site_url` ও `display_url`।
3. **`main` ব্রাঞ্চ:** GitHub-এ রিপো → Settings → General → Default branch-এর নাম বদলে `main` করুন।
4. **FTP-র তথ্য GitHub-এ রাখা:** cPanel → FTP Accounts থেকে সার্ভারের নাম, ইউজারনেম আর পাসওয়ার্ড নিন। তারপর GitHub রিপো → Settings → Secrets and variables → Actions-এ যান।
   - **Secrets** ট্যাবে যোগ করুন: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`
   - **Variables** ট্যাবে যোগ করুন: `SITE_URL` (যেমন `https://www.americancarsaga.com`)। সাইট `public_html` ছাড়া অন্য ফোল্ডারে রাখতে চাইলে `FTP_SERVER_DIR`-ও দিন।
   - এরপর থেকে `main`-এ যেকোনো পরিবর্তন হলে সাইট নিজে থেকেই আপলোড হবে। হাতে চালাতে চাইলে: Actions → Deploy to hosting → Run workflow।
5. **অ্যাডমিন লগইনের জন্য GitHub OAuth App:** GitHub → Settings → Developer settings → OAuth Apps → New OAuth App খুলুন।
   - Homepage URL: `https://www.আপনার-ডোমেইন.com`
   - Authorization callback URL: `https://www.আপনার-ডোমেইন.com/api/auth.php`
6. **গোপন তথ্যের ফাইল:** `deploy/acs-config.sample.php` ফাইলটা কপি করে `acs-config.php` নামে **public_html-এর বাইরে** রাখুন, যেমন `/home/আপনার-cpanel-ইউজার/acs-config.php`। ফাইলে বসান OAuth App-এর Client ID ও Secret, আর কোন ইমেইলে Contact ফর্মের মেসেজ যাবে। এই ফাইল কখনো GitHub-এ বা public_html-এ রাখবেন না।
7. সব শেষে `yoursite.com/admin` → Login with GitHub।

### হোস্টিং বদলাতে চাইলে
নতুন হোস্টিংয়ের FTP তথ্য দিয়ে GitHub Secrets আপডেট করুন, `acs-config.php` নতুন হোস্টিংয়ে রাখুন, তারপর ডোমেইনের DNS নতুন হোস্টিংয়ের দিকে দিন। কোনো ডাটাবেস নেই, তাই আর কিছু সরাতে হয় না।

FTP ছাড়া হাতে আপলোড করতে চাইলে: `npm run build` চালিয়ে `dist/` ফোল্ডারের সবকিছু (লুকানো `.htaccess` ফাইলসহ) `public_html`-এ আপলোড করুন।

## সেটিংস কোথায়
`src/config.ts` ফাইলে সাইটের নাম, URL, ইমেইল, AdSense, নিউজলেটার ফর্ম আর সোশ্যাল লিংক। কালার বদলাতে চাইলে `src/styles/global.css`-এর উপরের অংশ দেখুন।
