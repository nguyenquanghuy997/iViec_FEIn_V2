import React from "react";
import {Checkbox, FormControlLabel} from "@mui/material";
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import {CollapseIcon, ExpandIcon} from "@/assets/ArrowIcon";

const data = {
    id: "0",
    name: "Parent",
    children: [
        {
            id: "1",
            name: "Child - 1"
        },
        {
            id: "3",
            name: "Child - 3",
            children: [
                {
                    id: "4",
                    name: "Child - 4",
                    children: [
                        {
                            id: "7",
                            name: "Child - 7"
                        },
                        {
                            id: "8",
                            name: "Child - 8"
                        }
                    ]
                }
            ]
        },
        {
            id: "5",
            name: "Child - 5",
            children: [
                {
                    id: "6",
                    name: "Child - 6"
                }
            ]
        },
        {
            id: "9",
            name: "Child - 9",
            children: [
                {
                    id: "10",
                    name: "Child - 10",
                    children: [
                        {
                            id: "11",
                            name: "Child - 11"
                        },
                        {
                            id: "12",
                            name: "Child - 12"
                        }
                    ]
                }
            ]
        }
    ]
}

export default function OrganizationTree() {
    const [selected, setSelected] = React.useState([]);
    console.log(selected);

    const selectedSet = React.useMemo(() => new Set(selected), [selected]);

    const parentMap = React.useMemo(() => {
        return goThroughAllNodes(data);
    }, []);

    // console.log("parentMAp", parentMap);

    function goThroughAllNodes(nodes, map = {}) {
        if (!nodes.children) {
            return null;
        }

        map[nodes.id] = getAllChild(nodes).splice(1);

        for (let childNode of nodes.children) {
            goThroughAllNodes(childNode, map);
        }

        return map;
    }

    // Get all children from the current node.
    function getAllChild(
        childNode,
        collectedNodes = []
    ) {
        if (childNode === null) return collectedNodes;

        collectedNodes.push(childNode.id);

        if (Array.isArray(childNode.children)) {
            for (const node of childNode.children) {
                getAllChild(node, collectedNodes);
            }
        }

        return collectedNodes;
    }

    const getChildById = (nodes, id) => {
        let array = [];
        let path = [];

        // recursive DFS
        function getNodeById(node, id, parentsPath = []) {
            let result = null;

            if (node.id === id) {
                return node;
            } else if (Array.isArray(node.children)) {
                for (let childNode of node.children) {
                    result = getNodeById(childNode, id, parentsPath);

                    if (!!result) {
                        parentsPath.push(node.id);
                        return result;
                    }
                }

                return result;
            }

            return result;
        }

        const nodeToToggle = getNodeById(nodes, id, path);
        // console.log(path);

        return {childNodesToToggle: getAllChild(nodeToToggle, array), path};
    };

    function getOnChange(checked, nodes) {
        const {childNodesToToggle, path} = getChildById(data, nodes.id);
        console.log("childNodesToChange", {childNodesToToggle, checked});

        let array = checked
            ? [...selected, ...childNodesToToggle]
            : selected
                .filter((value) => !childNodesToToggle.includes(value))
                .filter((value) => !path.includes(value));

        array = array.filter((v, i) => array.indexOf(v) === i);

        setSelected(array);
    }

    const renderTree = (nodes) => {
        const allSelectedChildren = parentMap[
            nodes.id
            ]?.every((childNodeId) => selectedSet.has(childNodeId));
        const checked = selectedSet.has(nodes.id) || allSelectedChildren || false;

        const indeterminate =
            parentMap[nodes.id]?.some((childNodeId) =>
                selectedSet.has(childNodeId)
            ) || false;

        if (allSelectedChildren && !selectedSet.has(nodes.id)) {
            console.log("if allSelectedChildren");

            setSelected([...selected, nodes.id]);
        }

        return (
            <TreeItem
                key={nodes.id}
                nodeId={nodes.id}
                label={
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={checked}
                                indeterminate={!checked && indeterminate}
                                onChange={(event) =>
                                    getOnChange(event.currentTarget.checked, nodes)
                                }
                                onClick={(e) => e.stopPropagation()}
                            />
                        }
                        label={<>{nodes.name}</>}
                        key={nodes.id}
                    />
                }
                icon={!nodes.children && <span style={{ marginRight: '26px' }} />}
            >
                {Array.isArray(nodes.children)
                    ? nodes.children.map((node) => renderTree(node))
                    : null}
            </TreeItem>
        );
    };

    return (
        <TreeView
            aria-label="controlled"
            defaultCollapseIcon={ <span style={{ marginRight: '20px' }}><CollapseIcon/></span> }
            defaultExpanded={["0", "3", "4"]}
            defaultExpandIcon={<span style={{ marginRight: '20px' }}><ExpandIcon/></span>}
        >
            {renderTree(data)}
        </TreeView>
    );
}
