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
            caption: "entry",
            //image: "data:image/jpeg;base64,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"
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
