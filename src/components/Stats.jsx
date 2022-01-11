import React, { useState } from "react";
import '../styles/Recherche.css';
import {Select, FormControl, MenuItem, TextField, Button, Grid} from "@mui/material";
import axios from "axios";

const Stats = (props) => {
    const statistiques = {
        isolees: 0,
        non_isolees: 0,
        labellees: 0,
        non_labellees: 0,
        pourcentage_connu: 0,
    }

    // Call our API 
    const content = {
        body: {},
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST"
    };
    axios.post("http://localhost:5000/stats", content).then(e => {
        console.log("Stats done");
        statistiques.isolees = e.data.numberIsolated;
        statistiques.non_isolees = e.data.numberLinked;
        statistiques.labellees = e.data.numberLabelled;
        statistiques.non_labellees = e.data.numberUnlabelled;
        statistiques.pourcentage_connu = e.data.numberCompiled;
    })

    return (
        <table>
           <tr>
               <td>Protéines isolées</td>
               <td>{statistiques.isolees}</td>
           </tr>
           <tr>
               <td>Protéines liées</td>
               <td>{statistiques.non_isolees}</td>
           </tr>
           <tr>
               <td>Protéines labellées</td>
               <td>{statistiques.labellees}</td>
           </tr>
           <tr>
               <td>Protéines non labellées</td>
               <td>{statistiques.non_labellees}</td>
           </tr>
           <tr>
               <td>Pourcentage protéines connus</td>
               <td>{statistiques.pourcentage_connu}</td>
           </tr>
           <tr>
               <td>Nombre de domaines</td>
               <td></td>
           </tr>
        </table>
    );
}

export default Stats;
