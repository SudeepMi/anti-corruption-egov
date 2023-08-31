const catchAsync = require("../utils/catchAsync");
const rp = require('request-promise');
const cheerio = require('cheerio');
const bodyParser = require("body-parser");

exports.scrapAmazon = (async (req, res, next) => {

const url = `https://www.amazon.com/s?k=${req.body.query}`;
const wikiUrls = [];
await rp(url)
  .then(function(html){
    //success!
    const $ = cheerio.load(html);
    let index = 0
    $('.s-result-item').each(function(i, el){
        const imgUrl = $(this).find('img').attr('src');
        const link = $(this).find('h2 > .a-link-normal').attr('href');
        const title = $(this).find('h2 > .a-link-normal > span').text();
        const price = $(this).find('.a-offscreen').text().split('$')[1];
        // const review = $(this).find('.a-size-base').text().split('$')[0].split('-')[0];
        if(price){
        const data = {
            imgUrl,
            link,
            title,
            price: "$" + price,
          
        }
        wikiUrls.push(data);
        index++;
        }
        if(index === 5){
            return false;
        }
    }); 
  })
  .catch(function(err){
    //handle error
    console.log(err);
  });
    res.status(200).json({
        success: true,
        error: "",
        data: wikiUrls,
    });
});


exports.scrapEbay = (async (req, res, next) => {

    const url = `https://www.ebay.com/sch/i.html?_nkw=${req.body.query}`;
    const wikiUrls = [];
    await rp(url)
      .then(function(html){
        //success!
        const $ = cheerio.load(html);
        let index = 0
        $('#srp-river-results > ul > li').each(function(i, el){
            const imgUrl = $(this).find('img').attr('src');
            const link = $(this).find('a').attr('href');
            const title = $(this).find('.s-item__title').text();
            const price = $(this).find('.s-item__price').text().split('$')[1];
            if(price){
            const data = {
                imgUrl,
                link,
                title,
                price: "$" + price,
            }
            wikiUrls.push(data);
            index++;
            }
            if(index === 5){
                return false;
            }
        }); 
      })
      .catch(function(err){
        //handle error
        console.log(err);
      });
        res.status(200).json({
            success: true,
            error: "",
            data: wikiUrls,
        });
    });

exports.scrapSnapdeal = (async (req, res, next) => {
      const url = `https://www.snapdeal.com/search?keyword=${req.body.query}`;
      const wikiUrls = [];
      await rp(url)
        .then(function(html){
          //success!
          const $ = cheerio.load(html);
          let index = 0
          $('.product-tuple-listing').each(function(i, el){
              const imgUrl = $(this).find('img').attr('src');
              const link = $(this).find('a').attr('href');
              const title = $(this).find('.product-title').text();
              const price = $(this).find('.product-price').text().split('Rs.')[1];
              if(price){
              const data = {
                  imgUrl,
                  link,
                  title,
                  price: "Rs. " + price,
              }
              wikiUrls.push(data);
              index++;
              }
              if(index === 5){
                  return false;
              }
          }
          );
        })
        .catch(function(err){
          //handle error
          console.log(err);
        }
        );
        res.status(200).json({
            status: 'success',
            data: wikiUrls
        });
    }
    );

    exports.newsScrap = (async (req, res, next) => {
      const url = `https://www.nytimes.com/section/world`;
      const wikiUrls = [];
      await rp(url)
        .then(function(html){
          //success!
          const $ = cheerio.load(html);
          let index = 0
          $('article').each(function(i, el){
              const imgUrl = $(this).find('img').attr('src');
              const link = $(this).find('h2 > a').attr('href');
              const title = $(this).find('h2 > a').text();
             
              if(link && title && imgUrl){
              const data = {
                  img: imgUrl,
                  link: "https://www.nytimes.com" + link,
                  title,
              }
              wikiUrls.push(data);
              index++;
              }
              if(index === 3){
                  return false;
              }
          }
          );
        })
        .catch(function(err){
          //handle error
          console.log(err);
        }
        );
        res.status(200).json({
            status: 'success',
            data:  wikiUrls,
        });
    }
    );

    exports.onlineKhabarScrap = (async (req, res, next) => {
      const url = `https://www.onlinekhabar.com/content/news`;
      const wikiUrls = [];
      await rp(url)
        .then(function(html){
          //success!
          const $ = cheerio.load(html);
          let index = 0
          $('.span-4').each(function(i, el){
              const imgUrl = $(this).find('a > img').attr('src');
              const link = $(this).find('a').attr('href');
              const title = $(this).find('h2').text();
               if(link && title && imgUrl){
              const data = {
                  img: imgUrl,
                  link,
                  title,
                  // price,
              }
              wikiUrls.push(data);
              index++;
              }
              if(index === 3){
                  return false;
              }
          }
          );
        })
        .catch(function(err){
          //handle error
          console.log(err);
        }
        );
        res.status(200).json({
            status: 'success',
            data:  wikiUrls,
        });

    }
    );
  
    
    exports.bbcScrap = (async (req, res, next) => {
      const url = `https://www.bbc.com/`;
      const wikiUrls = [];
      await rp(url)
        .then(function(html){
          //success!
          const $ = cheerio.load(html);
          let index = 0
          $('.media-list__item').each(function(i, el){
              // const imgUrl = $(this).find('img').attr('src');
              const img = $(this).find("img").attr("src");
              const link = $(this).find('.block-link__overlay-link').attr('href');
              const title = $(this).find('.media__title').text();
              // const price = $(this).find('.product-price').text().split('Rs.')[1];
              if(link){
              const data = {
                  // imgUrl,
                  img,
                  link: "https://www.bbc.com" + link,
                  title : title.trim(),
                  // price,
              }
              wikiUrls.push(data);
              index++;
              }
              if(index === 3){
                  return false;
              }
          }
          );
        })
        .catch(function(err){
          //handle error
          console.log(err);
        }
        );
        res.status(200).json({
            status: 'success',
            data:  wikiUrls,
        });
    }
    );
    
  
    





