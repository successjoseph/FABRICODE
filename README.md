# Fabricode — HTML & Images Setup

This is the starting point of the Fabricode fashion website project.  
At this stage, we’ve created the main HTML file and added all the image files inside the correct folder.  
Styling (CSS) and functionality (JavaScript) will come in the next steps.

---

## 📁 Folder Structure

fabricode/
│
├── index.html
│
└── assets/
└── images/
├── trendy-blazer.jpg
├── casual-top.jpg
├── denim-jacket.jpg
├── men_shoes_running.jpg
├── men_accessories_watch.jpg
├── men_clothing_tshirt.jpg
├── men_clothing_jeans.jpg
├── women_shoes_sneakers.jpg
├── women_shoes_boots.jpg
├── women_accessories_handbag.jpg
├── women_accessories_scarf.jpg
├── women_clothing_dress.jpg
└── women_clothing_blouse.jpg



---

## 🧾 index.html Overview

This is the main page of the website.  
Here’s a breakdown of what it includes:

### 🔹 Header
- The top navigation bar
- Fabricode logo
- Navigation links: Home, Shop, Collections, About, Contact
- Login and Sign Up buttons
- Shopping cart icon

### 🔹 Hero Section
- Big welcome headline
- A short paragraph
- “Shop Now” button

### 🔹 Featured Products
- Product cards showing:
  - Product image
  - Product name
  - Price
  - “Add to Cart” button

### 🔹 Categories Section
- Four clickable categories:
  - Tops
  - Bottoms
  - Accessories
  - Shoes

### 🔹 Footer
- © 2025 message
- Social media links (Instagram, X, Facebook)

### 🔹 Login & Sign-Up Modals
- These forms are hidden for now
- They will pop up when JavaScript is added

---

## 🖼️ assets/images Folder

All product and category images are stored here.  
Each image is linked from the HTML like this:

```html
<img src="assets/images/trendy-blazer.jpg" alt="Trendy Blazer" />

✅ What Works So Far
The HTML layout is done

The images are correctly referenced

The modal forms (Login & Sign Up) are set up and ready for JavaScript

🔜 What’s Next
Add styles.css to style the page and make it look great

Add main.js to open and close the modals

Add cart.js to make the Add to Cart buttons work

