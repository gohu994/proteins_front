import React from "react"
import {Select, FormControl, MenuItem, TextField, Button} from "@mui/material";
import axios from "axios";

function Recherche(props) {

    const [protein,setProtein] = React.useState([]);


    const handleChangeProtein = (e) => {
        props.setUrl("bolt://localhost:7687")
        setProtein(e.target.value);
    };

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
        <FormControl sx={{ m: 1, minWidth: 200 }}>
            <TextField
                autoFocus
                margin="dense"
                id="cherche"
                label="cherche"
                type="text"
                variant="standard"
                fullWidth
                value={protein}
                onChange={handleChangeProtein}
            />
            <Button type="submit" onClick={handleSubmitResearch}>Search</Button>
        </FormControl>

    )
}

export default Recherche