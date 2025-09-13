let allPlants = []; // store all plants for filtering
let cart = []; // store cart items

// Load categories from API
const loadCategory = () => {
  const url = 'https://openapi.programming-hero.com/api/categories';
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayCategory(json.categories))
    .catch((err) => console.error("Error loading categories:", err));
};

const displayCategory = (categories) => {
  const categoryContainer = document.getElementById('category-container');
  categoryContainer.innerHTML = "";

  // 🔹 Add "All Trees" button manually
  const allBtn = document.createElement('button');
  allBtn.className = "btn btn-success w-full mb-2 lg:justify-start active-category";
  allBtn.textContent = "All Trees";
  allBtn.setAttribute("data-category", "All Trees");
  categoryContainer.appendChild(allBtn);

  // 🔹 Add other category buttons dynamically
  categories.forEach((category) => {
    const categoryBtn = document.createElement('button');
    categoryBtn.className = "btn btn-outline btn-success w-full mb-2 lg:justify-start";
    categoryBtn.textContent = category.category_name;
    categoryBtn.setAttribute("data-category", category.category_name);
    categoryContainer.appendChild(categoryBtn);
  });

  // 🔹 Add click event for filtering
  document.querySelectorAll('#category-container button').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const selectedCategory = e.target.getAttribute("data-category");

      // remove active style from all
      document.querySelectorAll('#category-container button').forEach((b) => {
        b.classList.remove("btn-success", "active-category");
        b.classList.add("btn-outline", "btn-success");
      });

      // add active style to clicked
      e.target.classList.remove("btn-outline");
      e.target.classList.add("btn-success", "active-category");

      filterByCategory(selectedCategory);
    });
  });
};

// Load all plants from API
const allCardSection = () => {
  fetch('https://openapi.programming-hero.com/api/plants')
    .then((res) => res.json())
    .then((data) => {
      allPlants = data.plants; // save for filtering
      displayAllCard(allPlants); // show all by default
    })
    .catch((err) => console.error("Error loading plants:", err));
};

// Filter plants by category
const filterByCategory = (category) => {
  if (category === "All Trees") {
    displayAllCard(allPlants);
  } else {
    const filtered = allPlants.filter(
      (plant) => plant.category.toLowerCase() === category.toLowerCase()
    );
    displayAllCard(filtered);
  }
};

// Display cards dynamically
const displayAllCard = (cards) => {
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = "";

  if (cards.length === 0) {
    cardContainer.innerHTML = `
      <p class="col-span-full text-center text-gray-500">
        No plants available in this category.
      </p>`;
    return;
  }

  cards.forEach((card) => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add("card","bg-white","shadow-lg","w-full","rounded-xl","overflow-hidden");

    cardDiv.innerHTML = `
      <figure class="h-56 w-full overflow-hidden">
        <img src="${card.image}" alt="${card.name}" class="h-full w-full object-cover"/>
      </figure>
      <div class="card-body p-6">
        <h3 onclick="showPlantDetails('${card.id}')" class="card-title text-xl font-semibold mb-2">${card.name}</h3>
        <p class="text-sm text-gray-600 leading-relaxed">
          ${card.description ? card.description.slice(0, 120) : "No description"}...
        </p>
        <div class="flex justify-between items-center mt-4 ">
          <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs  text-center font-medium">
            ${card.category}
          </span>
          <p class=" font-semibold text-gray-600 flex-1 text-right mr-5 ">৳${card.price}</p>
        </div>
        <button
          class="btn btn-success rounded-full text-white border-none w-full mt-5 shadow-md add-to-cart"
          data-name="${card.name}"
          data-price="${card.price}"
        >
          Add to Cart
        </button>
      </div>
    `;
    cardContainer.appendChild(cardDiv);
  });

  // attach event listeners for add-to-cart buttons
  document.querySelectorAll('.add-to-cart').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const name = e.target.getAttribute("data-name");
      const price = parseFloat(e.target.getAttribute("data-price"));
      addToCart(name, price);
    });
  });
};

// Add to Cart function
const addToCart = (name, price) => {
  // check if item already in cart
  let existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  displayCart();

  // show modal/alert
  alert(`${name} has been added to your cart.`);
};

// Remove item from cart
const removeFromCart = (name) => {
  cart = cart.filter(item => item.name !== name);
  displayCart();
};

// Display Cart dynamically
const displayCart = () => {
  const cartContainer = document.querySelector('.Cart');
  cartContainer.innerHTML = `
    <h2 class="font-semibold text-lg pb-3">Your Cart</h2>
  `;

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    const itemDiv = document.createElement('div');
    itemDiv.className = "bg-[#F0FDF4] p-2 rounded-md mb-2 flex justify-between items-center";
    itemDiv.innerHTML = `
      <div>
        <h1 class="font-semibold text-sm">${item.name}</h1>
        <p class="text-sm text-gray-400">৳${item.price} x ${item.qty}</p>
      </div>
      <button class="text-gray-400  remove-btn" data-name="${item.name}">x</button>
    `;
    cartContainer.appendChild(itemDiv);
  });

  cartContainer.innerHTML += `
    <hr class="my-2 text-gray-400" />
    <p class="font-semibold text-gray-600">Total: ৳ ${total}</p>
  `;

  // attach remove button events
  document.querySelectorAll('.remove-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const name = e.target.getAttribute("data-name");
      removeFromCart(name);
    });
  });
};

// Run functions on page load
allCardSection();
loadCategory();
