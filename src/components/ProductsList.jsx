import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  selectProducts,
  fetchProductsAsync,
  selectCombinedProducts,
  quickEditProductAsync,
  EditDetailsProductAsync,
  SearchFilterProductAsync,
  selectMaterial,
} from "../features/product/ProductSlice";
import { useEffect } from "react";
import Product from "./Product";
import { useState } from "react";
import AddProductModal from "./AddProductModal";
import { quickEditProduct } from "../features/product/ProductApi";
import { BulkEditModal } from "./BulkEditModal";

const ProductsList = () => {
  const dispatch = useDispatch();

  const CombinedProductsList = useSelector(selectCombinedProducts);
  const ProductsList = useSelector(selectProducts);
  const materialList = useSelector(selectMaterial);
  // const CombinedProductsList = useSelector(selectCombinedProducts);
  // console.log(selectCombinedProducts, "selectCombinedProducts");
  console.log(CombinedProductsList, "CombinedProductsList");

  const [openModal, setModal] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [editProductDetailsId, setEditProductDetailsId] = useState(null);
  const [searchText, setText] = useState("");
  const [selectedProduct, setProduct] = useState("");
  const [selectedMaterial, setMaterial] = useState("");

  // useEffect(() => {
  //   const query = {}; // Create an object to store filters

  //   if (searchText) query.query = searchText;
  //   if (selectedProduct) query.product = selectedProduct;
  //   if (selectMaterial) query.material = selectMaterial;

  //   dispatch(SearchFilterProductAsync(query)); // Pass query object
  // }, [searchText, selectedProduct, selectMaterial]);

  const handelSearchFilter = async (e) => {
    e.preventDefault();
    const query = {}; // Create an object to store filters

    if (searchText) query.query = searchText;
    if (selectedProduct) query.product = selectedProduct;
    if (selectedMaterial) query.material = selectedMaterial;
    try {
      console.log(query, "query");
      // Pass query object
      if (query) {
        await dispatch(SearchFilterProductAsync(query)).unwrap;
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [bulkEditType, setBulkEditType] = useState(""); // "quick" or "details"
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allProductIds = CombinedProductsList.map((product) => product._id);
      setSelectedProducts(allProductIds);
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };
  return (
    <div className="p-4 bg-gray-100 ">
      <div className="bg-white p-4 shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-4 w-1/3">
          <button
            onClick={() => setModal(true)}
            className="bg-blue-600 cursor-pointer text-white px-8 py-2 rounded-4xl">
            + Add Products
          </button>
          <span className="text-lg font-semibold">280/400 Products</span>
        </div>
        <div className="flex  mt-4 w-1/2">
          <input
            type="text"
            onChange={(e) => setText(e.target.value)}
            placeholder="Search Products ..."
            className="border border-gray-300 focus:outline-none p-2 rounded-bl-md w-full"
          />
          <button
            onClick={handelSearchFilter}
            className="bg-blue-600 cursor-pointer text-white px-8 py-2 ">
            Search
          </button>
        </div>
        <div className="flex w-full  gap-4 my-4">
          <div className="w-2/3 flex justify-between gap-4">
            <div className="flex justify-between gap-4">
              <select
                onChange={(e) => setProduct(e.target.value)}
                className="border px-8 py-2 rounded-4xl">
                <option value={""}>Products</option>
                {ProductsList?.map((item) => (
                  <option value={item.name}>{item.name}</option>
                ))}
              </select>
              <select
                onChange={(e) => setMaterial(e.target.value)}
                className="border px-8 py-2 rounded-4xl">
                <option value={""}>Materials</option>
                {materialList?.map((item) => (
                  <option value={item.name}>{item.name}</option>
                ))}
              </select>
              <button
                onClick={handelSearchFilter}
                className="bg-gray-300 cursor-pointer text-black px-4 py-2 rounded-lg">
                Filter
              </button>
            </div>
            <div className="flex justify-between gap-4">
              <select
                className="border px-8 py-2 rounded-4xl"
                onChange={(e) => setBulkEditType(e.target.value)}>
                <option value="">Bulk Actions</option>
                <option value="quick">Quick Edit</option>
                <option value="details">Details Update</option>
              </select>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded-lg"
                onClick={() =>
                  selectedProducts.length > 0 && setIsBulkModalOpen(true)
                }>
                Apply
              </button>
            </div>
          </div>
          <div className="w-1/3 flex justify-end gap-4">
            <span className="text-lg font-semibold">Products</span>
            <select className="border p-2 rounded-lg">
              <option>{CombinedProductsList?.length || 0}</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white border rounded-lg">
            <thead>
              <tr className="bg-blue-100 text-left">
                <th className="p-3">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={
                      selectedProducts.length === CombinedProductsList.length &&
                      CombinedProductsList.length > 0
                    }
                  />
                  <span>Products</span>
                </th>
                <th className="p-3">Action</th>
                <th className="p-3">Product Details</th>
                <th className="p-3">Price in Unit</th>
              </tr>
            </thead>
            <tbody>
              {CombinedProductsList.length ? (
                CombinedProductsList?.map((product, index) => (
                  <>
                    <tr className="border-t hover:bg-gray-100">
                      <td className="p-3 flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={selectedProducts.includes(product._id)}
                          onChange={() => handleSelectProduct(product._id)}
                        />
                        {product?.material.name +
                          " " +
                          product?.grades[0].name +
                          " " +
                          product.product.name}
                      </td>
                      <td className="p-3 text-blue-600 cursor-pointer">
                        <button
                          className="cursor-pointer"
                          onClick={() => {
                            setEditProductDetailsId(null);
                            setEditProductId(product._id);
                          }}>
                          Quick Edit
                        </button>{" "}
                        |
                        <button
                          onClick={() => {
                            setEditProductDetailsId(product._id);
                            setEditProductId(null);
                          }}
                          className="text-blue-500 cursor-pointer">
                          {" "}
                          Add Product Details
                        </button>
                      </td>
                      <td className="p-3">
                        <span>Material : {product.material.name}</span> ,
                        <span> Unit Length : {product.length || ".."}</span> ,
                        <span> Shape : {product.shape || ".."}</span>
                      </td>
                      {product?.price > 0 && product?.unit && (
                        <td className="p-3">
                          {product?.price + "/" + product?.unit}
                        </td>
                      )}
                    </tr>

                    {/* Edit Form (Appears below the clicked product row) */}
                    {editProductId === product._id &&
                      editProductDetailsId === null && (
                        <tr>
                          <td colSpan="4">
                            <EditProductForm
                              product={product}
                              setEditProductId={setEditProductId}
                              onClose={() => setEditProductId(null)}
                            />
                          </td>
                        </tr>
                      )}
                    {editProductDetailsId === product._id &&
                      editProductId === null && (
                        <tr>
                          <td colSpan="4">
                            <UpdateDetails
                              product={product}
                              setEditProductDetailsId={setEditProductDetailsId}
                              onClose={() => setEditProductDetailsId(null)}
                            />
                          </td>
                        </tr>
                      )}
                  </>
                ))
              ) : (
                <span>no data found</span>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {openModal && <AddProductModal onClose={() => setModal(false)} />}
      <BulkEditModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        editType={bulkEditType}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
      />
    </div>
  );
};

// Edit Form Component
const EditProductForm = ({ product, onClose, setEditProductId }) => {
  const [formData, setFormData] = useState({
    title: product.product.name,
    price: product.price || "",
    currency: product.currency || "",
    unit: product.unit || "",
  });

  // const handelSubmit = ()=>{
  //   quickEditProductAsync
  // }
  const dispatch = useDispatch();

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        quickEditProductAsync({ id: product._id, updates: formData })
      ).unwrap();

      alert("succefully product updated");
      setEditProductId(null);
    } catch (error) {
      console.log(error, "error");
      // onClose()
      alert(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 bg-gray-200 rounded-lg shadow-md">
      <b className="my-3">Quick edit</b>
      <div className="flex gap-4 justify-between mb-2">
        <div className="flex gap-5 my-5">
          <p className="flex gap-5">title </p>
          <b>
            {" "}
            {product.material.name +
              " " +
              product.grades[0].name +
              " " +
              product.product.name}
          </b>
        </div>
        <div className="flex gap-4">
          <p>Price</p>
          <input
            type="text"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="border p-1 w-1/3"
            placeholder="currency"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="border p-1 w-1/3"
            placeholder="Price"
          />
          <input
            type="text"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="border p-1 w-1/3"
            placeholder="unit"
          />
        </div>
        <div>
          <button
            className="bg-blue-500 p-2 cursor-pointer"
            onClick={handelSubmit}>
            submit
          </button>
        </div>
      </div>
    </div>
  );
};

const UpdateDetails = ({ product, setEditProductDetailsId, onClose }) => {
  const [details, setDetails] = useState({
    // material: product.material.name,
    thickness: product.thickness || "",
    shape: product.shape || "",
    length: product.length || "",
    surfaceFinish: product.surfaceFinish || "",
    outsideDia: product.outsideDia || "",
  });
  const handelChangeDetails = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        EditDetailsProductAsync({ id: product._id, updates: details })
      ).unwrap();

      alert("succefully product updated");
      setEditProductDetailsId(null);
    } catch (error) {
      console.log(error, "error");
      // onClose()
      alert(error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        <span
          type="text"
          className="border p-2">
          {product.material.name}
        </span>
        <input
          type="text"
          name="thickness"
          value={details.thickness}
          onChange={handelChangeDetails}
          className="border p-2"
          placeholder="Thickness"
        />
        <input
          type="text"
          name="shape"
          value={details.shape}
          onChange={handelChangeDetails}
          className="border p-2"
          placeholder="Shape"
        />
        <input
          type="text"
          name="length"
          value={details.length}
          onChange={handelChangeDetails}
          className="border p-2"
          placeholder="Length"
        />
        <input
          type="text"
          name="surfaceFinish"
          value={details.surfaceFinish}
          onChange={handelChangeDetails}
          className="border p-2"
          placeholder="Surface Finish"
        />
        <input
          type="text"
          name="outsideDia"
          value={details.outsideDia}
          onChange={handelChangeDetails}
          className="border p-2"
          placeholder="Outside Dia"
        />
      </div>

      <div className="mt-4 flex gap-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handelSubmit}>
          Update
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={onClose}>
          Cancel
        </button>
      </div>
    </>
  );
};

export default ProductsList;
