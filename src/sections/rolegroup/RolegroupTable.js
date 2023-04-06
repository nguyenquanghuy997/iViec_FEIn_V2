import { useState, useMemo, useCallback, useEffect } from "react";
import { TYPES } from "./config";
import { getActionName } from "./config";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  FormControlLabel,
  useTheme,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import Checkbox from "@/components/form/Checkbox";

export default function PipelineTable({
  actions: initActions = [],
  setValue,
  control,
}) {
  const { palette } = useTheme();
  const [actionsList, setActionsList] = useState([]);

  const availableActions = useMemo(() => {
    let aryActions = [];
    TYPES.map(type => {
      aryActions = aryActions.concat(type.actions);
    });
    return aryActions;
  }, [TYPES]);

  useEffect(() => {
    if (initActions.length < 1) {
      setActionsList([]);
      return;
    }
    setActionsList(initActions);
  }, [initActions || null]);

  const isCheckAll = useMemo(() => {
    if (
      actionsList.length > 0
      && actionsList.length === availableActions.length
      && !actionsList.some(ac => !availableActions.includes(ac))
    ) {
      return 'checked';
    }
    if (
      actionsList.length !== availableActions.length
      && actionsList.some(ac => availableActions.includes(ac))
    ) {
      return 'indeterminate';
    }
    return false;
  }, [availableActions, actionsList]);

  const handleChangeAction = (action) => {
    let index = actionsList.indexOf(action);
    if (index > -1) {
      actionsList.splice(index, 1);
    } else {
      actionsList.push(action);
    }
    setActionsList([...actionsList]);
    return actionsList;
  }

  const handleChangeActionGroup = (e, aryActions) => {
    let checked = e.target.checked;
    if (checked) {
      aryActions.map(ac => {
        if (!actionsList.includes(ac)) {
          actionsList.push(ac);
        }
      });
    } else {
      aryActions.map(ac => {
        let idx = actionsList.indexOf(ac);
        if (idx > -1) {
          actionsList.splice(idx, 1);
        }
      });
    }
    setActionsList([...actionsList]);
    setValue('identityRoles', [...actionsList]);
  }

  const isCheckActionGroup = useCallback((aryActions) => {
    let isChecked = true;
    let isIndeterminate = false;
    aryActions.map(ac => {
      if (!actionsList.includes(ac)) {
        isChecked = false;
      } else {
        isIndeterminate = true;
      }
    });

    if (isChecked) {
      return 'checked';
    }
    if (isIndeterminate) {
      return 'indeterminate';
    }
    return false;
  }, [actionsList]);

  return (
    <div className="role-actions-table">
      <Table sx={{ width: '100%' }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>
              <span>Nhóm chức năng</span>
            </TableCell>

            <TableCell sx={{ width: '50%' }}>
              <span>Chức năng</span>
            </TableCell>

            <TableCell align="right">
              <Checkbox
                checked={isCheckAll === 'checked'}
                indeterminate={isCheckAll === 'indeterminate'}
                onChange={e => {
                  let checked = e.target.checked;
                  if (checked) {
                    setValue('identityRoles', availableActions);
                    setActionsList(availableActions);
                  } else {
                    setValue('identityRoles', []);
                    setActionsList([]);
                  }
                }}
                sx={{ color: palette.text.placeholder }}
              />
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {TYPES.map((item, index) => {
            let { actions: itemActions = [] } = item;
            return itemActions.map((action, actionIndex) => (
              <TableRow
                key={index + '_' + actionIndex}
                style={{ borderTop: "0.5px solid rgba(145, 158, 171, 0.24)" }}
              >
                {actionIndex === 0 && (
                  <TableCell rowSpan={itemActions.length}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isCheckActionGroup(itemActions) === 'checked'}
                          indeterminate={isCheckActionGroup(itemActions) === 'indeterminate'}
                          onChange={(e) => {
                            handleChangeActionGroup(e, itemActions);
                          }}
                          sx={{ color: palette.text.placeholder }}
                        />
                      }
                      label={item.name}
                    />
                  </TableCell>
                )}

                <TableCell>
                  {getActionName(action)}
                </TableCell>

                <TableCell align="right">
                  <FormControlLabel
                    control={
                      <Controller
                        name={'identityRoles'}
                        control={control}
                        render={({ field }) => {
                          let { onChange } = field;
                          return (
                            <Checkbox
                              checked={actionsList.includes(action)}
                              onChange={() => {
                                onChange(handleChangeAction(action));
                              }}
                            />
                          )
                        }}
                      />
                    }
                    sx={{ mr: 0 }}
                  />
                </TableCell>
              </TableRow>
            ))
          })}
        </TableBody>
      </Table>
    </div>
  );
}
