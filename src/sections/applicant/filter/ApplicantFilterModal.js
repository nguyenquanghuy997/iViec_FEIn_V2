import Scrollbar from "@/components/Scrollbar";
import {Divider, Drawer, IconButton, Stack, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {memo, useState} from "react";
import Iconify from "@/components/Iconify";
import {ButtonDS} from "@/components/DesignSystem";
import DynamicFilterForm from "@/sections/dynamic-filter/DynamicFilterForm";
import {fNumber} from "@/utils/formatNumber";

ApplicantFilterModal.propTypes = {
    isOpen: PropTypes.bool, onClose: PropTypes.func, onSubmit: PropTypes.func,
};

function ApplicantFilterModal({ columns, isOpen, onClose }) {
    const [,setIsScrolled] = useState(false);

    const [stateFilter, setStateFilter] = useState({
        experience: "",
        startHeight: "",
        endHeight: "",
        startSalary: "",
        endSalary: "",
        gender: "1",
    })
    const [selectMultiFilter, setSelectMultiFilter] = useState({
        units: [],
        newsRecruiment: [],
        experienceNumber: {},
    })

    const [valuesDate, setValuesDate] = useState({});

    const onChangeDate = (key) => (date) => {
        setValuesDate((prev) => ({ ...prev, [key]: date }))
    }

    const handleChangeMultiSelectFilter = (e) => {
        const { target: { value, name } } = e;
        setSelectMultiFilter({
            ...selectMultiFilter,
            [name]: value
        });
    }

    const handleDeleteSelect = (item, name) => {
        const newSelected = selectMultiFilter[name].filter((selectValue) => {
            return item?.id !== selectValue?.id;
        })
        setSelectMultiFilter({
            ...selectMultiFilter,
            [name]: newSelected
        });
    }

    const handleChange = (e) => {
        const { name, value } = e?.target;
        setStateFilter({
            ...stateFilter,
            [name]: name === 'startSalary' || name === 'endSalary' ? fNumber(value) : value
        })
    }

    const handleScroll = (e) => {
        setIsScrolled(e.target.scrollTop > 10);
    };

    const handleSubmitFilter = () => {
        console.log(valuesDate)
        console.log(stateFilter)
        // console.log(selectSingleFilter)
        console.log(selectMultiFilter)
    }

    return (
        <Drawer
            open={isOpen}
            anchor="right"
            PaperProps={{ sx: {width: {xs: 1, sm: 560, md: 384}}, onScroll: handleScroll,}}
        >
            <Stack flexDirection='row' sx={{px: 2, py: 2, alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography variant="body1" sx={{fontSize: '20px', fontWeight: 600, color: "#455570"}}>
                    Bộ lọc
                </Typography>
                <IconButton size="small" onClick={onClose}>
                    <Iconify icon="ic:baseline-close"/>
                </IconButton>
            </Stack>
            <Scrollbar sx={{zIndex: 9999, "& label": {zIndex: 0}}}>
                <Divider/>
                <Stack sx={{py: 2}}>
                    <Typography variant="body2"
                                sx={{px: 2, fontSize: '13px', fontWeight: 400, fontStyle: 'italic', color: "#8A94A5"}}>
                        Để thêm/bớt bộ lọc, vui lòng chọn cài đặt quản lý cột ở bảng dữ liệu
                    </Typography>
                    <Stack sx={{pb: 3, px: 2}}>
                        <DynamicFilterForm
                            columns={columns}
                            valuesDate={valuesDate}
                            onChangeDate={onChangeDate}

                            handleChange={handleChange}
                            stateFilter={stateFilter}

                            selectMultiFilter={selectMultiFilter}
                            onChangeMultiSelectFilter={handleChangeMultiSelectFilter}
                            onDeleteSelect={handleDeleteSelect}
                        />
                    </Stack>
                </Stack>
            </Scrollbar>
            <Divider/>
            <Stack flexDirection='row' sx={{ px: 2, py: 2, alignItems: 'center', justifyContent: 'space-between' }}>
                <Stack flexDirection="row">
                    <ButtonDS
                        tittle="Áp dụng"
                        onClick={handleSubmitFilter}
                    />
                    <ButtonDS
                        tittle="Hủy"
                        onClick={onClose}
                        sx={{
                            marginLeft: 1,
                            backgroundColor: "white",
                            boxShadow: 'none',
                            color: "#455570",
                            "&:hover": {
                                backgroundColor: "white",
                                boxShadow: 'none',
                                color: "#455570",
                            }
                        }}
                    />
                </Stack>
            </Stack>
        </Drawer>
    );
}

export default memo(ApplicantFilterModal);

