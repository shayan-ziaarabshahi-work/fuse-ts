import React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import _ from 'lodash';
import Spin from 'app/shared-components/global/Spin';
import { CheapPreviewProps } from '../models';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const Cheap: React.FC<CheapPreviewProps> = ({
  treeData,
  config,
  value,
  onChange,
  onRemoveItemFromCheap,
}) => {
  type treeDataType = typeof treeData;
  const [splitDataRender, setSplitDataRender] = React.useState<treeDataType>([]);
  const [isPending, startTransition] = React.useTransition();

  const handleDelete = (valueForDelete: treeDataType) => () => {
    const newResult = value.filter(
      (val: treeDataType) => val !== valueForDelete[config.outputType]
    );
    if (onRemoveItemFromCheap) onRemoveItemFromCheap(valueForDelete);
    onChange(newResult);
  };

  React.useEffect(() => {
    let finalState: treeDataType[] = [];
    const splitData = (currentNode: treeDataType) => {
      currentNode.forEach((node: treeDataType) => {
        if (!node.children && value.includes(node[config.outputType])) {
          let result: treeDataType = { id: '', label: '', parent: {} };
          result = { ...result, id: node[config.outputType], label: node[config.labelField] };

          if (node.parent) {
            const handleParent = (parent: treeDataType) => {
              result = { ...result, parent: { ...result.parent, parent } };
            };
            handleParent(node.parent);
          }
          finalState = [...finalState, result];
        }
        if (node.children) {
          splitData(node.children.map((n: treeDataType) => ({ ...n, parent: node })));
        }
      });
      startTransition(() => {
        setSplitDataRender(finalState);
      });
    };
    splitData(treeData);
  }, [treeData, config, value]);

  const RenderLabel = React.memo(({ data }: treeDataType) => {
    const [parents, setParents] = React.useState<treeDataType>([]);

    React.useEffect(() => {
      const setParent = (current: treeDataType) => {
        setParents((prevParent: treeDataType) => [...prevParent, current[config.labelField]]);
        if (current.parent) {
          setParent(current.parent);
        }
      };
      setParent(data);
    }, [data]);

    return (
      <>
        {_.filter(parents, (v) => v !== undefined)
          ?.reverse()
          ?.map((parent: treeDataType, index: number) => {
            return (
              <React.Fragment key={index}>
                {index !== 0 ? ' / ' : null}
                {parent}
              </React.Fragment>
            );
          })}
      </>
    );
  });

  return (
    <Spin spinning={isPending}>
      {splitDataRender.length ? (
        <Paper
          className="flex justify-center flex-wrap list-none p-7 m-0 mt-5 mb-10 mx-0"
          component="ul"
        >
          {splitDataRender.map((data: treeDataType) => (
            <ListItem key={data?.id || data}>
              <Chip label={<RenderLabel data={data} />} onDelete={handleDelete(data)} />
            </ListItem>
          ))}
        </Paper>
      ) : null}
    </Spin>
  );
};

export default React.memo(Cheap);
