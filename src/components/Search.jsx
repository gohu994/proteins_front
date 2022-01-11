import React, { useState } from "react";
import '../styles/Recherche.css';
import {Select, FormControl, MenuItem, TextField, Button, Grid} from "@mui/material";
import axios from "axios";

import Loader from "react-js-loader";

const Search = (props) => {
    const [protName, setProtName] = useState("");
    const [threshold, setThreshold] = useState(0);
    const [loading, setLoading] = useState(false);
    const [toDisplay, setToDisplay] = useState(25);

    const handleSubmit = (evt) => {
        evt.preventDefault();

        // Call our API 
        const content = {
            body: { name: protName, seuil: threshold },
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        };
        console.log(protName)
        setLoading(true);
        axios.post("http://localhost:5000/protein", content).then(e => {
            let query = `MATCH (prot0: Prot{entry:  "${protName}" })-[r1:SIMI]-(prot1) MATCH (prot1)-[r2:SIMI]-(prot2) RETURN prot0,prot1,prot2,r1,r2 LIMIT ${toDisplay}`;
            //let query = `MATCH (a:Prot)-[sim:SIMI]->(b:Prot) WHERE sim.value[0] >= ${threshold} AND sim.value[0] <= 0.5 RETURN a,sim,b LIMIT 1000`; // affichage
            props.setNewQ(query);
            props.setProtein(protName);
            console.log("Damien API DONE.");
            props.vis.renderWithCypher(query);
            //props.vis.reload();
            console.log("Graph reloaded.");
            const content = {
                body: {},
                headers: {
                    "Content-Type": "application/json"
                },
                method: "GET"
            };
            axios.get("http://localhost:5000/stats", content).then(e => {
                props.setStatistiques({
                    isolees : e.data.numberIsolated,
                    non_isolees : e.data.numberLinked,
                    labellees : e.data.numberLabelled,
                    non_labellees : e.data.numberUnlabelled,
                    pourcentage_connu : e.data.numberCompiled
    
                })
            })
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
            <Grid item xs={6}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="cherche"
                    label="Protein name"
                    type="text"
                    variant="standard"
                    fullWidth
                    value={protName}
                    required
                    onChange={(e) => setProtName(e.target.value) }
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="seuil"
                    label="Threshold"
                    type="text"
                    variant="standard"
                    fullWidth
                    value={threshold}
                    onChange={(e) => setThreshold(e.target.value) }
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="display"
                    label="Display"
                    type="text"
                    variant="standard"
                    fullWidth
                    value={toDisplay}
                    onChange={(e) => setToDisplay(e.target.value) }
                />
            </Grid>
        </Grid>
        <Button variant="contained" className="Go" type="submit" disabled={loading} >Search</Button>
        { loading && <Loader type="bubble-loop" bgColor={"#0000FF"} color={'#0000FF'} size={100} />}
      </form>
    );
}

export default Search;
