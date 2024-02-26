import ReactDOM from 'react-dom/client'
import App from './App'

/* The below line renders the contents of the React component (name App)
  into the div-element, defined in the file index.html, having the id value 'root'
*/
ReactDOM.createRoot(document.getElementById('root')).render(<App />)
