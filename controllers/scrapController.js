const catchAsync = require("../utils/catchAsync");
const rp = require("request-promise");
const cheerio = require("cheerio");
const bodyParser = require("body-parser");
const fs = require('fs');
const https = require('https');
const AdmZip = require('adm-zip');
const xl = require('excel4node');

exports.GetNotices = async (req, res, next) => {
  const url = `https://ciaa.gov.np/publications/2`;
  const wikiUrls = [];
  await rp(url)
    .then(function (html) {
      //success!
      const $ = cheerio.load(html);
      let index = 0;
      $("tr").each(function (i, el) {
      
        const title = $(this).find("td > a").text();
        const link = $(this).find("td > li > a").attr("href");       
        if (link) {
          const data = {
            link,
            title,
          };
          wikiUrls.push(data);
          index++;
        }
        if (index === 5) {
          return false;
        }
      });
    })
    .catch(function (err) {
      //handle error
      console.log(err);
    });
    res.json(wikiUrls)
};

exports.Sting = async (req, res, next) => {
  const url = `https://ciaa.gov.np/pressreleaseCategory/sting`;
  const wikiUrls = [];
  await rp(url)
    .then(function (html) {
      //success!
      const $ = cheerio.load(html);
      let index = 0;
      $("tr").each(function (i, el) {
        const date = $(this).find("td > p").text().trim();
        const link = $(this).find(".text-center a").last().attr("href");  
        const tds = $(this).find(".text-center");
       const text = tds.siblings("td").text()
        if (link) {
          const data = {
            link,
            date,
            text
          };
          wikiUrls.push(data);
          index++;
        }
        if (index === 6) {
          return false;
        }
      });
    })
    .catch(function (err) {
      //handle error
      console.log(err);
    });
    res.json(wikiUrls)
};

exports.GetNoticesFromTI = async (req, res, next) => {
  const url = `https://ciaa.gov.np/notices`;
  const wikiUrls = [];
  await rp(url)
    .then(function (html) {
      //success!
      const $ = cheerio.load(html);
      let index = 0;
      $("tr").each(function (i, el) {
      
        const title = $(this).find("td > a").text();
        const link = $(this).find(".text-center > a").attr("href");       
        if (link) {
          const data = {
            link,
            title,
          };
          wikiUrls.push(data);
          index++;
        }
        if (index === 5) {
          return false;
        }
      });
    })
    .catch(function (err) {
      //handle error
      console.log(err);
    });
    res.json(wikiUrls)
};



exports.scrapAmazon = async (req, res, next) => {
  const url = `https://www.amazon.com/s?k=${req.body.query}`;
  const wikiUrls = [];
  await rp(url)
    .then(function (html) {
      //success!
      const $ = cheerio.load(html);
      let index = 0;
      $(".s-result-item").each(function (i, el) {
        const imgUrl = $(this).find("img").attr("src");
        const link = $(this).find("h2 > .a-link-normal").attr("href");
        const title = $(this).find("h2 > .a-link-normal > span").text();
        const price = $(this).find(".a-offscreen").text().split("$")[1];
        // const review = $(this).find('.a-size-base').text().split('$')[0].split('-')[0];
        if (price) {
          const data = {
            imgUrl,
            link,
            title,
            price: "$" + price,
          };
          wikiUrls.push(data);
          index++;
        }
        if (index === 5) {
          return false;
        }
      });
    })
    .catch(function (err) {
      //handle error
      console.log(err);
    });
  req.body.amazon = wikiUrls;
  const _folder = Math.random().toString(36).slice(2, 7);
  if (!fs.existsSync(`./static`)) {
    fs.mkdirSync(`./static`);
  }
  const dir = `./static/${_folder}-amazon`;
  __makeJSONfile(wikiUrls,dir);
  next();
};

