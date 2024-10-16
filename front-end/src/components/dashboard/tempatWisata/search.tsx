import React, { useState, useEffect, useCallback, useRef } from "react";
import { Search } from "lucide-react";
import Select, { components } from "react-select";
import { fetchTempatWisata } from "@/src/api/tempatWisataApi";
import { fetchAksebilitasByTempatWisata } from "@/src/api/aksebilitasApi";
import { haversineDistance } from "@/src/utils/haversine";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  onCriteriaChange: (selectedCriteria: string[]) => void;
  onRecommendationsChange: (recommendations: any[]) => void;
}

interface AksebilitasData {
  ramp: boolean;
  toiletKhusus: boolean;
  parkirKhususDifabel: boolean;
  jalanKhususDifabel: boolean;
}

const calculateAksebilitasScore = (aksebilitasData: AksebilitasData[]): number => {
  return aksebilitasData.reduce((score, data) => {
    return score + (data.ramp ? 1 : 0) + (data.toiletKhusus ? 1 : 0) + (data.parkirKhususDifabel ? 1 : 0) + (data.jalanKhususDifabel ? 1 : 0);
  }, 0);
};

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onCriteriaChange,
  onRecommendationsChange,
}) => {
  const [selectedCriteria, setSelectedCriteria] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [showMap, setShowMap] = useState<boolean>(false);
  const [userCoordinates, setUserCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  const options = [
    { value: "aksebilitas", label: "Aksesibilitas" },
    { value: "rating", label: "Rating" },
    { value: "harga", label: "Harga" },
    { value: "jarak", label: "Jarak" },
  ];

  const aksebilitasOptions = [
    { value: "ramp", label: "Ramp" },
    { value: "toiletKhusus", label: "Toilet Khusus" },
    { value: "parkirKhususDifabel", label: "Parkir Khusus Difabel" },
    { value: "jalanKhususDifabel", label: "Jalan Khusus Difabel" },
  ];

  const ratingOptions = [
    { value: "1-3", label: "1-3" },
    { value: "3-5", label: "3-5" },
  ];

  const handleSelectChange = (selectedOptions: any) => {
    const criteria = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : [];
    setSelectedCriteria(criteria);
    onCriteriaChange(criteria);

    if (criteria.includes("jarak")) {
      alert("Anda akan membuka peta untuk memilih lokasi.");
      setShowMap(true);
    } else {
      setShowMap(false);
    }
  };

  const handleSearchClick = () => {
    fetchData();
  };

  const handleMapClick = (event: L.LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;
    console.log(`Latitude: ${lat}, Longitude: ${lng}`);
    setUserCoordinates({ lat, lng });
    setShowMap(false);
  };

  useEffect(() => {
    if (showMap) {
      const map = L.map("map").setView([-8.2192, 114.3691], 12); // Focus on Banyuwangi
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.on("click", handleMapClick);

      return () => {
        map.off("click", handleMapClick);
        map.remove();
        mapRef.current = null;
      };
    }
  }, [showMap]);

  const fetchData = useCallback(async () => {
    try {
      const tempatWisata = await fetchTempatWisata();
      const aksebilitas = await fetchAksebilitasByTempatWisata();

      const decisionMatrix: Array<Record<string, any>> = tempatWisata.map(
        (tw) => {
          const aksebilitasData = aksebilitas.filter((a) => a.id === tw.id);
          const aksebilitasScore = calculateAksebilitasScore(aksebilitasData);
          const distance = userCoordinates
            ? haversineDistance(
                [userCoordinates.lat, userCoordinates.lng],
                [parseFloat(tw.koordinat[1]), parseFloat(tw.koordinat[0])]
              )
            : 0;

          console.log(`Distance to ${tw.namaTempatWisata}: ${distance} km`);

          return {
            tempatWisata: tw.namaTempatWisata,
            aksebilitas: aksebilitasScore,
            rating: tw.rating,
            harga: tw.harga,
            jarak: distance,
          } as Record<string, any>;
        }
      );

      console.log("Decision Matrix:", decisionMatrix);

      // Filter matrix based on selected criteria
      const filteredMatrix: Array<Record<string, number | string>> = decisionMatrix.map((row) => {
        const filteredRow: Record<string, number | string> = {};
        selectedCriteria.forEach((criteria) => {
          filteredRow[criteria] = row[criteria];
        });
        return { ...filteredRow, tempatWisata: row.tempatWisata };
      });

      // Normalize the decision matrix
      const normalizedMatrix = filteredMatrix.map((row) => {
        const norm = Math.sqrt(
          selectedCriteria.reduce(
            (sum, criteria) => sum + (row[criteria] as number) ** 2,
            0
          )
        );
        const normalizedRow: Record<string, number | string> = {};
        selectedCriteria.forEach((criteria) => {
          normalizedRow[criteria] = (row[criteria] as number) / norm;
        });
        return { ...normalizedRow, tempatWisata: row.tempatWisata };
      });

      console.log("Normalized Matrix:", normalizedMatrix);

      // Calculate optimization scores with priority on aksebilitas
      const optimizationScores = normalizedMatrix.map(
        (row: Record<string, number | string>) => {
          const score = selectedCriteria.reduce((sum, criteria) => {
            return (
              sum +
              (criteria === "aksebilitas" ? (row[criteria] as number) * 2 : // Bobot lebih untuk aksebilitas
                (criteria === "harga" || criteria === "jarak"
                  ? -(row[criteria] as number)
                  : (row[criteria] as number))
            ))
          }, 0);
          return {
            tempatWisata: row.tempatWisata,
            optimizationScore: score,
          } as { tempatWisata: string; optimizationScore: number };
        }
      );

      console.log("Optimization Scores:", optimizationScores);

      // Sort the final scores
      const finalScores = optimizationScores.sort(
        (a, b) => b.optimizationScore - a.optimizationScore
      );

      console.log("Final Scores:", finalScores); // Menampilkan hasil akhir
      setRecommendations(finalScores);
      onRecommendationsChange(finalScores);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [selectedCriteria, onRecommendationsChange, userCoordinates]);

  const CustomControl = (props: any) => (
    <div>
      <components.Control {...props} />
      <button
        className="bg-blue-600 text-white px-4 py-2 mt-2 rounded-md shadow hover:bg-blue-700 transition duration-300 w-full"
        onClick={handleSearchClick}
      >
        Cari Rekomendasi
      </button>
    </div>
  );

  return (
    <div className="bg-white p-6">
      <div className="container mx-auto">
        <div className="flex justify-center items-center mb-4">
          <div className="relative w-full sm:w-2/3 lg:w-1/2 md:w-1/2">
            <input
              type="text"
              placeholder="Cari tempat wisata"
              className="p-2 pl-10 rounded-md w-full border border-gray-300 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-300"
              onChange={(e) => onSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="mb-4">
          <div className="flex flex-col items-center">
            <Select
              isMulti
              options={options}
              className="basic-multi-select w-full sm:w-2/3 lg:w-1/2 md:w-1/2"
              classNamePrefix="select"
              onChange={handleSelectChange}
              components={{ Control: CustomControl }}
            />
          </div>
        </div>
        {showMap && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <div id="map" style={{ width: "100%", height: "400px" }}></div>
              <div className="p-4 flex justify-end">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-700 transition duration-300"
                  onClick={() => setShowMap(false)}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
        {/* <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Hasil Rekomendasi:</h2>
          <ul>
            {recommendations.map((rec, index) => (
              <li key={index} className="mb-2">
                {rec.tempatWisata}: {rec.optimizationScore.toFixed(8)}
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default SearchBar;