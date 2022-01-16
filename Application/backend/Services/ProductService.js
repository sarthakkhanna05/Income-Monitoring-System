import { Console } from "console";
import { connection as sql } from "../index.js";

// promise for fetching userProfile profile info
export const getAllProductsService = () => {
  return new Promise((resolve) => {
    var query = `select * from product where product_quantity != 0 ; `;

    sql.query(query, (err, result) => {
      resolve([err, result]);
    });
  });
};

// promise for getting top 5 selling products
export const getTopFiveSellingProductsService = () => {
  return new Promise((resolve) => {
    var query = `call IMS.top_5('product'); `;

    sql.query(query, (err, result) => {
      resolve([err, result]);
    });
  });
};
