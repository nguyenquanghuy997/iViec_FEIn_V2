import * as Yup from "yup";
const FormValidate = Yup.object().shape({
    name: Yup.string().required("Tiêu đề tin tuyển dụng không được bỏ trống").max(255, "Tiêu đề tin tuyển dụng tối đa 255 ký tự"),
    address: Yup.string().required("Địa điểm làm việc không được bỏ trống").max(255, "Địa điểm làm việc tối đa 255 ký tự"),
    recruitmentAddressIds: Yup.array().nullable().min(1, "Khu vực đăng tin không được bỏ trống").max(3, "Chọn tối đa 3 khu vực đăng tin"),
    candidateLevelId: Yup.string().required("Chức danh không được bỏ trống"),
    workExperience: Yup.string().required("Số năm kinh nghiệm không được bỏ trống"),
    recruitmentJobCategoryIds: Yup.array().nullable().min(1, "Ngành nghề không được bỏ trống").max(3, "Chọn tối đa 3 ngành nghề"),
    recruitmentWorkingForms: Yup.array().nullable().min(1, "Hình thức làm việc không được bỏ trống").max(3, "Chọn tối đa 3 hình thức làm việc"),
    numberPosition: Yup.number().min(1, 'Số lượng nhân viên cần tuyển tối thiểu là 1').transform(value => (isNaN(value) ? undefined : value)).max(9999, 'Số lượng nhân viên cần tuyển tối đa 9999').required("Số lượng nhân viên cần tuyển không được bỏ trống"),
    startDate: Yup.date().typeError("Ngày bắt đầu không đúng định dạng").transform(value => (!value ? new Date().toISOString() : value)).required('Ngày bắt đầu không được bỏ trống'),
    endDate: Yup.date().transform(value => (!value ? new Date().toISOString() : value)).typeError("Ngày kết thúc không đúng định dạng").min(Yup.ref('startDate'), "Ngày kết thúc phải lớn hơn ngày bắt đầu").required('Ngày kết thúc không được bỏ trống'),
    description: Yup.string().required("Mô tả công việc không được bỏ trống"),
    requirement: Yup.string().required("Yêu cầu công việc không được bỏ trống"),
    benefit: Yup.string().required("Quyền lợi không được bỏ trống"),
    ownerId: Yup.string().required("Cán bộ tuyển dụng không được bỏ trống"),
    organizationPipelineId: Yup.string().required("Quy trình tuyển dụng không được bỏ trống"),
    salaryDisplayType: Yup.number().transform(value => (isNaN(value) ? undefined : value)).required('Cách hiển thị không được bỏ trống'),
    currencyUnit: Yup.number()
        .transform(value => (isNaN(value) ? undefined : value))
        .when("salaryDisplayType", (salaryDisplayType, schema) => {
            if (salaryDisplayType === 2)
                return schema.required("Loại tiền tệ không được bỏ trống")
            return schema
        }),
    minSalary: Yup.number()
        .transform(value => (isNaN(value) ? undefined : value))
        // .when("salaryDisplayType", (salaryDisplayType, schema) => {
        //     if (salaryDisplayType === 2)
        //         return schema.required("Mức lương tối thiểu không được bỏ trống")
        //     return schema
        // })
        .when("currencyUnit", (currencyUnit, schema) => {
            if (currencyUnit === 0)
                return schema.min(1000000, 'Mức lương tối thiểu ít nhất 7 chữ số')
            if (currencyUnit === 1)
                return schema.min(100, 'Mức lương tối thiểu ít nhất 3 chữ số')
            return schema
        }),
    maxSalary: Yup.number()
        .transform(value => (isNaN(value) ? undefined : value))
        .min(Yup.ref('minSalary'), 'Mức lương tối đa cần lớn hơn hoặc bằng mức lương tối thiểu')
        // .when("salaryDisplayType", (salaryDisplayType, schema) => {
        //     if (salaryDisplayType === 2)
        //         return schema.required("Mức lương tối đa không được bỏ trống")
        //     return schema
        // })
        .when("currencyUnit", (currencyUnit, schema) => {
            if (currencyUnit === 0)
                return schema.min(1000000, 'Mức lương tối đa ít nhất 7 chữ số')
            if (currencyUnit === 1)
                return schema.min(100, 'Mức lương tối đa ít nhất 3 chữ số')
            return schema
        }),
});

export {
    FormValidate,
}