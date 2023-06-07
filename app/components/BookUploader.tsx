'use client'
import React, { useEffect } from "react"

export const BookUploader = ({ setFileString }: { setFileString: (file: string) => void }) => {
  const [isLoadFromLocalStorage, setIsLoadFromLocalStorage] = React.useState<boolean>(false)
  const [fileName, setFileName] = React.useState<string>('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fileStringInLocalStorage = window.localStorage.getItem('fileString') || "{}";
    const fileString = JSON.parse(fileStringInLocalStorage).value;
    const fName = JSON.parse(fileStringInLocalStorage).name;
    if (fileString) {
      setFileString(fileString)
      setIsLoadFromLocalStorage(true)
      setFileName(fName)
    }
  }, [setFileString, setIsLoadFromLocalStorage, setFileName])

  return <div>
    {
      isLoadFromLocalStorage && <h3 className="mb-2">{`已从缓存读取: ${fileName}`}</h3>
    }
    <input type="file" ref={inputRef} onChange={(ev) => {
      const file = ev.target.files?.[0];
      if (file) {
        const reader = new FileReader()
        reader.readAsText(file, 'UTF-8');
        reader.onload = function (evt) {
          const fileStringRaw = evt.target?.result as string;
          const fileString = fileStringRaw.replace(/\n/g, ' ').replace(/\r/g, " ").replace(/　　/g, " ").replace(/ /g, " ");
          // const lines = fileString.split('\n');
          setFileString(fileString)
          setFileName(file.name)
          window.localStorage.setItem('fileString', JSON.stringify({
            name: file.name,
            size: file.size,
            type: file.type,
            value: fileString
          }))
        }
      }
    }} />
  </div>
}