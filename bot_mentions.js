/******************** sample of the code written using autocode ******************/
// authenticates you with the API standard library
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

/**
 * An HTTP endpoint that acts as a webhook for Discord message.create event
 * @param {object} event
 * @returns {any} result
 */
module.exports = async (event, context) => {
  let result = {googlesheets: {}};

  // if someone asks for a photo cupid gives u one of blahaj's
  if (event.content.includes('photo')) {
    console.log(
      `Running [Google Sheets → Retrieve Distinct Values from a Spreadsheet by querying it like a Database]...`
    );
    result.googlesheets.distinctQueryResult = await lib.googlesheets.query[
      '@0.3.0'
    ].distinct({
      spreadsheetId: `1dct_8ntl6qXC8BtWLkyIgZFSM1QWo3g7JQdC8JvqLeo`,
      range: `A1:A100`,
      bounds: 'FIRST_EMPTY_ROW',
      where: [{}],
      limit: {
        count: 0,
        offset: 0,
      },
      field: `Photo_URL`,
    });

    console.log(result.googlesheets.distinctQueryResult.distinct.values);
    let photo =
      result.googlesheets.distinctQueryResult.distinct.values[
        Math.floor(
          Math.random() *
            result.googlesheets.distinctQueryResult.distinct.values.length
        )
      ];

    let messageResponse = await lib.discord.channels['@0.0.2'].messages.create({
      channel_id: `${event.channel_id}`,
      content: [
        `Hey <@!${event.author.id}>! I'm Cupid (a bot powered by Autocode).`,
        `I found you a blahaj picture just like you asked`,
        `${photo}`,
      ].join('\n'),
      tts: false,
    });
    return messageResponse;

    // get a random event form mlh
  } else if (event.content.includes('event')) {
    let result = {crawler: {}};

    console.log(
      `Running [Crawler → Query (scrape) a provided URL based on CSS selectors]...`
    );
    result.crawler.pageData = await lib.crawler.query['@0.0.1'].selectors({
      url: `https://mlh.io/seasons/2021/events`,
      userAgent: `stdlib/crawler/query`,
      includeMetadata: false,
      selectorQueries: [
        {
          selector: `h3.event-name, p.event-date`,
          resolver: `text`,
        },
      ],
    });
    // console.log(result.crawler.pageData.queryResults);
    let mlh_events =
      result.crawler.pageData.queryResults[0].slice(0,20);
    console.log(mlh_events);
    
    for (let i = 0; i < 10; i++) {
      mlh_events[i] = mlh_events[2*i].text+" ( ";
      mlh_events[i] += mlh_events[2*i+1].text+" ) \n";  
    }
    mlh_events=mlh_events.slice(0,10);
    console.log(mlh_events);
    let messageResponse = await lib.discord.channels['@0.0.2'].messages.create({
      channel_id: `${event.channel_id}`,
      content: [
        `Hey found some event's you might be interested in this hackathon season`,
        `Have a look\n\n${mlh_events.toString()}`,
      ].join('\n'),
      tts: false,
    });
    return messageResponse;

    // show a meme
  } else if (event.content.includes('meme')) {
    let result = {googlesheets: {}};

    console.log(
      `Running [Google Sheets → Retrieve Distinct Values from a Spreadsheet by querying it like a Database]...`
    );
    result.googlesheets.distinctQueryResult = await lib.googlesheets.query[
      '@0.3.0'
    ].distinct({
      spreadsheetId: `1x-dBbmHJvmqz4kHV7T3LKNh8YuCxnaOJuRcK9J0QlTc`,
      range: `A1:A100`,
      bounds: 'FIRST_EMPTY_ROW',
      where: [{}],
      limit: {
        count: 0,
        offset: 0,
      },
      field: `MEME_URL`,
    });

    console.log(result.googlesheets.distinctQueryResult.distinct.values);
    let meme =
      result.googlesheets.distinctQueryResult.distinct.values[
        Math.floor(
          Math.random() *
            result.googlesheets.distinctQueryResult.distinct.values.length
        )
      ];

    let messageResponse = await lib.discord.channels['@0.0.2'].messages.create({
      channel_id: `${event.channel_id}`,
      content: [
        `Hey <@!${event.author.id}>! Im Cupid `,
        `I heard you like memes! Here's one for you!`,
        `${meme}`,
      ].join('\n'),
      tts: false,
    });
    return messageResponse;
  
  // nothing elseS
  } else {
    let messageResponse = await lib.discord.channels['@0.0.2'].messages.create({
      channel_id: `${event.channel_id}`,
      content: [`Hey I'm confused. What do you want me to do?`].join('\n'),
      tts: false,
    });
    return messageResponse;
  }
};
