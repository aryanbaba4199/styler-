// _app.js

import Head from 'next/head';
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { persistor, store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider } from "next-auth/react";
import { fetchProductData } from "@/utils/productUtils";

const inter = Inter({ subsets: ["latin"] });

const MyApp = ({ Component, pageProps, productData }: AppProps & { productData: any }) => {
  const { productSlugs, productNames, productDescriptions } = productData;


  const additionalKeywords = `
  Jeans for sale, Best E-commerce App, Best E-Commerce web App, Stylish Jeans, Trendy Denim, Fashionable Apparel, Men's Clothing, Women's Clothing, Online Shopping Deals, Latest Fashion Trends, Top-rated E-commerce Platform, Affordable Clothing, Exclusive Discounts, Fashion Marketplace, High-Quality Jeans, Fashion Accessories, Seasonal Apparel, Limited Edition Clothing, Designer Denim, Fashion Deals 2023, Best Online Shopping Experience, Nike, Adidas, Gucci, Zara, H&M, Versace, Prada, Calvin Klein, Louis Vuitton, Armani, Dolce & Gabbana, Ralph Lauren, Tommy Hilfiger, Chanel, Yves Saint Laurent, Givenchy, Balenciaga, Puma, Under Armour, Converse, Reebok, E-commerce Strategies, Online Retail, Digital Shopping, Mobile Commerce, E-commerce Solutions, Webstore Optimization, Customer Experience, Shopping Cart Abandonment, Payment Gateway Integration, Product Recommendations, Fashion Blog, Style Guides, Sustainable Fashion, Eco-Friendly Clothing, Fashion Influencers, Outfit Inspiration, Seasonal Fashion, Street Style, Fashion Photography, Fashion Events, Virtual Shopping, Augmented Reality in Retail, Black Friday Deals, Cyber Monday Discounts, Fashion Industry News, Online Marketplace, Apparel Brands, Clothing Trends, Spring/Summer Collection, Fall/Winter Fashion, Fashion Forward, Wardrobe Essentials, Fashion Tech, Apparel Manufacturing, Bespoke Fashion, Fashion Innovation, Fashion Retail Analytics, Fashion SEO Tips, Online Presence, Social Media Marketing for Fashion, Global Fashion Trends, Sustainable Textiles, Clothing Materials, Ethical Fashion Practices, Fashion Business Insights, Dress to Impress, Online Fashion Communities, Shopping Experience Tips, Fashion Forward Cities, Fashion Capitals of the World, Personal Styling Services, Fashion Discounts and Coupons, Virtual Fitting Rooms, Fashion Ecosystem, Clothing Subscription Boxes, Trendsetting Fashion, Dress for Success, Fashion Icons, Affordable Luxury Fashion, Custom Apparel Designs, Best Zara Jackets on Bumper Discount, Latest Nike Running Shoes for Men, Stylish Gucci Handbags Collection, Hottest Fashion Trends of 2023, Luxury Designer Fashion Sale, Trendy Adidas Streetwear, Exclusive Louis Vuitton Fashion Deals, Elegant Chanel Dresses for Women, Classic Ralph Lauren Polo Shirts, Celebrity Style Fashion Picks, Cozy Winter Fashion Essentials, Sustainable Fashion Brands List, Fashionable Reebok Sneakers, Modern Converse High Tops, Best Puma Athletic Wear, Stylish Versace Sunglasses, Fashionable Armani Dresses, Dolce & Gabbana Luxury Fashion, Fashionable Givenchy Accessories, Balenciaga Street Style Fashion, Versatile H&M Clothing Collection, Chic Calvin Klein Outfits, Affordable Fashion Tips, Stylish Streetwear Outfits, Fashionable Prada Handbags, Luxury Yves Saint Laurent Dresses, Best Fashion Deals for Cyber Monday, Sustainable Fashion Tips, Stylish Men's and Women's Clothing, Fashionable Holiday Season Apparel, Elegant Spring Dresses Collection, Fall/Winter Fashion Trends, Trendy Summer Outfits, Fashionable Accessories for Every Occasion, Latest Trends in Sustainable Textiles, Ethical Fashion Practices Guide, Fashion Industry Innovations, How to Dress for Success, Online Fashion Communities Insights, Top Fashion Cities of the World, Fashion Capitals and Their Influences, Personal Styling Services Benefits, Fashion Discounts and Coupons Guide, Virtual Fitting Rooms for Convenient Shopping, Fashion Ecosystem Overview, Clothing Subscription Boxes Worth Trying, Trendsetting Fashion Ideas, How to Dress for Success, Fashion Icons and Their Impact, Affordable Luxury Fashion Picks, Custom Apparel Designs for Personalized Style,
  kurta pajama with Nehru jacket,
saree with designer blouse,
lehenga choli for women,
sherwani for men,
salwar kameez with dupatta,
anarkali suit,
dhoti kurta,
patiala suit,
palazzo pants with kurti,
maxi dresses for women,
ethnic wear for men,
Indian wedding dresses,
Indian traditional dresses,
affordable Indian clothes,
plus size Indian clothes,
petite Indian clothes,
sustainable Indian clothes,
ethical Indian clothes,
vintage Indian clothes,
secondhand Indian clothes,
designer Indian clothes,
work clothes for Indian men,
casual clothes for Indian women,
athletic clothes for Indian men and women,
summer clothes for Indian men and women,
winter clothes for Indian men and women,
spring clothes for Indian men and women,
fall clothes for Indian men and women,
  Jeans for sale, Best E-commerce App, Best E-Commerce web App, 
  Stylish Jeans, Trendy Denim, Fashionable Apparel, Men's Clothing, 
  Women's Clothing, Online Shopping Deals, Latest Fashion Trends, 
  Top-rated E-commerce Platform, Affordable Clothing, Exclusive Discounts, 
  Fashion Marketplace, High-Quality Jeans, Fashion Accessories, 
  Seasonal Apparel, Limited Edition Clothing, Designer Denim, 
  Fashion Deals 2023, Best Online Shopping Experience, 
  Nike, Adidas, Gucci, Zara, H&M, Versace, Prada, Calvin Klein, 
  Louis Vuitton, Armani, Dolce & Gabbana, Ralph Lauren, 
  Tommy Hilfiger, Chanel, Yves Saint Laurent, Givenchy, 
  Balenciaga, Puma, Under Armour, Converse, Reebok, 
  E-commerce Strategies, Online Retail, Digital Shopping, 
  Mobile Commerce, E-commerce Solutions, Webstore Optimization, 
  Customer Experience, Shopping Cart Abandonment, 
  Payment Gateway Integration, Product Recommendations, 
  Fashion Blog, Style Guides, Sustainable Fashion, 
  Eco-Friendly Clothing, Fashion Influencers, 
  Outfit Inspiration, Seasonal Fashion, 
  Street Style, Fashion Photography, Fashion Events, 
  Virtual Shopping, Augmented Reality in Retail, 
  Black Friday Deals, Cyber Monday Discounts, 
  Fashion Industry News, Online Marketplace, 
  Apparel Brands, Clothing Trends, 
  Spring/Summer Collection, Fall/Winter Fashion, 
  Fashion Forward, Wardrobe Essentials, 
  Fashion Tech, Apparel Manufacturing, 
  Bespoke Fashion, Fashion Innovation, 
  Fashion Retail Analytics, Fashion SEO Tips, 
  Online Presence, Social Media Marketing for Fashion, 
  Global Fashion Trends, Sustainable Textiles, 
  Clothing Materials, Ethical Fashion Practices, 
  Fashion Business Insights, Dress to Impress, 
  Online Fashion Communities, Shopping Experience Tips, 
  Fashion Forward Cities, Fashion Capitals of the World,
  Personal Styling Services, Fashion Discounts and Coupons, 
  Virtual Fitting Rooms, Fashion Ecosystem, 
  Clothing Subscription Boxes, Trendsetting Fashion, 
  Dress for Success, Fashion Icons, 
  Affordable Luxury Fashion, Custom Apparel Designs
`;

  


  const allKeywords = [...productSlugs, ...productNames, ...productDescriptions, additionalKeywords];

  const keywords = allKeywords.join(", ");

  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className={inter.className}>
            <Head>
              {/* Include the meta tags for SEO */}
              <meta name="keywords" content={keywords} />
            </Head>
            <Component {...pageProps} />
          </div>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
};

MyApp.getInitialProps = async () => {
  const productData = await fetchProductData();
  return { productData };
};

export default MyApp;