exports.scrapEbay = async (req, res, next) => {
  const url = `https://www.ebay.com/sch/i.html?_nkw=${req.body.query}`;
  const wikiUrls = [];
  await rp(url)
    .then(function (html) {
      //success!
      const $ = cheerio.load(html);
      let index = 0;
      $("#srp-river-results > ul > li").each(function (i, el) {
        const imgUrl = $(this).find("img").attr("src");
        const link = $(this).find("a").attr("href");
        const title = $(this).find(".s-item__title").text();
        const price = $(this).find(".s-item__price").text().split("$")[1];
        if (price) {
          const data = {
            imgUrl,
            link,
            title,
            price: "$" + price,
          };
          wikiUrls.push(data);
          index++;
        }
        if (index === 5) {
          return false;
        }
      });
    })
    .catch(function (err) {
      //handle error
      console.log(err);
    });
  req.body.ebay = wikiUrls;
  const _folder = Math.random().toString(36).slice(2, 7);
  if (!fs.existsSync(`./static`)) {
    fs.mkdirSync(`./static`);
  }
  const dir = `./static/${_folder}-ebay`;
  __makeJSONfile(wikiUrls,dir);
  next();
};

exports.scrapSnapdeal = async (req, res, next) => {
  const url = `https://www.snapdeal.com/search?keyword=${req.body.query}`;
  const wikiUrls = [];
  await rp(url)
    .then(function (html) {
      //success!
      const $ = cheerio.load(html);
      let index = 0;
      $(".product-tuple-listing").each(function (i, el) {
        const imgUrl = $(this).find("img").attr("src");
        const link = $(this).find("a").attr("href");
        const title = $(this).find(".product-title").text();
        const price = $(this).find(".product-price").text().split("Rs.")[1];
        if (price) {
          const data = {
            imgUrl,
            link,
            title,
            price: "Rs. " + price,
          };
          wikiUrls.push(data);
          index++;
        }
        if (index === 5) {
          return false;
        }
      });
    })
    .catch(function (err) {
      //handle error
      console.log(err);
    });
    const _folder = Math.random().toString(36).slice(2, 7);
    if (!fs.existsSync(`./static`)) {
      fs.mkdirSync(`./static`);
    }
    const dir = `./static/${_folder}-bbc`;
    __makeJSONfile(wikiUrls,dir);

  res.status(200).json({
    status: "success",
    data: {
      amazon: req.body.amazon,
      ebay: req.body.ebay,
      snapdeal: wikiUrls,
    },
  });
};

exports.newsScrap = async (req, res, next) => {
  const url = `https://myrepublica.nagariknetwork.com/tag/corruption`;
  const wikiUrls = [];
  await rp(url)
    .then(function (html) {
      //success!
      const $ = cheerio.load(html);
      let index = 0;
      $(".categories-list-info").each(function (i, el) {
        const imgUrl = $(this).find("img").attr("src");
        const link = $(this).find("a").attr("href");
        const title = $(this).find("a > h2").text();
        if (link && title && imgUrl) {
          const data = {
            img: imgUrl,
            link: "https://myrepublica.nagariknetwork.com"+ link,
            title,
          };
          wikiUrls.push(data);
          index++;
        }
        if (index === 6) {
          return false;
        }
      });
    })
    .catch(function (err) {
      //handle error
      console.log(err);
    });

    const _folder = Math.random().toString(36).slice(2, 7);
    if (!fs.existsSync(`./static`)) {
      fs.mkdirSync(`./static`);
    }
    const dir = `./static/${_folder}-nyt`;
    __makeJSONfile(wikiUrls,dir);

  res.status(200).json({
    status: "success",
    data: {
      bbc: req.body.bbc,
      nytimes: wikiUrls,
      ok: req.body.onlineKhabar,
      time: Date.now(),
    },
  });
};

exports.onlineKhabarScrap = async (req, res, next) => {
  const url = `https://english.onlinekhabar.com/tag/nepal-corruption`;
  const wikiUrls = [];
  await rp(url)
    .then(function (html) {
      //success!
      const $ = cheerio.load(html);
      let index = 0;
     
      $(".ok-news-post").each(function (i, el) {
        const imgUrl = $(this).find("a > img").attr("src");
        const link = $(this).find("a").attr("href");
        const title = $(this).find("h2").text();
        if (link && title && imgUrl) {
          const data = {
            img: imgUrl,
            link,
            title,
            // price,
          };
          wikiUrls.push(data);
          index++;
        }
        if (index === 6) {
          return false;
        }
      });
    })
    .catch(function (err) {
      //handle error
      console.log(err);
    });
  req.body.onlineKhabar = wikiUrls;
  const _folder = Math.random().toString(36).slice(2, 7);
  if (!fs.existsSync(`./static`)) {
    fs.mkdirSync(`./static`);
  }
  const dir = `./static/${_folder}-ok`;
  __makeJSONfile(wikiUrls,dir);
  next();
};

