import {memo} from "react";
import Box from '@mui/material/Box'
import {styled} from '@mui/material/styles'
import '@/utils/highlight'
import {Editor} from "@tinymce/tinymce-react";
import {API_KEY_EDITOR} from "@/config";

const RootStyle = styled(Box)(({theme}) => ({
        overflow: 'hidden',
        position: 'relative',
        borderRadius: theme.spacing(0.5),
    })
)

function RecruitmentEditor({error, value, initialValue, placeholder, onChange, helperText, sx, ...other}) {
    return (
        <div>
            <RootStyle
                className='text-editor'
                sx={{
                    ...(error && {
                        border: (theme) => `solid 1px ${theme.palette.error.main}`,
                    }),
                    ...sx,
                }}
            >
                <Editor
                    apiKey={API_KEY_EDITOR}
                    onEditorChange={onChange}
                    value={value}
                    initialValue={initialValue}
                    id="textarea"
                    init={{
                        language: 'vi',
                        height: sx.minHeight,
                        menubar: false,
                        contextmenu: false,
                        branding: false,
                        placeholder: placeholder || '',
                        entity_encoding: 'raw',
                        entities: '160,nbsp,38,amp,60,lt,62,gt',
                        selector: '#textarea',
                        plugins: 'autosave link lists wordcount',
                        image_caption: true,
                        toolbar: ` bold italic underline link | alignleft aligncenter alignright alignjustify | numlist bullist`,
                        content_style: "body { font-family:Inter,sans-serif; font-size:14px; }",
                    }}
                    {...other}
                />
            </RootStyle>
            {helperText && helperText}
        </div>
    )
}

export default memo(RecruitmentEditor);
