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



  
         // Functions to display checkout items//
function createCheckoutItemHTML() {
    const checkoutItemsContainer = document.getElementById('checkout-items');
    if (!checkoutItemsContainer || cart.length === 0)
        return;
    const itemsHTML = cart.map(item => `
        <div class="checkout-item">
            <img src="${item.image}" alt="${item.name}" class="checkout-item-image">
            <div class="checkout-item-details">
                <div class="checkout-item-name">${item.name}</div>
                <div class="checkout-item-price">${formatPrice(item.price * item.quantity)}</div>
            </div>  
            <div class="checkout-item-quantity">Quantity: ${item.quantity}</div>
        </div>
    `).join('');
    checkoutItemsContainer.innerHTML = itemsHTML;
}

           // Function to update checkout summary//
function updateCheckoutSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 9.99 : 0;
    const tax = subtotal * 0.08; // 8% tax rate
    const total = subtotal + shipping + tax;

             // Update Checkout Summary Elements//
    const subtotalElement = document.getElementById('checkout-subtotal');
    const shippingElement = document.getElementById('checkout-shipping');
    const taxElement = document.getElementById('checkout-tax');
    const totalElement = document.getElementById('checkout-total');

    if (subtotalElement) subtotalElement.textContent = formatPrice(subtotal);
    if (shippingElement) shippingElement.textContent = shipping > 0 ? formatPrice(shipping) : 'Free';
    if (taxElement) taxElement.textContent = formatPrice(tax);
    if (totalElement) totalElement.textContent = formatPrice(total);
}

                   // Simple form Validation functions//
function validateForm(email) {
    // check if rmail contains '@'//
    return email.includes('@') && email.includes('.');
}
function validateCardNumber(cardNumber) {
    // Remove spaces and check if its 16 digits//
    const clearNumber = cardNumber.repalace(/\s/g, '');
    return /^\d{16}$/.test(clearNumber);
}

        // Function to process the order (simulate)//
function processOrder(formdata) {
    // in real website, this would send data to the server//
    // for now, we will just simualte it with a delay//
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // clear the cart after successful order//
            cart = [];
            updateCartCount();
            saveCart();
            resolve({
                success: true,
                message: 'Order placed successfully! Thank you for your purchase!'
            });
        }, 2000); // Simulate 2 seconds delay//
    });
}
             // Functions to show order success//
function showOrderSuccess(orderInfo) {
    const container = document.querySelector('.container');
    container.innerHTML = `
        <div class="success-message">
            <h2>� Order is placed successfully!</h2>
            <p>Thank you for your purchase!</p>
            <p><strong>Order Number:</strong> ${orderInfo.orderNumber}</p>
            <p>You will receive a confirmation email at ${orderInfo.email}.shortly.</p>
            <a href="index.html" class="btn btn-primary">Continue Shopping</a>
        </div>
    `;
}
                  // Update our page load function to handle checkout page//
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Page loaded...');
        loadCart(); // Load saved cart//
        displayProducts(); // Display products//    
        setupFilters(); // Setup filters//

        // cart page//
        if (document.getElementById('cart-items')) {
            displayCartItems();
            updateCartSummary(); // Update cart summary//
        }
    });

    // checkout page//
    if (document.getElementById('checkout-form')) {
        // redirect to cart if empty//
        if (cart.length === 0) {
            alert('Your cart is empty! Please add items before checking out.');
            window.location.href = 'products.html';
            return;
    }
           createCheckoutItemHTML();
           updateCheckoutSummary();

           // Handle form submission//
           const checkoutForm = document.getElementById('checkout-form');
           checkoutForm.addEventListener('submit', async function(e) {
                e.preventDefault(); // prevent normal form submission//

                // Get form data//
                const formData = new FormData(checkoutForm);
                const data = Object.fromEntries(formData);

                // Simple Validation//
                let isValid = true;
                const errors = [];
                if (!validateEmail(data.email)) {
                    errors.push('Please enter a valid email address.');
                    isValid = false;
                }
                if (!validateCardNumber(data.cardNumber)) {
                    errors.push('Please enter a valid 16-digit card number.');
                    isValid = false;
                }
                if (!isValid) {
                    alert('Please fix the following errors:\n' + errors.join('\n'));
                    return;
                }

                // Show loading state//
                const submitButton = checkoutForm.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.textContent;
                submitButton.textContent = 'Processing...';
                submitButton.disabled = true;

                try {
                    const result = await processOrder(data);
                    if (result.success) {
                        // Show success message//
                        showOrderSuccess(result);
                    }
                } catch (error) {
                    alert('There was an error processing your order. Please try again.');
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                }
            });
        }
    });
// Function to handle contact form submission
function handleContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Stop the form from submitting normally

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Simple validation
            let isValid = true;
            const errors = [];

            if (!data.name || !data.name.trim()) {
                errors.push('Name is required');
                isValid = false;
            }

            if (!validateEmail(data.email)) {
                errors.push('Please enter a valid email address');
                isValid = false;
            }

            if (!data.subject) {
                errors.push('Please select a subject');
                isValid = false;
            }

            if (!data.message || !data.message.trim()) {
                errors.push('Message is required');
                isValid = false;
            } else if (data.message.trim().length < 10) {
                errors.push('Message must be at least 10 characters long');
                isValid = false;
            }

            if (!isValid) {
                alert('Please fix the following errors:\n' + errors.join('\n'));
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate sending the message
            setTimeout(() => {
                alert("Thank you for your message! We'll get back to you soon.");
                contactForm.reset(); // Clear the form
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}
 // Update our main page load function // Update our main page load function
 document.addEventListener( 'DOMContentLoaded', function( )  { {
        console.log( ('Page loaded...') ); ;
        loadCart();
        displayProducts();
        setupFilters();
        
        // Cart page
        if (document.getElementById('cart-items')) {
                displayCartItems();
                updateCartSummary();
        }
        
        // Checkout page
        if (document.getElementById('checkout-form')) {
                if (cart.length === 0) {
                        alert('Your cart is empty!');
                        window.location.href = 'products.html';
                        return;
                }
                
                displayCheckoutItems();
                updateCheckoutSummary();
                
                const checkoutForm = document.getElementById('checkout-form');
                checkoutForm.addEventListener('submit', async function(e) {
                        e.preventDefault();
                        
                        const formData = new FormData(checkoutForm);
                        const data = Object.fromEntries(formData);
                        
                        let isValid = true;
                        const errors = [];
                        
                        if (!validateEmail(data.email)) {
                                errors.push('Please enter a valid email address');
                                isValid = false;
                        }
                        
                        if (!validateCardNumber(data.cardNumber)) {
                                errors.push('Please enter a valid 16-digit card number');
                                isValid = false;
                        }
                        
                        if (!isValid) {
                                alert('Please fix the following errors:\n' + errors.join('\n'));
                                return;
                        }
                        
                        const submitBtn = checkoutForm.querySelector('button[type="submit"]');
                        const originalText = submitBtn.textContent;
                        submitBtn.textContent = 'Processing...';
                        submitBtn.disabled = true;
                        
                        try {
                                const result = await processOrder(data);
                                if (result.success) {
                                        showOrderSuccess(result);
                                }
                        } catch (error) {
                                alert('There was an error processing your order. Please try again.');
                                submitBtn.textContent = originalText;
                                submitBtn.disabled = false;
                        }
                });
        }
        
        // Contact page
        handleContactForm();
 } });
