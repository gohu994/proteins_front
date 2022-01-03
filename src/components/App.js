import '../styles/App.css';
import GraphVisu from "./graph.js";
import Recherche from "./Recherche";
import React from "react";

function App() {
    const options = [
        { val: 'P1', key: 'p1'},
        { val: 'P2', key: 'p2'},
        { val: 'P3', key: 'p3'},
        { val: 'P4', key: 'p4'},
        { val: 'P5', key: 'p5'},
    ]

    const [url,setUrl] = React.useState("neo4j://localhost:7687");

    return (
        <div className="App">
            <header className="App-header">

                <h1>Proteins graph</h1>
                <Recherche options={options} setUrl={setUrl}/>
                <GraphVisu url={url}/>

            </header>
        </div>
    );
}

export default App;
