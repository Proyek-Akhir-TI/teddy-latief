import { useState, useEffect } from "react";
import { Kriteria } from "@/src/interface/kriteriaProps";
import styles from "../../../app/admin/kriteria/kriteriaPage.module.css";

interface KriteriaFormProps {
  onSubmit: (kriteria: Kriteria) => void;
  initialData?: Kriteria;
}

const KriteriaForm = ({ onSubmit, initialData }: KriteriaFormProps) => {
  const [formData, setFormData] = useState<Kriteria>({
    nama_kriteria: "",
    bobot_kriteria: 0,
    Jenis_Kriteria: "Benefit",
    isBenefit: true, // {{ edit_1 }} Tambahkan properti isBenefit
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "bobot_kriteria") {
      const numericValue = parseFloat(value);
      if (numericValue > 1) {
        newValue = "1";
      }
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      nama_kriteria: "",
      bobot_kriteria: 0,
      Jenis_Kriteria: "Benefit",
      isBenefit: true, // {{ edit_1 }} Tambahkan properti isBenefit
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2 className={styles.formTitle}>{initialData ? "Edit Kriteria" : "Add Kriteria"}</h2>
      <div className="mb-2">
        <label htmlFor="nama_kriteria" className="block text-sm font-medium text-gray-700">Nama Kriteria</label>
        <input
          type="text"
          name="nama_kriteria"
          id="nama_kriteria"
          value={formData.nama_kriteria}
          onChange={handleChange}
          required
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${styles.inputField}`}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="bobot_kriteria" className="block text-sm font-medium text-gray-700">Bobot Kriteria</label>
        <input
          type="number"
          name="bobot_kriteria"
          id="bobot_kriteria"
          value={formData.bobot_kriteria}
          onChange={handleChange}
          max={1}
          required
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${styles.inputField}`}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Kriteria</label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="Jenis_Kriteria"
              value="Benefit"
              checked={formData.Jenis_Kriteria === "Benefit"}
              onChange={handleChange}
              className="form-radio text-blue-600 h-4 w-4"
            />
            <span className="ml-2 text-sm text-gray-700">Benefit</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="Jenis_Kriteria"
              value="Cost"
              checked={formData.Jenis_Kriteria === "Cost"}
              onChange={handleChange}
              className="form-radio text-blue-600 h-4 w-4"
            />
            <span className="ml-2 text-sm text-gray-700">Cost</span>
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {initialData ? "Update" : "Add"} Kriteria
      </button>
    </form>
  );
};

export default KriteriaForm;
