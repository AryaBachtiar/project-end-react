import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";


export default function Home() {
  const [barang, setBarang] = useState([]);

  const history = useHistory();

  const getAll = async () => {
    await axios
      .get("http://localhost:8000/daftarBarang")
      .then((res) => {
        setBarang(res.data);
      })
      .catch((error) => {
        alert("Terjadi keasalahan" + error);
      });
  };


  useEffect(() => {
    getAll();
  }, []);
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  const beli = async (barang) => {
    await axios.post("http://localhost:8000/carts", barang);
    console.log(barang);
    Swal.fire(
      'Anda Menambahkan '  + (barang.nama),
       (barang.nama) + ' Telah Ditambahkan ',
      'success'
    )
  }
  const deleteUser = async (id) => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios.delete(" http://localhost:8000/daftarBarang/" + id); 
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
    getAll();
  };

  const login = () => {
    history.push("/login")
  } 

  return (
    <div className="container my-5">
        <h1 className="text-white">DAFTAR MENU </h1>
      {barang.length !== 0 ? (
        <>
          <div className="grid grid-cols-4 gap-3">
            {barang.map((barang) => {
              return (
                <p class="relative block overflow-hidden group">
                  <button class="absolute right-4 top-4 z-10 rounded-full bg-gray-900 p-1.5 text-red-600 transition hover:text-blue-700">
                    <span class="sr-only">Wishlist</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </button>
                      
                    

                    <h2 class="mt-4 text-lg font-medium text-gray-200">
                      {barang.nama}
                    </h2>

                    <p class="mt-1.5 text-sm text-gray-300">{barang.deskripsi}</p>

                  <div class="relative p-6 bg-zinc-900 border border-gray-900">
                    <span class="whitespace-nowrap  px-3 py-1.5 text-xs font-medium text-white">
                      {barang.kadarluarsa}
                    </span>

                    <h3 class="mt-1.5 text-sm text-gray-300">
                      Rp.{barang.harga}
                    </h3>

                                    

                    <img
                    src={barang.image}
                    alt=""
                    class="object-cover w-full h-64 transition duration-500 group-hover:scale-105 sm:h-72"
                  />

                    {localStorage.getItem("id") === null ? (
                      <>
                      <br />
                        <button
                              onClick={login}
                              class="block w-full p-4 text-sm font-medium transition bg-yellow-400 rounded hover:scale-105"
                            >
                             
                            Login Terlebih Dahulu
                            </button>
                      </>
                    ) : (
                      <>
                        {localStorage.getItem("role") === "admin" ? (
                          <>
                          <br />
                            <button
                              onClick={() => deleteUser(barang.id)}
                              class="block w-full p-4 text-sm font-medium transition bg-red-600 rounded hover:scale-105 text-white"
                            >
                             Hapus
                            </button>
                            <br />
                            <a className="no-underline text-black" href={"/edit/" + barang.id}>
                              <button class="block w-full p-4 text-sm font-medium transition bg-yellow-400 rounded hover:scale-105">
                                Ubah
                              </button>
                            </a>
                          </>
                        ) : (
                          <>
                          <br />
                            <button onClick={() => beli(barang)} 
                            className="block w-full p-4 text-sm font-medium transition bg-blue-400 rounded hover:scale-105">
                              Add to Cart
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </p>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <h1>Belum Ada Data </h1>
        </>
      )}
    </div>
  );
}
