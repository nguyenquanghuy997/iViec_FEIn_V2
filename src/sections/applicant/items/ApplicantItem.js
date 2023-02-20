import Content from "@/components/BaseComponents/Content";
import { View } from "@/components/FlexStyled";
import Iconify from "@/components/Iconify";
import TextMaxLine from "@/components/TextMaxLine";
import NavItemContent from "@/components/nav-section/horizontal/NavItem";
import { ListItemStyle } from "@/components/nav-section/horizontal/style";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetListColumnApplicantsQuery } from "@/sections/applicant";
import ApplicantHeader from "@/sections/applicant/ApplicantHeader";
import ApplicantFilterModal from "@/sections/applicant/filter/ApplicantFilterModal";
// import { calculateColumnsWidth } from "./DynamicColumnsHelper";
import { columns as columnsTest } from "@/sections/applicant/others/columns";
import { fDate } from "@/utils/formatTime";
import { yupResolver } from "@hookform/resolvers/yup";
import { Table, Tag, Dropdown, Menu, Checkbox } from "antd";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import ReactDragListView from "react-drag-listview";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import Link from "next/link";

const defaultValues = {
  search: "",
};

export const ApplicantItem = () => {
  // const [getListApplicants, { data: Data, isLoading }] =
  //   useLazyGetListApplicantsQuery();
  const Data ={
    "items": [
        {
            "applicantId": "01000000-ac12-0242-0995-08db11966126",
            "recruitmentPipelineStateId": "01000000-ac12-0242-4522-08db10c99099",
            "recruitmentPipelineState": 0,
            "pipelineStateResultType": null,
            "applicationUserId": null,
            "jobSourceId": "01000000-ac12-0242-a0c7-08db1195002e",
            "jobSourceName": "iViec",
            "fullName": "Đăng đẹp trai",
            "slug": "dang-dep-trai-V2mbPE1wG9",
            "portraitImage": "test.jpg",
            "dateOfBirth": "1997-02-18T09:51:10.633Z",
            "email": "dangdz@gmail.com",
            "phoneNumber": "0912121212",
            "identityNumber": "122057122",
            "weight": 50.0,
            "height": 170.0,
            "provinceId": "01000000-ac12-0242-0c50-08db10c3ab66",
            "provinceName": "Vĩnh Long",
            "districtId": "01000000-ac12-0242-42a1-08db10c3ab66",
            "districtName": " Vũng Liêm",
            "villageId": null,
            "villageName": null,
            "curriculumVitae": "Just for test, Éo có gì cả",
            "experience": "Éo có gì cả",
            "homeTower": "Hà Nội",
            "livingAddress": "Hà Nội",
            "education": "Đại học chém nhau",
            "expectedSalaryFrom": 1000.0,
            "expectedSalaryTo": 2000.0,
            "expectedWorkingAddress": "Hà Nội",
            "maritalStatus": 0,
            "yearOfExperience": 0,
            "sex": 0,
            "applicantSkills": [
                {
                    "name": "Skill chém nhau",
                    "slug": "skill-chem-nhau-R2BWBexlk9",
                    "description": null,
                    "id": "01000000-ac12-0242-031c-08db119482c1"
                }
            ],
            "jobCategories": [
                {
                    "name": null,
                    "id": "23900294-5af3-4c96-b0da-b5887e011363"
                }
            ],
            "academicLevel": {
                "name": "Giáo sư",
                "description": null,
                "slug": "giao-su-r9eXEqkpK2",
                "id": "01000000-ac12-0242-023d-08db1194613f"
            },
            "rawApplicantSkills": "Chém nhau giỏi",
            "createdTime": "2023-02-18T09:56:17.570963Z",
            "recruitmentId": null,
            "recruitmentName": "Tin tuyển dụng Hà Nội",
            "organizationId": "01000000-ac12-0242-8bf2-08db10d7185e",
            "organizationName": "thuyboncon2@gmail.com",
            "creatorId": null,
            "creatorName": "Thủy Bon",
            "ownerId": null,
            "ownerName": " ",
            "isAvailable": false,
            "id": "01000000-ac12-0242-8fa2-08db1196611f"
        },
        {
            "applicantId": "01000000-ac12-0242-0995-08db11966126",
            "recruitmentPipelineStateId": "01000000-ac12-0242-6730-08db12ec2c25",
            "recruitmentPipelineState": 0,
            "pipelineStateResultType": null,
            "applicationUserId": null,
            "jobSourceId": "01000000-ac12-0242-a0c7-08db1195002e",
            "jobSourceName": "iViec",
            "fullName": "Đăng đẹp trai",
            "slug": "dang-dep-trai-V2mbPE1wG9",
            "portraitImage": "test.jpg",
            "dateOfBirth": "1997-02-18T09:51:10.633Z",
            "email": "dangdz@gmail.com",
            "phoneNumber": "0912121212",
            "identityNumber": "122057122",
            "weight": 50.0,
            "height": 170.0,
            "provinceId": "01000000-ac12-0242-0c50-08db10c3ab66",
            "provinceName": "Vĩnh Long",
            "districtId": "01000000-ac12-0242-42a1-08db10c3ab66",
            "districtName": " Vũng Liêm",
            "villageId": null,
            "villageName": null,
            "curriculumVitae": "Just for test, Éo có gì cả",
            "experience": "Éo có gì cả",
            "homeTower": "Hà Nội",
            "livingAddress": "Hà Nội",
            "education": "Đại học chém nhau",
            "expectedSalaryFrom": 1000.0,
            "expectedSalaryTo": 2000.0,
            "expectedWorkingAddress": "Hà Nội",
            "maritalStatus": 0,
            "yearOfExperience": 0,
            "sex": 0,
            "applicantSkills": [
                {
                    "name": "Skill chém nhau",
                    "slug": "skill-chem-nhau-R2BWBexlk9",
                    "description": null,
                    "id": "01000000-ac12-0242-031c-08db119482c1"
                }
            ],
            "jobCategories": [
                {
                    "name": null,
                    "id": "23900294-5af3-4c96-b0da-b5887e011363"
                }
            ],
            "academicLevel": {
                "name": "Giáo sư",
                "description": null,
                "slug": "giao-su-r9eXEqkpK2",
                "id": "01000000-ac12-0242-023d-08db1194613f"
            },
            "rawApplicantSkills": "Chém nhau giỏi",
            "createdTime": "2023-02-18T09:56:17.570963Z",
            "recruitmentId": null,
            "recruitmentName": "Tin tuyển dụng Parttime",
            "organizationId": "01000000-ac12-0242-b3cd-08db10c50f70",
            "organizationName": "Ban công nghệ tập đoàn FPT",
            "creatorId": null,
            "creatorName": "Thủy Bon",
            "ownerId": null,
            "ownerName": " ",
            "isAvailable": false,
            "id": "01000000-ac12-0242-bf83-08db13297b55"
        },
        {
            "applicantId": "01000000-ac12-0242-0995-08db11966126",
            "recruitmentPipelineStateId": "01000000-ac12-0242-e7b1-08db12ec4d6d",
            "recruitmentPipelineState": 2,
            "pipelineStateResultType": null,
            "applicationUserId": null,
            "jobSourceId": "01000000-ac12-0242-a0c7-08db1195002e",
            "jobSourceName": "iViec",
            "fullName": "Đăng đẹp trai",
            "slug": "dang-dep-trai-V2mbPE1wG9",
            "portraitImage": "test.jpg",
            "dateOfBirth": "1997-02-18T09:51:10.633Z",
            "email": "dangdz@gmail.com",
            "phoneNumber": "0912121212",
            "identityNumber": "122057122",
            "weight": 50.0,
            "height": 170.0,
            "provinceId": "01000000-ac12-0242-0c50-08db10c3ab66",
            "provinceName": "Vĩnh Long",
            "districtId": "01000000-ac12-0242-42a1-08db10c3ab66",
            "districtName": " Vũng Liêm",
            "villageId": null,
            "villageName": null,
            "curriculumVitae": "Just for test, Éo có gì cả",
            "experience": "Éo có gì cả",
            "homeTower": "Hà Nội",
            "livingAddress": "Hà Nội",
            "education": "Đại học chém nhau",
            "expectedSalaryFrom": 1000.0,
            "expectedSalaryTo": 2000.0,
            "expectedWorkingAddress": "Hà Nội",
            "maritalStatus": 0,
            "yearOfExperience": 0,
            "sex": 0,
            "applicantSkills": [
                {
                    "name": "Skill chém nhau",
                    "slug": "skill-chem-nhau-R2BWBexlk9",
                    "description": null,
                    "id": "01000000-ac12-0242-031c-08db119482c1"
                }
            ],
            "jobCategories": [
                {
                    "name": null,
                    "id": "23900294-5af3-4c96-b0da-b5887e011363"
                }
            ],
            "academicLevel": {
                "name": "Giáo sư",
                "description": null,
                "slug": "giao-su-r9eXEqkpK2",
                "id": "01000000-ac12-0242-023d-08db1194613f"
            },
            "rawApplicantSkills": "Chém nhau giỏi",
            "createdTime": "2023-02-18T09:56:17.570963Z",
            "recruitmentId": null,
            "recruitmentName": "Tin tuyển dụng phổ biến",
            "organizationId": "01000000-ac12-0242-b3cd-08db10c50f70",
            "organizationName": "Ban công nghệ tập đoàn FPT",
            "creatorId": null,
            "creatorName": "Thủy Bon",
            "ownerId": null,
            "ownerName": " ",
            "isAvailable": false,
            "id": "01000000-ac12-0242-945b-08db13285f34"
        },
        {
            "applicantId": "01000000-ac12-0242-0995-08db11966126",
            "recruitmentPipelineStateId": "01000000-ac12-0242-de97-08db10c9b828",
            "recruitmentPipelineState": 2,
            "pipelineStateResultType": null,
            "applicationUserId": null,
            "jobSourceId": "01000000-ac12-0242-a0c7-08db1195002e",
            "jobSourceName": "iViec",
            "fullName": "Đăng đẹp trai",
            "slug": "dang-dep-trai-V2mbPE1wG9",
            "portraitImage": "test.jpg",
            "dateOfBirth": "1997-02-18T09:51:10.633Z",
            "email": "dangdz@gmail.com",
            "phoneNumber": "0912121212",
            "identityNumber": "122057122",
            "weight": 50.0,
            "height": 170.0,
            "provinceId": "01000000-ac12-0242-0c50-08db10c3ab66",
            "provinceName": "Vĩnh Long",
            "districtId": "01000000-ac12-0242-42a1-08db10c3ab66",
            "districtName": " Vũng Liêm",
            "villageId": null,
            "villageName": null,
            "curriculumVitae": "Just for test, Éo có gì cả",
            "experience": "Éo có gì cả",
            "homeTower": "Hà Nội",
            "livingAddress": "Hà Nội",
            "education": "Đại học chém nhau",
            "expectedSalaryFrom": 1000.0,
            "expectedSalaryTo": 2000.0,
            "expectedWorkingAddress": "Hà Nội",
            "maritalStatus": 0,
            "yearOfExperience": 0,
            "sex": 0,
            "applicantSkills": [
                {
                    "name": "Skill chém nhau",
                    "slug": "skill-chem-nhau-R2BWBexlk9",
                    "description": null,
                    "id": "01000000-ac12-0242-031c-08db119482c1"
                }
            ],
            "jobCategories": [
                {
                    "name": null,
                    "id": "23900294-5af3-4c96-b0da-b5887e011363"
                }
            ],
            "academicLevel": {
                "name": "Giáo sư",
                "description": null,
                "slug": "giao-su-r9eXEqkpK2",
                "id": "01000000-ac12-0242-023d-08db1194613f"
            },
            "rawApplicantSkills": "Chém nhau giỏi",
            "createdTime": "2023-02-18T09:56:17.570963Z",
            "recruitmentId": null,
            "recruitmentName": "Tin tuyển dụng làm người yêu",
            "organizationId": "01000000-ac12-0242-bd12-08db10d739fb",
            "organizationName": "linhtrancon1@gmail.com",
            "creatorId": null,
            "creatorName": "Linh Trần",
            "ownerId": null,
            "ownerName": " ",
            "isAvailable": false,
            "id": "01000000-ac12-0242-4b37-08db1327e0d8"
        },
        {
            "applicantId": "01000000-ac12-0242-ba77-08db119a40e7",
            "recruitmentPipelineStateId": "01000000-ac12-0242-0401-08db10c9a5dc",
            "recruitmentPipelineState": 0,
            "pipelineStateResultType": null,
            "applicationUserId": null,
            "jobSourceId": "01000000-ac12-0242-a0c7-08db1195002e",
            "jobSourceName": "iViec",
            "fullName": "Dương Hồng Test",
            "slug": "duong-hong-test-WD36Nrv1q9",
            "portraitImage": "test.jpg",
            "dateOfBirth": "1995-02-18T09:51:10.633Z",
            "email": "duonghong_test@gmail.com",
            "phoneNumber": "0912121219",
            "identityNumber": "122057129",
            "weight": 75.0,
            "height": 160.0,
            "provinceId": "01000000-ac12-0242-0c50-08db10c3ab66",
            "provinceName": "Vĩnh Long",
            "districtId": "01000000-ac12-0242-42a1-08db10c3ab66",
            "districtName": " Vũng Liêm",
            "villageId": null,
            "villageName": null,
            "curriculumVitae": "Just for test, Éo có gì cả",
            "experience": "Éo có gì cả",
            "homeTower": "Hà Nội",
            "livingAddress": "Hà Nội",
            "education": "Đại học chém nhau",
            "expectedSalaryFrom": 5000.0,
            "expectedSalaryTo": 1000.0,
            "expectedWorkingAddress": "Hà Nội",
            "maritalStatus": 0,
            "yearOfExperience": 1,
            "sex": 1,
            "applicantSkills": [
                {
                    "name": "Skill chém nhau",
                    "slug": "skill-chem-nhau-R2BWBexlk9",
                    "description": null,
                    "id": "01000000-ac12-0242-031c-08db119482c1"
                }
            ],
            "jobCategories": [
                {
                    "name": null,
                    "id": "23900294-5af3-4c96-b0da-b5887e011363"
                }
            ],
            "academicLevel": {
                "name": "Giáo sư",
                "description": null,
                "slug": "giao-su-r9eXEqkpK2",
                "id": "01000000-ac12-0242-023d-08db1194613f"
            },
            "rawApplicantSkills": "Chém nhau giỏi",
            "createdTime": "2023-02-18T10:24:01.462679Z",
            "recruitmentId": null,
            "recruitmentName": "Tin tuyển dụng làm người thương",
            "organizationId": "01000000-ac12-0242-21c0-08db10d70e29",
            "organizationName": "thuyboncon1@gmail.com",
            "creatorId": null,
            "creatorName": "Thủy Con 1",
            "ownerId": null,
            "ownerName": " ",
            "isAvailable": false,
            "id": "01000000-ac12-0242-5e3a-08db119a40e7"
        },
        {
            "applicantId": "01000000-ac12-0242-4de4-08db1197db83",
            "recruitmentPipelineStateId": "01000000-ac12-0242-4b57-08db10c57fb4",
            "recruitmentPipelineState": 0,
            "pipelineStateResultType": null,
            "applicationUserId": null,
            "jobSourceId": "01000000-ac12-0242-a0c7-08db1195002e",
            "jobSourceName": "iViec",
            "fullName": "Dương Kính",
            "slug": "duong-kinh-X94Lb6RBv9",
            "portraitImage": "test.jpg",
            "dateOfBirth": "2000-02-18T09:51:10.633Z",
            "email": "duongkinh@gmail.com",
            "phoneNumber": "0912121216",
            "identityNumber": "122057126",
            "weight": 80.0,
            "height": 190.0,
            "provinceId": "01000000-ac12-0242-0c50-08db10c3ab66",
            "provinceName": "Vĩnh Long",
            "districtId": "01000000-ac12-0242-42a1-08db10c3ab66",
            "districtName": " Vũng Liêm",
            "villageId": null,
            "villageName": null,
            "curriculumVitae": "Just for test, Éo có gì cả",
            "experience": "Éo có gì cả",
            "homeTower": "Hà Nội",
            "livingAddress": "Hà Nội",
            "education": "Đại học chém nhau",
            "expectedSalaryFrom": 5000.0,
            "expectedSalaryTo": 1000.0,
            "expectedWorkingAddress": "Hà Nội",
            "maritalStatus": 0,
            "yearOfExperience": 1,
            "sex": 1,
            "applicantSkills": [
                {
                    "name": "Skill chém nhau",
                    "slug": "skill-chem-nhau-R2BWBexlk9",
                    "description": null,
                    "id": "01000000-ac12-0242-031c-08db119482c1"
                }
            ],
            "jobCategories": [
                {
                    "name": null,
                    "id": "23900294-5af3-4c96-b0da-b5887e011363"
                }
            ],
            "academicLevel": {
                "name": "Giáo sư",
                "description": null,
                "slug": "giao-su-r9eXEqkpK2",
                "id": "01000000-ac12-0242-023d-08db1194613f"
            },
            "rawApplicantSkills": "Chém nhau giỏi",
            "createdTime": "2023-02-18T10:06:52.360933Z",
            "recruitmentId": null,
            "recruitmentName": "Tin tuyển dụng Hồ Chí Minh",
            "organizationId": "5b520733-4015-4b65-8ebe-7ca21e8852a3",
            "organizationName": "Ngân hàng MBBANK",
            "creatorId": null,
            "creatorName": "Thủy Bon",
            "ownerId": null,
            "ownerName": "Thủy Bon",
            "isAvailable": false,
            "id": "01000000-ac12-0242-f7fe-08db1197db82"
        },
        {
            "applicantId": "01000000-ac12-0242-fc32-08db119ac00b",
            "recruitmentPipelineStateId": "01000000-ac12-0242-0401-08db10c9a5dc",
            "recruitmentPipelineState": 0,
            "pipelineStateResultType": null,
            "applicationUserId": null,
            "jobSourceId": "01000000-ac12-0242-a0c7-08db1195002e",
            "jobSourceName": "iViec",
            "fullName": "Ha Ha Ha",
            "slug": "ha-ha-ha-V2mbolKQJ9",
            "portraitImage": "kakaka.jpg",
            "dateOfBirth": "1995-02-18T09:51:10.633Z",
            "email": "hahaha@gmail.com",
            "phoneNumber": "0912121212",
            "identityNumber": "122057122",
            "weight": 75.0,
            "height": 160.0,
            "provinceId": "01000000-ac12-0242-0c50-08db10c3ab66",
            "provinceName": "Vĩnh Long",
            "districtId": "01000000-ac12-0242-42a1-08db10c3ab66",
            "districtName": " Vũng Liêm",
            "villageId": null,
            "villageName": null,
            "curriculumVitae": "Just for test, Éo có gì cả",
            "experience": "Éo có gì cả",
            "homeTower": "Hà Nội",
            "livingAddress": "Hà Nội",
            "education": "Đại học chém nhau",
            "expectedSalaryFrom": 5000.0,
            "expectedSalaryTo": 1000.0,
            "expectedWorkingAddress": "Hà Nội",
            "maritalStatus": 0,
            "yearOfExperience": 1,
            "sex": 1,
            "applicantSkills": [
                {
                    "name": "Skill chém nhau",
                    "slug": "skill-chem-nhau-R2BWBexlk9",
                    "description": null,
                    "id": "01000000-ac12-0242-031c-08db119482c1"
                }
            ],
            "jobCategories": [
                {
                    "name": null,
                    "id": "23900294-5af3-4c96-b0da-b5887e011363"
                }
            ],
            "academicLevel": {
                "name": "Giáo sư",
                "description": null,
                "slug": "giao-su-r9eXEqkpK2",
                "id": "01000000-ac12-0242-023d-08db1194613f"
            },
            "rawApplicantSkills": "Chém nhau giỏi",
            "createdTime": "2023-02-18T10:27:34.77048Z",
            "recruitmentId": null,
            "recruitmentName": "Tin tuyển dụng làm người thương",
            "organizationId": "01000000-ac12-0242-21c0-08db10d70e29",
            "organizationName": "thuyboncon1@gmail.com",
            "creatorId": null,
            "creatorName": "Thủy Con 1",
            "ownerId": null,
            "ownerName": " ",
            "isAvailable": false,
            "id": "01000000-ac12-0242-b83f-08db119ac00b"
        },
        {
            "applicantId": "01000000-ac12-0242-43c1-08db119a9e57",
            "recruitmentPipelineStateId": "01000000-ac12-0242-0401-08db10c9a5dc",
            "recruitmentPipelineState": 0,
            "pipelineStateResultType": null,
            "applicationUserId": null,
            "jobSourceId": "01000000-ac12-0242-a0c7-08db1195002e",
            "jobSourceName": "iViec",
            "fullName": "Hê sờ lô, hơ sờ li li",
            "slug": "he-so-lo-ho-so-li-li-g26KkR3WL9",
            "portraitImage": "test.jpg",
            "dateOfBirth": "1995-02-18T09:51:10.633Z",
            "email": "hello@gmail.com",
            "phoneNumber": "0912121211",
            "identityNumber": "122057121",
            "weight": 75.0,
            "height": 160.0,
            "provinceId": "01000000-ac12-0242-0c50-08db10c3ab66",
            "provinceName": "Vĩnh Long",
            "districtId": "01000000-ac12-0242-42a1-08db10c3ab66",
            "districtName": " Vũng Liêm",
            "villageId": null,
            "villageName": null,
            "curriculumVitae": "Just for test, Éo có gì cả",
            "experience": "Éo có gì cả",
            "homeTower": "Hà Nội",
            "livingAddress": "Hà Nội",
            "education": "Đại học chém nhau",
            "expectedSalaryFrom": 5000.0,
            "expectedSalaryTo": 1000.0,
            "expectedWorkingAddress": "Hà Nội",
            "maritalStatus": 0,
            "yearOfExperience": 1,
            "sex": 1,
            "applicantSkills": [
                {
                    "name": "Skill chém nhau",
                    "slug": "skill-chem-nhau-R2BWBexlk9",
                    "description": null,
                    "id": "01000000-ac12-0242-031c-08db119482c1"
                }
            ],
            "jobCategories": [
                {
                    "name": null,
                    "id": "23900294-5af3-4c96-b0da-b5887e011363"
                }
            ],
            "academicLevel": {
                "name": "Giáo sư",
                "description": null,
                "slug": "giao-su-r9eXEqkpK2",
                "id": "01000000-ac12-0242-023d-08db1194613f"
            },
            "rawApplicantSkills": "Chém nhau giỏi",
            "createdTime": "2023-02-18T10:26:38.221373Z",
            "recruitmentId": null,
            "recruitmentName": "Tin tuyển dụng làm người thương",
            "organizationId": "01000000-ac12-0242-21c0-08db10d70e29",
            "organizationName": "thuyboncon1@gmail.com",
            "creatorId": null,
            "creatorName": "Thủy Con 1",
            "ownerId": null,
            "ownerName": " ",
            "isAvailable": false,
            "id": "01000000-ac12-0242-fcdb-08db119a9e56"
        },
        {
            "applicantId": "01000000-ac12-0242-a461-08db119aaafb",
            "recruitmentPipelineStateId": "01000000-ac12-0242-0401-08db10c9a5dc",
            "recruitmentPipelineState": 0,
            "pipelineStateResultType": null,
            "applicationUserId": null,
            "jobSourceId": "01000000-ac12-0242-a0c7-08db1195002e",
            "jobSourceName": "iViec",
            "fullName": "Ka ka ka",
            "slug": "ka-ka-ka-M9yq8GG5g9",
            "portraitImage": "kakaka.jpg",
            "dateOfBirth": "1995-02-18T09:51:10.633Z",
            "email": "kakaka@gmail.com",
            "phoneNumber": "0912121211",
            "identityNumber": "122057121",
            "weight": 75.0,
            "height": 160.0,
            "provinceId": "01000000-ac12-0242-0c50-08db10c3ab66",
            "provinceName": "Vĩnh Long",
            "districtId": "01000000-ac12-0242-42a1-08db10c3ab66",
            "districtName": " Vũng Liêm",
            "villageId": null,
            "villageName": null,
            "curriculumVitae": "Just for test, Éo có gì cả",
            "experience": "Éo có gì cả",
            "homeTower": "Hà Nội",
            "livingAddress": "Hà Nội",
            "education": "Đại học chém nhau",
            "expectedSalaryFrom": 5000.0,
            "expectedSalaryTo": 1000.0,
            "expectedWorkingAddress": "Hà Nội",
            "maritalStatus": 0,
            "yearOfExperience": 1,
            "sex": 1,
            "applicantSkills": [
                {
                    "name": "Skill chém nhau",
                    "slug": "skill-chem-nhau-R2BWBexlk9",
                    "description": null,
                    "id": "01000000-ac12-0242-031c-08db119482c1"
                }
            ],
            "jobCategories": [
                {
                    "name": null,
                    "id": "23900294-5af3-4c96-b0da-b5887e011363"
                }
            ],
            "academicLevel": {
                "name": "Giáo sư",
                "description": null,
                "slug": "giao-su-r9eXEqkpK2",
                "id": "01000000-ac12-0242-023d-08db1194613f"
            },
            "rawApplicantSkills": "Chém nhau giỏi",
            "createdTime": "2023-02-18T10:26:59.431231Z",
            "recruitmentId": null,
            "recruitmentName": "Tin tuyển dụng làm người thương",
            "organizationId": "01000000-ac12-0242-21c0-08db10d70e29",
            "organizationName": "thuyboncon1@gmail.com",
            "creatorId": null,
            "creatorName": "Thủy Con 1",
            "ownerId": null,
            "ownerName": " ",
            "isAvailable": false,
            "id": "01000000-ac12-0242-53ec-08db119aaafb"
        },
        {
            "applicantId": "01000000-ac12-0242-c664-08db1196ce83",
            "recruitmentPipelineStateId": "01000000-ac12-0242-4522-08db10c99099",
            "recruitmentPipelineState": 0,
            "pipelineStateResultType": null,
            "applicationUserId": null,
            "jobSourceId": "01000000-ac12-0242-a0c7-08db1195002e",
            "jobSourceName": "iViec",
            "fullName": "Kính hồng",
            "slug": "kinh-hong-MDQroKKLrn",
            "portraitImage": "test.jpg",
            "dateOfBirth": "1997-02-18T09:51:10.633Z",
            "email": "kinhhong@gmail.com",
            "phoneNumber": "0912121213",
            "identityNumber": "122057123",
            "weight": 20.0,
            "height": 150.0,
            "provinceId": "01000000-ac12-0242-0c50-08db10c3ab66",
            "provinceName": "Vĩnh Long",
            "districtId": "01000000-ac12-0242-42a1-08db10c3ab66",
            "districtName": " Vũng Liêm",
            "villageId": null,
            "villageName": null,
            "curriculumVitae": "Just for test, Éo có gì cả",
            "experience": "Éo có gì cả",
            "homeTower": "Hà Nội",
            "livingAddress": "Hà Nội",
            "education": "Đại học chém nhau",
            "expectedSalaryFrom": 1000.0,
            "expectedSalaryTo": 2000.0,
            "expectedWorkingAddress": "Hà Nội",
            "maritalStatus": 0,
            "yearOfExperience": 0,
            "sex": 0,
            "applicantSkills": [
                {
                    "name": "Skill chém nhau",
                    "slug": "skill-chem-nhau-R2BWBexlk9",
                    "description": null,
                    "id": "01000000-ac12-0242-031c-08db119482c1"
                }
            ],
            "jobCategories": [
                {
                    "name": null,
                    "id": "23900294-5af3-4c96-b0da-b5887e011363"
                }
            ],
            "academicLevel": {
                "name": "Giáo sư",
                "description": null,
                "slug": "giao-su-r9eXEqkpK2",
                "id": "01000000-ac12-0242-023d-08db1194613f"
            },
            "rawApplicantSkills": "Chém nhau giỏi",
            "createdTime": "2023-02-18T09:59:21.05691Z",
            "recruitmentId": null,
            "recruitmentName": "Tin tuyển dụng Hà Nội",
            "organizationId": "01000000-ac12-0242-8bf2-08db10d7185e",
            "organizationName": "thuyboncon2@gmail.com",
            "creatorId": null,
            "creatorName": "Thủy Bon",
            "ownerId": null,
            "ownerName": " ",
            "isAvailable": false,
            "id": "01000000-ac12-0242-0513-08db1196ce83"
        },
        {
            "applicantId": "01000000-ac12-0242-fe33-08db119a646f",
            "recruitmentPipelineStateId": "01000000-ac12-0242-0401-08db10c9a5dc",
            "recruitmentPipelineState": 0,
            "pipelineStateResultType": null,
            "applicationUserId": null,
            "jobSourceId": "01000000-ac12-0242-a0c7-08db1195002e",
            "jobSourceName": "iViec",
            "fullName": "Kính Ngọc Test",
            "slug": "kinh-ngoc-test-A203PO1aan",
            "portraitImage": "test.jpg",
            "dateOfBirth": "1995-02-18T09:51:10.633Z",
            "email": "kinhngoc_test@gmail.com",
            "phoneNumber": "0912121210",
            "identityNumber": "122057120",
            "weight": 75.0,
            "height": 160.0,
            "provinceId": "01000000-ac12-0242-0c50-08db10c3ab66",
            "provinceName": "Vĩnh Long",
            "districtId": "01000000-ac12-0242-42a1-08db10c3ab66",
            "districtName": " Vũng Liêm",
            "villageId": null,
            "villageName": null,
            "curriculumVitae": "Just for test, Éo có gì cả",
            "experience": "Éo có gì cả",
            "homeTower": "Hà Nội",
            "livingAddress": "Hà Nội",
            "education": "Đại học chém nhau",
            "expectedSalaryFrom": 5000.0,
            "expectedSalaryTo": 1000.0,
            "expectedWorkingAddress": "Hà Nội",
            "maritalStatus": 0,
            "yearOfExperience": 1,
            "sex": 1,
            "applicantSkills": [
                {
                    "name": "Skill chém nhau",
                    "slug": "skill-chem-nhau-R2BWBexlk9",
                    "description": null,
                    "id": "01000000-ac12-0242-031c-08db119482c1"
                }
            ],
            "jobCategories": [
                {
                    "name": null,
                    "id": "23900294-5af3-4c96-b0da-b5887e011363"
                }
            ],
            "academicLevel": {
                "name": "Giáo sư",
                "description": null,
                "slug": "giao-su-r9eXEqkpK2",
                "id": "01000000-ac12-0242-023d-08db1194613f"
            },
            "rawApplicantSkills": "Chém nhau giỏi",
            "createdTime": "2023-02-18T10:25:01.075559Z",
            "recruitmentId": null,
            "recruitmentName": "Tin tuyển dụng làm người thương",
            "organizationId": "01000000-ac12-0242-21c0-08db10d70e29",
            "organizationName": "thuyboncon1@gmail.com",
            "creatorId": null,
            "creatorName": "Thủy Con 1",
            "ownerId": null,
            "ownerName": " ",
            "isAvailable": false,
            "id": "01000000-ac12-0242-a9e8-08db119a646f"
        },
        {
            "applicantId": "01000000-ac12-0242-1cd3-08db1199ce20",
            "recruitmentPipelineStateId": "01000000-ac12-0242-0401-08db10c9a5dc",
            "recruitmentPipelineState": 0,
            "pipelineStateResultType": null,
            "applicationUserId": null,
            "jobSourceId": "01000000-ac12-0242-a0c7-08db1195002e",
            "jobSourceName": "iViec",
            "fullName": "Kính vạn hoa",
            "slug": "kinh-van-hoa-82EWG8m75D",
            "portraitImage": "test.jpg",
            "dateOfBirth": "2000-02-18T09:51:10.633Z",
            "email": "kinhvanhoa@gmail.com",
            "phoneNumber": "0912121218",
            "identityNumber": "122057128",
            "weight": 90.0,
            "height": 180.0,
            "provinceId": "01000000-ac12-0242-0c50-08db10c3ab66",
            "provinceName": "Vĩnh Long",
            "districtId": "01000000-ac12-0242-42a1-08db10c3ab66",
            "districtName": " Vũng Liêm",
            "villageId": null,
            "villageName": null,
            "curriculumVitae": "Just for test, Éo có gì cả",
            "experience": "Éo có gì cả",
            "homeTower": "Hà Nội",
            "livingAddress": "Hà Nội",
            "education": "Đại học chém nhau",
            "expectedSalaryFrom": 5000.0,
            "expectedSalaryTo": 1000.0,
            "expectedWorkingAddress": "Hà Nội",
            "maritalStatus": 0,
            "yearOfExperience": 1,
            "sex": 1,
            "applicantSkills": [
                {
                    "name": "Skill chém nhau",
                    "slug": "skill-chem-nhau-R2BWBexlk9",
                    "description": null,
                    "id": "01000000-ac12-0242-031c-08db119482c1"
                }
            ],
            "jobCategories": [
                {
                    "name": null,
                    "id": "23900294-5af3-4c96-b0da-b5887e011363"
                }
            ],
            "academicLevel": {
                "name": "Giáo sư",
                "description": null,
                "slug": "giao-su-r9eXEqkpK2",
                "id": "01000000-ac12-0242-023d-08db1194613f"
            },
            "rawApplicantSkills": "Chém nhau giỏi",
            "createdTime": "2023-02-18T10:20:48.894093Z",
            "recruitmentId": null,
            "recruitmentName": "Tin tuyển dụng làm người thương",
            "organizationId": "01000000-ac12-0242-21c0-08db10d70e29",
            "organizationName": "thuyboncon1@gmail.com",
            "creatorId": null,
            "creatorName": "Thủy Con 1",
            "ownerId": null,
            "ownerName": " ",
            "isAvailable": false,
            "id": "01000000-ac12-0242-aec2-08db1199ce1f"
        },
        {
            "applicantId": "01000000-ac12-0242-519e-08db119a0dc3",
            "recruitmentPipelineStateId": "01000000-ac12-0242-0401-08db10c9a5dc",
            "recruitmentPipelineState": 0,
            "pipelineStateResultType": null,
            "applicationUserId": null,
            "jobSourceId": "01000000-ac12-0242-a0c7-08db1195002e",
            "jobSourceName": "iViec",
            "fullName": "Nguyễn Hải Con",
            "slug": "nguyen-hai-con-5Dr781R3Mn",
            "portraitImage": "test.jpg",
            "dateOfBirth": "1995-02-18T09:51:10.633Z",
            "email": "haicon@gmail.com",
            "phoneNumber": "0912121219",
            "identityNumber": "122057129",
            "weight": 70.0,
            "height": 160.0,
            "provinceId": "01000000-ac12-0242-0c50-08db10c3ab66",
            "provinceName": "Vĩnh Long",
            "districtId": "01000000-ac12-0242-42a1-08db10c3ab66",
            "districtName": " Vũng Liêm",
            "villageId": null,
            "villageName": null,
            "curriculumVitae": "Just for test, Éo có gì cả",
            "experience": "Éo có gì cả",
            "homeTower": "Hà Nội",
            "livingAddress": "Hà Nội",
            "education": "Đại học chém nhau",
            "expectedSalaryFrom": 5000.0,
            "expectedSalaryTo": 1000.0,
            "expectedWorkingAddress": "Hà Nội",
            "maritalStatus": 0,
            "yearOfExperience": 1,
            "sex": 1,
            "applicantSkills": [
                {
                    "name": "Skill chém nhau",
                    "slug": "skill-chem-nhau-R2BWBexlk9",
                    "description": null,
                    "id": "01000000-ac12-0242-031c-08db119482c1"
                }
            ],
            "jobCategories": [
                {
                    "name": null,
                    "id": "23900294-5af3-4c96-b0da-b5887e011363"
                }
            ],
            "academicLevel": {
                "name": "Giáo sư",
                "description": null,
                "slug": "giao-su-r9eXEqkpK2",
                "id": "01000000-ac12-0242-023d-08db1194613f"
            },
            "rawApplicantSkills": "Chém nhau giỏi",
            "createdTime": "2023-02-18T10:22:35.65997Z",
            "recruitmentId": null,
            "recruitmentName": "Tin tuyển dụng làm người thương",
            "organizationId": "01000000-ac12-0242-21c0-08db10d70e29",
            "organizationName": "thuyboncon1@gmail.com",
            "creatorId": null,
            "creatorName": "Thủy Con 1",
            "ownerId": null,
            "ownerName": " ",
            "isAvailable": false,
            "id": "01000000-ac12-0242-fe86-08db119a0dc2"
        },
        {
            "applicantId": "01000000-ac12-0242-f47d-08db11970e76",
            "recruitmentPipelineStateId": "01000000-ac12-0242-4522-08db10c99099",
            "recruitmentPipelineState": 0,
            "pipelineStateResultType": null,
            "applicationUserId": null,
            "jobSourceId": "01000000-ac12-0242-a0c7-08db1195002e",
            "jobSourceName": "iViec",
            "fullName": "Nguyễn Hải Đăng",
            "slug": "nguyen-hai-dang-r9eXE8aZY2",
            "portraitImage": "test.jpg",
            "dateOfBirth": "1999-02-18T09:51:10.633Z",
            "email": "haidang@gmail.com",
            "phoneNumber": "0912121215",
            "identityNumber": "122057125",
            "weight": 80.0,
            "height": 190.0,
            "provinceId": "01000000-ac12-0242-0c50-08db10c3ab66",
            "provinceName": "Vĩnh Long",
            "districtId": "01000000-ac12-0242-42a1-08db10c3ab66",
            "districtName": " Vũng Liêm",
            "villageId": null,
            "villageName": null,
            "curriculumVitae": "Just for test, Éo có gì cả",
            "experience": "Éo có gì cả",
            "homeTower": "Hà Nội",
            "livingAddress": "Hà Nội",
            "education": "Đại học chém nhau",
            "expectedSalaryFrom": 1000.0,
            "expectedSalaryTo": 2000.0,
            "expectedWorkingAddress": "Hà Nội",
            "maritalStatus": 0,
            "yearOfExperience": 0,
            "sex": 0,
            "applicantSkills": [
                {
                    "name": "Skill chém nhau",
                    "slug": "skill-chem-nhau-R2BWBexlk9",
                    "description": null,
                    "id": "01000000-ac12-0242-031c-08db119482c1"
                }
            ],
            "jobCategories": [
                {
                    "name": null,
                    "id": "23900294-5af3-4c96-b0da-b5887e011363"
                }
            ],
            "academicLevel": {
                "name": "Giáo sư",
                "description": null,
                "slug": "giao-su-r9eXEqkpK2",
                "id": "01000000-ac12-0242-023d-08db1194613f"
            },
            "rawApplicantSkills": "Chém nhau giỏi",
            "createdTime": "2023-02-18T10:01:08.347067Z",
            "recruitmentId": null,
            "recruitmentName": "Tin tuyển dụng Hà Nội",
            "organizationId": "01000000-ac12-0242-8bf2-08db10d7185e",
            "organizationName": "thuyboncon2@gmail.com",
            "creatorId": null,
            "creatorName": "Thủy Bon",
            "ownerId": null,
            "ownerName": " ",
            "isAvailable": false,
            "id": "01000000-ac12-0242-aee6-08db11970e76"
        },
        {
            "applicantId": "01000000-ac12-0242-05ba-08db1198208c",
            "recruitmentPipelineStateId": "01000000-ac12-0242-4b57-08db10c57fb4",
            "recruitmentPipelineState": 0,
            "pipelineStateResultType": null,
            "applicationUserId": null,
            "jobSourceId": "01000000-ac12-0242-a0c7-08db1195002e",
            "jobSourceName": "iViec",
            "fullName": "Nguyễn Hải Đăng",
            "slug": "nguyen-hai-dang-M2Kv0V7R7n",
            "portraitImage": "test.jpg",
            "dateOfBirth": "2000-02-18T09:51:10.633Z",
            "email": "haidang@gmail.com",
            "phoneNumber": "0912121217",
            "identityNumber": "122057127",
            "weight": 80.0,
            "height": 190.0,
            "provinceId": "01000000-ac12-0242-0c50-08db10c3ab66",
            "provinceName": "Vĩnh Long",
            "districtId": "01000000-ac12-0242-42a1-08db10c3ab66",
            "districtName": " Vũng Liêm",
            "villageId": null,
            "villageName": null,
            "curriculumVitae": "Just for test, Éo có gì cả",
            "experience": "Éo có gì cả",
            "homeTower": "Hà Nội",
            "livingAddress": "Hà Nội",
            "education": "Đại học chém nhau",
            "expectedSalaryFrom": 5000.0,
            "expectedSalaryTo": 1000.0,
            "expectedWorkingAddress": "Hà Nội",
            "maritalStatus": 0,
            "yearOfExperience": 1,
            "sex": 1,
            "applicantSkills": [
                {
                    "name": "Skill chém nhau",
                    "slug": "skill-chem-nhau-R2BWBexlk9",
                    "description": null,
                    "id": "01000000-ac12-0242-031c-08db119482c1"
                }
            ],
            "jobCategories": [
                {
                    "name": null,
                    "id": "23900294-5af3-4c96-b0da-b5887e011363"
                }
            ],
            "academicLevel": {
                "name": "Giáo sư",
                "description": null,
                "slug": "giao-su-r9eXEqkpK2",
                "id": "01000000-ac12-0242-023d-08db1194613f"
            },
            "rawApplicantSkills": "Chém nhau giỏi",
            "createdTime": "2023-02-18T10:08:48.180769Z",
            "recruitmentId": null,
            "recruitmentName": "Tin tuyển dụng Hồ Chí Minh",
            "organizationId": "5b520733-4015-4b65-8ebe-7ca21e8852a3",
            "organizationName": "Ngân hàng MBBANK",
            "creatorId": null,
            "creatorName": "Thủy Bon",
            "ownerId": null,
            "ownerName": "Thủy Bon",
            "isAvailable": false,
            "id": "01000000-ac12-0242-a94d-08db1198208b"
        },
        {
            "applicantId": "01000000-ac12-0242-b514-08db1196f0ae",
            "recruitmentPipelineStateId": "01000000-ac12-0242-4522-08db10c99099",
            "recruitmentPipelineState": 0,
            "pipelineStateResultType": null,
            "applicationUserId": null,
            "jobSourceId": "01000000-ac12-0242-a0c7-08db1195002e",
            "jobSourceName": "iViec",
            "fullName": "Nguyễn Hướng Dương",
            "slug": "nguyen-huong-duong-M2Kv0x7rPn",
            "portraitImage": "test.jpg",
            "dateOfBirth": "1999-02-18T09:51:10.633Z",
            "email": "kinhhong@gmail.com",
            "phoneNumber": "0912121214",
            "identityNumber": "122057124",
            "weight": 60.0,
            "height": 130.0,
            "provinceId": "01000000-ac12-0242-0c50-08db10c3ab66",
            "provinceName": "Vĩnh Long",
            "districtId": "01000000-ac12-0242-42a1-08db10c3ab66",
            "districtName": " Vũng Liêm",
            "villageId": null,
            "villageName": null,
            "curriculumVitae": "Just for test, Éo có gì cả",
            "experience": "Éo có gì cả",
            "homeTower": "Hà Nội",
            "livingAddress": "Hà Nội",
            "education": "Đại học chém nhau",
            "expectedSalaryFrom": 1000.0,
            "expectedSalaryTo": 2000.0,
            "expectedWorkingAddress": "Hà Nội",
            "maritalStatus": 0,
            "yearOfExperience": 0,
            "sex": 0,
            "applicantSkills": [
                {
                    "name": "Skill chém nhau",
                    "slug": "skill-chem-nhau-R2BWBexlk9",
                    "description": null,
                    "id": "01000000-ac12-0242-031c-08db119482c1"
                }
            ],
            "jobCategories": [
                {
                    "name": null,
                    "id": "23900294-5af3-4c96-b0da-b5887e011363"
                }
            ],
            "academicLevel": {
                "name": "Giáo sư",
                "description": null,
                "slug": "giao-su-r9eXEqkpK2",
                "id": "01000000-ac12-0242-023d-08db1194613f"
            },
            "rawApplicantSkills": "Chém nhau giỏi",
            "createdTime": "2023-02-18T10:00:18.380736Z",
            "recruitmentId": null,
            "recruitmentName": "Tin tuyển dụng Hà Nội",
            "organizationId": "01000000-ac12-0242-8bf2-08db10d7185e",
            "organizationName": "thuyboncon2@gmail.com",
            "creatorId": null,
            "creatorName": "Thủy Bon",
            "ownerId": null,
            "ownerName": " ",
            "isAvailable": false,
            "id": "01000000-ac12-0242-57fa-08db1196f0ae"
        },
        {
            "applicantId": "01000000-ac12-0242-d7ca-08db11976faa",
            "recruitmentPipelineStateId": "01000000-ac12-0242-4b57-08db10c57fb4",
            "recruitmentPipelineState": 0,
            "pipelineStateResultType": null,
            "applicationUserId": null,
            "jobSourceId": "01000000-ac12-0242-a0c7-08db1195002e",
            "jobSourceName": "iViec",
            "fullName": "Xinh gái lắm",
            "slug": "xinh-gai-lam-V2mbP5Ymk9",
            "portraitImage": "test.jpg",
            "dateOfBirth": "2000-02-18T09:51:10.633Z",
            "email": "xinhgai@gmail.com",
            "phoneNumber": "0912121215",
            "identityNumber": "122057125",
            "weight": 80.0,
            "height": 190.0,
            "provinceId": "01000000-ac12-0242-0c50-08db10c3ab66",
            "provinceName": "Vĩnh Long",
            "districtId": "01000000-ac12-0242-42a1-08db10c3ab66",
            "districtName": " Vũng Liêm",
            "villageId": null,
            "villageName": null,
            "curriculumVitae": "Just for test, Éo có gì cả",
            "experience": "Éo có gì cả",
            "homeTower": "Hà Nội",
            "livingAddress": "Hà Nội",
            "education": "Đại học chém nhau",
            "expectedSalaryFrom": 5000.0,
            "expectedSalaryTo": 1000.0,
            "expectedWorkingAddress": "Hà Nội",
            "maritalStatus": 0,
            "yearOfExperience": 1,
            "sex": 1,
            "applicantSkills": [
                {
                    "name": "Skill chém nhau",
                    "slug": "skill-chem-nhau-R2BWBexlk9",
                    "description": null,
                    "id": "01000000-ac12-0242-031c-08db119482c1"
                }
            ],
            "jobCategories": [
                {
                    "name": null,
                    "id": "23900294-5af3-4c96-b0da-b5887e011363"
                }
            ],
            "academicLevel": {
                "name": "Giáo sư",
                "description": null,
                "slug": "giao-su-r9eXEqkpK2",
                "id": "01000000-ac12-0242-023d-08db1194613f"
            },
            "rawApplicantSkills": "Chém nhau giỏi",
            "createdTime": "2023-02-18T10:03:51.426125Z",
            "recruitmentId": null,
            "recruitmentName": "Tin tuyển dụng Hồ Chí Minh",
            "organizationId": "5b520733-4015-4b65-8ebe-7ca21e8852a3",
            "organizationName": "Ngân hàng MBBANK",
            "creatorId": null,
            "creatorName": "Thủy Bon",
            "ownerId": null,
            "ownerName": "Thủy Bon",
            "isAvailable": false,
            "id": "01000000-ac12-0242-77c8-08db11976faa"
        }
    ],
    "totalRecord": 17,
    "currentPageIndex": 1,
    "totalPage": 1
}
  const { data: ColumnData } = useGetListColumnApplicantsQuery();
  const [columns, setColumns] = useState([
    {
      title: "STT",
      key: "index",
      // eslint-disable-next-line
      render: (item, record, index) => <>{index + 1}</>,
      width: "60px",
      fixed: "left",
    },
    {
      dataIndex: "fullName",
      title: "Họ và tên",
      fixed: "left",
      width: "200px",
      render: (text, record) => (
        // <Link href={`applicant/${record.id} && `} passHref>
        //   <TextMaxLine
        //     line={1}
        //     sx={{ width: 160, fontWeight: "normal", fontSize: 14 }}
        //   >
        //     {text}
        //   </TextMaxLine>
        // </Link>
        <Link passHref href={{ pathname: `applicant/${record.applicantId}`, query: { or: `${record.organizationId}`} }}>
          <TextMaxLine
        line={1}
        sx={{ width: 160, fontWeight: "normal", fontSize: 14 }}
      >
        {text}
      </TextMaxLine></Link>
      ),
    },
    {
      dataIndex: "phoneNumber",
      title: "Số điện thoại",
      fixed: "left",
      width: "120px",
    },
    {
      dataIndex: "dateOfBirth",
      title: "Ngày sinh",
      render: (date) => fDate(date),
      width: "120px",
    },
    { dataIndex: "email", title: "Email", width: "240px" },
    { dataIndex: "recruitmentName", title: "Tin tuyển dụng", width: "200px" },
    { dataIndex: "fullName", title: "Bước tuyển dụng", width: "200px" },
    { dataIndex: "fullName", title: "Ngày ứng tuyển", width: "200px" },
    { dataIndex: "fullName", title: "Đơn vị", width: "200px" },
    { dataIndex: "fullName", title: "Nguồn", width: "200px" },
    { dataIndex: "fullName", title: "Cán bộ tuyển dụng", width: "200px" },
    { dataIndex: "fullName", title: "Cán bộ tạo ứng viên", width: "200px" },
    {
      title: "Học vấn",
      dataIndex: ["academicLevel", "name"], // antd v4
      key: "name",
      width: "120px",
      render: (text) => <Tag>{text}</Tag>,
    },
    { dataIndex: "experience", title: "Kinh nghiệm làm việc", width: "200px" },
    { dataIndex: "fullName", title: "Ngành nghề", width: "200px" },
    { dataIndex: "yearOfExperience", title: "KN", width: "60px" },
    {
      title: "Kỹ năng",
      key: "applicantSkills",
      dataIndex: "applicantSkills",
      render: (_, { applicantSkills }) => (
        <>
          {applicantSkills.map((item) => {
            // let color = item.length > 5 ? 'geekblue' : 'green';
            return <Tag key={item}>{item.name.toUpperCase()}</Tag>;
          })}
        </>
      ),
      width: "200px",
    },
    { dataIndex: "identityNumber", title: "CCCD/CMND", width: "200px" },
    {
      dataIndex: "sex",
      title: "Giới tính",
      render: (sex) => (sex == 0 ? "Nam" : "Nữ"),
      width: "80px",
    },
    { dataIndex: "maritalStatus", title: "TTHN", width: "120px" },
    { dataIndex: "height", title: "Chiều cao", width: "120px" },
    { dataIndex: "weight", title: "Cân nặng", width: "120px" },
    { dataIndex: "fullName", title: "Nơi làm việc mong muốn", width: "200px" },
    {
      dataIndex: "expectedSalaryTo",
      title: "Mức lương mong muốn",
      width: "120px",
    },
    { dataIndex: "livingAddress", title: "Nơi ở hiện tại", width: "160px" },
    { dataIndex: "homeTower", title: "Quê quán", width: "160px" },
  ]);

  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      if (fromIndex > 3) {
        console.log(`dragged from ${fromIndex} to ${toIndex}`);
        const newColumns = [...columns];
        const item = newColumns.splice(fromIndex, 1)[0];
        newColumns.splice(toIndex, 0, item);
        setColumns(newColumns);
      }
    },
    nodeSelector: "th",
  };
  const [tableHeight, setTableHeight] = useState(600);
  const ref = useRef < HTMLDivElement > null;
  useLayoutEffect(() => {
    setTableHeight(window.innerHeight - 400);
  }, [ref]);

  const rowKey = "id";

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const [initialColumns, setInitialColumns] = useState([]);
  const [checkedColumns, setCheckedColumns] = useState([]);
  const [visibleMenuSettings, setVisibleMenuSettings] = useState(false);
  useEffect(() => {
    setInitialColumns(columns);
  }, []);
  const handleVisibleChange = (flag) => {
    setVisibleMenuSettings(flag);
  };
  const onChange = (e) => {
    var checkedColumnsNew = checkedColumns;
    if (e.target.checked) {
      checkedColumnsNew = checkedColumns.filter((id) => {
        return id !== e.target.id;
      });
    } else if (!e.target.checked) {
      checkedColumnsNew.push(e.target.id);
    }

    var filtered = initialColumns;
    for (var i = 0; i < checkedColumnsNew.length; i++)
      filtered = filtered.filter((el) => {
        return el.dataIndex !== checkedColumns[i];
      });
    setCheckedColumns(checkedColumnsNew);
    setColumns(filtered);
  };
  // let items=[]
  // ColumnData&&Object.keys(ColumnData).map((key,index) => items.push({"key":index+1, "label":key,"defaultChecked":ColumnData[key]}))
  const menuItemText = {
    name: "Họ và tên",
    phoneNumber: "Số điện thoại",
    dateOfBirth: "Ngày sinh",
    email: "Email",
    recruitment: "Tin tuyển dụng",
    recruitmentPipelineState: "Bước tuyển dụng",
    createdTime: "Ngày ứng tuyển",
    organization: "Tổ chức",
    jobSource: "Nguồn",
    council: "Hội đồng",
    creator: "Cán bộ tạo ứng viên",
    education: "Học vấn",
    applicantWorkingExperiences: "Kinh nghiệm làm việc",
    jobCategory: "Ngành nghề",
    yearOfExperience: "Số năm kinh nghiệm",
    applicantSkills: "Kỹ năng",
    identityNumber: "Số CCCD/CMND",
    sex: "Giới tính",
    maritalStatus: "Tình trạng hôn nhâ",
    height: "Chiều cao",
    weight: "Cân nặng",
    expectedWorkingAddress: "Nơi làm việc mong muốn",
    expectedSalary: "Mức lương mong muốn",
    livingAddress: "Nơi ở hiện tại",
    homeTower: "Quê quán",
  };
  const menu = (
    <Menu>
      {ColumnData &&
        Object.keys(ColumnData).map((key, index) => {
          if (key == "id") {
            return;
          }
          if (key == "name" || key == "id" || key == "phoneNumber") {
            return (
              <Menu.Item key={index + 1}>
                <Checkbox
                  id={key}
                  onChange={onChange}
                  defaultChecked={ColumnData[key]}
                  disabled
                >
                  {menuItemText[key]}
                </Checkbox>
              </Menu.Item>
            );
          } else {
            return (
              <Menu.Item key={index + 1}>
                <Checkbox
                  id={key}
                  onChange={onChange}
                  defaultChecked={ColumnData[key]}
                >
                  {menuItemText[key]}
                </Checkbox>
              </Menu.Item>
            );
          }
        })}
    </Menu>
  );

  // form search
  const Schema = Yup.object().shape({
    search: Yup.string(),
  });
  const methods = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(Schema),
  });

  const { watch } = methods;

  const searchValue = useDebounce(watch("search"), 1000);

  useEffect(() => {
    // getListApplicants({ SearchKey: searchValue });
  }, [searchValue]);

  // open filter form
  const [isOpen, setIsOpen] = useState(false);

  // filter modal
  const handleOpenFilterForm = () => {
    setIsOpen(true);
  };

  const handleCloseFilterForm = () => {
    setIsOpen(false);
  };

  return (
    <View>
      <ApplicantHeader
        methods={methods}
        columns={columnsTest}
        isOpen={isOpen}
        onOpenFilterForm={handleOpenFilterForm}
        onCloseFilterForm={handleCloseFilterForm}
      />
      <Content>
        <View flexRow atCenter mb={24}>
          <Dropdown
            overlay={menu}
            onVisibleChange={handleVisibleChange}
            visible={visibleMenuSettings}
          >
            <ListItemStyle>
              <NavItemContent
                icon={<Iconify icon="material-symbols:settings" />}
                title=""
              />
            </ListItemStyle>
          </Dropdown>

          <View>
            <TextMaxLine
              line={1}
              sx={{ width: 160, fontWeight: "normal", fontSize: 14 }}
            >
              {"DANH SÁCH ỨNG VIÊN"}
            </TextMaxLine>
          </View>
        </View>
        <ReactDragListView.DragColumn {...dragProps}>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={Data?.items}
            rowKey={rowKey}
            scroll={{ x: 3000, y: tableHeight }}
            size="large"
            // loading={isLoading}
            //to set pageSize == height tableHeight/40
            pagination={{
              defaultPageSize: Math.floor(tableHeight / 40),
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30"],
            }}
          />
        </ReactDragListView.DragColumn>
      </Content>
      <ApplicantFilterModal
        columns={columnsTest}
        isOpen={isOpen}
        onClose={handleCloseFilterForm}
      />
    </View>
  );
};
