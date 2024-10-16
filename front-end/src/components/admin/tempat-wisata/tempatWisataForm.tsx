import { useState, useEffect } from "react";
import { TempatWisata } from "@/src/interface/tempatWisataProps";
import styles from "../../../app/admin/tempat-wisata/tempatWisataPage.module.css";

interface TempatWisataFormProps {
  onSubmit: (tempatWisata: TempatWisata) => void;
  initialData?: TempatWisata;
}

const TempatWisataForm = ({ onSubmit, initialData }: TempatWisataFormProps) => {
  const [formData, setFormData] = useState<TempatWisata>({
    id: 0,
    namaTempatWisata: "",
    koordinat: ["", ""], // Gunakan array untuk koordinat
    rating: 0,
    harga: 0,
    jenisWisata: "",
    deskripsi: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "longitude") {
      setFormData({
        ...formData,
        koordinat: [value, formData.koordinat[1]],
      });
    } else if (name === "latitude") {
      setFormData({
        ...formData,
        koordinat: [formData.koordinat[0], value],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      id: 0,
      namaTempatWisata: "",
      koordinat: ["", ""],
      rating: 0,
      harga: 0,
      jenisWisata: "",
      deskripsi: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2 className={styles.formTitle}>{initialData ? "Edit Tempat Wisata" : "Add Tempat Wisata"}</h2>
      <div className="mb-2">
        <label htmlFor="namaTempatWisata" className="block text-sm font-medium text-gray-700">Nama Tempat Wisata</label>
        <input
          type="text"
          name="namaTempatWisata"
          id="namaTempatWisata"
          value={formData.namaTempatWisata}
          onChange={handleChange}
          required
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${styles.inputField}`}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">Longitude</label>
        <input
          type="text"
          name="longitude"
          id="longitude"
          value={formData.koordinat[0]}
          onChange={handleChange}
          required
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${styles.inputField}`}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">Latitude</label>
        <input
          type="text"
          name="latitude"
          id="latitude"
          value={formData.koordinat[1]}
          onChange={handleChange}
          required
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${styles.inputField}`}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
        <input
          type="number"
          name="rating"
          id="rating"
          value={formData.rating}
          onChange={handleChange}
          max={5}
          required
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${styles.inputField}`}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="harga" className="block text-sm font-medium text-gray-700">Harga</label>
        <input
          type="number"
          name="harga"
          id="harga"
          value={formData.harga}
          onChange={handleChange}
          required
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${styles.inputField}`}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="jenisWisata" className="block text-sm font-medium text-gray-700">Jenis Wisata</label>
        <input
          type="text"
          name="jenisWisata"
          id="jenisWisata"
          value={formData.jenisWisata}
          onChange={handleChange}
          required
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${styles.inputField}`}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700">Deskripsi</label>
        <textarea
          name="deskripsi"
          id="deskripsi"
          value={formData.deskripsi}
          onChange={handleChange}
          required
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${styles.inputField}`}
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {initialData ? "Update" : "Add"} Tempat Wisata
      </button>
    </form>
  );
};

export default TempatWisataForm;