exports.bbcScrap = async (req, res, next) => {
  const url = `https://www.bbc.com/`;
  const wikiUrls = [];
  await rp(url)
    .then(function (html) {
      //success!
      const $ = cheerio.load(html);
      let index = 0;
      $(".media-list__item").each(function (i, el) {
        // const imgUrl = $(this).find('img').attr('src');
        const img = $(this).find("img").attr("src");
        const link = $(this).find(".block-link__overlay-link").attr("href");
        const title = $(this).find(".media__title").text();
        // const price = $(this).find('.product-price').text().split('Rs.')[1];
        if (link) {
          const data = {
            // imgUrl,
            img,
            link: "https://www.bbc.com" + link,
            title,
            // price,
          };
          wikiUrls.push(data);
          index++;
        }
        if (index === 6) {
          return false;
        }
      });
    })
    .catch(function (err) {
      //handle error
      console.log(err);
    });
    const _folder = Math.random().toString(36).slice(2, 7);
    if (!fs.existsSync(`./static`)) {
      fs.mkdirSync(`./static`);
    }
    const dir = `./static/${_folder}-bbc`;
    __makeJSONfile(wikiUrls,dir);
   
  
  req.body.bbc = wikiUrls;
  next();
};

exports.sastoDeal = async (req, res, next) => {
  const url = `https://www.sastodeal.com/sd-fast/pet-care/pet-food.html`;
  const wikiUrls = [];
  await rp(url)
    .then(function (html) {
      //success!
      const $ = cheerio.load(html);
      let index = 0;
      $(".product-item").each(function (i, el) {
        // const imgUrl = $(this).find('img').attr('src');
        const img = $(this).find("img").attr("src");
        const link = $(this).find("a").attr("href");
        const title = $(this).find("img").attr("alt");
        // const price = $(this).find('.product-price').text().split('Rs.')[1];
        if (link) {
          const data = {
            // imgUrl,
            img,
            link: link,
            title,
            // price,
          };
          wikiUrls.push(data);
          index++;
        }
        if (index === 10) {
          return false;
        }
      });
    })
    .catch(function (err) {
      //handle error
      console.log(err);
    });
  return res.status(200).json({
    status: "success",
    data: {
      wikiUrls
    },
  });
};

