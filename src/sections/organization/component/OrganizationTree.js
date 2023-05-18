import React from "react";
import { CheckboxIconChecked, CheckboxIconDefault, CheckboxIconIndeterminate, } from "@/assets/CheckboxIcon";
import { ButtonTreeStyle, CheckboxStyle, TreeItemStyle, TreeViewStyle } from "@/sections/organization/style";
import Iconify from "@/components/Iconify";
import { Box, Divider, IconButton, Link } from "@mui/material";
import { AddIcon, DeleteIcon, EditIcon, ForwardIcon, PreviewIcon } from "@/assets/ActionIcon";
import { PATH_DASHBOARD } from "@/routes/paths";
import NextLink from "next/link";
import useRole from "@/hooks/useRole";
import { useMemo } from "react";
import { PERMISSIONS } from "@/config";
import MuiButton from "@/components/BaseComponents/MuiButton";
import {useTheme} from "@mui/material/styles";

export default function OrganizationTree({ selected, setSelected, treeData, dataRoot, data, onOpenForm, onGetParentNode, onOpenPreview, setShowDelete, setActionType }) {

    const selectedSet = React.useMemo(() => new Set(selected), [selected]);
    const theme = useTheme();
    const { canAccess } = useRole();

    const canViewUnit = useMemo(() => canAccess(PERMISSIONS.VIEW_UNIT), []);
    const canEditUnit = useMemo(() => canAccess(PERMISSIONS.CRUD_UNIT), []);

    const parentMap = React.useMemo(() => {
        return data.map(item => goThroughAllNodes(item));
    }, [data]);

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
    function getAllChild(childNode, collectedNodes = []) {
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
            if (node.id === id) return node;
            else if (Array.isArray(node.children)) {
                for (let childNode of node.children) {
                    result = getNodeById(childNode, id, parentsPath);
                    if (result) {
                        parentsPath.push(node.id);
                        return result;
                    }
                }
                return result;
            }
            return result;
        }
        const nodeToToggle = getNodeById(nodes, id, path);
        return { childNodesToToggle: getAllChild(nodeToToggle, array), path };
    };

    const findParentNodeById = (tree, id) => {
        let result = null;
        if (tree.id === id) {
            result = tree;
        } else if (tree.children) {
            tree.children.some((node) => {
                result = findParentNodeById(node, id);
                return result;
            });
        }
        return result;
    }

    function getOnChange(checked, nodes) {
        const dataRootNode = data.find((item) => findParentNodeById(item, nodes.id) !== null);
        const { childNodesToToggle, path } = getChildById(dataRootNode, nodes.id);
        let array = checked
            ? [...selected, ...childNodesToToggle]
            : selected
                .filter((value) => !childNodesToToggle.includes(value))
                .filter((value) => !path.includes(value));
        array = array.filter((v, i) => array.indexOf(v) === i);
        setSelected(array);
    }

    const handleOpenFormWithCurrentNode = (node) => {
        const parentNode = findParentNodeById(node, node.id)
        onOpenForm();
        onGetParentNode(parentNode);
    }

    const handleOpenPreview = (node) => {
        const parentNode = findParentNodeById(node, node.id)
        onOpenPreview();
        onGetParentNode(parentNode);
    }

    const handleShowDelete = (node) => {
        const parentNode = findParentNodeById(node, node.id)
        setShowDelete(true);
        onGetParentNode(parentNode);
    }

    const renderTree = (nodes) => {
        const allSelectedChildren = parentMap.find(item => item[nodes.id])?.[nodes.id]?.every((childNodeId) => selectedSet.has(childNodeId));
        const checked = selectedSet.has(nodes.id) || allSelectedChildren || false;
        const indeterminate = parentMap.find(item => item[nodes.id])?.[nodes.id]?.some((childNodeId) => selectedSet.has(childNodeId)) || false;
        if (allSelectedChildren && !selectedSet.has(nodes.id)) {
            setSelected([...selected, nodes.id]);
        }
        return (
            <div key={nodes.id}>
                <TreeItemStyle
                    key={nodes.id}
                    nodeId={nodes.id}
                    className={`tree-item ${nodes.isRoot ? 'tree-item-root-node' : !nodes.children ? 'tree-item-no-children' : ''}`}
                    label={
                        <div className={`tree-item-label ${nodes.isRoot ? 'tree-item-root-label' : ''}`}>
                            <div className="tree-item-label-text">
                                <CheckboxStyle
                                    icon={<CheckboxIconDefault />}
                                    checkedIcon={<CheckboxIconChecked />} indeterminateIcon={<CheckboxIconIndeterminate />}
                                    checked={checked}
                                    indeterminate={!checked && indeterminate}
                                    onChange={(event) => getOnChange(event.currentTarget.checked, nodes)}
                                    onClick={(e) => e.stopPropagation()}
                                />
                                <span className='tree-label-title'>{nodes.name}</span>
                            </div>
                            <div className={`tree-item-label-actions ${checked ? 'tree-item-label-actions-checked' : ''}`}>
                                {
                                    canEditUnit && <IconButton
                                        size='small'
                                        sx={{ color: theme.palette.common.blue700 }}
                                        onClick={() => {
                                            handleOpenFormWithCurrentNode(nodes);
                                            setActionType(0)
                                        }}
                                    ><Iconify icon={"material-symbols:add"} /></IconButton>
                                }

                                <Divider orientation="vertical" flexItem sx={{ borderWidth: '1.5px', height: '18px', alignSelf: 'auto' }} variant="middle" />

                                {
                                    (canEditUnit || canViewUnit) && <IconButton
                                        size='small'
                                        sx={{ color: theme.palette.common.blue700, mx: 0.5 }}
                                        onClick={() => handleOpenPreview(nodes)}
                                    ><PreviewIcon /></IconButton>
                                }
                                <Divider orientation="vertical" flexItem sx={{ borderWidth: '1.5px', height: '18px', alignSelf: 'auto' }} variant="middle" />
                                {
                                    canEditUnit && <IconButton
                                        size='small'
                                        sx={{ color: theme.palette.common.blue700, mx: 0.5 }}
                                        onClick={() => {
                                            handleOpenFormWithCurrentNode(nodes);
                                            setActionType(1)
                                        }}
                                    ><EditIcon /></IconButton>
                                }
                                <Divider orientation="vertical" flexItem sx={{ borderWidth: '1.5px', height: '18px', alignSelf: 'auto' }} variant="middle" />
                                {
                                    canEditUnit && <IconButton
                                        size='small'
                                        sx={{ color: theme.palette.common.blue700, mx: 0.5 }}
                                        onClick={() => {
                                            handleShowDelete(nodes)
                                        }}
                                    ><DeleteIcon /></IconButton>
                                }
                                <Divider orientation="vertical" flexItem sx={{ borderWidth: '1.5px', height: '18px', alignSelf: 'auto' }} variant="middle" />
                                {
                                    (canEditUnit || canViewUnit) && <NextLink href={PATH_DASHBOARD.organization.view(nodes.id)} passHref>
                                        <Link>
                                            <IconButton size='small' sx={{ color: theme.palette.common.blue700, mx: 0.5 }}>
                                                <ForwardIcon />
                                            </IconButton>
                                        </Link>
                                    </NextLink>
                                }
                            </div>
                        </div>
                    }
                    collapseIcon={nodes.children && <Iconify icon="material-symbols:arrow-drop-down" sx={{ height: 24, width: 24 }} />}
                    expandIcon={nodes.children && <Iconify icon="material-symbols:arrow-right" sx={{ height: 24, width: 24 }} />}
                >
                    {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
                    {Array.isArray(nodes.children) && nodes.children.length > 0 && canEditUnit &&
                        <ButtonTreeStyle
                            onClick={() => {
                                handleOpenFormWithCurrentNode(nodes);
                                setActionType(0)
                            }}
                            className="tree-add-button"
                            startIcon={<Iconify icon="material-symbols:add" sx={{ height: 20, width: 20 }} />}>
                            Thêm đơn vị
                        </ButtonTreeStyle>
                    }
                </TreeItemStyle>
            </div>
        );
    };

    const [expanded, setExpanded] = React.useState([]);
    const handleToggle = (event, nodeIds) => {
        if (event.target.closest('.tree-item-label-text')) {
            setExpanded(nodeIds);
        }
    };

    // const searchInputRef = useRef(null);
    // const [valueSearch, setValueSearch] = useState('');

    // const [dataTree] = useState(data[0]?.children)

    // useEffect(() => {
    //     setDataTree(data[0]?.children)
    // }, [data])

    // const treeData = useMemo(() => {
    //     const loopFilterTree = (tree = [], query = '') => {
    //         return tree.filter(node => {
    //             const isLeaf = !node.children || !node.children.length;
    //             let valueNameToEng = convertViToEn(node?.name)?.toLowerCase();
    //             let valueCodeToEng = convertViToEn(node?.code)?.toLowerCase();
    //             let valueQueryToEng = convertViToEn(query)?.toLowerCase();
    //             let isMatching = valueNameToEng?.indexOf(valueQueryToEng) > -1 || valueCodeToEng?.indexOf(valueQueryToEng) > -1;
    //
    //             if (isMatching) return true;
    //             if (isLeaf) return false;
    //
    //             const subtree = filterBy(node.children, query);
    //             return Boolean(subtree.length);
    //         })
    //     }
    //     return loopFilterTree(dataTree, valueSearch);
    // }, [valueSearch])

    // const onChangeSearch = (event) => {
    //     const { value } = event.target;
    //     setSelected([]);
    //     setValueSearch(value);
    // }

    return (
        <Box>
            {/*  Search form  */}
            {/*<InputFilter*/}
            {/*    name="search"*/}
            {/*    placeholder="Tìm kiếm theo tên đơn vị hoặc mã đơn vị"*/}
            {/*    sx={{width: '100%', height: '44px', backgroundColor: '#F2F4F5', marginBottom: 3}}*/}
            {/*    ref={searchInputRef}*/}
            {/*    onChange={onChangeSearch}*/}
            {/*    value={valueSearch}*/}
            {/*    InputProps={{*/}
            {/*        startAdornment: (*/}
            {/*            <InputAdornment position='start' sx={{ml: 1.5}}>*/}
            {/*                <Iconify icon={'eva:search-fill'} sx={{color: 'text.disabled', width: 20, height: 20}}/>*/}
            {/*            </InputAdornment>*/}
            {/*        ),*/}
            {/*    }}*/}
            {/*/>*/}
            <TreeViewStyle
                aria-label="controlled"
                defaultCollapseIcon={null}
                defaultExpandIcon={null}
                onNodeToggle={handleToggle}
                expanded={expanded}
            >

                {treeData && treeData.length > 0 && treeData?.map(item => renderTree({ ...item, isRoot: true }))}
                {
                    treeData && treeData.length > 0 && canEditUnit && <ButtonTreeStyle
                        onClick={() => {
                            handleOpenFormWithCurrentNode(dataRoot);
                            setActionType(0)
                        }}
                        className="tree-add-button tree-add-button-root-node"
                        startIcon={<Iconify icon="material-symbols:add" sx={{ height: 20, width: 20 }} />}
                    >
                        Thêm đơn vị
                    </ButtonTreeStyle>
                }

                {
                    (!treeData || treeData.length == 0) && <div style={{ margin: "40px 0", minHeight: "250px", textAlign: 'center' }}>
                        <img
                            src={`/assets/icons/candidate/notfound.png`}
                            style={{ margin: "0 auto" }}
                        />
                        <p>Hiện chưa có đơn vị nào trực thuộc công ty của bạn</p>
                        {
                            canEditUnit && <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
                                <MuiButton
                                    title={"Thêm đơn vị"}
                                    onClick={() => {
                                        handleOpenFormWithCurrentNode(dataRoot);
                                        setActionType(0)
                                    }}
                                    startIcon={<AddIcon />}
                                    sx={{ fontWeight: 550 }}
                                />
                            </div>
                        }
                    </div>
                }


            </TreeViewStyle>
        </Box>
    );
}
