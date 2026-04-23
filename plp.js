(function () {
    if(window.__plpLoaded) return;
    window.__plpLoaded = true;

    let plp = {
        state: {
            mounted: false,
            products: [
                {name: "Lumen Ceramic Mug", price: 120, category: "Drinkware"},
                {name: "Lumen Ceramic Mug", price: 120, category: "Drinkware"},
                {name: "Lumen Ceramic Mug", price: 120, category: "Drinkware"},
                {name: "Lumen Ceramic Mug", price: 120, category: "Drinkware"},
            ],
            config: null,
        },

        selectors: {
            shopHeadingMount: "[data-shop-head-mount]",
            productGridMount: "[data-grid-mount]",
            card: "plpCard",
            cardGradient: "plpCardGradient",
            cardDetails: "plpCardDetails",
            cardItemAndPrice: "plpCardItemAndPrice",
            cardVariantAndAddButton: "plpCardVariantAndAddButton",
        },

        constants: {
            PRODUCT_VARIANT: {
                IVORY: "Ivory",
                SMOKE: "Smoke",
                TERRACOTTA: "Terracotta",
            },
        },

        bootstrap: function (config) {
            if(plp.state.mounted) {
                console.log("already mounted");
                return;
            }
            if(!config) {
                console.log("no config - aborting bootstrap");
                return;
            }

            plp.state.mounted = true;
            plp.state.config = config;

            plp.render.shopHeading();
            plp.render.products();
        },

        render: {
            shopHeading: function () {
                let shopHeadingMount = document.querySelector(plp.selectors.shopHeadingMount);
                if(!shopHeadingMount) return;

                let conf = plp.state.config;

                shopHeadingMount.innerHTML = `
                    <h1>${conf.collectionTitle}</h1>
                    <h5>${conf.collectionSubtitle}</h5>
                `;
            },

            productCard: function (product) {
                return `
                    <article class=${plp.selectors.card}>
                        <div class=${plp.selectors.cardGradient}></div>
                        <div class=${plp.selectors.cardDetails}>
                            <div class=${plp.selectors.cardItemAndPrice}>
                                <h5>${product.name}</h5>
                                <h5>$${product.price}</h5>
                            </div>
                            <div>${product.category}</div>
                            <div class=${plp.selectors.cardVariantAndAddButton}>
                                <select name="variant" id="variant">
                                    <option value="ivory">Ivory</option>
                                    <option value="smoke">Smoke</option>
                                    <option value="terracotta">Terracotta</option>
                                </select>
                                <button>Add</button>
                            </div>
                        </div>
                    </article>
                `;
            },

            products: function () {
                let productGridMount = document.querySelector(plp.selectors.productGridMount);
                if(!productGridMount) return;

                productGridMount.innerHTML = `
                    ${
                        plp.state.products.map((product) => plp.render.productCard(product))
                    }
                `;
            }
        }
    }

    if(document.querySelector(plp.selectors.shopHeadingMount) && 
       document.querySelector(plp.selectors.productGridMount) &&
       window.shopifyLiquidValuesPLP) {
        plp.bootstrap(window.shopifyLiquidValuesPLP);
    }
})();