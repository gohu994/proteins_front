import React, { useState } from "react";
import '../styles/Recherche.css';
import {Select, FormControl, MenuItem, TextField, Button, Grid} from "@mui/material";
import axios from "axios";

import Loader from "react-js-loader";

const Search = (props) => {
    const [protName, setProtName] = useState("");
    const [threshold, setThreshold] = useState(0);
    const [loading, setLoading] = useState(false);

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

        setLoading(true);
        axios.post("http://localhost:5000/protein", content).then(e => {
            let query = `MATCH (a:Prot)-[sim:SIMI]->(b:Prot) WHERE sim.value[0] > ${threshold} RETURN a,sim,b`; // affichage
            props.setNewQ(query);
            props.setProtein(protName);
            console.log("Damien API DONE.");
            props.vis.renderWithCypher(query);
            //props.vis.reload();
            console.log("Graph reloaded.");
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
            <Grid item xs={9}>
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
        </Grid>
        <Button variant="contained" className="Go" type="submit" disabled={loading} >Search</Button>
        { loading && <Loader type="bubble-loop" bgColor={"#0000FF"} color={'#0000FF'} size={100} />}
      </form>
    );
}

export default Search;
