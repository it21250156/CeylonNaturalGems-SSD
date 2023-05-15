// import { useState, useEffect } from "react";
// import { useJewelleryesContext } from "../hooks/useJewelleryesContext";
// import React from "react";



// const JewelleryAdminReport = () => {
//     const { jewelleryes } = useJewelleryesContext();
//     const [jewelleryData, setJewelleryData] = useState([]);

//     useEffect(() => {
//         const calculateAverages = () => {
//           let allJewelleryData = { type: "All", avgPrice: 0, minPrice: 0, maxPrice: 0 };
      
//           if (jewelleryes && jewelleryes.length > 0) { // added check for null/undefined
//             const prices = jewelleryes.map((jewellery) => jewellery.price);
//             const avgPrice = prices.reduce((acc, curr) => acc + curr, 0) / prices.length;
//             const minPrice = Math.min(...prices);
//             const maxPrice = Math.max(...prices);
//             allJewelleryData = { type: "All", avgPrice, minPrice, maxPrice };
//           }
      
//           const types = [...new Set(jewelleryes?.map((jewellery) => jewellery.type))]; // added optional chaining
//           const data = types.map((type) => {
//             const typeJewellery = jewelleryes.filter((jewellery) => jewellery.type === type);
//             const prices = typeJewellery.map((jewellery) => jewellery.price);
//             const avgPrice = prices.reduce((acc, curr) => acc + curr, 0) / prices.length;
//             const minPrice = Math.min(...prices);
//             const maxPrice = Math.max(...prices);
//             return { type, avgPrice, minPrice, maxPrice };
//           });
//           setJewelleryData([allJewelleryData, ...data]);
//         };
      
//         calculateAverages();
//       }, [jewelleryes]);
      
      
//       return (
//           <div className="jewellery reports">
//               <h2>Pricing Report</h2>
//               <table>
//                   <thead>
//                       <tr>
//                           <th>Type</th>
//                           <th>Average Price</th>
//                           <th>Lowest Price</th>
//                           <th>Highest Price</th>
//                       </tr>
//                   </thead>
//                   <tbody>
//                       {jewelleryData.map((jewellery) => (
//                           <tr key={jewellery.type}>
//                               <td>{jewellery.type}</td>
//                               <td>Rs. {jewellery.avgPrice.toFixed(2)}/=</td>
//                               <td>Rs. {jewellery.minPrice}/=</td>
//                               <td>Rs. {jewellery.maxPrice}/=</td>
//                           </tr>
//                       ))}
//                   </tbody>
//               </table>
//           </div>
//       );
      
// };

// export default JewelleryAdminReport;
