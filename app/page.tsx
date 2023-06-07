'use client'
import Image from 'next/image'
import { BookUploader } from './components/BookUploader'
import React, { useEffect } from 'react'
import { toast } from "./util/toast"

export default function Home() {
  const [fileString, setFileString] = React.useState<string>()
  const [result, setResult] = React.useState<string>('')
  const [pageSize, setPageSize] = React.useState<number>(50)
  const [searchValue, setSearchValue] = React.useState<string>('')

  useEffect(() => {
    const pageSizeL = window.localStorage.getItem('pageSize')
    if (pageSizeL) {
      setPageSize(Number(pageSizeL))
    }
  }, [])
  const onSearch = async () => {
    if (!fileString) {
      return;
    }
    if (!searchValue) {
      toast('请输入要搜索的内容')
      return;
    }
    const index = fileString.indexOf(searchValue);
    console.log(index)
    if (index === -1) {
      toast('未找到')
      setResult("未找到")
      return;
    } else {
      const p = Math.ceil(index / pageSize)
      setResult(`找到了，页数：${p}\n\n${fileString.slice(p * pageSize - pageSize, p * pageSize)}`)
    }

  }
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <BookUploader setFileString={setFileString} />
      <div className="flex flex-col items-center justify-center mt-8">
        <input type="number" placeholder='每页数量' className="w-96 h-12 rounded-md border-2 border-gray-300 px-4" value={pageSize} onChange={(ev) => {
          setPageSize(ev.target.value)
          window.localStorage.setItem('pageSize', ev.target.value)
        }} />
      </div>
      {fileString && <div className="flex flex-col items-center justify-center mt-4">
        <input type="text"
          value={searchValue}
          onChange={(ev) => {
            setSearchValue(ev.target.value)
          }}
          placeholder="请输入要搜索的内容"
          className="w-96 h-12 rounded-md border-2 border-gray-300 px-4"
          onKeyDown={(ev) => {
            if (ev.key === 'Enter') {
              onSearch()
            }
          }} />
        <button className="w-96 h-12 rounded-md bg-blue-500 text-white mt-4" onClick={onSearch}>搜索</button>
      </div>}
      {result && <div className="flex flex-col items-center justify-center mt-4">
        <code style={{
          whiteSpace: 'pre-wrap'
        }}>{result}</code>
      </div>}
    </main>
  )
}
