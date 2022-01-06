import '../styles/App.css';
import { NeoGraph, ResponsiveNeoGraph } from "./NeoGraph";
import Search from "./Search";
import React, { useState } from "react";


const NEO4J_URI = "neo4j://localhost:7687";

function App() {
    const [protein,setProtein] = useState("");
    const [request, setRequest] = useState("MATCH (a:Prot)-[sim:SIMI]->(b:Prot) RETURN a,sim,b");
    const [vis, setVis] = useState({}); // On stock l'outil qui gère l'affichage des graph

    return (
        <div className="App">
            <div className="App-header">
                <h1>Proteins graph</h1>
            </div>
            <div>
                <Search
                    protein={protein}
                    setProtein={setProtein}
                    newQ={request}
                    setNewQ={setRequest}
                    vis={vis} // On utilise l'outil pour refresh le graph au moment voulu
                />
                <ResponsiveNeoGraph
                    viz={(childData) => {
                        setVis(childData) // on récupère l'outil de visualisation pour l'utiliser partout
                    }}
                    containerId={"id0"}
                    neo4jUri={NEO4J_URI}
                    request={request}
                    backgroundColor='#111111'
                />
                { /*<NeoGraph
                    width={400}
                    height={300}
                    containerId={"id1"}
                    neo4jUri={NEO4J_URI}
                    backgroundColor={"#b2beb5"}
                /> */}
            </div>
        </div>
    );

    /*


    const [newQ, setNewQ] = React.useState("MATCH (a:Prot)-[sim:SIMI]->(b:Prot) WHERE sim.value[0] > " + seuil +" RETURN a,sim,b");
    const [viz, setViz] = React.useState({});

    console.log(newQ);
    return (
        <div className="App">
            <header className="App-header">
                <h1>Proteins graph</h1>
            </header>
            <body className="App-body">
                <Recherche
                    viz
                    setUrl={setUrl}
                    protein={protein}
                    setProtein={setProtein}
                    seuil={seuil}
                    setSeuil={setSeuil}
                    newQ={newQ}
                    setNewQ={setNewQ}
                />
                <GraphVisu setViz={setViz} url={url} newQ={newQ}/>
                <Stats newQ={newQ} />
            </body>
        </div>
    );
    */
}

export default App;
