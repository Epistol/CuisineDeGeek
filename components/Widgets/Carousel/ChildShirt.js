export function ChildShirt() {
  /*
  <![CDATA[*/
  (function () {
    var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    if (window.ShopifyBuy) {
      if (window.ShopifyBuy.UI) {
        ShopifyBuyInit();
      } else {
        loadScript();
      }
    } else {
      loadScript();
    }

    function loadScript() {
      var script = document.createElement('script');
      script.async = true;
      script.src = scriptURL;
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
      script.onload = ShopifyBuyInit;
    }

    function ShopifyBuyInit() {
      var client = ShopifyBuy.buildClient({
        domain: 'cuisinedegeek.myshopify.com',
        storefrontAccessToken: '4198dba0de3d1beb994be1654be361fa',
      });
      ShopifyBuy.UI.onReady(client).then(function (ui) {
        ui.createComponent('product', {
          id: '4635901591601',
          node: document.getElementById('product-component-1593884402239'),
          moneyFormat: '%24%7B%7Bamount%7D%7D',
          options: {
            "product": {
              "styles": {
                "product": {
                  "@media (min-width: 601px)": {
                    "max-width": "calc(25% - 20px)",
                    "margin-left": "20px",
                    "margin-bottom": "50px"
                  }
                },
                "button": {
                  ":hover": {
                    "background-color": "#de9067"
                  },
                  "background-color": "#f7a072",
                  ":focus": {
                    "background-color": "#de9067"
                  }
                }
              },
              "text": {
                "button": "Add to cart"
              }
            },
            "productSet": {
              "styles": {
                "products": {
                  "@media (min-width: 601px)": {
                    "margin-left": "-20px"
                  }
                }
              }
            },
            "modalProduct": {
              "contents": {
                "img": false,
                "imgWithCarousel": true,
                "button": false,
                "buttonWithQuantity": true
              },
              "styles": {
                "product": {
                  "@media (min-width: 601px)": {
                    "max-width": "100%",
                    "margin-left": "0px",
                    "margin-bottom": "0px"
                  }
                },
                "button": {
                  ":hover": {
                    "background-color": "#de9067"
                  },
                  "background-color": "#f7a072",
                  ":focus": {
                    "background-color": "#de9067"
                  }
                }
              },
              "text": {
                "button": "Add to cart"
              }
            },
            "cart": {
              "styles": {
                "button": {
                  ":hover": {
                    "background-color": "#de9067"
                  },
                  "background-color": "#f7a072",
                  ":focus": {
                    "background-color": "#de9067"
                  }
                }
              },
              "text": {
                "total": "Subtotal",
                "button": "Checkout"
              }
            },
            "toggle": {
              "styles": {
                "toggle": {
                  "background-color": "#f7a072",
                  ":hover": {
                    "background-color": "#de9067"
                  },
                  ":focus": {
                    "background-color": "#de9067"
                  }
                }
              }
            }
          },
        });
      });
    }
  })();
  /*]]>*/

}

