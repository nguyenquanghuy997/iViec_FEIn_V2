import { useState } from 'react';

const useModal = () => {
    const [selectedList, setSelectedList] = useState([]);
    const [selected, setSelected] = useState({});
    const [isOpen, setIsOpen] = useState(false);

    const onOpen = (data) => {
        setSelected(data);
        setIsOpen(true);
    };

    const onSetSelected = (data) => {
        const findIndex = selectedList?.map(item => item.id).indexOf(data.id);
        if (findIndex !== -1) {
            const nextData = [...selectedList].map(i => i.id === data.id ? { ...data } : { ...i });
            setSelectedList(nextData)
        } else {
            const nextData = [...selectedList, { ...data }];
            setSelectedList(nextData);
        }
    }

    const onClose = () => {
        setSelected(null);
        setIsOpen(false);
    };

    return {
        isOpen,
        selected,
        selectedList,
        onOpen,
        onClose,
        onSetSelected,
    };
};

export default useModal;
