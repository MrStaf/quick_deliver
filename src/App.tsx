import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import mjml2html from "mjml-browser";
import { MJMLParser } from "../func/parser";

function App() {
  const options = {
    minify: true,
  };
  const [mjml, setMjml] = useState(new MJMLParser({
    type: "column",
    content: "",
    attributes: {},
    props: { children: [], parent: null },
  }));
  console.log(mjml.parse())
  mjml.add_child(new MJMLParser({
    type: "divider",
    content: "",
    attributes: { "border-color": "#F45E43" },
    props: { children: [], parent: mjml }
  }
  ))
  console.log(mjml.parse())
  mjml.add_child(new MJMLParser({
    type: "text",
    content: "Hello World",
    attributes: {},
    props: { children: [], parent: mjml }
  }))
  const htmlOutput = mjml2html(mjml.parse(), options);
  return (
    <div className="flex flex-row h-screen bg-white">
      <nav className="flex flex-col gap-4 px-8 pt-10 border-r border-slate-300">
        <div>Draft</div>
        <div>Template</div>
      </nav>
      <nav className="flex flex-col">
        <div className="w-full px-8 hover:bg-slate-100">
          <div className="text-sm font-medium text-slate-400">Sender</div>
          <div className="text-lg font-medium">John Doe</div>
        </div>
      </nav>
      <main className="flex flex-col px-8 border-l border-slate-300">
        <div>
          <div className="text-sm font-medium text-slate-400">Sender</div>
          <p className="font-bold text-md text-slate-700">Object: test</p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(htmlOutput.html);
            }}
          >
            Copy html  
          </button>
          <button onClick={() => navigator.clipboard.writeText(mjml.parse())}>Copy mjml</button>
          <div dangerouslySetInnerHTML={{ __html: htmlOutput.html }}></div>
          <div contentEditable> test</div>
        </div>
      </main>
    </div>
  );
}

export default App;
