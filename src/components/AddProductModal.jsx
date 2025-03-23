import { useState } from "react";
import { useSelector } from "react-redux";
import {
  addCombinedProductAsync,
  selectGrades,
  selectMaterial,
  selectProducts,
} from "../features/product/ProductSlice";
import { useDispatch } from "react-redux";

// const products = ["Pipes", "Tubing", "Pipe Fittings", "Forged Fittings" ,"Forged Fittings" ,"Forged Fittings" ,"Forged Fittings","Forged Fittings","Forged Fittings","Forged Fittings"];
// const materials = ["Alloy Steel", "Aluminium", "Carbon Steel", "Copper Nickel"];
// const grades = ["F11 Pipes", "F22 Pipes", "F5 Pipes", "F9 Pipes", "F91 Pipes"];

export default function AddProductModal({ onClose }) {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const materials = useSelector(selectMaterial);
  const grades = useSelector(selectGrades);
  console.log(products, materials, grades, "print");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedGrades, setSelectedGrades] = useState([]);

  const toggleGrade = (grade) => {
    setSelectedGrades((prev) =>
      prev.includes(grade) ? prev.filter((g) => g !== grade) : [...prev, grade]
    );
  };

  console.log(selectedProduct, selectedMaterial, selectedGrades, "selected");

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {

      // const productData = {
      //   productId: selectedProduct,
      //   materialId: selectedMaterial,
      //   gradeIds: selectedGrades,
      // };

      const productData = {
        productId: selectedProduct._id,
        materialId: selectedMaterial._id,
        gradeIds: selectedGrades.map((grade) => grade._id),


      };


      await dispatch(
        addCombinedProductAsync(productData)
      ).unwrap();
      onClose()
      alert("succefully product added")
    } catch (error) {
      console.log(error, "error");
      // onClose()
      alert(error)
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[700px] h-[80vh] bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add Products</h2>
        <div className="flex my-2 justify-between">
          <h2  className="text-lg font-bold">Product</h2>
          <h2  className="text-lg font-bold">Material</h2>
          <h2  className="text-lg font-bold">Grade</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {/* Products Column */}
          <div className="border rounded-lg h-96  overflow-y-auto">
            {products?.map((product) => (
              <div
                key={product._id}
                className={`p-2 cursor-pointer flex justify-between items-center ${
                  selectedProduct === product ? "bg-blue-300" : ""
                }`}
                onClick={() => setSelectedProduct(product)}>
                {product.name}
                {selectedProduct === product && <span>→</span>}
              </div>
            ))}
          </div>

          {/* Material Column */}
          <div className="border rounded-lg h-96 overflow-y-auto">
            {materials?.map((material) => (
              <div
                key={material._id}
                className={`p-2 cursor-pointer flex justify-between items-center ${
                  selectedMaterial === material ? "bg-blue-300" : ""
                }`}
                onClick={() => setSelectedMaterial(material)}>
                {material.name}
                {selectedMaterial === material && <span>→</span>}
              </div>
            ))}
          </div>

          {/* Grades Column */}
          <div className="border rounded-lg h-96 overflow-y-auto">
            {grades?.map((grade) => (
              <div
                key={grade._id}
                className={`flex items-center justify-between p-2 cursor-pointer ${
                  selectedGrades.includes(grade) ? "bg-blue-300" : ""
                }`}
                onClick={() => toggleGrade(grade)}>
                <span>{grade.name}</span>
                <input
                  type="checkbox"
                  checked={selectedGrades.includes(grade)}
                  onChange={() => toggleGrade(grade)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <button
            className="cursor-pointer"
            onClick={onClose}>
            Cancel
          </button>
          <button onClick={handelSubmit} className="bg-blue-500 px-3 py-1 cursor-pointer text-white">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
