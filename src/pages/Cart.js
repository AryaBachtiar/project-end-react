import axios from "axios";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
// import "../css/Cart.css";
import { Button } from "react-bootstrap";
const Cart = ({ Makanan, setMakanan, handleChange }) => {
  // const [Image, setImage] = useState(0);
  // const [nama, setNama] = useState(0);
  // const [harga, setHarga] = useState(0);
  const [cart, setCart] = useState([]);

  const getAll = () => {
    axios
      .get("http://localhost:8000/carts")
      .then((res) => {
        setCart(res.data);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "memunculkan data",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  const deleteCart = async (id) => {
    await Swal.fire({
      title: "Are you sure?",
      text: "Anda Ingin Menghapus Menu di Keranjang!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Hapus !",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("http://localhost:8000/carts/" + id);
        Swal.fire("Deleted!", "Kamu berhasil menghapus dari Keranjang anda.", "success");
        window.location.reload();
      }
    });

    getAll();
  };
  useEffect(() => {
    getAll();
  }, []);
  console.log(Makanan);

  const TotalHarga = cart.reduce(function (result, item) {
    return result + item.harga;
  }, 0);

  return (
    <div>
      <div>
        <table
          className="table table-bordered mx-10 my-5 "
          style={{ width: 1280 }}
        >
          <thead>
            <tr className="text-white">
              <th className="header">No</th>
              <th className="header">Gambar</th>
              <th className="header">Nama</th>
              <th className="header">Harga</th>
              <th className="header">Action</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {cart.map((carts, index) => {
              return (
                <tr key={carts.id}>
                  <td>{index + 1}</td>
                  <td className="w-40">
                    <img src={carts.image} alt="" />{" "}
                  </td>
                  <td>{carts.nama}</td>
                  <td>{carts.harga}</td>
                  <td>
                    <Button
                      variant="danger"
                      className="ml-2 text-white rounded-lg p-2 mb-3"
                      onClick={() => deleteCart(carts.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex text-white">
          <div className="border-2 border-green-500 w-60 m-4 text-center ">
            <p className="font-bold">
              <p></p>
              Total Harga:Rp.
              {TotalHarga}
            </p>
          </div>
          <div className="pt-2">
            <button className="m-4 bg-amber-500 text-white rounded-lg p-2 hover:bg-amber-700 mb-3 ">
              Beli
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
