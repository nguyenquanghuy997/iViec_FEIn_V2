import {useGetExaminationByIdQuery} from "@/sections/exam/ExamSlice";

const useFetchExamination = (examinationId) => {
    const {data: selectedData = {}} = useGetExaminationByIdQuery({Id: examinationId}, {skip: !examinationId});
    return { selectedData }
}
export default useFetchExamination;