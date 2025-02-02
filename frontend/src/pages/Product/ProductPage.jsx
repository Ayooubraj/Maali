// import React, { useEffect, useState } from 'react';
// import axios from 'axios';  // Make sure axios is imported
// import ProductCard from '../../components/ProductCard/ProductCard';
// import FilterPanel from '../../components/Filter/FilterPanel';
// import './ProductPage.css';

// const ProductPage = () => {
//   const [cartItems, setCartItems] = useState([]); // State for cart items
//   const [sections, setSections] = useState([ // State for product categories
//     { title: "Indoor Plants", products: [] },
//     { title: "Outdoor Plants", products: [] },
//     { title: "Tools and Equipments", products: [] },
//     { title: "Pots and Supplies", products: [] },
//     { title: "Seeds and Fertilizers", products: [] },
//   ]);

//   const addToCart = (product) => {
//     setCartItems(prevItems => [...prevItems, product]);
//     console.log('Added to cart:', product);
//   };

//   useEffect(() => {
//     // Fetch products from API
//     axios.get('http://localhost:5000/api/products')  // Adjust URL to your backend API
//       .then(response => {
//         const categorizedProducts = {
//           indoor: [],
//           outdoor: [],
//           tools: [],
//           pots: [],
//           seeds: []
//         };

//         response.data.forEach(product => {
//           if (product.category === 'Indoor Plants') categorizedProducts.indoor.push(product);
//           if (product.category === 'Outdoor Plants') categorizedProducts.outdoor.push(product);
//           if (product.category === 'Tools and Equipments') categorizedProducts.tools.push(product);
//           if (product.category === 'Pots and Supplies') categorizedProducts.pots.push(product);
//           if (product.category === 'Seeds and Fertilizers') categorizedProducts.seeds.push(product);
//         });

//         setSections([
//           { title: "Indoor Plants", products: categorizedProducts.indoor },
//           { title: "Outdoor Plants", products: categorizedProducts.outdoor },
//           { title: "Tools and Equipments", products: categorizedProducts.tools },
//           { title: "Pots and Supplies", products: categorizedProducts.pots },
//           { title: "Seeds and Fertilizers", products: categorizedProducts.seeds }
//         ]);
//       })
//       .catch(error => console.error('Error fetching products:', error));
//   }, []);

//   return (
//     <div className="productpage">
//       {/* Hero Section */}
//       <section className="hero">
//         <img
//           src={require('../../assets/images/hero_bgimg.png')}
//           alt="Hero"
//           className="hero__image"
//         />
//         <img
//           src={require('../../assets/images/hero_img1.png')}
//           alt="Hero Overlay"
//           className="hero__overlay-image"
//         />
//         <div className="hero__overlay">
//           <div className="hero__content">
//             <h1 className="hero__title">Welcome to Maali</h1>
//             <h2 className="hero__description">Find the Perfect Plants for Your Garden!</h2>
//           </div>
//         </div>
//       </section>

//       {/* Main Content */}
//       <div className="main-content">
//         {/* Filter Panel */}
//         <div className="filter-container">
//           <FilterPanel />
//         </div>

//         {/* Product Sections */}
//         <div className="products-section">
//           {sections.map(section => (
//             <div key={section.title} className={`product-section ${section.title.replace(/\s+/g, '-').toLowerCase()}`} id={section.title.toLowerCase().replace(/\s+/g, '-')}>
//               <h2>{section.title}</h2>
//               <div className="product-cards-container">
//                 <div className="product-cards-wrapper">
//                   {section.products.map(product => (
//                     <ProductCard key={product.id} product={product} addToCart={addToCart} />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;




