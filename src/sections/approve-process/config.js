export const ACTION_CONTENT = {
    approveProcessDelete: {
        confirm: 'Xác nhận xóa quy trình phê duyệt',
        text: "Bạn có chắc chắn muốn xóa quy trình phê duyệt",
        color: "#455570",
        textButton: 'Xóa'
    },
    approveProcessLevelDelete: {
        confirm: 'Xác nhận xóa cấp phê duyệt',
        text: "Bạn có chắc chắn muốn xóa cấp phê duyệt này",
        color: "#455570",
        textButton: 'Xóa'
    },
    approveProcessDeActive: {
        confirm: 'Bạn có chắc chắn muốn bật hoạt động cho quy trình phê duyệt ',
        text: "Bật trạng thái hoạt động cho quy trình phê duyệt",
        color: "#1976D2",
        textButton: 'Bật'
    },
    approveProcessActive: {
        confirm: 'Bạn có chắc chắn muốn tắt hoạt động cho quy trình phê duyệt ',
        text: "Tắt trạng thái hoạt động cho quy trình phê duyệt",
        color: "#455570",
        textButton: 'Tắt'
    },
};

export function formatDataPush(approveProcesses) {
    if (!approveProcesses || !approveProcesses.approvalProcessLevels) return "";
    approveProcesses.approvalProcessLevels.forEach((item) => {
        item?.approvalProcessLevelDetails?.forEach((itemChild) => {
            if (itemChild.processLevelDetailType === "1") {
                itemChild.personInChargeIds = [itemChild.personInChargeIds]
            }
        });
    });
    return approveProcesses;
}

export function formatDataGet(approveProcesses) {
    if (!approveProcesses || !approveProcesses.approvalProcessLevels) return "";
    const newList = {
        ...approveProcesses, approvalProcessLevels: approveProcesses.approvalProcessLevels.map((item) => {
            const newItem = {
                ...item, approvalProcessLevelDetails: item?.approvalProcessLevelDetails?.map((itemChild) => {
                    let _itemChild = {...itemChild}
                    if (_itemChild.processLevelDetailType === 1)
                        _itemChild.personInChargeIds = _itemChild.processLevelDetailPersonInCharges[0].personInChargeId
                    else
                        _itemChild.personInChargeIds = _itemChild?.processLevelDetailPersonInCharges?.map((itemChildTwo) => itemChildTwo.personInChargeId);
                    return _itemChild;
                })
            };
            return newItem;
        })
    };
    return newList;
}