exports.scrapUrl = async (req, res, next) => {

  console.log(req.body);
  const url = req.body.scrap_url;
  const scrap_option = req.body.scrap_option;
  const _folder = Math.random().toString(36).slice(2, 7);
  if (!fs.existsSync(`./static`)) {
    fs.mkdirSync(`./static`);
  }
  try {
    await rp(url)
      .then(async function (html) {
        //success!
        const $ = cheerio.load(html);
        const img_urls = []
       
        // console.log(img_urls);
        if (!fs.existsSync(`./static/${_folder}`)) {
          fs.mkdirSync(`./static/${_folder}`);
        }
        
        if(scrap_option.image){
          $("img").each(function (i, el) {
            const imgUrl = $(this).attr('src');
            console.log(imgUrl);
            if (imgUrl) {
                imgUrl.replace('http://', 'https://');
                if (imgUrl.startsWith('https://')) {
                  img_urls.push(imgUrl);
                } else {
                  let domain = (new URL(url));
                  img_urls.push(`https://${domain.hostname}/${imgUrl}`);
                }
              }
            });
            console.log('scraping image');
            if (img_urls.length > 0) {
            const dir = `./static/${_folder}/images`;
            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir);
            }
           await downloadFile(img_urls, dir).then(res => {
            return res;
          });
        }
        }
        let urls = [];
        if(scrap_option.link){
          $("a").each(function (i, el) {
            const url = $(this).attr('href');
            const title = $(this).text().trim();
            console.log(url, title);
            if (url && title) {
              urls.push({
                url,
                title,
              });
              }
            });
            console.log('scraping links');
            if (urls.length > 0) {
            const dir = `./static/${_folder}/links`;
            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir);
            }
           await makeJSONfile(urls, dir).then(res => {
            return res;
          });
        }
        }
        let table = [];
        if(scrap_option.table){
          $("table").each(function (i, el) {
            const keys = $(this).find('th').map(function (i, el) {
              return $(this).text().trim();
            }).get();
            const values = $(this).find('td').map(function (i, el) {
              return $(this).text().trim();
            }).get();
            // const title = $(this).text().trim();
            let data = {
              keys,
              values,
            };
            table.push(data);
            });
            if (table.length > 0) {
              const __final = [];
              table.map(item => {
                const keys = item.keys;
                const values = item.values;
                let data = {};
                values.forEach((key, index) => {
                  data[keys[index%(keys.length)]] = values[index];
                  if(index%(keys.length) === keys.length-1){
                    __final.push(data);
                    data = {};
                  }
                });
              });
              
            
            const dir = `./static/${_folder}/tables`;
            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir);
            }
           await makeJSONfile(__final, dir).then(res => {
            return res;
          });

          const wb = new xl.Workbook();
          const ws = wb.addWorksheet('anyscrap-'+_folder);
          const headingColumnNames = Object.keys(__final[0]);
         //Write Column Title in Excel file
let headingColumnIndex = 1;
headingColumnNames.forEach(heading => {
    ws.cell(1, headingColumnIndex++)
        .string(heading)
}); 
//Write JSON data to Excel file
let dataIndex = 2;
__final.forEach(data => {

    let dataColumnIndex = 1;
    headingColumnNames.forEach(heading => {
        ws.cell(dataIndex, dataColumnIndex++)
            .string(data[heading])
});
dataIndex++;
});
//Save Excel file
          wb.write(`./static/${_folder}/tables/anyscrap-${_folder}.xlsx`);
        }

        }

   

      })
      .catch(function (err) {
        //handle error
        console.log(err);
      });
    return res.status(200).json({
      status: "success",
      data: {
        dir: `/static/${_folder}/`,
      },
    });
  }
  catch (err) {
    console.log(err);
    return res.status(400).json({
      status: "false",
      data: {
        "error": err
      },
    });
  }

}

const downloadFile = async (img_urls, dir) => {
 img_urls.forEach((img_url, index) => {
    https.get(img_url, (res) => {
      // Image will be stored at this path
      const fileName = `${dir}/${Math.random().toString(36).slice(2, 7)}.jpg`;
      const filePath =  fs.createWriteStream(fileName);
       res.pipe(filePath);
       filePath.on('finish', () => {
        filePath.close();
      })
    })
    if (index === img_urls.length - 1) {
      return true;
    }
  });
  return true;
}

exports.makeZip = async (req, res, next) => {
  const folder =req.params.id;
  const dir = `./static/${folder}`;
  const zipFile = `./static/anyscrap-${folder}.zip`;
  const zip = new AdmZip();
  zip.addLocalFolder(dir);
  zip.writeZip(zipFile);
  const data = zip.toBuffer();
  // fs.unlinkSync(dir);
  return res.status(200).json({ 
    downloadUrl: `${process.env.NODE_ENV ==="production" ? "https:" : "http:"}//${req.get("host")}/static/anyscrap-${folder}.zip` 
  })
}
  // console.log(folder);

const makeJSONfile = async (data, dir) => {
  fs.appendFileSync(`${dir}/data.json`, JSON.stringify(data),{
    encoding: 'utf8',
    flag: 'a'
  });
  return true;
}

const __makeJSONfile = async (data, dir) => {
  fs.appendFileSync(`${dir}.json`, JSON.stringify(data),{
    encoding: 'utf8',
    flag: 'w'
  });
  return true;
}

