import '../styles/App.css';
import GraphVisu from "./graph.js";
import Recherche from "./Recherche";
import React from "react";

function App() {

    const [url,setUrl] = React.useState("neo4j://localhost:7687");
    const [protein,setProtein] = React.useState([]);
    const [seuil,setSeuil] = React.useState([]);



    const [newQ, setNewQ] = React.useState("MATCH (a:Prot)-[sim:SIMILARITE]->(b:Prot) WHERE sim.value[0] > " + seuil +" RETURN a,sim,b");
    console.log(newQ);
    return (
        <div className="App">
            <header className="App-header">
                <h1>Proteins graph</h1>
            </header>
            <body className="App-body">
                <Recherche
                    setUrl={setUrl}
                    protein={protein}
                    setProtein={setProtein}
                    seuil={seuil}
                    setSeuil={setSeuil}
                    newQ={newQ}
                    setNewQ={setNewQ}
                />
                <GraphVisu url={url} newQ={newQ}/>
            </body>
        </div>
    );
}

export default App;
