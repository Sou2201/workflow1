import React, { useState, useEffect } from 'react';
import ReactFlow, { addEdge, Controls, Background } from 'react-flow-renderer'; // Import ReactFlow component
import { v4 as uuidv4 } from 'uuid';
import FilterDataNode from './FilterDataNode'; // Import other workflow nodes
import WaitNode from './WaitNode.js';
import ConvertFormatNode from './ConvertFormatNode';
import SendPOSTRequestNode from './SendPOSTRequestNode';

const WorkflowBuilder = () => {
  const [elements, setElements] = useState([]);
  const [executionProgress, setExecutionProgress] = useState([]);
  const STORAGE_KEY = 'saved_workflow';

  useEffect(() => {
    const savedWorkflow = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (savedWorkflow) {
      setElements(savedWorkflow);
    }
  }, []);

  const saveWorkflow = () => {
    const workflowWithId = elements.map((el) => ({ ...el, id: uuidv4() }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workflowWithId));
  };

  const executeWorkflow = () => {
    setExecutionProgress([]);
    elements.forEach((node, index) => {
      setTimeout(() => {
        setExecutionProgress((prevProgress) => [...prevProgress, index]);
      }, 1000 * index);
    });
  };

  const ProgressBar = () => {
    const totalTasks = elements.length;
    const completedTasks = executionProgress.length;
    const progressPercentage = (completedTasks / totalTasks) * 100 || 0;

    return (
      <div className="progress-container">
        <div className="progress-label">Workflow Execution Progress:</div>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
        </div>
        <div>{`${completedTasks} out of ${totalTasks} tasks completed`}</div>
      </div>
    );
  };

  const onConnect = (params) => {
    setElements((els) => addEdge(params, els));
  };

  // Define your workflow nodes here

  return (
    <div className="workflow-builder">
      <div className="canvas">
        <ReactFlow
          elements={elements}
          onConnect={onConnect}
          nodesDraggable={false}
          nodesConnectable={false}
          snapToGrid={true}
        >
          <Background color="#f0f0f0" gap={16} />
          <Controls />
          {/* Render your nodes here */}
          <div key="filter-data" data-nodeid="filter-data">
            <FilterDataNode id="filter-data" />
          </div>
          {/* Repeat for other nodes */}
          <div key="wait-data" data-nodeid="wait-data">
            <WaitNode id="wait-data" />
          </div>
          <div key="format-data" data-nodeid="format-data">
            <ConvertFormatNode id="format-data" />
          </div>
          <div key="send-data" data-nodeid="send-data">
            <SendPOSTRequestNode id="send-data" />
          </div>
          
        </ReactFlow>
      </div>
      <div className="button-container">
        <button onClick={executeWorkflow}>Execute Workflow</button>
        <button onClick={saveWorkflow}>Save Workflow</button>
      </div>
      <ProgressBar />
    </div>
  );
};

export default WorkflowBuilder;
