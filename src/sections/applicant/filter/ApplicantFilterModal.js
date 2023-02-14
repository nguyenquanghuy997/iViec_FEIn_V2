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
    // input state
    const [stateFilter, setStateFilter] = useState({
        experience: "",
        education: "",
        startSalary: "",
        endSalary: "",
        startHeight: "",
        endHeight: "",
        startWeight: "",
        endWeight: "",
        gender: "1",
    })
    // select state
    const [selectFilter, setSelectFilter] = useState({
        units: [],
        newsRecruitment: [],
        steps: [],
        sources: [],
        hrs: [],
        createdBy: [],
        group: [],
        career: [],
        experienceNumber: null,
        skills: [],
        workAddress: [],
        married: null,
        currentAddressProvince: null,
        currentAddressDistrict: null,
        hometownProvince: null,
        hometownDistrict: null,
    })

    const [valuesDate, setValuesDate] = useState({});

    const onChangeDate = (key) => (date) => {
        setValuesDate((prev) => ({ ...prev, [key]: date }))
    }

    const handleChangeSelectFilter = (e) => {
        const { target: { value, name } } = e;
        setSelectFilter({
            ...selectFilter,
            [name]: value
        });
    }

    const handleDeleteSelect = (item, name) => {
        const newSelected = selectFilter[name].filter((selectValue) => {
            return item?.id !== selectValue?.id;
        })
        setSelectFilter({
            ...selectFilter,
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
        console.log(selectFilter)
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

                            selectFilter={selectFilter}
                            onChangeSelectFilter={handleChangeSelectFilter}
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

