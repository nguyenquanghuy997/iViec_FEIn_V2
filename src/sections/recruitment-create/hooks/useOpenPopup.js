import {useState} from "react";

const useOpenPopup = () => {
  const [open, setOpen] = useState(false);

  return { open, setOpen }
}

export { useOpenPopup }