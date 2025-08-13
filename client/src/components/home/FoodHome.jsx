// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAllRestaurants,
//   fetchAllRestaurantsData,
// } from "../../store/Restaurant/restaurant-action";
// import { Star, Clock, TrendingUp, Flame, Loader2, ChefHat } from "lucide-react";
// import { useTheme } from "../../context/ThemeContext";

// const FoodHome = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { allDishes, restaurants, loading, error } = useSelector(
//     (state) => state.restaurant
//   );
//   const { isDarkMode } = useTheme();

//   // Fetch data on component mount
//   useEffect(() => {
//     dispatch(fetchAllRestaurants());
//     dispatch(fetchAllRestaurantsData());
//   }, [dispatch]);

//   // Extract restaurants from Redux store
//   const getRestaurants = () => {
//     if (!restaurants || restaurants.length === 0) return [];

//     return restaurants.map((restaurant) => ({
//       id: restaurant.id,
//       _id: restaurant._id,
//       name: restaurant.name,
//       image: restaurant.image || "/assets/norestaurant.png",
//       rating: restaurant.rating || 4.0, // Use restaurant's rating from API
//       time: restaurant.time || "20-30 min",
//       popular: restaurant.rating >= 4.5,
//       dishCount: restaurant.menu ? restaurant.menu.length : 0, // Count dishes from menu
//     }));
//   };

//   const popularRestaurants = getRestaurants()
//     .sort((a, b) => b.rating - a.rating)
//     .slice(0, 6);

//   // Extract popular dishes from restaurant menus
//   const popularDishes = restaurants
//     .flatMap((restaurant) =>
//       (restaurant.menu || []).map((dish) => ({
//         ...dish,
//         id: dish._id,
//         name: dish.name,
//         image:
//           dish.image && dish.image !== "" ? dish.image : "/assets/nofood.png",
//         rating: dish.rating || 4.0,
//         trending: dish.rating >= 4.5,
//         restaurantName: restaurant.name,
//       }))
//     )
//     .sort((a, b) => b.rating - a.rating)
//     .slice(0, 6);

//   const themeClasses = isDarkMode
//     ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
//     : "bg-gradient-to-br from-orange-50 via-white to-pink-50 text-gray-900";

//   const cardClasses = isDarkMode
//     ? "bg-gray-800/50 border-gray-700/50"
//     : "bg-white/70 border-gray-200/50";

//   // Loading state
//   if (loading) {
//     return (
//       <div
//         className={`min-h-screen ${themeClasses} transition-all duration-500`}
//       >
//         <div className="flex items-center justify-center min-h-screen">
//           <div className="flex flex-col items-center space-y-4">
//             <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
//             <p
//               className={`text-lg ${
//                 isDarkMode ? "text-gray-300" : "text-gray-700"
//               }`}
//             >
//               Adding spice to your screen...
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div
//         className={`min-h-screen ${themeClasses} transition-all duration-500`}
//       >
//         <div className="flex items-center justify-center min-h-screen px-4">
//           <div className="text-center">
//             <ChefHat
//               className={`w-16 h-16 mx-auto mb-4 ${
//                 isDarkMode ? "text-gray-600" : "text-gray-400"
//               }`}
//             />
//             <h3 className="text-xl font-medium mb-2">Unable to load content</h3>
//             <p
//               className={`mb-4 ${
//                 isDarkMode ? "text-gray-400" : "text-gray-600"
//               }`}
//             >
//               {error}
//             </p>
//             <button
//               onClick={() => {
//                 dispatch(fetchAllRestaurants());
//                 dispatch(fetchAllRestaurantsData());
//               }}
//               className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-2xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`min-h-screen ${themeClasses} transition-all duration-500`}>
//       {/* Background decorations - adjusted for mobile */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute top-64 sm:top-96 right-5 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute bottom-10 sm:bottom-20 left-1/2 w-60 sm:w-80 h-60 sm:h-80 bg-gradient-to-r from-yellow-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
//         {/* Popular Dishes */}
//         <div className="mb-12 sm:mb-16">
//           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl">
//                 <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//               </div>
//               <div>
//                 <h2 className="text-2xl sm:text-3xl font-bold">
//                   Popular Dishes
//                 </h2>
//                 <p
//                   className={`text-sm ${
//                     isDarkMode ? "text-gray-400" : "text-gray-600"
//                   }`}
//                 >
//                   Crowd favorites you cant miss
//                 </p>
//               </div>
//             </div>
//             <button
//               className={`flex items-center space-x-2 px-4 py-2 rounded-xl self-start sm:self-auto ${
//                 isDarkMode
//                   ? "text-gray-400 hover:text-white"
//                   : "text-gray-600 hover:text-gray-900"
//               } hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-pink-500/10 transition-all duration-300`}
//               onClick={() => navigate("/dishes")}
//             >
//               <span>View all</span>
//               <TrendingUp className="w-4 h-4" />
//             </button>
//           </div>

