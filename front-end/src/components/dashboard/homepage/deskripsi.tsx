import React from "react";

const Deskripsi = () => {
  return (
    <section className="bg-blue-500 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center text-white">
        <h2 className="text-4xl font-bold mb-8">
          Jelajahi Keajaiban Banyuwangi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-2">Alam Menakjubkan</h3>
            <hr />
            <p>
              Banyuwangi tidak hanya kaya akan keindahan alam dan budaya, tetapi
              juga berkomitmen untuk menyediakan aksesibilitas yang baik bagi
              para wisatawan dengan disabilitas. Kami berusaha untuk memastikan
              bahwa setiap orang, tanpa memandang hambatan fisik, dapat
              menikmati keindahan yang Banyuwangi tawarkan.
            </p>
          </div>
          <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-2">Wisata yang indah</h3>
            <hr />
            <p>
              Nikmati berbagai macam wisata yang ada di Kabupaten Banyuwangi
              yang membuat anda ingin datang kembali
            </p>
          </div>
          <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-2">
              Bisa dimikmati siapa saja
            </h3>
            <hr />
            <p>
              Fasilitas ramah disabilitas di tempat-tempat wisata populer
              hingga jalur yang dapat diakses dengan kursi roda di taman dan
              pantai, upaya kami adalah untuk membuat pengalaman yang inklusif
              dan menyenangkan bagi semua pengunjung.
            </p>
          </div>
        </div>
        <a
          href="/tempat-wisata"
          className="bg-yellow-400 text-gray-800 font-bold py-3 px-8 rounded-full hover:bg-yellow-300 transition duration-300"
        >
          Mulai Petualangan Anda
        </a>
        {/* <button className="bg-yellow-400 text-gray-800 font-bold py-3 px-8 rounded-full hover:bg-yellow-300 transition duration-300">
          Mulai Petualangan Anda
        </button> */}
      </div>
    </section>
  );
};

export default Deskripsi;
