// import FunctionError from "../../shared/utils/error";

import FunctionError from '../../shared/utils/error';

const isEquals = (newNodesGroupProperties, unit, newNodesGroup) => {
    if (newNodesGroupProperties.owners) {
        if (newNodesGroupProperties.owners !== unit.owners) {
            throw new FunctionError(400, 'Nodes group and unit owners are different');
        }
        newNodesGroup.owners = newNodesGroupProperties.owners;
    }
    if (newNodesGroupProperties.interviewers) {
        if (newNodesGroupProperties.interviewers !== unit.interviewers) {
            throw new FunctionError(400, 'Nodes group and unit owners are different');
        }
        newNodesGroup.interviewers = newNodesGroupProperties.interviewers;
    }
    if (newNodesGroupProperties.nodes) {
        if (newNodesGroupProperties.nodes !== unit.nodes) {
            throw new FunctionError(400, 'Nodes group and unit owners are different');
        }
        newNodesGroup.nodes = newNodesGroupProperties.nodes;
    }

    return newNodesGroup;
};

export default isEquals;
