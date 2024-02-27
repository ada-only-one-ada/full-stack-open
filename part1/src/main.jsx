import ReactDOM from 'react-dom/client'
import App from './App'
import AppCounter from './AppCounter'
import AppStateful from './AppStateful'
import AppComplex from './AppComplex'

/* The below line renders the contents of the React component (name App)
  into the div-element, defined in the file index.html, having the id value 'root'
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
*/
/*
let counter = 1;
const refresh = () => {
  ReactDOM.createRoot(document.getElementById('counter')).render(
    <AppCounter counter={counter} />
  )
}

setInterval(() => {
  refresh();
  counter += 1;
}, 1000);

refresh();
counter += 1;
refresh();
counter += 1;
refresh();
counter += 1;
refresh();
*/

ReactDOM.createRoot(document.getElementById('complex')).render(<AppComplex />)