import React from 'react';
import { styled } from '@mui/material/styles';
import { TreeView, TreeItem } from '@mui/lab';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { TConfigTreeview, PreviewProps } from '../models';

const CustomTreeViewReadonly = styled(TreeView)(({ theme }) => ({
  margin: '4px 0',
  maxHeight: '400px',
  overflow: 'auto',
  '& .MuiTreeItem-content': {
    borderRadius: theme.shape.borderRadius,
    padding: '4px',
  },
}));

const renderTree = (nodes: any, checkedValue: any, config: TConfigTreeview) => {
  type TNode = typeof nodes;

  const handleCheckChild = (currentNode: TNode): boolean => {
    if (currentNode.children) {
      for (const child of currentNode.children) {
        if (checkedValue.includes(child[config.outputType])) {
          return true;
        }
        if (child.children && handleCheckChild(child)) {
          return true;
        }
      }
    }
    return false;
  };

  if (nodes.children && !handleCheckChild(nodes)) {
    return null;
  }

  if (!nodes.children && !checkedValue.includes(nodes[config.outputType])) return null;

  return (
    <TreeItem
      key={nodes?.id?.toString() || nodes[config.outputType]?.toString()}
      nodeId={nodes[config.outputType]?.toString() || nodes.id.toString()}
      label={
        <>
          <Typography className="mx-6 text-14" variant="caption">
            {nodes[config.labelField]}
          </Typography>
        </>
      }
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node: TNode) =>
            renderTree({ ...node, parent: nodes }, checkedValue, config)
          )
        : null}
    </TreeItem>
  );
};

const ReadOnlyTreeView: React.FC<PreviewProps> = ({ treeData, config, value }) => {
  type TTreeData = typeof treeData;

  return (
    <CustomTreeViewReadonly
      defaultCollapseIcon={<KeyboardArrowDownIcon />}
      defaultExpandIcon={<KeyboardArrowRightIcon />}
      defaultEndIcon={null}
    >
      {treeData.map((node: TTreeData) => renderTree(node, value, config))}
    </CustomTreeViewReadonly>
  );
};

export default React.memo(ReadOnlyTreeView);
