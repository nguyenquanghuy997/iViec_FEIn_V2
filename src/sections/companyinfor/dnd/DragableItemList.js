import {forwardRef, useEffect, useImperativeHandle, useState,} from 'react';
import {styled} from "@mui/material/styles";
import {Box, IconButton} from '@mui/material';
import {RiAddLine, RiDeleteBin6Line,} from 'react-icons/ri';
import {DraggableList} from "@/components/DraggableList";
import {Button} from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";

const DragListStyle = styled(Box)(() => ({
    ".drag-item": {
        padding: "16px",
        borderRadius: "6px",
        background: '#EEE',
        ".form-group .MuiInputBase-root": {
            background: "#fff",
        },
    },
    "ul > li": {
        marginBottom: 24,
    },
    ".drag-icon-btn": {
        marginRight: 12,
    },
}));


const DragableItemsList = forwardRef((
    {
        items: initItems = [],
        addText = 'Thêm',
        renderItemContent,
        headerContent,
        onRemove,
        onAddNew,
        onDragEnd,
    }, ref) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(initItems);
    }, [initItems || []]);

    useImperativeHandle(ref, () => ({
        updateItem,
        removeItem,
    }));

    const removeItem = (item, index) => {
        if (index < 0) {
            return;
        }
        items.splice(index, 1);
        setItems([...items]);

        if (onRemove) {
            onRemove(item, index);
        }
    }

    const updateItem = (item) => {
        let index = items.findIndex(it => it.id === item.id);
        if (index < 0) {
            return;
        }
        items[index] = item;
        setItems([...items]);
    };

    return (
        <DragListStyle>
            <Button
                startIcon={<RiAddLine/>}
                variant="outlined"
                color="primary"
                fullWidth
                height={36}
                sx={{mb: 3}}
                onClick={() => {
                    let newItems = [{id: 'new_' + Date.now()}].concat(items);
                    setItems([...newItems]);
                    if (onAddNew) {
                        onAddNew(newItems.length);
                    }
                }}
            >
                {addText}
            </Button>

            {!!headerContent && (
                headerContent
            )}

            <DraggableList
                data={items}
                renderItem={(item, index) => (
                    <DragItem
                        item={item}
                        index={index}
                        renderItemContent={renderItemContent}
                        onDelete={() => {
                            removeItem(item, index);
                        }}
                    />
                )}
                onDragEnd={(newItems, result) => {
                    setItems(newItems);
                    if (onDragEnd) {
                        onDragEnd(result);
                    }
                }}
            />
        </DragListStyle>
    )
});

export default DragableItemsList;

const DragItem = ({item, index, renderItemContent, onDelete,}) => {
    return (
        <Box className={'drag-item'}>
            <Box display="flex" alignItems="center" mb={'18px'}>
                <Box flex={1}>
                    <div className="drag-icon-btn">
                        <Iconify icon={"fluent:re-order-dots-vertical-16-filled"} width={20} height={20} color="#A2AAB7"/>
                    </div>
                </Box>
                <IconButton onClick={onDelete}>
                    <RiDeleteBin6Line size={16} color="#E53935"/>
                </IconButton>
            </Box>
            <Box>
                {renderItemContent(item, index)}
            </Box>
        </Box>
    )
}