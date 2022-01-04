import React from "react"
import '../styles/Recherche.css';
import {Select, FormControl, MenuItem, TextField, Button, Grid} from "@mui/material";
import axios from "axios";

function Recherche(props) {

    const [protein,setProtein] = React.useState([]);
    const [seuil,setSeuil] = React.useState([]);

    const handleChangeProtein = (e) => {
        props.setUrl("bolt://localhost:7687")
        setProtein(e.target.value);
    };

    const handleChangeSeuil = (e) => {
        setSeuil(e.target.value);
    };

    const handleSubmitSeuil = (e) => {

    }

    const handleSubmitResearch = (e) => {
        e.preventDefault();
        const protSearch = {
            body: { name: protein },
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        };
        axios.post("http://localhost:5000/protein", protSearch)
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
                        value={protein}
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
                        value={seuil}
                        onChange={handleChangeSeuil}
                    />
                </Grid>
            </Grid>
            <Button variant="contained" className="Go" onClick={handleSubmitResearch}>Search</Button>
        </FormControl>

    )
}

export default Recherche