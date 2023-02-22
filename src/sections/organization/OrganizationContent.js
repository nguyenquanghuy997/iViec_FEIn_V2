import React from 'react';
import {Box, Stack, Typography} from "@mui/material";
import {Logo} from "@/sections/organization/Logo";
import {FormProvider, RHFSearchTextField} from "@/components/hook-form";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Tree} from "antd";
import Iconify from "@/components/Iconify";

const defaultValues = {
    search: "",
};

const treeData = [
    {
        title: (
            <span style={{fontSize: '14px', color: '#455570', fontWeight: 600, height: '50px'}}>FPT Head Office</span>),
        key: '0-0',
        children: [
            {
                title: (<span style={{fontSize: '14px', color: '#455570', fontWeight: 600}}>FPT Head Office</span>),
                key: '0-0-0',
                children: [
                    {
                        title: (
                            <span style={{fontSize: '14px', color: '#455570', fontWeight: 600}}>FPT Head Office</span>),
                        key: '0-0-0-0'
                    },
                    {
                        title: (
                            <span style={{fontSize: '14px', color: '#455570', fontWeight: 600}}>FPT Head Office</span>),
                        key: '0-0-0-1'
                    },
                    {
                        title: (
                            <span style={{fontSize: '14px', color: '#455570', fontWeight: 600}}>FPT Head Office</span>),
                        key: '0-0-0-2'
                    },
                ],
            },
            {
                title: (<span style={{fontSize: '14px', color: '#455570', fontWeight: 600}}>FPT Head Office</span>),
                key: '0-0-1',
                children: [
                    {
                        title: (
                            <span style={{fontSize: '14px', color: '#455570', fontWeight: 600}}>FPT Head Office</span>),
                        key: '0-0-1-0'
                    },
                    {
                        title: (
                            <span style={{fontSize: '14px', color: '#455570', fontWeight: 600}}>FPT Head Office</span>),
                        key: '0-0-1-1'
                    },
                    {
                        title: (
                            <span style={{fontSize: '14px', color: '#455570', fontWeight: 600}}>FPT Head Office</span>),
                        key: '0-0-1-2'
                    },
                ],
            },
            {
                title: (<span style={{fontSize: '14px', color: '#455570', fontWeight: 600}}>FPT Head Office</span>),
                key: '0-0-2',
            },
        ],
    },
    {
        title: (<span style={{fontSize: '14px', color: '#455570', fontWeight: 600}}>FPT Head Office</span>),
        key: '0-1',
        children: [
            {
                title: (<span style={{fontSize: '14px', color: '#455570', fontWeight: 600}}>FPT Head Office</span>),
                key: '0-1-0-0'
            },
            {
                title: (<span style={{fontSize: '14px', color: '#455570', fontWeight: 600}}>FPT Head Office</span>),
                key: '0-1-0-1'
            },
            {
                title: (<span style={{fontSize: '14px', color: '#455570', fontWeight: 600}}>FPT Head Office</span>),
                key: '0-1-0-2'
            },
        ],
    },
    {
        title: (<span style={{fontSize: '14px', color: '#455570', fontWeight: 600}}>FPT Head Office</span>),
        key: '0-2',
    },
];
const OrganizationContent = () => {
    // form search
    const Schema = Yup.object().shape({
        search: Yup.string(),
    });
    const methods = useForm({
        mode: "onChange",
        defaultValues,
        resolver: yupResolver(Schema),
    });
    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };
    const onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
    };

    return (
        <Box sx={{px: 7.5, py: 5}}>
            {/*  Logo and Info  */}
            <Stack flexDirection="row" alignItems="center" mb={4}>
                <Logo/>
                <Stack sx={{ml: 2}}>
                    <Typography sx={{fontSize: '16px', fontWeight: '600', color: '#172B4D', mb: 0.5}}>NGÂN HÀNG VIỆT NAM
                        THỊNH VƯỢNG VPBANK</Typography>
                    <Typography sx={{fontSize: '12px', fontWeight: '400', color: '#455570'}}>Để chỉnh sửa tên công ty,
                        vui lòng liên hệ admin qua email Support@iviec.com.vn</Typography>
                </Stack>
            </Stack>
            {/*  Search form  */}
            <FormProvider methods={methods}>
                <RHFSearchTextField
                    name="search"
                    placeholder="Tìm kiếm..."
                    sx={{width: '558px', height: '44px', backgroundColor: '#F2F4F5'}}
                />
            </FormProvider>
            {/*  Tree data  */}
            <Stack mt={3}>
                <Tree
                    checkable
                    showLine
                    // showIcon
                    onSelect={onSelect}
                    onCheck={onCheck}
                    treeData={treeData}
                    defaultExpandAll
                    dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                    switcherIcon={(props) => props.isActive && <Iconify icon="material-symbols:arrow-drop-down" sx={{ height: 20, width: 20, fontSize: 20 }}/>}
                />
            </Stack>
        </Box>
    )
}

export default React.memo(OrganizationContent);