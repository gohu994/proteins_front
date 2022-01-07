import NeoVis from "neovis.js";
import React, { useEffect, useRef, useState } from "react";
import useResizeAware from "react-resize-aware";
import PropTypes from "prop-types";

const NeoGraph = (props) => {
  const {
    viz,
    width,
    height,
    containerId,
    backgroundColor,
    neo4jUri,
    request
  } = props;

  const visRef = useRef();

  useEffect(() => {
    console.log("VIZ", request);
    const config = {
      container_id: visRef.current.id,
      server_url: neo4jUri,
      labels: {
        Prot: {
            caption: "entry"
        }
      },
      relationships: {
        SIMI: {
            thickness: "weight",
            caption: true
        }
      },
      initial_cypher: request,
    };
    const vis = new NeoVis(config);
    props.viz(vis);    
    vis.render();
    console.log(vis);
  }, [neo4jUri]);

  return (
    <div
      id={containerId}
      ref={visRef}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: `${backgroundColor}`,
        paddingLeft: 0,
        paddingRight: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block',
      }}
    />
  );
};

NeoGraph.defaultProps = {
  width: 600,
  height: 600,
  backgroundColor: "#d3d3d3",
};

NeoGraph.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  containerId: PropTypes.string.isRequired,
  neo4jUri: PropTypes.string.isRequired,
  /*neo4jUser: PropTypes.string.isRequired,
  neo4jPassword: PropTypes.string.isRequired,*/
  request: PropTypes.string, // add this
  backgroundColor: PropTypes.string,
};

const ResponsiveNeoGraph = (props) => {
  const [resizeListener, sizes] = useResizeAware();

  const side = Math.max(sizes.width, sizes.height) / 2;
  const neoGraphProps = { ...props, width: side, height: side };
  return (
    <div style={{ position: "relative" }}>
      {resizeListener}
      <NeoGraph {...neoGraphProps} />
    </div>
  );
};

ResponsiveNeoGraph.defaultProps = {
  backgroundColor: "#d3d3d3",
};

ResponsiveNeoGraph.propTypes = {
  containerId: PropTypes.string.isRequired,
  neo4jUri: PropTypes.string.isRequired,
  /*neo4jUser: PropTypes.string.isRequired,
  neo4jPassword: PropTypes.string.isRequired,*/
  request: PropTypes.string, // add this
  backgroundColor: PropTypes.string,
};

export { NeoGraph, ResponsiveNeoGraph };
