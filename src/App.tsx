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
    <div className="container">
      <h1>Welcome to Tauri!</h1>
      <div dangerouslySetInnerHTML={{ __html: htmlOutput.html }}></div>
      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>
      <h1 className="font-3xl bg-slate-900 text-white my-4">
        Tailwind is working
      </h1>
      <div className="row">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            greet();
          }}
        >
          <input
            id="greet-input"
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Enter a name..."
          />
          <button type="submit">Greet</button>
        </form>
      </div>
      <p>{greetMsg}</p>
    </div>
  );
}

export default App;
