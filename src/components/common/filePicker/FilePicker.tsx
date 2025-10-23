import "./style.scss";

import Image from "next/image";
import { ChangeEvent, FC, memo, useEffect, useRef, useState } from "react";

import { notifyError } from "@/utils/utility";

import Button from "../button/Button";
import FilePickerProps from "./type";

const FilePicker: FC<FilePickerProps> = ({
  type,
  setFile,
  value,
  name,
  loading,
  setDelete,
  error,
}) => {
  const [loadingSend, setLoadingSend] = useState(false);
  useEffect(() => {
    setLoadingSend(loadingSend);
  }, [loading, loadingSend]);
  const clearInput = (all?: boolean) => {
    if (inputFileRef.current?.value) {
      inputFileRef.current.value = "";
      if (all) setFile({ target: { files: [""], name: name } }, clearInput);
      setSelectedImageSrc("");
    }
  };
  const [drag, setDrag] = useState<boolean>(false);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [selectedImageSrc, setSelectedImageSrc] = useState<string | undefined>(
    value || "",
  );
  useEffect(() => {
    setSelectedImageSrc(value);
  }, [value]);
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (file) {
      if (type) {
        const acceptedTypes = type.split(",").map((t) => t.trim());
        if (!acceptedTypes.includes(file.type)) {
          clearInput();
          setDrag(false);
          notifyError("فرمت فایل اشتباه است");
          return;
        }
      }
      const selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImageSrc(e?.target?.result as string);
        setFile(event, clearInput);
        clearInput();
        setDrag(false);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <aside
      className={`${error ? "error border-red-500" : "border-primary-400"} file-picker  relative mb-6  flex h-[245px] w-full items-center justify-center rounded-[10px] border  border-dashed transition-all duration-300`}
    >
      <div
        className={`${error ? error : ""}  error absolute h-full w-full overflow-hidden rounded-[10px]`}
      ></div>
      <div className="relative h-full w-full p-5">
        <input
          className="absolute left-0 top-0 z-20 h-full w-full cursor-pointer opacity-0"
          ref={inputFileRef}
          type="file"
          accept={type}
          onChange={handleFileUpload}
          onDragEnter={() => setDrag(true)}
          onDragLeave={() => setDrag(false)}
          name={name}
        />
        <div className="flex h-full w-full flex-col items-center justify-center">
          <Image
            src="/images/icons/folder-add.svg"
            alt="آیکون آپلود فایل"
            width={40}
            height={40}
          />
          <div className="text-primary-400 mb-1 mt-[6px] text-sm font-medium leading-7">
            افزودن فایل
          </div>
          <div className="mb-6 text-[0.813rem] text-[#959499]">
            فرمت های مجاز: Pdf
          </div>
          <div className="text-primary-400 h-11 w-[124px] content-center rounded-[9px] border text-center text-[0.856rem] font-medium">
            بارگذاری فایل
          </div>
        </div>
      </div>
      {drag && !selectedImageSrc && (
        <div className="on-drag bg border-primary-500 absolute z-0 h-full w-full rounded border-2 border-dashed" />
      )}
      {value && setDelete ? (
        <div
          className={`delete bg-danger absolute flex h-full w-full items-center justify-center rounded-md bg-opacity-70 transition-all`}
        >
          <Button
            onClick={() => {
              setDelete?.();
            }}
            className="bg-danger rounded-sm px-3 py-1 text-white shadow-lg"
          >
            Delete
          </Button>
        </div>
      ) : (
        ""
      )}
    </aside>
  );
};
export default memo(FilePicker);
