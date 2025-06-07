const products = [ 
        { 
                id:1,
                name :"iPhone 15 Pro",
                price :999, 
                category :  "phones",
                image:"https://www.istore.co.za/media/catalog/product/cache/7cbfd4bf9761b066f119e95af17e67c5/i/p/iphone_15_pro_max_black_titanium_pdp_image_position_3.jpg", 
                description:"The latest iPhone with amazing camera and performance"
        },
        { 
                id :2,
                name : "MacBook Air",
                price :  1199,
                category :  "laptops",  
                image : "https://revibe.co.za/cdn/shop/files/Frame_1_38_6ce742c8-c2ec-4b3b-bc84-3b13fe51327e.jpg?v=1734114177",
                description : "Lightweight laptop perfect for work and creativity"
        },
        { 
                id :3, 
                name  :  "AirPods Pro",
                price :  249,
                category :  "accessories",
                image: "https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_SX342_SY445_.jpg",
                description :  "Wireless earbuds with noise cancellation" 
        },
        { 
                id: 4,
                name:  "Samsung Galaxy S24",
                price :  899,
                category  :  "phones",
                image : "https://m.media-amazon.com/images/I/61bZMIlCxmL._AC_SX300_SY300_.jpg", 
                description :  "Android phone with incredible features"
        },
        { 
                id: 5, 
                name:  "Dell Laptop",
                price: 799,
                category :  "laptops",
                image:"https://m.media-amazon.com/images/I/31p-JBuIKIL._SY300_SX300_QL70_ML2_.jpg",
                description :  "Reliable laptop for everyday computing" 
        },

        { 
                id  :  6,
                name :  "Wireless Mouse",
                price : 49,
                category :  "accessories",  
                image : "https://newworld.co.za/cdn/shop/products/s-zoom_ecd80677-dc8f-4887-a6a2-7b94d8d3f4e1.jpg?v=1715648372",
                description:  "Ergonomic wireless mouse for productivity" 
        } 
 ];
 // Step 2: Create our shopping cart // 

 let cart = [];

// Utility function for debouncing
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

 // step 3: get refrences to HTML elements//
 
 const cartCountElement = document.getElementById('cart-count');
 const productsGrid = document.getElementById('products-grid');
 const featuredProducts = document.getElementById('featured-products');

 //step 4: Utility function to format our prices// 
// from the correct currency than just numbers//

function formatPrice(price) {
    return 'R' + price.toFixed(2);
}

console.log('JavaScript loaded successdully!');
console.log('We have' , products.length,'products');


function createProductCard(product) {
    
    return `
          <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">${formatPrice(product.price)}</div>
                <div class="product-actions">
                    <button class="btn btn-primary btn-small" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button> 
                    <button class="btn btn-secondary btn-small" onclick="viewProduct(${product.id})">
                    View Details
                    </button>
                </div>
            </div>
          </div>              
           `;
}

function displayProducts(productsToShow = products) {
    if(productsGrid) {
        const productsHTML = productsToShow.map(createProductCard).join('');
        productsGrid.innerHTML = productsHTML;
}

    if (featuredProducts) {
        const featuredHTML = productsToShow.slice(0, 3).map(createProductCard).join('');
        featuredProducts.innerHTML = featuredHTML;
    }
}
    
function addToCart(productId) {
   alert('adding product '+ productId + ' to cart');
}

function viewProduct(productId){
    const product = products.find(prod => prod.id === productId);
    alert('product:' + product.name + '\nPrice: ' + formatPrice(product.price) + '\nDescription: ' + product.description);  
    }
  
document.addEventListener('DOMContentLoaded', function() {
    console.log('page loaded, displaying products...');
    displayProducts(products);
});

// Fuctions to handle filter bitton clicks//

function setupFilter() {
    // Get all filter buttons//
    const filterButtons = document.querySelectorAll('.filter-button');
    // Add click event listener to each button//

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
        
            // remove active class from all buttons//
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to the clicked button//
            this.classList.add('active');

            // Get the category from the button's data attribute//
            const category = this.getAttribute('data-category');

            // Filter products based on the category//

            let filteredProducts;
            if (category === 'all') {
                filteredProducts = products;
            } else {
                filteredProducts = products.filter(product => product.category === category);
            }  
            
            // Display the filtered products//
            displayProducts(filteredProducts);

            console.log('Showing', filteredProducts.length, 'products in category:', category);
         });

    });

}

// update our page load function//

document.addEventListener('DOMContentLoaded', function() {
    console.log('page loaded, displaying products...');
    displayProducts(products);
    setupFilter(); // add this line//
});
             //Update cart count display//

function updateCartCount() {
    // calculate the total number of items in the cart//
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Update the cart count in navogation//

    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }

    console.log('cart now has', totalItems, 'items');
}     

             // save cart to browser storage so it persists betwween page visits//
