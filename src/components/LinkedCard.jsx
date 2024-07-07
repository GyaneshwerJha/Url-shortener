import { deleteUrls } from "@/db/apiUrls";
import useFetch from "@/hooks/useFetch";
import { Copy, LinkIcon, Download, Delete, Trash } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";

const LinkedCard = ({ url = [], fetchUrls }) => {
  const { loading: loadingDelete, fn: fnDelete } = useFetch(
    deleteUrls,
    url?.id
  );

  // dowload logic
  const donwloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);

    anchor.click();

    document.body.removeChild(anchor);
  };

  return (
    <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg">
      <img
        className="h-32 object-contain ring ring-blue-500 self-start"
        src={url.qr}
        alt="qr code"
      />

      <Link to={`/link/${url?.id}`} className="flex flex-col flex-1">
        <span
          className="text-3xl font-extrabold hover:underline cursor-pointer"
          style={{ color: "rgb(101, 193, 12)" }}
        >
          {url?.title}
        </span>
        <span className="text-2xl text-blue-400 font-bold hover:underline cursor-pointer">
          https://shoturl.in/
          {url?.custome_url ? url?.custome_url : url.short_url}
        </span>
        <span className="flex items-center gap-1 hover:underline cursor-pointer">
          <LinkIcon className="p-1" />
          {url?.original_url}
        </span>
        <span className="flex items-end font-extralight text-sm flex-1">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>

      <div className="flex gap-2">
        <Button
          variant="ghost"
          onClick={() =>
            navigator.clipboard.writeText(
              `https://shoturl.in/${url?.short_url}`
            )
          }
        >
          <Copy />
        </Button>

        <Button variant="ghost" onClick={donwloadImage}>
          <Download />
        </Button>

        <Button
          variant="ghost"
          onClick={() => fnDelete().then(() => fetchUrls())}
          disable={loadingDelete}
        >
          {loadingDelete ? <BeatLoader size={5} color="white" /> : <Trash />}
        </Button>
      </div>
    </div>
  );
};

export default LinkedCard;