//           {/* Mobile: Grid layout, Desktop: Horizontal scroll */}
//           <div className="grid grid-cols-3 sm:grid-cols-4 md:flex md:space-x-6 gap-4 md:gap-0 md:overflow-x-auto md:pb-4 md:scrollbar-hide">
//             {popularDishes.map((dish, index) => (
//               <div
//                 key={dish.id || index}
//                 onClick={() =>
//                   navigate(`/foods/${encodeURIComponent(dish.name)}`, {
//                     state: { restaurantName: dish.restaurantName },
//                   })
//                 }
//                 className="flex flex-col items-center md:min-w-[120px] group cursor-pointer"
//               >
//                 <div className="relative">
//                   <div
//                     className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl sm:rounded-3xl border-2 ${
//                       isDarkMode ? "border-gray-700" : "border-gray-300"
//                     } overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105`}
//                   >
//                     <img
//                       src={dish.image}
//                       alt={dish.name}
//                       className="w-full h-full object-cover"
//                       onError={(e) => (e.target.src = "/assets/nofood.png")}
//                     />
//                   </div>
//                   {dish.trending && (
//                     <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
//                       <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
//                     </div>
//                   )}
//                 </div>
//                 <span className="mt-2 sm:mt-3 text-xs sm:text-sm font-medium text-center group-hover:text-orange-500 transition-colors duration-300 line-clamp-2">
//                   {dish.name}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Popular Restaurants */}
//         <div>
//           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
//                 <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//               </div>
//               <div>
//                 <h2 className="text-2xl sm:text-3xl font-bold">
//                   Top Restaurants
//                 </h2>
//                 <p
//                   className={`text-sm ${
//                     isDarkMode ? "text-gray-400" : "text-gray-600"
//                   }`}
//                 >
//                   Best rated restaurants near you
//                 </p>
//               </div>
//             </div>
//             <button
//               className={`flex items-center space-x-2 px-4 py-2 rounded-xl self-start sm:self-auto ${
//                 isDarkMode
//                   ? "text-gray-400 hover:text-white"
//                   : "text-gray-600 hover:text-gray-900"
//               } hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10 transition-all duration-300`}
//               onClick={() => navigate("/restaurants")}
//             >
//               <span>View all</span>
//               <TrendingUp className="w-4 h-4" />
//             </button>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//             {popularRestaurants.map((rest, index) => (
//               <div
//                 key={rest.id || index}
//                 onClick={() =>
//                   navigate(`/restaurant/${rest._id || rest.id}`, {
//                     state: { restaurant: rest },
//                   })
//                 }
//                 className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border ${cardClasses} backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group`}
//               >
//                 <div className="flex items-center space-x-3 sm:space-x-4 mb-4">
//                   <div className="relative">
//                     <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden shadow-md">
//                       <img
//                         src={rest.image}
//                         alt={rest.name}
//                         className="w-full h-full object-cover"
//                         onError={(e) =>
//                           (e.target.src = "/assets/norestaurant.png")
//                         }
//                       />
//                     </div>
//                     {rest.popular && (
//                       <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
//                         <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
//                       </div>
//                     )}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h3 className="font-semibold text-base sm:text-lg group-hover:text-orange-500 transition-colors duration-300 truncate">
//                       {rest.name}
//                     </h3>
//                     <div className="flex items-center space-x-3 sm:space-x-4 mt-2">
//                       <div className="flex items-center space-x-1">
//                         <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
//                         <span className="text-xs sm:text-sm font-medium">
//                           {rest.rating}
//                         </span>
//                       </div>
//                       <div className="flex items-center space-x-1">
//                         <Clock
//                           className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
//                             isDarkMode ? "text-gray-400" : "text-gray-500"
//                           }`}
//                         />
//                         <span
//                           className={`text-xs sm:text-sm ${
//                             isDarkMode ? "text-gray-400" : "text-gray-500"
//                           }`}
//                         >
//                           {rest.time}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Empty state for dishes */}
//         {!loading && popularDishes.length === 0 && (
//           <div className="text-center py-12 sm:py-16 px-4">
//             <ChefHat
//               className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 ${
//                 isDarkMode ? "text-gray-600" : "text-gray-400"
//               }`}
//             />
//             <h3 className="text-lg sm:text-xl font-medium mb-2">
//               No dishes available
//             </h3>
//             <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
//               Hang tight, deliciousness is on the way!
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FoodHome;
   