//previous working code for product page
import React, { useEffect, useRef, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import FilterPanel from '../../components/Filter/FilterPanel';
import './ProductPage.css';

const ProductPage = () => {
  const [cartItems, setCartItems] = useState([]); // State for cart items

  const getRandomPrice = () => {
    return Math.floor(Math.random() * (900 - 200 + 1)) + 200; // Random price between 200 and 900
  };

  // Sample products data
  const products = [
    { id: 1, name: "Indoor Plant", category: "Indoor", rating: 4.5, image: require('../../assets/images/plant1.jpg'),price:500 },
    { id: 2, name: "Indoor Plant", category: "Indoor", rating: 4.5, image: require('../../assets/images/plant2.png'),price:400 }, 
    { id: 3, name: "Indoor Plant", category: "Indoor", rating: 4.5, image: require('../../assets/images/plant1.jpg'), price:520 },
    { id: 4, name: "Indoor Plant", category: "Indoor", rating: 4.5, image: require('../../assets/images/plant2.png'), price:800 },
    { id: 5, name: "Indoor Plant", category: "Indoor", rating: 4.5, image: require('../../assets/images/plant1.jpg'),price:100 },
    { id: 6, name: "Indoor Plant", category: "Indoor", rating: 4.5, image: require('../../assets/images/plant2.png'), price:300 },


    { id: 7, name: "Outdoor Plant", category: "Outdoor", rating: 4.0, price: getRandomPrice(), image: require('../../assets/images/outdoor_img.jpg') },
    { id: 8, name: "Outdoor Plant", category: "Outdoor", rating: 4.0, price: getRandomPrice(), image: require('../../assets/images/outdoor_img.jpg') },
    { id: 9, name: "Outdoor Plant", category: "Outdoor", rating: 4.0, price: getRandomPrice(), image: require('../../assets/images/outdoor_img.jpg') },
    { id: 10, name: "Outdoor Plant", category: "Outdoor", rating: 4.0, price: getRandomPrice(), image: require('../../assets/images/outdoor_img.jpg') },
    { id: 11, name: "Outdoor Plant", category: "Outdoor", rating: 4.0, price: getRandomPrice(), image: require('../../assets/images/outdoor_img.jpg') },
    { id: 12, name: "Outdoor Plant", category: "Outdoor", rating: 4.0, price: getRandomPrice(), image: require('../../assets/images/outdoor_img.jpg') },

    { id: 13, name: "Garden Tools", category: "Tools", rating: 4.8, price: getRandomPrice(), image: require('../../assets/images/tool_img.png') },
    { id: 14, name: "Garden Tools", category: "Tools", rating: 4.8, price: getRandomPrice(), image: require('../../assets/images/tool_img.png') },
    { id: 15, name: "Garden Tools", category: "Tools", rating: 4.8, price: getRandomPrice(), image: require('../../assets/images/tool_img.png') },
    { id: 16, name: "Garden Tools", category: "Tools", rating: 4.8, price: getRandomPrice(), image: require('../../assets/images/tool_img.png') },
    { id: 17, name: "Garden Tools", category: "Tools", rating: 4.8, price: getRandomPrice(), image: require('../../assets/images/tool_img.png') },
    { id: 18, name: "Garden Tools", category: "Tools", rating: 4.8, price: getRandomPrice(), image: require('../../assets/images/tool_img.png') },

    { id: 19, name: "Pots", category: "Pots", rating: 4.2, price: getRandomPrice(), image: require('../../assets/images/pot_img.jpeg') },
    { id: 20, name: "Pots", category: "Pots", rating: 4.2, price: getRandomPrice(), image: require('../../assets/images/pot_img.jpeg') },
    { id: 21, name: "Pots", category: "Pots", rating: 4.2, price: getRandomPrice(), image: require('../../assets/images/pot_img.jpeg') },
    { id: 22, name: "Pots", category: "Pots", rating: 4.2, price: getRandomPrice(), image: require('../../assets/images/pot_img.jpeg') },
    { id: 23, name: "Pots", category: "Pots", rating: 4.2, price: getRandomPrice(), image: require('../../assets/images/pot_img.jpeg') },
    { id: 24, name: "Pots", category: "Pots", rating: 4.2, price: getRandomPrice(), image: require('../../assets/images/pot_img.jpeg') },
    { id: 25, name: "Pots", category: "Pots", rating: 4.2, price: getRandomPrice(), image: require('../../assets/images/pot_img.jpeg') },


    { id: 26, name: "Fertilizers", category: "Fertilizers", rating: 4.6, price: getRandomPrice(), image: require('../../assets/images/seed_img.png') },
    { id: 27, name: "Fertilizers", category: "Fertilizers", rating: 4.6, price: getRandomPrice(), image: require('../../assets/images/seed_img.png') },
    { id: 28, name: "Fertilizers", category: "Fertilizers", rating: 4.6, price: getRandomPrice(), image: require('../../assets/images/seed_img.png') },
    { id: 29, name: "Fertilizers", category: "Fertilizers", rating: 4.6, price: getRandomPrice(), image: require('../../assets/images/seed_img.png') },
    { id: 30, name: "Fertilizers", category: "Fertilizers", rating: 4.6, price: getRandomPrice(), image: require('../../assets/images/seed_img.png') },

    // Add more products as needed
  ];

  const sections = [
    { title: "Indoor Plants", products: products.filter(p => p.category === "Indoor") },
    { title: "Outdoor Plants", products: products.filter(p => p.category === "Outdoor") },
    { title: "Tools and Equipments", products: products.filter(p => p.category === "Tools") },
    { title: "Pots and Supplies", products: products.filter(p => p.category === "Pots") },
    { title: "Seeds and Fertilizers", products: products.filter(p => p.category === "Fertilizers") },
  ];

  const addToCart = (product) => {
    setCartItems(prevItems => [...prevItems, product]);
    console.log('Added to cart:', product);
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const section = document.querySelector(`.product-section${hash}`);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div className="productpage">
      {/* Hero Section */}
      <section className="hero">
        <img
          src={require('../../assets/images/hero_bgimg.png')}
          alt="Hero"
          className="hero__image"
        />
        <img
          src={require('../../assets/images/hero_img1.png')}
          alt="Hero Overlay"
          className="hero__overlay-image"
        />
        <div className="hero__overlay">
          <div className="hero__content">
            <h1 className="hero__title">Welcome to Maali</h1>
            <h2 className="hero__description">Find the Perfect Plants for Your Garden!</h2>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="main-content">
        {/* Filter Panel */}
        <div className="filter-container">
          <FilterPanel />
        </div>

        {/* Product Sections */}
        <div className="products-section">
          {sections.map(section => (
            <div key={section.title} className={`product-section ${section.title.replace(/\s+/g, '-').toLowerCase()}`} id={section.title.toLowerCase().replace(/\s+/g, '-')}>
              <h2>{section.title}</h2>
              <div className="product-cards-container">
                <button className="scroll-button left" onClick={() => document.querySelector(`.${section.title.replace(/\s+/g, '-').toLowerCase()} .product-cards-wrapper`).scrollBy(-200, 0)}>❮</button>
                <div className="product-cards-wrapper">
                  {section.products.map(product => (
                    <ProductCard key={product.id} product={product} addToCart={addToCart} />
                  ))}
                </div>
                <button className="scroll-button right" onClick={() => document.querySelector(`.${section.title.replace(/\s+/g, '-').toLowerCase()} .product-cards-wrapper`).scrollBy(200, 0)}>❯</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
