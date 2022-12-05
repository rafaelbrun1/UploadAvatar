import { FormEvent, useEffect, useState } from "react";
import ProfilePic from "../assets/profile.jpg";
import api from "../lib/axios.js";

interface Avatar {
  id: number;
  name: string;
  createdAt: Date;
}

export function MainCard() {
  const [imageToBackEnd, setImageToBackEnd] = useState<string | Blob>("");
  const [imageBeforeBackEnd, setImageBeforeBackEnd] = useState<File | null>(
    null
  );
  const [avatar, setAvatar] = useState<Avatar | null>(null);
  const [success, setSuccess] = useState<boolean>(false)


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      setImageToBackEnd(e.target.files[0]);
      setImageBeforeBackEnd(e.target.files[0]);
    }
  };

  async function uploadImage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", imageToBackEnd);

    await api
      .post("upload-image", formData)
      .then((response) => {
        console.log(response);
        setSuccess(true)
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        } else {
          console.log("Erro: tente mais tarde!");
        }
      });
  }

  async function getAvatar() {
    await api.get("get-last-avatar").then((response) => {
      if (response.data.length === 0) {
        setAvatar(null);
      } else {
        setAvatar(response.data[0]);
      }
    });
  }

  useEffect(() => {
    getAvatar();
  }, []);

  return (
    <div className="h-[100vh] flex justify-center items-center">
      <form
        onSubmit={uploadImage}
        className="h-[38rem] w-[30rem] bg-[#141414] drop-shadow-xl rounded-3xl flex flex-col items-center justify-around"
        method="post"
        encType="multipart/form-data"
      >

      {success === true ? <h1 className="text-2xl font-['Roboto'] text-green-600"> Seu avatar foi alterado com sucesso =D </h1> : <h1 className="text-2xl font-['Roboto'] text-yellow-500"> Altere seu avatar</h1>}

        <div className="rounded-full border- border-white h-72 w-72 ">
          {imageBeforeBackEnd !== null ? (
            <img
              src={URL.createObjectURL(imageBeforeBackEnd)}
              className="object-cover rounded-full h-72 w-72"
            />
          ) : avatar === null ? (
            <img
              src={ProfilePic}
              className="object-cover rounded-full h-72 w-72"
            />
          ) : (
            <img
              src={`http://localhost:3333/file/${avatar?.name}`}
              className="object-cover rounded-full h-72 w-72"
            />
          )}
        </div>

        

        <label
          htmlFor="input-file"
          className="py-4 px-8 cursor-pointer bg-yellow-600 hover:bg-yellow-500  text-white font-bold rounded-lg font-['Roboto']"
        >
          MUDAR AVATAR
        </label>
        <input
          type="file"
          className="hidden"
          id="input-file"
          onChange={handleImageUpload}
        />

        <button
          type="submit"
          className="py-4 px-8 font-['Roboto'] text-white font-bold rounded-lg bg-green-600 hover:bg-green-500"
        >
          <span>SALVAR</span>
        </button>
      </form>
    </div>
  );
}
