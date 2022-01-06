import React, { useState } from "react";
import '../styles/Recherche.css';
import {Select, FormControl, MenuItem, TextField, Button, Grid} from "@mui/material";
import axios from "axios";

const Search = (props) => {
    const [protName, setProtName] = useState("");
    const [threshold, setThreshold] = useState(0);

    const handleSubmit = (evt) => {
        evt.preventDefault();

        // Call our API 
        const content = {
            body: { name: protName },
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        };

        axios.post("http://localhost:5000/protein", content).then(e => {
            let query = `MATCH (a:Prot)-[sim:SIMI]->(b:Prot) WHERE sim.value[0] > ${threshold} RETURN a,sim,b`; // affichage
            props.setNewQ(query);
            props.setProtein(protName);
            console.log("Damien API DONE.");
            props.vis.renderWithCypher(query);
            //props.vis.reload();
            console.log("Graph reloaded.");
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
        <Button variant="contained" className="Go" type="submit">Search</Button>
      </form>
    );
}

export default Search;
