import { useState } from "react";
import { useDispatch } from "react-redux";
import { EditDetailsProductAsync, quickEditProductAsync } from "../features/product/ProductSlice";

export const BulkEditModal = ({ isOpen, selectedProducts,setSelectedProducts,onClose, editType }) => {
    const [formData, setFormData] = useState({
      price: "",
      unit: "",
      thickness: "",
      shape: "",
      length: "",
    });

    const dispatch = useDispatch();

    const handleBulkUpdate = async () => {
      if (!selectedProducts.length) return;

      try {
        const updates = formData;
        for (let productId of selectedProducts) {
          if (editType === "quick") {
            await dispatch(quickEditProductAsync({ id: productId, updates })).unwrap();
          } else {
            await dispatch(EditDetailsProductAsync({ id: productId, updates })).unwrap();
          }
        }
        alert("Successfully updated products");
        setSelectedProducts([]);
        onClose();
      } catch (error) {
        console.log(error);
        alert("Error updating products");
      }
    };

    return (
      isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold">{editType === "quick" ? "Quick Edit" : "Details Update"}</h2>
            <div className="mt-4">
              <input type="number" name="price" placeholder="Price" className="border p-2 w-full"
                onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
              <input type="text" name="unit" placeholder="Unit" className="border p-2 w-full"
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })} />
              {editType === "details" && (
                <>
                  <input type="text" name="thickness" placeholder="Thickness" className="border p-2 w-full"
                    onChange={(e) => setFormData({ ...formData, thickness: e.target.value })} />
                  <input type="text" name="shape" placeholder="Shape" className="border p-2 w-full"
                    onChange={(e) => setFormData({ ...formData, shape: e.target.value })} />
                </>
              )}
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button className="bg-gray-500 text-white px-4 cursor-pointer py-2 rounded" onClick={onClose}>Cancel</button>
              <button className="bg-blue-600 text-white px-4 cursor-pointer py-2 rounded" onClick={handleBulkUpdate}>Update</button>
            </div>
          </div>
        </div>
      )
    );
  };
