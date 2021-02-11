import FunctionError from '../../shared/utils/error';

const validateAndUpdate = (newNodesGroupProperties, unit, newNodesGroup) => {
    if (newNodesGroupProperties.owners) {
        if (!newNodesGroupProperties.owners.every((owner) => unit.owners.includes(owner))) {
            throw new FunctionError(400, 'Nodes group and unit owners are different');
        }
        newNodesGroup.owners = newNodesGroupProperties.owners;
    }
    if (newNodesGroupProperties.interviewers) {
        if (!newNodesGroupProperties.interviewers.every((interviewer) => unit.interviewers.includes(interviewer))) {
            throw new FunctionError(400, 'Nodes group and unit owners are different');
        }
        newNodesGroup.interviewers = newNodesGroupProperties.interviewers;
    }
    if (newNodesGroupProperties.nodes) {
        if (!newNodesGroupProperties.nodes.every((node) => unit.nodes.includes(node))) {
            throw new FunctionError(400, 'Nodes group and unit owners are different');
        }
        newNodesGroup.nodes = newNodesGroupProperties.nodes;
    }

    return newNodesGroup;
};

export default validateAndUpdate;
