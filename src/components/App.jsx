import '../styles/App.css';
import { NeoGraph, ResponsiveNeoGraph } from "./NeoGraph";
import Search from "./Search";
import Stats from "./Stats";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {Select, FormControl, MenuItem, TextField, Button, Grid} from "@mui/material";

const NEO4J_URI = "neo4j://localhost:7687";

function App() {
    const [protein,setProtein] = useState("");
    const [request, setRequest] = useState("MATCH (a:Prot)-[sim:SIMI]->(b:Prot) RETURN a,sim,b LIMIT 40");
    const [vis, setVis] = useState({}); // On stock l'outil qui gère l'affichage des graph

    const [statistiques,setStatistiques] = useState({});
    useEffect(() => {
       // Call our API 
        const content = {
            body: {},
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        };
        axios.get("http://localhost:5000/stats", content).then(e => {
            setStatistiques({
                isolees : e.data.numberIsolated,
                non_isolees : e.data.numberLinked,
                labellees : e.data.numberLabelled,
                non_labellees : e.data.numberUnlabelled,
            })
        })
      }, []);

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
                    setStatistiques={(e)=>{
                        setStatistiques(e)
                    }}
                />
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                        <NeoGraph
                        width={1200}
                        height={900}
                        viz={(childData) => {
                            setVis(childData) // on récupère l'outil de visualisation pour l'utiliser partout
                        }}
                        containerId={"id0"}
                        neo4jUri={NEO4J_URI}
                        request={request}
                        backgroundColor='#111111'
                        />
                        
                    </Grid>
                    <Grid item xs={2}>
                        <Stats statistiques={statistiques} />
                    </Grid>

                </Grid>
                
               {/* <ResponsiNeoGraphveNeoGraph
                    viz={(childData) => {
                        setVis(childData) // on récupère l'outil de visualisation pour l'utiliser partout
                    }}
                    containerId={"id0"}
                    neo4jUri={NEO4J_URI}
                    request={request}
                    backgroundColor='#111111'
                />*/ }
                
            </div>
        </div>
    );
}

export default App;
