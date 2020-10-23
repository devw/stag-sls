// register-shop endpoint
curl -d '{"shop":"2.com", "accessToken":"value3", "theme": "adapro-pro"}' -H "Content-Type: application/json" -X POST https://b7vpe4fpvc.execute-api.eu-west-3.amazonaws.com/dev/register-shop/1

// get access accessToken from shop
curl  -H "Content-Type: application/json" -X GET  https://b7vpe4fpvc.execute-api.eu-west-3.amazonaws.com/dev/get-shop/2.com

curl  -H "X-Shopify-Access-Token: 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" -X GET https://stag-store-2020.myshopify.com/admin/api/2020-07/storefront_access_tokens.json

const getStoreFrontAccessToken = async (shop, accessToken) => {
    console.log("getting storefront_access_tokens", shop);
    const url = `https://${shop}/admin/api/2020-07/storefront_access_tokens.json`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Shopify-Access-Token": accessToken,
      },
    });
    return (await response.data) ? response.data : response.errors;
  };

  curl -d '{"storefront_access_token":{"title":"stagAccessToken"}}' -H "Content-Type: application/json" -X POST https://stag-store-2020.myshopify.com/admin/api/2020-07/storefront_access_tokens.json

  const createStoreFrontAccessToken = async (shop, accessToken) => {
    console.log("getting storefront_access_tokens", shop);
    const url = `https://${shop}/admin/api/2020-10/storefront_access_tokens.json`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "X-Shopify-Access-Token": accessToken,
      },
      body: {
        storefront_access_token: {
          title: "stagAccessToken",
        },
      },
    });
    return await response.json();
  };
