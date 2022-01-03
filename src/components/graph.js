import NeoVis from "neovis.js";
import '../styles/Graph.css';
import React from "react";

function GraphVisu(props) {
    var viz;

    /*var config = {
        container_id: "graph",
        server_url: "bolt://44.199.227.95:7687",
        server_user: "neo4j",
        server_password: "closure-compilers-retractors",
        labels: {
            "Movie": {
                caption: "title"
            },
            "Person": {
                caption: "name"
            }
        },
        relationships: {
            "DIRECTED": {
                caption: true
            }
        },
        initial_cypher: "MATCH p=(:Person)-[:DIRECTED]->(:Movie) RETURN p"
    };*/

    var config2 = {
        container_id: "graph",
        server_url: props.url.toString(),
        labels: {
            "Prot": {
                caption: "entry"
            }
        },
        relationships: {
            SIMILARITE: {
                thickness: "count",
                caption: true
            }
        },
        initial_cypher: "MATCH (a:Prot)-[sim:SIMILARITE]->(b:Prot) RETURN a,sim,b"
    };

    viz = new NeoVis(config2);
    viz.render()
    return(
        <div id="graph" className="Graph">
            {props.url}
        </div>

    )
}

export default GraphVisu