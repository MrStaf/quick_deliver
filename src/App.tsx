import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import mjml2html from "mjml-browser";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  const options = {
    minify: true,
  };
  const htmlOutput = mjml2html(
    `
    <mjml>
        <mj-body>
              <mj-section>
                      <mj-column>
                                <mj-text>
                                            Hello World!
                                                      </mj-text>
                                                              </mj-column>
                                                                    </mj-section>
                                                                        </mj-body>
                                                                          </mjml>
                                                                          `,
    options
  );
  return (
    <div className="flex flex-row bg-white h-screen">
      <nav className="flex flex-col px-8 pt-10 gap-4 border-slate-300 border-r">
        <div>Draft</div>
        <div>Template</div>
      </nav>
      <nav className="flex flex-col">
        <div className="hover:bg-slate-100 px-8 w-full">
          <div className="text-sm text-slate-400 font-medium">Sender</div>
          <div className="text-lg font-medium">John Doe</div>
        </div>
      </nav>
      <main className="flex flex-col px-8 border-slate-300 border-l">
        <div>
          <div className="text-sm text-slate-400 font-medium">Sender</div>
          <p className="text-md text-slate-700 font-bold">Object: test</p>
          <button
            onClick={() => {
              // copy to clipboard
              navigator.clipboard.writeText(htmlOutput.html);
            }}
          >
            copy
          </button>
          <div dangerouslySetInnerHTML={{ __html: htmlOutput.html }}></div>
        </div>
      </main>
    </div>
  );
}

export default App;
