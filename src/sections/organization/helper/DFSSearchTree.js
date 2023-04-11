import {convertViToEn} from '@/utils/function';
import _ from "lodash";

const dfsSearchTree = (node, term, foundIDS) => {
  // Implement your search functionality
  let isMatching = node.name && convertViToEn(node.name).toLowerCase().indexOf(convertViToEn(term).toLowerCase()) > -1
      || node.code && convertViToEn(node.code).toLowerCase().indexOf(convertViToEn(term).toLowerCase()) > -1
      || node.label && convertViToEn(node.label).toLowerCase().indexOf(convertViToEn(term).toLowerCase()) > -1;

  if (Array.isArray(node.children)) {
    node.children.forEach((child) => {
      const hasMatchingChild = dfsSearchTree(child, term, foundIDS);
      isMatching = isMatching || hasMatchingChild;
    });
  }

  // We will add any item if it matches our search term or if it has a children that matches our term
  if (isMatching && node.id) {
    foundIDS.push(node.id);
  }
  return isMatching;
}

export const removeEmpty = (obj, key) => {
  return _.transform(obj, (r, v, k) => {
    if (k === key && _.isEmpty(v)) return;
    r[k] = _.isObject(v) ? removeEmpty(v, key) : v;
  });
}

const filter = (data, matchedIDS) => {
  const result = data
      .filter((item) => matchedIDS.indexOf(item.id) > -1)
      .map((item) => ({
        ...item,
        children: item.children ? filter(item.children, matchedIDS) : [],
      }));
  return removeEmpty(result, 'children')
}

export const searchTree = (dataTree, term) => {
  // We wrap data in an object to match the node shape
  const dataNode = {
    children: dataTree,
  };

  const matchedIDS = [];
  // find all items IDs that matches our search (or their children does)
  dfsSearchTree(dataNode, term, matchedIDS);

  // filter the original data so that only matching items (and their fathers if they have) are returned
  return filter(dataTree, matchedIDS);
}

// Helper functions for filtering

const isLeafNode = node => {
  return !node.children || !node.children.length;
};

const getNodeValue = node => {
  return node
};

export const filterBy = (tree, query) => {
  return tree.filter(node => {
    const value = getNodeValue(node);
    const isLeaf = isLeafNode(node);
    let valueNameToEng = convertViToEn(value?.name)?.toLowerCase();
    let valueCodeToEng = convertViToEn(value?.name)?.toLowerCase();
    let valueQueryToEng = convertViToEn(query)?.toLowerCase();
    let isMatching = valueNameToEng.indexOf(valueQueryToEng) > -1 || valueCodeToEng.indexOf(valueQueryToEng) > -1;

    if (isMatching) return true;
    if (isLeaf) return false;

    const subtree = filterBy(node.children, query);
    node.children = subtree;
    return Boolean(subtree.length);
  })
}