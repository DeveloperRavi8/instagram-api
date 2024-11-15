const puppeteer = require('puppeteer');
const fetchInstagramProfile = async (InstagramId) => {
  const browser = await puppeteer.launch({
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath: process.env.NODE_ENV === 'production' ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath(),
  });

  try {
    const page = await browser.newPage();

    const cookies = [
      {
        name: 'sessionid',
        value: process.env.INSTAGRAM_SESSION_ID, // Replace with your actual session ID
        domain: '.instagram.com',
        path: '/',
        httpOnly: true,
        secure: true,
      },

    ];

    await page.setCookie(...cookies);

    const response = await page.goto(`https://www.instagram.com/${InstagramId}`);

    await page.waitForSelector('span.html-span.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1hl2dhg.x16tdsg8.x1vvkbs');

    const elements = await page.$$eval(
      'span.html-span.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1hl2dhg.x16tdsg8.x1vvkbs',
      spans => spans.map(span => span.innerHTML)
    );

    const name = await page.evaluate(() => {
      const nameElement = document.querySelector("span.x1lliihq.x1plvlek.xryxfnj.x1n2onr6.x1ji0vk5.x18bv5gf.x193iq5w.xeuugli.x1fj9vlw.x13faqbe.x1vvkbs.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.x1i0vuye.xvs91rp.x1s688f.x5n08af.x10wh9bi.x1wdrske.x8viiok.x18hxmgj");
      return nameElement ? nameElement.innerHTML : null;
    });

    const imageUrl = await page.evaluate(() => {
      const imageElement = document.querySelector("img.xpdipgo.x972fbf.xcfux6l.x1qhh985.xm0m39n.xk390pu.x5yr21d.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xl1xv1r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x11njtxf.xh8yej3");
      return imageElement ? imageElement.src : null;
    });

    await browser.close();
    return {
      username: InstagramId,
      name,
      profilePic: imageUrl,
      posts: elements[0],
      followers: elements[1],
      following: elements[2]
    }
  } catch (error) {
    console.error(`Error fetching profile for ${InstagramId}:`, error);
    throw error;
  } finally {
    await browser.close();
  }
}

module.exports = fetchInstagramProfile;