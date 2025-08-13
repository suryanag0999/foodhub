import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllRestaurants,
  fetchAllRestaurantsData,
} from "../../store/Restaurant/restaurant-action";
import { useTheme } from "../../context/ThemeContext";
import { useCart } from "./Checkout";
import {
  Filter,
  Plus,
  Minus,
  Star,
  Leaf,
  ChefHat,
  Flame,
  Loader2,
} from "lucide-react";

const AllFoods = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { restaurants, loading, error } = useSelector(
    (state) => state.restaurant
  );
  const { addToCart, removeFromCart, cart } = useCart();
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    dispatch(fetchAllRestaurants());
    dispatch(fetchAllRestaurantsData());
  }, [dispatch]);

  const filteredDishes = restaurants
    .flatMap((restaurant) =>
      (restaurant.menu || []).map((dish) => ({
        ...dish,
        id: dish._id,
        restaurantName: restaurant.name || "Unknown Restaurant",
        image:
          dish.image && dish.image !== "" ? dish.image : "/assets/nofood.png",
        rating: dish.rating || 4.0,
        trending: dish.rating >= 4.5,
        // Fix the type determination logic to match Restaurant.jsx
        type: dish.ingredients === "veg" ? "veg" : "nonveg",
      }))
    )
    .filter((dish) => {
      if (filterType === "all") return true;
      if (filterType === "veg") return dish.type === "veg";
      if (filterType === "nonveg") return dish.type === "nonveg";
      return true;
    });

  const themeClasses = isDarkMode
    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
    : "bg-gradient-to-br from-orange-50 via-white to-pink-50 text-gray-900";

  const cardClasses = isDarkMode
    ? "bg-gray-800/50 border-gray-700/50"
    : "bg-white/70 border-gray-200/50";
  const buttonClasses = isDarkMode
    ? "bg-gray-700/50 hover:bg-gray-600/50 border-gray-600/50"
    : "bg-white/70 hover:bg-gray-50/70 border-gray-300/50";

  if (loading) {
    return (
      <div
        className={`min-h-screen ${themeClasses} transition-all duration-500`}
      >
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            <p
              className={`text-lg ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Preparing your feast...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`min-h-screen ${themeClasses} transition-all duration-500`}
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="text-center">
            <ChefHat
              className={`w-16 h-16 mx-auto mb-4 ${
                isDarkMode ? "text-gray-600" : "text-gray-400"
              }`}
            />
            <h3 className="text-xl font-medium mb-2">Unable to load dishes</h3>
            <p
              className={`mb-4 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {error}
            </p>
            <button
              onClick={() => {
                dispatch(fetchAllRestaurants());
                dispatch(fetchAllRestaurantsData());
              }}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-yellow-500 text-white rounded-2xl hover:from-red-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${themeClasses} transition-all duration-500`}>
      {/* Background decorations - adjusted for mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-5 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-96 right-5 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-56 h-56 sm:w-80 sm:h-80 bg-gradient-to-r from-yellow-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header - responsive layout */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-red-500 to-yellow-500 rounded-xl">
                <ChefHat className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">All Foods</h1>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Discover delicious dishes from all restaurants
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter section - mobile optimized */}
        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4 mb-6 sm:mb-8">
          <div className="flex items-center space-x-2">
            <Filter
              className={`w-5 h-5 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            />
            <span
              className={`text-sm font-medium ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Filter by:
            </span>
          </div>
          <div className="flex flex-wrap gap-2 sm:space-x-2">
            {[
              { key: "all", label: "All", icon: ChefHat },
              { key: "veg", label: "Vegetarian", icon: Leaf },
              { key: "nonveg", label: "Non-Veg", icon: Flame },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setFilterType(key)}
                className={`flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-2 rounded-xl border transition-all duration-300 ${
                  filterType === key
                    ? "bg-gradient-to-r from-red-500 to-yellow-500 text-white border-transparent"
                    : `${buttonClasses} backdrop-blur-sm`
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm sm:text-base">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid - responsive columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredDishes.map((dish) => (
            <div
              key={dish.id}
              className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border ${cardClasses} backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105 group`}
            >
              <div className="relative mb-4">
                <div className="w-full h-40 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden shadow-md">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => (e.target.src = "/assets/nofood.png")}
                  />
                </div>
                {dish.trending && (
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Flame className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                )}
                <div
                  className={`absolute top-2 sm:top-3 left-2 sm:left-3 px-2 py-1 rounded-lg text-xs font-medium flex items-center space-x-1 ${
                    dish.type === "veg"
                      ? "bg-green-800/90 text-white"
                      : "bg-red-500/90 text-white"
                  }`}
                >
                  {dish.type === "veg" ? (
                    <Leaf className="w-3 h-3" />
                  ) : (
                    <Flame className="w-3 h-3" />
                  )}
                  <span>{dish.type === "veg" ? "VEG" : "NON-VEG"}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="font-bold text-base sm:text-lg group-hover:text-orange-500 transition-colors duration-300 line-clamp-2">
                    {dish.name}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    } flex items-center space-x-1 truncate`}
                  >
                    <ChefHat className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{dish.restaurantName}</span>
                  </p>
                </div>
                <p
                  className={`text-xs sm:text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  } line-clamp-2`}
                >
                  {dish.description}
                </p>

                <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <span className="text-lg sm:text-xl font-bold text-green-500">
                      ₹{dish.price}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{dish.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200/20">
                  {cart[dish._id]?.quantity > 0 ? (
                    <div className="flex items-center space-x-2 sm:space-x-3 w-full justify-center sm:justify-start">
                      <button
                        onClick={() => removeFromCart(dish._id)}
                        className={`p-2 rounded-xl border ${buttonClasses} hover:scale-105 transition-all duration-300 backdrop-blur-sm`}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {cart[dish._id].quantity}
                      </span>
                      <button
                        onClick={() => addToCart(dish)}
                        className={`p-2 rounded-xl border ${buttonClasses} hover:scale-105 transition-all duration-300 backdrop-blur-sm`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(dish)}
                      className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-yellow-500 text-white rounded-xl hover:from-red-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto"
                    >
                      <Plus className="w-4 h-4" />
                      <span className="text-sm sm:text-base">Add to Cart</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDishes.length === 0 && !loading && (
          <div className="text-center py-12 sm:py-16 px-4">
            <ChefHat
              className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 ${
                isDarkMode ? "text-gray-600" : "text-gray-400"
              }`}
            />
            <h3 className="text-lg sm:text-xl font-medium mb-2">
              No dishes found
            </h3>
            <p
              className={`text-sm sm:text-base ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Try adjusting your filters to see more options.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllFoods;
// ===

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAllRestaurants,
//   fetchAllRestaurantsData,
// } from "../../store/Restaurant/restaurant-action";
// import { useTheme } from "../../context/ThemeContext";
// import { useCart } from "./Checkout";
// import {
//   Filter,
//   Plus,
//   Minus,
//   Star,
//   Leaf,
//   ChefHat,
//   Flame,
//   Loader2,
// } from "lucide-react";

// const AllFoods = () => {
//   const { isDarkMode } = useTheme();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { restaurants, loading, error } = useSelector(
//     (state) => state.restaurant
//   );
//   const { addToCart, removeFromCart, cart } = useCart();
//   const [filterType, setFilterType] = useState("all");

//   useEffect(() => {
//     dispatch(fetchAllRestaurants());
//     dispatch(fetchAllRestaurantsData());
//   }, [dispatch]);

//   const filteredDishes = restaurants
//     .flatMap((restaurant) =>
//       (restaurant.menu || []).map((dish) => ({
//         ...dish,
//         id: dish._id,
//         restaurantName: restaurant.name || "Unknown Restaurant",
//         image:
//           dish.image && dish.image !== "" ? dish.image : "/assets/nofood.png",
//         rating: dish.rating || 4.0,
//         trending: dish.rating >= 4.5,
//         type: dish.ingredients === "veg" ? "veg" : "nonveg",
//       }))
//     )
//     .filter((dish) => {
//       if (filterType === "all") return true;
//       if (filterType === "veg") return dish.type === "veg";
//       if (filterType === "nonveg") return dish.type === "nonveg";
//       return true;
//     });

//   const themeClasses = isDarkMode
//     ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
//     : "bg-gradient-to-br from-orange-50 via-white to-pink-50 text-gray-900";

//   const cardClasses = isDarkMode
//     ? "bg-gray-800/50 border-gray-700/50"
//     : "bg-white/40 border-white/30";
//   const buttonClasses = isDarkMode
//     ? "bg-gray-700/50 hover:bg-gray-600/50 border-gray-600/50"
//     : "bg-white/40 hover:bg-white/60 border-gray-300/30";

//   if (loading) {
//     return (
//       <div className={`min-h-screen ${themeClasses} flex items-center justify-center`}>
//         <div className="flex flex-col items-center space-y-4">
//           <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
//           <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
//             Preparing your feast...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={`min-h-screen ${themeClasses} flex items-center justify-center`}>
//         <div className="text-center">
//           <ChefHat className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
//           <h3 className="text-xl font-medium mb-2">Unable to load dishes</h3>
//           <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-4`}>{error}</p>
//           <button
//             onClick={() => {
//               dispatch(fetchAllRestaurants());
//               dispatch(fetchAllRestaurantsData());
//             }}
//             className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-2xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const popularDishes = filteredDishes.slice(0, 10); // Just an example
//   const topRestaurants = restaurants.slice(0, 8);

//   return (
//     <div className={`min-h-screen ${themeClasses} transition-all duration-500`}>
//       <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        
//         {/* Popular Dishes */}
//         <section className="mb-12">
//           <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
//             Popular Dishes
//           </h2>
//           <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
//             {popularDishes.map((dish) => (
//               <div
//                 key={dish.id}
//                 className={`min-w-[250px] rounded-3xl overflow-hidden border ${cardClasses} backdrop-blur-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideUp`}
//               >
//                 <img
//                   src={dish.image}
//                   alt={dish.name}
//                   className="w-full h-48 object-cover"
//                   onError={(e) => (e.target.src = "/assets/nofood.png")}
//                 />
//                 <div className="p-4">
//                   <h3 className="font-bold">{dish.name}</h3>
//                   <p className="text-sm text-gray-500">{dish.restaurantName}</p>
//                   <div className="flex items-center justify-between mt-3">
//                     <span className="font-semibold text-green-500">₹{dish.price}</span>
//                     <button
//                       onClick={() => addToCart(dish)}
//                       className="flex items-center px-3 py-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full text-sm hover:scale-105 transition-all duration-300"
//                     >
//                       <Plus className="w-4 h-4 mr-1" /> Add
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Top Restaurants */}
//         <section>
//           <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
//             Top Restaurants
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {topRestaurants.map((rest) => (
//               <div
//                 key={rest._id}
//                 className={`rounded-3xl overflow-hidden border ${cardClasses} backdrop-blur-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fadeIn`}
//               >
//                 <img
//                   src={rest.image || "/assets/nofood.png"}
//                   alt={rest.name}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-4">
//                   <h3 className="font-bold">{rest.name}</h3>
//                   <p className="text-sm text-gray-500 line-clamp-2">{rest.description}</p>
//                   <div className="flex items-center mt-2 space-x-1">
//                     <Star className="w-4 h-4 text-yellow-500" />
//                     <span className="text-sm font-medium">{rest.rating || "4.0"}</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//       </div>
//     </div>
//   );
// };

// export default AllFoods;