function saveCart() {
    localStorage.setItem('techvibe-cart', JSON.stringify(cart));
}

        // load cart from broswer storage//
function loadCart() {
    const savedCart = localStorage.getItem('techvibe-cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
        console.log('Loaded cart with', cart.length, 'different products');
    }
}

       //Add product to cart//
function addToCart(productId) {
    // Find the product in our products array//
    const product = products.find(p=> p.id === productId);
    if (!product) {
        console.error('Product not found!');
        return;
    }
    // Check if the product is already in the cart//
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        // If its already in cart, increase quantity//
        existingItem.quantity += 1;
        console.log('Increased quantity of', product.name, 'to', existingItem.quantity);
        
    } else {
             //If it is new, add it to cart//

           cart.push({
               id: product.id,
               name: product.name,
               price: product.price,
               image: product.image,
               quantity: 1
           });
           console.log('added product', product.name, 'to cart');
   }
           updateCartCount();
           saveCart();
           showNotifaction(product.name + 'added to cart!');
  }
           // Show notification when item is added//

function showNotifaction(message) {
            // Create a notification element//
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    // add to page//
    document.body.appendChild(notification);

    // Remove after 3 seconds//
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
// Update our page load function to load the cart//
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, displaying products...');
    loadCart(); // load saved cart//
    displayProducts(products);  
    setupFilters();
    
 });

    // Function to update item quantity in cart//

function updateQuantity(productId, quantity) {
    console.log('Updating quantity for product', productId, 'to', newQuantity);
    if (item) {
        if (newQuantity <= 0) {
            // If quantity is 0 or less, remove the item//
            removeFromCart(productId);
    
        } else {
            // Update the quantity//
            item.quantity = newQuantity;
          updateCartCount();
          saveCart();
          displayCartItems();
          updateCartCount();
         }
        }
    }

// Function to remove item from cart//

    function createCartItemHTML(item) {
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <p class="cart-item-price">${formatPrice(item.price)} each</p>
                    </div>
                    <div class="cart-item-controls">
                       <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">
                       -
                       </button>
                          <span class="quantity-display">${item.quantity}</span>
                          <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">
                          +
                          </button> 
                </div>
                <div class="cart-item-total">${formatPrice(item.price * item.quantity)}
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                </div>  
            </div>
        `; 
                    
    }

                // Function to display cart items in the cart page//    
        function displayCartItems() {
            const cartItemsContainer = document.getElementById('cart-items');
            const emptyCartElement = document.getElementById('empty-cart');

            // Only run this code if we are on the cart page//

            if (!cartItemsContainer) return;
            if (cart.length === 0) {
                // show empty cart message//
                cartItemsContainer.style.display = 'none';
                if (emptyCartElement) emptyCartElement.style.display = 'block';
                document.querySelector(',cart-summary').style.display = 'none';
            } else {
                // Show cart items//
                cartItemsContainer.style.display = 'block';
                if (emptyCartElement) emptyCartElement.style.display = 'none';
                document.querySelector('.cart-summary').style.display = 'block';
            
                // Generate HTML for each cart item//
                cartItemsContainer.innerHTML = cart.map(createCartItemHTML).join('');
                } 
            }

                    // Function to calculate and update cart summary//
     function updateCartSummary() {
        // Calculate totals//
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 0 ? 9.99 : 0;
        const taxt = subtotal * 0.08 // 8% tax rate
        const total = subtotal + shipping + taxt;

        // Update the display//
        const subtotalElement = document.getElementById('cart-subtotal');
        const shippingElement = document.getElementById('cart-shipping');
        const taxElement = document.getElementById('cart-tax');
        const totalElement = document.getElementById('cart-total');

        if (subtotalElement) subtotalElement.textContent = formatPrice(subtotal);
        if (shippingElement) shippingElement.textContent = formatPrice(shipping);
        if (taxElement) taxElement.textContent = formatPrice(tax);
        if (totalElement) totalElement.textContent = formatPrice(total);
        console.log('cart summary - Subtotal:', formatPrice(subtotal),
                    'Shipping:', formatPrice(shipping),
                    'Tax:', formatPrice(tax),
                    'Total:', formatPrice(total));
    }

                // Function to go to checkout//
function goToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty! Please add items before checking out.');
        return;
    }
    // Redirect to checkout page//
    window.location.href = 'checkout.html';
}

                        // Update our page load function to handle cart page//
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, displaying products...');
    loadCart(); // Load saved cart//
    displayProducts();
    setupFilter(); // Setup filters//
    
    // If we are on the cart page, display cart items//
    if (document.getElementById('cart-items')) {
        displayCartItems();
        updateCartSummary(); // Update cart summary//
    }
});


  
  