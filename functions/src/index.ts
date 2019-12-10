 
import * as functions from 'firebase-functions';

// Web scraping deps
// import fetch from 'node-fetch';
const jData =  require('../src/rendomQuote.json');
// import * as cheerio from 'cheerio';

// Google Assistant deps
import { dialogflow, SimpleResponse, BasicCard, Button, Image, JsonObject } from 'actions-on-google';
const app = dialogflow({ debug: true });

// Capture Intent
app.intent('get recent content', async (conv) => {

    //Text or Speech Response
    conv.close(new SimpleResponse({ 
        text: `Last episode was This`,
        speech: `The last video was episode was this. It's description goes like this: Click Below`,
     }));

    // Card Response
    conv.close(new BasicCard({
        title: 'Watch the latest Episode',
        image: new Image({ 
            url: 'https://goo.gl/Fz9nrQ',
            alt: 'AngularFirebase Logo' 
        }),
        buttons: new Button({
            title: 'Watch',
            url: 'https://angularfirebase.com/lessons',
        }),
    }));
});



// Helper Function for scraping a webpage
// async function scrapePage() {
//   const page = await fetch('https://angularfirebase.com/lessons')
//   const html = await page.text();

//   const $ = cheerio.load(html)

//   const lesson = $('.preview-content').first()

//   return {
//     title: lesson.find('h2').text(),
//     description: lesson.find('p') .text(),
//     episode: lesson.find('.ep-label').text()
//   }
// }

app.intent('get new quote', async (conv) => {

    const data = await scrapePage();

    //Text or Speech Response
    conv.close(new SimpleResponse({ 
        text: `Hello Your new Quote is`,
        speech: `Hey there , Your new quote is ${data.quote}. Quote by the our femous ${data.author}`,
     }));

    // Card Response
    conv.close(new BasicCard({
        title: 'See my All projects',
        image: new Image({ 
            url: 'https://github.githubassets.com/images/modules/logos_page/Octocat.png',
            alt: 'Github Logo' 
        }),
        buttons: new Button({
            title: 'See All',
            url: 'https://github.com/vanpariyar',
        }),
    }));
});


//Helper Function for scraping a webpage
async function scrapePage() {
//   const page = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=ZxeUzpecKKrQB_PS_w71S3MJf2FAQnFe5xC8Xf4BW5M7R01qxP1lbX1XBQJkZ1U5MEoDEbUf-KtqGg8pq0GVkMHC-lFyy3crm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnI3P0oIcNoe3au3rSty0MmK1BssAuMQhVkJLlat3BM4onUiVzQppvHTaybEBIMl3xA&lib=M-iVgtcr04aqm3y8Sog-_hv6H1RmW7M3x' , {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     }
// });
  const data : JsonObject = jData;
  const quoteNumber = Math.floor(Math.random() * (103 - 0 )) + 0;
  const quote =  data[quoteNumber].quote;
  const author =  data[quoteNumber].author;
  

  return {
    quote: quote,
    author: author
  }
}


// Export the Cloud Functions
export const fulfillment = functions.https.onRequest(app);