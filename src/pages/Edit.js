import React, { useState, useEffect } from "react";
import { InputGroup, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'

// method untuk membaca sistem dan bisa di ubah melalui input
export default function Edit() {
  const param = useParams();
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState("");
  const [kadarluarsa, setKadarluarsa] = useState("");
  const [image, setImage] = useState("");

  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:8000/daftarBarang/" + param.id)
      .then((response) => {
        const newBook = response.data;
        setNama(newBook.nama);
        setDeskripsi(newBook.deskripsi);
        setHarga(newBook.harga);
        setKadarluarsa(newBook.kadarluarsa);
        setImage(newBook.image);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan Bre!" + error);
    });
  }, []);

  const submitActionHandler = async (event) => {
    event.preventDefault();
    await
    Swal.fire({
      title: 'Yakin Untuk Mengedit',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yaa!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
        .put("http://localhost:8000/daftarBarang/" + param.id, {
          nama: nama, 
          deskripsi: deskripsi,
          harga: harga,
          kadarluarsa: kadarluarsa,
          image: image,
        })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
      .then(() => {
        Swal.fire(
            'Good job!',
            'You clicked the button!',
            'success'
          )
        history.push("/daftar");
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };
  
  return (
    <div className="edit mx-5 text-white">
      <Form onSubmit={submitActionHandler}>
        <div className="container my-5">
          <div className="name mb-3">
            <Form.Label>
              <strong>Edit Barang</strong>
            </Form.Label>
            <InputGroup className="d-flex-gap-3">
              <Form.Control
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </InputGroup>
          </div>
        

        <div className="place-of-birth mb-3">
          <Form.Label>
            <strong>Deskripsi</strong>
          </Form.Label>
          <InputGroup className="d-flex gap-3">
            <Form.Control
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
            />
          </InputGroup>
        </div>

        <div className="place-of-birth mb-3">
          <Form.Label >
            <strong>kadarluarsa</strong>
          </Form.Label>
          <InputGroup className="d-flex gap-3">
            <Form.Control
             type="date"
              value={kadarluarsa}
              onChange={(e) => setKadarluarsa(e.target.value)}
            />
          </InputGroup>
        </div>

        <div className="place-of-birth mb-3">
          <Form.Label >
            <strong>Image</strong>
          </Form.Label>
          <InputGroup className="d-flex gap-3">
            <Form.Control
             type="url"
              placeholder="Input image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </InputGroup>
        </div>

        <div className="place-date mb-3">
          <Form.Label>
            <strong>Harga</strong>
          </Form.Label>
          <div className="d-flex gap-3">
            <InputGroup className="d-flex gap-3">
              <Form.Control
                type="text"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
              />
            </InputGroup>
          </div>
        </div>
        <div className="d-flex justify-content-end align-center mt-2">
          {/* type submit untuk sistem yang telah membaca method bahwa berupa edit */}
          <button className="buton btn  text-white" type="submit">
            Save
          </button>
        </div>
        </div>
      </Form>
    </div>
  );
}
