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

    /*
    const handleChangeProtein = (e) => {
        props.setProtein(e.target.value);
    };

    const handleChangeSeuil = (e) => {
        props.setSeuil(e.target.value);
    };

    const handleSubmitSeuil = (e) => {
        props.setNewQ("MATCH (a:Prot)-[sim:SIMI]->(b:Prot) WHERE sim.value[0] > " + props.seuil +" RETURN a,sim,b");
        console.log(props.newQ);
    }

    const handleSubmitResearch = (e) => {
 
        const protSearch = {
            body: { name: props.protein },
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        };

        axios.post("http://localhost:5000/protein", protSearch).then(e => {
            handleSubmitSeuil(e);
        })
        

    }
    return(
        <FormControl sx={{ m: 1, width: 800 }}>
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
                        value={props.protein}
                        onChange={handleChangeProtein}
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
                        value={props.seuil}
                        onChange={handleChangeSeuil}
                    />
                </Grid>
            </Grid>
            <Button variant="contained" className="Go" onClick={handleSubmitResearch}>Search</Button>
        </FormControl>
        
    )*/
}

export default Search;