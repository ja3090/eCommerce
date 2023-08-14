# Tech E-commerce Frontend

Mock E-commerce Site Built with Next.js and Strapi.

## Index

- [Versions](https://github.com/jaw163/eCommerce#versions)
- [Motivation](https://github.com/jaw163/eCommerce#motivation)
- [Screenshot](https://github.com/jaw163/eCommerce#screenshot)
- [Features](https://github.com/jaw163/eCommerce#features)
- [Code Example](https://github.com/jaw163/eCommerce#code-example)
- [Installation](https://github.com/jaw163/eCommerce#installation)
- [API Reference](https://github.com/jaw163/eCommerce#api-reference)
- [Description](https://github.com/jaw163/eCommerce#description)
- [Mentions](https://github.com/jaw163/eCommerce#mentions)

## Versions

    "next": "12.3.1"

## Motivation

The purpose of making this was to produce an application that helped hone my programming skills for real-life use cases, but also to improve my web design skills.

## Screenshot

![Landing Page](/Screenshot.png?raw=true)

## Features

- Fully dynamic products and categories sections
- User Authentication
- Reviews sections and ratings for each product
- Filtering, sort and pagination
- Stripe integration
- Strapi CMS backend for easy maintenance

## Code Example

Used custom React hooks ([useCustomerQueries](https://github.com/jaw163/eCommerce/blob/main/utils/hooks/useCustomerQueries.js)) and useReducers ([mainReducer](https://github.com/jaw163/eCommerce/blob/main/utils/reducers/index.js)) so that the code is easily maintainable and features are simple to add in the future.

## Installation

To run locally, download the repo, extract the folder and open your terminal of choice at the root directory and run

    npm install

In the env.example, add the backend url for the NEXT_PUBLIC_API_URL and for the PUBLISHABLE_KEY you need to add your Stripe test account key. A test account is easy to set up but the frontend functions mostly fine without it. For the backend you will need a bit more configuration, namely setting up a Cloudinary account so that you can store some product images, more information on that can be found here: [Github](https://github.com/jaw163/eCommerce-strapi-backend). However if you would like to use the actual live API you can reach out to me and we can discuss it.

## API Reference

This frontend uses the Strapi API, the documentation for which you can find here: [Strapi](https://docs.strapi.io/).

## Description

This is a simple frontend made using React, Next.js and CSS, benefitting from optimal SEO thanks to Next's SSG. A good user experience was a constant concern, which is why a framework like Next.js was used, given its fast loading speeds and ability to address accessibility concerns. Not only that, but behaviours like the browser returning a user to their scroll position upon return to the home page were implemented to ensure a pleasant user experience. 

Throughout good coding standards were implemented and tools like React were used so that this application would have a good developer experience also.

## Mentions

Again [Kaboom](https://kaboompics.com/) was used for most of the images, with [Unsplash](https://unsplash.com/) used for the bluetooth keyboard image. The design for the site was inspired from a few sources which I will list below:

-[Vendure Storefront](https://remix-storefront.vendure.io/)

-[Hyperice](https://hyperice.com/)

-[Mammut](https://www.mammut.com/uk/en/category/5818-10/clothing)
