let productsArray = [];

const container = document.querySelector('#products');
const input = document.querySelector('#title');
const sortTitle = document.querySelector('#sortTitle');
const searchBtn = document.querySelector('#searchBtn');

// Fetch coffee data from API
fetch('https://api.sampleapis.com/coffee/hot')
  .then(response => response.json())
  .then(data => {
    productsArray = data;
    displayProducts(productsArray.slice(0, 8)); // Show only first 8 on load
  })
  .catch(error => console.error('Error fetching coffee data:', error));

// Function to display products
function displayProducts(products) {
  container.innerHTML = ''; // Clear previous content

  if (products.length === 0) {
    container.innerHTML = '<p class="text-center text-lg font-semibold text-red-500">No coffees found.</p>';
    return;
  }

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = "bg-white p-4 rounded shadow w-60 text-center hover:scale-105 transition-transform";

    card.innerHTML = `
      <img src="${product.image || 'https://via.placeholder.com/150'}" alt="${product.title}" class="h-40 w-full object-contain mb-2 rounded" />
      <h2 class="text-sm font-semibold h-12 overflow-hidden">${product.title}</h2>
      <p class="text-sm text-gray-600">${product.description || 'No description available.'}</p>
      <p class="text-gray-600 font-medium">${product.ingredients ? product.ingredients.join(', ') : ''}</p>
    `;
    container.appendChild(card);
  });
}

// Search button click event
searchBtn.addEventListener('click', () => {
  filterAndSort();
});

// Sort dropdown change event
sortTitle.addEventListener('change', () => {
  filterAndSort();
});

// Combined filtering and sorting logic
function filterAndSort() {
  let filtered = [...productsArray];
  const keyword = input.value.trim().toLowerCase();

  // Filter by search keyword
  if (keyword) {
    filtered = filtered.filter(p => p.title.toLowerCase().includes(keyword));
  }

  // Sort by title
  const sortValue = sortTitle.value;
  if (sortValue === 'asc') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortValue === 'desc') {
    filtered.sort((a, b) => b.title.localeCompare(a.title));
  }

  // Always display first 8
  displayProducts(filtered.slice(0, 8));
}

