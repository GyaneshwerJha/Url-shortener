import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UrlState } from "@/context";

import React from "react";
import { QRCode } from "react-qrcode-logo";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";

const CreateLink = () => {
  const { user } = UrlState();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="destructive">Create New Link</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New</DialogTitle>
        </DialogHeader>

        
      </DialogContent>
    </Dialog>
  );
};

export default CreateLink;
