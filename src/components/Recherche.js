import React from "react"
import {Select, FormControl, MenuItem} from "@mui/material";

function Recherche(props) {

    const [protein,setProtein] = React.useState([0]);


    const handleChange= (event) => {
        props.setUrl("bolt://localhost:7687")
        setProtein(event.target.value);

    };

    return(
        <FormControl sx={{ m: 1, minWidth: 200 }}>
            <Select
                value={protein}
                onChange={handleChange}
                displayEmpty
                defaultValue={0}
                inputProps={{ 'aria-label': 'Without label' }} onClick={console.log(props.options[protein].val)}
            >
                {props.options.map((p,index) => {
                    return <MenuItem value={index} key={p.key}> {p.val}</MenuItem>
                })}
            </Select>

        </FormControl>

    )
}

export default Recherche