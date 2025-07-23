import { useState, useCallback, useEffect,useRef} from 'react'
import './App.css'

function App() {
  const[length,setLength] = useState(8)
  const[numAllowed, setNumAllowed] = useState(false)
  const[charAllowed,setCharAllowed] = useState(false)
  const[password,setPassword] = useState("")
  const [copied, setCopied] = useState(false)

  //useRef hook 
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllowed){
      str += "0123456789"
    }
    if(charAllowed){
      str += "!@#$%^&*{}()_-~`"
    }

    for(let i=1; i<= length; i++){
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)


  } , [length, numAllowed, charAllowed,setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,30)
    window.navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-lg rounded-2xl px-6 py-8 my-10 bg-gray-900 text-orange-400">
  <h1 className="text-4xl text-center text-white font-bold mb-6">🔐 Password Generator</h1>

  <div className="flex items-center shadow-inner rounded-lg overflow-hidden bg-white mb-6">
    <input
      type="text"
      value={password}
      className="w-full py-3 px-4 text-gray-800 text-lg font-mono outline-none bg-transparent"
      placeholder="Generated password"
      readOnly
      ref={passwordRef}
    />
    <button
    onClick={copyPasswordToClipboard}
  className={`ml-2 px-4 py-2 flex items-center gap-2 font-medium rounded-md transition-all duration-200 
    ${copied ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"} 
    text-white active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400`}
>
  {copied ? (
    <>
      <span>✓</span>
      <span>Copied!</span>
    </>
  ) : (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 16h8M8 12h8m-8-4h8M4 6h16M4 10h16M4 14h16M4 18h16"
        />
      </svg>
      <span>Copy</span>
    </>
  )}
</button>

  </div>
  <div className='flex text-sm gap-x-2'>
    <div className='flex items-centre gap-x-1'>
      <input
      type="range"
      min={6}
      max={25}
      value={length}
      className="cursor-pointer"
      onChange={(e)=>{setLength(e.target.value)}}
      />
      <label>Length:{length}</label>
    </div>
    <div className='flex items-centre gap-x-1'>
      <input
      type="checkbox"
      defaultChecked={numAllowed}
      id="numInput"
      onChange={()=>{
        setNumAllowed((prev)=>!prev);
      }}
      />
      <label htmlFor='numInput'>Numbers</label>
    </div>
    <div className='flex items-centre gap-x-1'>
      <input
      type="checkbox"
      defaultChecked={charAllowed}
      id="charInput"
      onChange={()=>{
        setCharAllowed((prev)=>!prev);
      }}
      />
      <label htmlFor='charInput'>Characters</label>
    </div>


  </div>
</div>

    </>
  )
}

export default App