// ===================
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllRestaurants,
  fetchAllRestaurantsData,
} from "../../store/Restaurant/restaurant-action";
import { Star, Clock, TrendingUp, Flame, Loader2, ChefHat } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const FoodHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { restaurants, loading, error } = useSelector(
    (state) => state.restaurant
  );
  const { isDarkMode } = useTheme();

  useEffect(() => {
    dispatch(fetchAllRestaurants());
    dispatch(fetchAllRestaurantsData());
  }, [dispatch]);

  const getRestaurants = () => {
    if (!restaurants || restaurants.length === 0) return [];
    return restaurants.map((restaurant) => ({
      id: restaurant.id,
      _id: restaurant._id,
      name: restaurant.name,
      image: restaurant.image || "/assets/norestaurant.png",
      rating: restaurant.rating || 4.0,
      time: restaurant.time || "20-30 min",
      popular: restaurant.rating >= 4.5,
      dishCount: restaurant.menu ? restaurant.menu.length : 0,
    }));
  };

  const popularRestaurants = getRestaurants()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  const popularDishes = restaurants
    .flatMap((restaurant) =>
      (restaurant.menu || []).map((dish) => ({
        ...dish,
        id: dish._id,
        name: dish.name,
        image:
          dish.image && dish.image !== "" ? dish.image : "/assets/nofood.png",
        rating: dish.rating || 4.0,
        trending: dish.rating >= 4.5,
        restaurantName: restaurant.name,
      }))
    )
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  // const themeClasses = isDarkMode
  //   ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
  //   : "bg-gradient-to-br from-orange-50 via-white to-yellow-50 text-gray-900";
  // const themeClasses = "bg-white text-gray-900";
const themeClasses = "bg-gradient-to-r from-white via-orange-100 to-orange-200 text-gray-800";






  const cardClasses = isDarkMode
    ? "bg-gray-800/60 border border-gray-700/50 backdrop-blur-md"
    : "bg-white/80 border border-gray-200/60 backdrop-blur-md";

  if (loading) {
    return (
      <div className={`min-h-screen ${themeClasses}`}>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${themeClasses}`}>
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <ChefHat className="w-16 h-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Unable to load content</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={() => {
              dispatch(fetchAllRestaurants());
              dispatch(fetchAllRestaurantsData());
            }}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${themeClasses} pb-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Popular Dishes */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-red-500 to-red-500 rounded-xl shadow-md">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Popular Dishes</h2>
                <p className="text-sm text-gray-500">
                  Crowd favorites you cant miss
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/dishes")}
              className="text-red-500 hover:text- bg-red-700-600 flex items-center space-x-1"
            >
              <span>View all</span>
              <TrendingUp className="w-4 h-4" />
            </button>
          </div>

          {/* Horizontal Scroll */}
          <div className="flex space-x-5 overflow-x-auto pb-3 crollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-100 scrollbar-hide">
            {popularDishes.map((dish, i) => (
              <div
                key={dish.id || i}
                onClick={() =>
                  navigate(`/foods/${encodeURIComponent(dish.name)}`, {
                    state: { restaurantName: dish.restaurantName },
                  })
                }
                className={`${cardClasses} min-w-[180px] rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 cursor-pointer`}
              >
                <div className="relative h-32 w-full">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.src = "/assets/nofood.png")}
                  />
                  {dish.trending && (
                    <div className="absolute top-2 right-2 bg-orange-500 text-white rounded-full p-1">
                      <Flame className="w-4 h-4" />
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-sm line-clamp-1">
                    {dish.name}
                  </h4>
                  <p className="text-xs text-gray-500">{dish.restaurantName}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Restaurants */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-red-900 to-red-500 rounded-xl shadow-md">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Top Restaurants</h2>
                <p className="text-sm text-gray-500">
                  Best rated restaurants near you
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/restaurants")}
              className="text-red-500 hover:text-red-900 flex items-center space-x-1"
            >
              <span>View all</span>
              <TrendingUp className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularRestaurants.map((rest, i) => (
              <div
                key={rest.id || i}
                onClick={() =>
                  navigate(`/restaurant/${rest._id || rest.id}`, {
                    state: { restaurant: rest },
                  })
                }
                className={`${cardClasses} rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300 cursor-pointer`}
              >
                <div className="relative h-40">
                  <img
                    src={rest.image}
                    alt={rest.name}
                    className="w-full h-full object-cover"
                    onError={(e) =>
                      (e.target.src = "/assets/norestaurant.png")
                    }
                  />
                  {rest.popular && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-1">
                      <Star className="w-4 h-4" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg truncate">{rest.name}</h3>
                  <div className="flex items-center justify-between mt-2 text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-600" />
                      <span>{rest.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{rest.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default FoodHome;
