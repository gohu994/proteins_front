import React from "react"
import '../styles/Recherche.css';
import {Select, FormControl, MenuItem, TextField, Button, Grid} from "@mui/material";
import axios from "axios";

function Recherche(props) {



    const handleChangeProtein = (e) => {
        props.setProtein(e.target.value);
    };

    const handleChangeSeuil = (e) => {
        props.setSeuil(e.target.value);
    };

    const handleSubmitSeuil = (e) => {
        console.log(props.newQ);
        // props.setNewQ("MATCH (a:Prot)-[sim:SIMILARITE]->(b:Prot) WHERE sim.value[0] > " + props.seuil +" RETURN a,sim,b")
    }

    const handleSubmitResearch = (e) => {
        props.setNewQ("MATCH (a:Prot {entry: '" + props.protein + "' })-[sim:SIMILARITE]->(b:Prot) WHERE sim.value[0] > " + props.seuil +" RETURN a,sim,b")
        const protSearch = {
            body: { name: props.protein },
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        };
        axios.post("http://localhost:5000/protein", protSearch)
        handleSubmitSeuil(e);
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

    )
}

export default Recherche