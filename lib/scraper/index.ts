import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractDescription, extractPrice } from "./util";

export async function  scrapeAmazonProduct(url:string) {
    if(!url) return;

    //Brigth data proxy

    // curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_7a5cec87-zone-pricewise:k9x9o6ba0nhh -k "https://geo.brdtest.com/welcome.txt"

    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const  port = 22225;
    const session_id=(1000000*Math.random() | 0);

    const options={

        auth:
        {
        username:`${username}-session-${session_id}`,
        password,
    },
    host:'brd.superproxy.io',
    port,
    rejectUnauthorized:false,
    }


    try{
       //fetch the product page
       const response = await axios.get(url,options);
       const $ = cheerio.load(response.data);

       const title = $('#productTitle').text().trim();
       console.log(title);
       const currentPrice = extractPrice(

        $('.priceToPay span.a-price-whole'),
        $('a.size.base.a-color-price'),
        $('.a-button-select .a-color-base'),
        $('.a-price.a-text-price')
       );

       const originalPrice = extractPrice(
       $('a-size-small a-color-secondary aok-align-center basisPrice'),
       $('.a-price.a-text-price span.a-offscreen'),
       $('a-size-small aok-offscreen'),
       $('a-section a-spacing-small aok-align-center')
       );

       const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable';

       const images = 
       $('#imgBlkFront').attr('data-a-dynamic-image') || 
       $('#landingImage').attr('data-a-dynamic-image') ||
       '{}'

       const imageUrls = Object.keys(JSON.parse(images));

       const currency = extractCurrency($('.a-price-symbol'));
    //    console.log(currentPrice);
    //    console.log(originalPrice);
    //    console.log(outOfStock);
    //    console.log(imageUrls);
    //    console.log(currency);

    const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, "");
    const description = extractDescription($);

    const data = {
        url,
        currency: currency || '$',
        image: imageUrls[0],
        title,
        currentPrice: Number(currentPrice) || Number(originalPrice),
        originalPrice: Number(originalPrice) || Number(currentPrice),
        priceHistory: [],
        discountRate: Number(discountRate),
        category: 'category',
        reviewsCount:100,
        stars: 4.5,
        isOutOfStock: outOfStock,
        lowestPrice: Number(currentPrice) || Number(originalPrice),
        highestPrice: Number(originalPrice) || Number(currentPrice),
        averagePrice: Number(currentPrice) || Number(originalPrice),
      }

      console.log(data);
      //return data;
    }
    catch(error:any){
        throw new Error('Failed to scrape product: ${error.message}');
    }

}