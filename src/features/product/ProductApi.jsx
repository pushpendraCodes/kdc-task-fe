

export const fetchCombinedProducts = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await fetch(
          `${import.meta.env.VITE_API_URL}/product/fetch-Combinedproducts`,

          {
            headers: {
              "Content-Type": "application/json",
              // authorization: localStorage.getItem("accessToken"),
            },
          }
        );
        let data = await response.json();
        console.log(data,"co")
        if (response.ok && data) {
          resolve({
            status: "success",
            message: "all products successfully fetched",
            combinedProduct: data.products,
          });
        } else {
          reject({
            status: "error",
            message: data.error || data,
          });
        }
      } catch (error) {
        console.log(error, "error");
        reject({
          status: "error",
          message: "Something went wrong. Please try again later.",
        });
      }

      // console.log(data);
    });
  };
export const fetchProducts = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await fetch(
          `${import.meta.env.VITE_API_URL}/product/fetch-Products`,

          {
            headers: {
              "Content-Type": "application/json",
              // authorization: localStorage.getItem("accessToken"),
            },
          }
        );
        let data = await response.json();
        // console.log(data,"data1")
        if (response.ok && data) {
          resolve({
            status: "success",
            message: "all products successfully fetched",
            products: data.products,
          });
        } else {
          reject({
            status: "error",
            message: data.error || data,
          });
        }
      } catch (error) {
        console.log(error, "error");
        reject({
          status: "error",
          message: "Something went wrong. Please try again later.",
        });
      }

      // console.log(data);
    });
  };
export const fetchMaterials = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await fetch(
          `${import.meta.env.VITE_API_URL}/product/fetch-Materials`,

          {
            headers: {
              "Content-Type": "application/json",
              // authorization: localStorage.getItem("accessToken"),
            },
          }
        );
        let data = await response.json();
        console.log(data,"data1")
        if (response.ok && data) {
          resolve({
            status: "success",
            message: "all materials successfully fetched",
            materials: data.products,
          });
        } else {
          reject({
            status: "error",
            message: data.error || data,
          });
        }
      } catch (error) {
        console.log(error, "error");
        reject({
          status: "error",
          message: "Something went wrong. Please try again later.",
        });
      }

      // console.log(data);
    });
  };
export const fetchGrades = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await fetch(
          `${import.meta.env.VITE_API_URL}/product/fetch-Grades`,

          {
            headers: {
              "Content-Type": "application/json",
              // authorization: localStorage.getItem("accessToken"),
            },
          }
        );
        let data = await response.json();
        console.log(data,"data2")
        if (response.ok && data) {
          resolve({
            status: "success",
            message: "all Grades successfully fetched",
            grades: data.products,
          });
        } else {
          reject({
            status: "error",
            message: data.error || data,
          });
        }
      } catch (error) {
        console.log(error, "error");
        reject({
          status: "error",
          message: "Something went wrong. Please try again later.",
        });
      }

      // console.log(data);
    });
  };

export const addCombinedProduct = (productData) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await fetch(
          `${import.meta.env.VITE_API_URL}/product/add-Combinedproduct`,

          {
            method: "POST",
            body: JSON.stringify(productData),
            headers: {
              "Content-Type": "application/json",

              // authorization: localStorage.getItem("accessToken"),
            },
          }
        );
        let data = await response.json();
        console.log(data,"created")
        if (response.ok && data) {
          resolve({
            status: "success",
            message: "product successfully created",
            product: data.productCombination,
          });
        } else {
          reject({
            status: "error",
            message: data.error || data,
          });
        }
      } catch (error) {
        console.log(error, "error");
        reject({
          status: "error",
          message: "Something went wrong. Please try again later.",
        });
      }

      // console.log(data);
    });
  };
export const quickEditProduct = ({id,updates}) => {
    return new Promise(async (resolve, reject) => {
      // console.log(update,"update");

      try {
        let response = await fetch(
          `${import.meta.env.VITE_API_URL}/product/quick-edit`,

          {
            method: "PATCH",
            body: JSON.stringify({id,updates}),
            headers: {
              "Content-Type": "application/json",

              // authorization: localStorage.getItem("accessToken"),
            },
          }
        );
        let data = await response.json();
        console.log(data,"updated")
        if (response.ok && data) {
          resolve({
            status: "success",
            message: "product successfully created",
            product: data.updatedProduct,
          });
        } else {
          reject({
            status: "error",
            message: data.error || data,
          });
        }
      } catch (error) {
        console.log(error, "error");
        reject({
          status: "error",
          message: "Something went wrong. Please try again later.",
        });
      }

      // console.log(data);
    });
  };
export const EditDetailsProduct = ({id,updates}) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await fetch(
          `${import.meta.env.VITE_API_URL}/product/details-edit`,

          {
            method: "PATCH",
            body: JSON.stringify({id,updates}),
            headers: {
              "Content-Type": "application/json",

              // authorization: localStorage.getItem("accessToken"),
            },
          }
        );
        let data = await response.json();
        console.log(data,"created")
        if (response.ok && data) {
          resolve({
            status: "success",
            message: "product successfully created",
            product: data.updatedProduct,
          });
        } else {
          reject({
            status: "error",
            message: data.error || data,
          });
        }
      } catch (error) {
        console.log(error, "error");
        reject({
          status: "error",
          message: "Something went wrong. Please try again later.",
        });
      }

      // console.log(data);
    });
  };
export const SearchFilterProduct = (queryParams) => {
    return new Promise(async (resolve, reject) => {
      console.log(queryParams,"queryapi");
      const queryString = new URLSearchParams(queryParams).toString();
      try {
        let response = await fetch(
          `${import.meta.env.VITE_API_URL}/product/search_filter?${queryString}`,

          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",

              // authorization: localStorage.getItem("accessToken"),
            },
          }
        );
        let data = await response.json();
        console.log(data,"created")
        if (response.ok && data) {
          resolve({
            status: "success",
            message: "product successfully fetched",
            product: data.filteredProducts,
          });
        } else {
          reject({
            status: "error",
            message: data.error || data,
          });
        }
      } catch (error) {
        console.log(error, "error");
        reject({
          status: "error",
          message: "Something went wrong. Please try again later.",
        });
      }

      // console.log(data);
    });
  };
