import React, { useState } from "react";
import logo from "./logo.png";
import "./App.css";

const App = () => {
  const [text, setText] = useState([]);
  const [count, setCount] = useState(1);
  const [repetition, setRepetition] = useState(1);
  const [category, setCategory] = useState("random");
  const [isVocalized, setIsVocalized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  function getText() {
    setIsLoading(true);
    setIsCopied(false);
    console.log(
      `https://api.mesba7.com/sample?sentences_count=${count}&category=${category}&vocalized=${isVocalized}`
    );
    fetch(
      `https://api.mesba7.com/${
        category == "random" ? "random" : "sample"
      }?sentences_count=${count}&category=${category}&vocalized=${isVocalized}`
    )
      .then((res) => res.json())
      .then((data) => {
        let result = [];
        for (let i = 0; i < repetition; i++) {
          result.push(data.result);
        }
        setText(result);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function copyText() {
    navigator.clipboard.writeText(text.join("\n"));
    setIsCopied(true);
  }

  return (
    <div className="App p-5 bg-gray-100 mt-3">
      <header className="flex items-center justify-between px-3 ">
        <img src={logo} className="w-10 rounded" alt="logo" />
        <h2>مولد النصوص العربية</h2>
      </header>
      <div className="text-generator px-3 my-3">
        <h3 className="text-lg text-gray-900 my-3 font-bold">الاعدادات</h3>
        <section className="flex items-start flex-col gap-3 mb-6">
          <div className="options flex items-center justify-between gap-3 text-gray-700 w-1/3">
            <p className="font-bold">عدد الجمل</p>
            <input
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => {
                setCount(e.target.value);
              }}
              className="border border-gray-500 focus:border-gray-800 rounded text-lg w-1/2 p-1 outline-none"
            />
          </div>
          <div className=" flex items-center justify-between  gap-3 text-gray-700 w-1/3">
            <p className="font-bold">التكرار</p>
            <input
              type="number"
              min="1"
              max="100"
              value={repetition}
              onChange={(e) => {
                setRepetition(e.target.value);
              }}
              className="border border-gray-500 focus:border-gray-800 rounded text-lg w-1/2 p-1 outline-none"
            />
          </div>
          <div className=" flex items-center justify-between  gap-3 text-gray-700 w-1/3">
            <p className="font-bold">النوع</p>
            <select
              className="w-1/2 p-1"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="random">عشوائي</option>{" "}
              <option value="proverb">مثل شعبي</option>{" "}
              <option value="poem">شعر</option>
            </select>
          </div>
          {category != "random" && (
            <div className=" flex items-center justify-between  gap-3 text-gray-700 w-1/3">
              <p className="font-bold">التشكيل</p>
              <input
                type="checkbox"
                onChange={() => {
                  setIsVocalized(!isVocalized);
                }}
              />
            </div>
          )}
        </section>

        <div className="buttons mt-5">
          <button
            onClick={getText}
            className="generate bg-slate-800 hover:bg-slate-700 text-white rounded px-2 py-1 shadow "
          >
            توليد نص
          </button>
          {text.length > 0 && (
            <button
              onClick={copyText}
              className={
                "copy " +
                (isCopied
                  ? "bg-green-600 hover:bg-green-500 "
                  : "bg-blue-600 hover:bg-blue-500 ") +
                " text-white rounded px-2 py-1 shadow mx-2"
              }
            >
              {isCopied ? "تم النسخ" : "نسخ"}
            </button>
          )}
        </div>
      </div>
      {!isLoading && (
        <div className="text-generated p-4 text-gray-800">
          {text.map((repeted) => (
            <p className="p-1 my-2">
              {repeted.map((p) => (
                <p> {p} </p>
              ))}
            </p>
          ))}
        </div>
      )}
      {isLoading && <div className="loading">جاري التحميل ...</div>}
    </div>
  );
};

export default App;
