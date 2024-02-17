import { useState, useCallback, memo, useEffect, FC, forwardRef, ChangeEvent } from 'react';
import { TreeView, TreeItem } from '@mui/lab';
import { Checkbox, Box, Button, TextField } from '@mui/material';
import _ from 'lodash';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useFuseDispatch } from 'src/app/utils/hooks/useStore';
import { MdSearchOff } from 'react-icons/md';
import { closeModal } from 'app/store/modalSlice';
import Highlighter from '../hilighter';
import { TreeviewCheckBoxProps } from '../models';

const TreeViewCheckbox: FC<TreeviewCheckBoxProps> = forwardRef(
  ({ treeData, config, confirmButtonText, searchToolbar, value, onChange, ...props }, ref) => {
    type TTreeviewData = typeof treeData;

    const [expanded, setExpanded] = useState<string[]>([]);
    const [checked, setChecked] = useState(value || []);
    const [checkedChildren, setCheckedChildren] = useState([]);
    const [searchFieldValue, setSearchFieldValue] = useState('');
    const [canChanChangeExpanded, setCanChanChangeExpanded] = useState(true);
    const [prevExpanded, setPrevExpanded] = useState<any>([]);
    const dispatch = useFuseDispatch();

    const handleSetValue = () => {
      switch (config.outputValue) {
        case 'childAndParent':
          onChange(checked);
          break;
        default:
          onChange(checkedChildren);
      }

      dispatch(closeModal());
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
      const searchText = event.target.value;
      setSearchFieldValue(searchText);
      if (!prevExpanded.length) setPrevExpanded(expanded);
    };

    useEffect(() => {
      if (!searchFieldValue.trim()) {
        setExpanded(prevExpanded);
        setPrevExpanded([]);
      }
    }, [searchFieldValue]);

    const handleToggle = (event: ChangeEvent<HTMLInputElement>, nodeIds: string[]) => {
      setCanChanChangeExpanded(false);
      setExpanded(nodeIds);
    };

    const checkAllChild = useCallback(
      (children: TTreeviewData) => {
        children.forEach((child: TTreeviewData) => {
          if (!checked.includes(child[config.outputType])) {
            setChecked((prevNodes: TTreeviewData) => [...prevNodes, child[config.outputType]]);
          }
          if (child.children) {
            checkAllChild(child.children);
          }
        });
      },
      [config.outputType, checked]
    );

    const isSubset = (array1: any, array2: any) => {
      return array2.every((element: any) => array1.includes(element));
    };

    const unCheckedAllChild = useCallback(
      (children: TTreeviewData) => {
        children.forEach((child: TTreeviewData) => {
          setChecked((prevNodes: TTreeviewData) => {
            return prevNodes.filter((nodes: TTreeviewData) => {
              return nodes !== child[config.outputType];
            });
          });
          if (child.children) {
            unCheckedAllChild(child.children);
          }
        });
      },
      [config.outputType]
    );

    const handleUncheckedParent = useCallback(
      (parent: TTreeviewData) => {
        parent.children.forEach((child: TTreeviewData) => {
          if (checked.some((ids: string[] | number[]) => ids === child[config.outputType])) {
            setChecked((prevNodes: string[] | number[]) => {
              // @ts-ignore
              return prevNodes.filter((nodes: TTreeviewData) => {
                return nodes !== parent[config.outputType];
              });
            });

            if (parent.parent) {
              handleUncheckedParent(parent.parent);
            }
          }
        });
      },
      [config.outputType, checked]
    );

    const handleCheck = useCallback(
      (
        event: ChangeEvent<HTMLInputElement>,
        nodeIds: string,
        nodeChildren: TTreeviewData,
        parentNode: TTreeviewData
      ) => {
        const newChecked = event.target.checked;

        if (newChecked && !nodeChildren) {
          if (checked.includes(nodeIds)) return;
          setChecked((prevNodes: number[] | string[]) => [...prevNodes, nodeIds]);
        }

        if (!newChecked && !nodeChildren)
          setChecked((prevNodes: TTreeviewData) => {
            return prevNodes.filter((nodes: TTreeviewData) => nodes !== nodeIds);
          });

        if (!newChecked && parentNode) {
          const unCheckedParents = (node: TTreeviewData) => {
            setChecked((prevNodes: TTreeviewData) => {
              return prevNodes.filter((nodes: TTreeviewData) => {
                return nodes !== node[config.outputType];
              });
            });

            if (node.parent) {
              unCheckedParents(node.parent);
            }
          };
          unCheckedParents(parentNode);
        }

        if (newChecked && nodeChildren) {
          const handleAllChildCheck = (children: TTreeviewData) => {
            children.forEach((child: TTreeviewData) => {
              const isExist = checked.includes(child[config.outputType]);
              if (!isExist) {
                setChecked((prevNodes: string[] | number[]) => [
                  ...prevNodes,
                  child[config.outputType],
                ]);
              }
              if (child.children) handleAllChildCheck(child.children);
            });
          };
          handleAllChildCheck(nodeChildren);
        }

        if (!newChecked && nodeChildren) {
          setChecked((prevNodes: string[] | number[]) => {
            // @ts-ignore
            return prevNodes.filter((nodes: TTreeviewData) => nodes !== nodeIds);
          });
          const handleAllChildCheck = (children: TTreeviewData) => {
            children.forEach((child: TTreeviewData) => {
              setChecked((prevNodes: TTreeviewData) =>
                prevNodes.filter((nodes: TTreeviewData) => nodes !== child[config.outputType])
              );
              if (child.children) handleAllChildCheck(child.children);
            });
          };
          handleAllChildCheck(nodeChildren);
        }
      },
      [config.outputType, checked]
    );

    const renderTreeItems = useCallback(
      (nodes: TTreeviewData, parent: TTreeviewData) => {
        return nodes.map((node: TTreeviewData) => {
          const checkChild = (currentNode: TTreeviewData) => {
            function checkParentNodes(Cnode: TTreeviewData, CsearchFieldValue: string): boolean {
              if (!Cnode.parent) {
                return false;
              }

              if (
                Cnode.parent[config.labelField]
                  .toString()
                  .toLowerCase()
                  .includes(CsearchFieldValue.toLowerCase())
              ) {
                return true;
              }

              return checkParentNodes(Cnode.parent, CsearchFieldValue);
            }

            if (currentNode.parent) {
              const isExistParent = expanded.includes(
                currentNode.parent?.[config.outputType]?.toString()
              );

              if (!isExistParent && !!searchFieldValue.trim()) {
                setExpanded((prev) => [...prev, currentNode.parent[config.outputType].toString()]);
              }

              if (checkParentNodes(currentNode.parent, searchFieldValue)) {
                return true;
              }
            }

            function checkChildNodes(currentNodes: TTreeviewData, CsearchFieldValue: string) {
              const childNode = currentNodes.find((Cnode: TTreeviewData) =>
                Cnode[config.labelField]
                  .toString()
                  .toLowerCase()
                  .includes(searchFieldValue.toLowerCase())
              );

              if (childNode) {
                return true;
              }

              const grandChildNode = currentNodes.find(
                (Cnode: TTreeviewData) =>
                  Cnode.children && checkChildNodes(Cnode.children, CsearchFieldValue)
              );

              if (grandChildNode) {
                return true;
              }

              return false;
            }

            if (currentNode.children && checkChildNodes(currentNode.children, searchFieldValue)) {
              return true;
            }

            if (
              currentNode[config.labelField]
                .toString()
                .toLowerCase()
                .includes(searchFieldValue.toLowerCase())
            ) {
              return true;
            }

            if (currentNode.parent) {
              const checkParents = (nodeParent: TTreeviewData) => {
                if (
                  nodeParent[config.labelField]
                    .toString()
                    .toLowerCase()
                    .includes(searchFieldValue.toLowerCase())
                ) {
                  if (nodeParent.parent) {
                    checkParents(nodeParent.parent);
                    return true;
                  }
                  return true;
                }
                return false;
              };
              return checkParents(currentNode.parent);
            }

            return false;
          };

          if (!checkChild({ ...node, parent })) return null;

          const isNodeExpanded = expanded.includes(node[config.outputType]);
          const isNodeChecked = checked.includes(node[config.outputType]);

          const handleNodeChecked = ({ parentNode }: TTreeviewData) => {
            if (isNodeChecked && parentNode.children) {
              const handleAllChildCheck = (children: TTreeviewData) => {
                children.forEach((child: TTreeviewData) => {
                  if (checked.includes(child[config.outputType])) return;
                  setChecked((prevNodes: number[] | string[]) => {
                    return [...prevNodes, child[config.outputType]];
                  });
                  if (child.children) handleAllChildCheck(child.children);
                });
              };
              handleAllChildCheck(parentNode.children);
            }

            if (!node.children) {
              const isExist = checkedChildren.includes(node[config.outputType] as never);
              if (!isExist && isNodeChecked) {
                // @ts-ignore
                setCheckedChildren((prevChildChecked) => [
                  ...prevChildChecked,
                  node[config.outputType],
                ]);
              }
              if (isExist && !isNodeChecked) {
                setCheckedChildren((prevChildChecked) => {
                  return prevChildChecked.filter((chckedNodes) => {
                    return chckedNodes !== node[config.outputType];
                  });
                });
              }
            }

            if (isNodeChecked) return true;
            const allChild = parentNode?.children?.map((child: TTreeviewData) => {
              return child[config.outputType];
            });

            if (parentNode && parentNode.children) {
              if (allChild && isSubset(checked, allChild)) {
                const isExist = checked.includes(parentNode[config.outputType]);
                if (!isExist) {
                  setChecked((prevNodes: TTreeviewData) => {
                    return [...prevNodes, parentNode[config.outputType]];
                  });
                }
              }
            }

            return false;
          };

          const handleIndeterminate = ({ parentNode }: TTreeviewData) => {
            if (checked.includes(parentNode[config.outputType])) return false;

            const handleIndeterminateParents = (parents: TTreeviewData) => {
              if (parents.children) {
                return parents.children.some((child: TTreeviewData) => {
                  if (checked.includes(child[config.outputType])) {
                    const isExist = expanded.includes(parentNode[config.outputType]?.toString());
                    if (!isExist && canChanChangeExpanded) {
                      setExpanded((prev) => [...prev, parentNode[config.outputType].toString()]);
                    }

                    return true;
                  }
                  return handleIndeterminateParents(child);
                });
              }

              return false;
            };

            return handleIndeterminateParents(parentNode);
          };

          return (
            <TreeItem
              key={node.id || node[config.outputType]}
              nodeId={node[config.outputType]?.toString() || node?.id?.toString()}
              label={
                <FormControlLabel
                  onClick={(e) => e.stopPropagation()}
                  control={
                    <Checkbox
                      checked={handleNodeChecked({ parentNode: node }) || false}
                      onChange={(e) =>
                        handleCheck(e, node[config.outputType], node?.children, parent)
                      }
                      indeterminate={handleIndeterminate({
                        parentNode: { ...node, parent },
                      })}
                      onClick={(e) => e.stopPropagation()}
                    />
                  }
                  label={
                    <Highlighter
                      search={searchFieldValue.toString()}
                      text={node[config.labelField].toString()}
                    />
                  }
                />
              }
              TransitionProps={{ unmountOnExit: true }}
              // @ts-ignore
              expanded={isNodeExpanded.toString()}
            >
              {Array.isArray(node.children)
                ? renderTreeItems(node.children, { ...node, parent })
                : null}
            </TreeItem>
          );
        });
      },
      [
        config.outputType,
        checked,
        checkedChildren,
        config.labelField,
        expanded,
        handleCheck,
        searchFieldValue,
        canChanChangeExpanded,
      ]
    );

    const renderedItems = renderTreeItems(treeData, null);
    const hasItems = _.filter(renderedItems, (v) => v !== null).length;

    useEffect(() => {
      if (treeData && !treeData.length) return;
      setExpanded((prev) => [
        ...prev,
        treeData[0].id.toString() || null,
        ...checked.map((check: any) => check.toString()),
      ]);
    }, [treeData, checked]);

    return (
      <Box className="flex flex-col justify-between min-h-[400px]">
        <Box>
          {searchToolbar ? (
            <TextField
              fullWidth
              label="جستجو"
              className="mb-4 mt-20"
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearchChange(e)}
              size="small"
            />
          ) : null}

          {hasItems ? (
            <TreeView
              defaultCollapseIcon={<KeyboardArrowDownIcon />}
              defaultExpandIcon={<KeyboardArrowRightIcon />}
              expanded={expanded}
              onNodeToggle={handleToggle as () => void}
              className="my-10"
              ref={ref}
              {...props}
            >
              {renderedItems}
            </TreeView>
          ) : (
            <Box className="flex items-center justify-center grow min-h-[200px] text-16 flex-col gap-10">
              نتیجه ای یافت نشد..
              <MdSearchOff className="text-40" />
            </Box>
          )}
        </Box>
        <Box className="flex gap-10 flex-row-reverse">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="mt-5 bottom-6 min-w-[100px]"
            onClick={() => handleSetValue()}
          >
            {confirmButtonText}
          </Button>
          <Button
            variant="contained"
            color="error"
            className="mt-5 bottom-6 min-w-[100px]"
            onClick={() => dispatch(closeModal())}
          >
            انصراف
          </Button>
        </Box>
      </Box>
    );
  }
);

export default memo(TreeViewCheckbox);
