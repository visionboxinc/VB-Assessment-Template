import axios from 'axios';
import {useState} from "react";
import logo from './logo.svg';
import './App.css';



// Get Request
async function getWeather() {
  try {
    const { data, status } = await axios.get<Array<any>>(
        'https://localhost:7291/weatherforecast',
        {
          headers: {
            Accept: 'application/json',
          },
        },
    );
    

    console.log('response status is: ', status);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      throw new Error(error.message)
    } else {
      console.log('unexpected error: ', error);
      throw new Error("An unexpected error happened")
    }
  }
}

// Post Request
type PostParams = {
  test: string;
}

async function postWeather() {
  try {
    const { data, status } = await axios.post<PostParams>(
        'https://localhost:7291/weatherforecast',
        // Random String
        {
          test: (Math.random() + 1).toString(36).substring(7)
        },
        {
          headers: {
            Accept: 'application/json',
          },
        },
    );
    
    console.log('response status is: ', status);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      throw new Error(error.message);
    } else {
      console.log('unexpected error: ', error);
      throw new Error("An unexpected error occurred")
    }
  }
}

function App() {
  const [weather, setWeather] = useState<Array<any>>([])
  const [postResult, setPostResult] = useState<PostParams>({test: ""})
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button
            className="button"
            onClick={() => {
              getWeather().then(val => {
                setWeather(val)
              }).catch(err => {
                console.error(err)
              })
              
        }}>
          Get Request
          </button>
        {
          weather.length > 0 ? <div>
            {
              weather.map((w,i) => {
                return <div key={i}>{JSON.stringify(w)}</div>
              })
            }
          </div> : null
          
        }
        <button
            className="button"    
            onClick={() => {
              postWeather().then(val => {
                setPostResult(val)
              }).catch(err => {
                console.error(err)
              })
        }}>
          Post Request
        </button>
        {
          postResult.test.length > 0 ? <div>
            { 
              postResult.test
            }
          </div>  : null
        }
      </header>
    </div>
  );
}

export default App;
