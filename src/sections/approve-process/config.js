export const ACTION_CONTENT = {
    approveProcessDelete: {
        confirm: 'Xác nhận xóa quy trình phê duyệt',
        text: "Bạn có chắc chắn muốn xóa quy trình phê duyệt",
        color: "#E53935",
        textButton: 'Xóa'
    },
    approveProcessLevelDelete: {
        confirm: 'Xác nhận xóa cấp phê duyệt',
        text: "Bạn có chắc chắn muốn xóa cấp phê duyệt này",
        color: "#E53935",
        textButton: 'Xóa'
    },
    approveProcessDeActive: {
        confirm: "Bật trạng thái hoạt động cho quy trình phê duyệt",
        text: 'Bạn có chắc chắn muốn bật hoạt động cho quy trình phê duyệt ',
        color: "#1976D2",
        textButton: 'Bật'
    },
    approveProcessActive: {
        confirm: "Tắt trạng thái hoạt động cho quy trình phê duyệt",
        text: 'Bạn có chắc chắn muốn tắt hoạt động cho quy trình phê duyệt ',
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
    let isAutoProcess = false;
    return {
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
            if (item?.autoApprovedTimeInHours) isAutoProcess = true;
            return newItem;
        }), isApprovalAuto: isAutoProcess
    };
}

export function getNumberUser(approvalProcessLevelDetails) {
    let number = 0;
    if(!approvalProcessLevelDetails || approvalProcessLevelDetails?.length === 0) return 0
    approvalProcessLevelDetails.forEach(item => {
        if (item.processLevelDetailType !== 0) {
            if (item.personInChargeIds.length > 0 && item.personInChargeIds)
                number = number + 1
        } else {
            number = number + item.personInChargeIds.length
        }
    });
    return number;
}

export function getNumberUserDetail(approvalProcessLevelDetails) {
    let number = 0;
    if(!approvalProcessLevelDetails || approvalProcessLevelDetails?.length === 0) return 0
    approvalProcessLevelDetails.forEach(item => {
        if (item.processLevelDetailType !== 0) {
            if (item.processLevelDetailPersonInCharges.length > 0 && item.processLevelDetailPersonInCharges)
                number = number + 1
        } else {
            number = number + item.processLevelDetailPersonInCharges.length
        }
    });
    return number;
}