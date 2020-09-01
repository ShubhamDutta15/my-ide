import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"

import axios from "axios";

function App() {
  const [ide, setIde] = useState({
    code: "",
    lang: "",
    result: "Submit code to see result"
  });

  function onLangChange(e) {
    const { value } = e.target;
    setIde((prevValue) => {
      return {
        ...prevValue,
        lang: value
      }
    })
  }

  function onCodeChange(e) {
    const { value } = e.target;
    setIde((prevValue) => {
      return {
        ...prevValue,
        code: value
      }
    })
  }

  function onInputChange(e) {
    const { value } = e.target;
    setIde((prevValue) => {
      return {
        ...prevValue,
        input: value
      }
    })
  }

  function submitHandler(e) {
    e.preventDefault();
    alert("Code Submitted");
    axios.post("http://localhost:3000/code/submit", ide)
      .then(res => {
        console.log(res.data);
        const data = res.data;

        if (data.err) {

          //error in user code
          setIde((prevValue) => {
            return {
              ...prevValue,
              result: data.error
            }
          })
        } else {

          // print output in result
          setIde((prevValue) => {
            return {
              ...prevValue,
              result: data.output
            }
          })
        }
      })
      .catch((err) => {
        console.log(`Error : ${err}`);
      })
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 mt-5">
            <select id="lang" value={ide.lang} onChange={onLangChange}>
              <option value="c++">C++</option>
              <option value="c">C</option>
              <option value="javascript">Javascript</option>
              <option value="java">Java</option>
              <option value="python">Python</option>

            </select>
          </div>

        </div>
        <div className="row">
          <div className="col-12 mt-3">
            <form action="/code/submit" method="POST" >
              <p className="lead d-block my-3">Code Your code</p>
              <textarea type="text" id="code" value={ide.code} onChange={onCodeChange}  ></textarea>

              <p className="lead d-block my-2">Provide Input</p>
              <textarea type="text" id="input" value={ide.input} onChange={onInputChange}  ></textarea>

              <button className="btn btn-success mt-3 d-block" onClick={submitHandler} >Submit Code</button>
              <div className="row">
                <div className="col-12 mt-3">
                  <textarea id="result" value={ide.result} disabled={true}  ></textarea>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

    </>
  );
}

export default App;
