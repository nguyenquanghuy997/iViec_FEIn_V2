import React, {useState} from "react";
import {Box, Button, Typography} from '@mui/material'
import {styled} from '@mui/material/styles'
import '@/utils/highlight'
import {Editor} from "@tinymce/tinymce-react";
import {API_KEY_EDITOR} from "@/config";
import Iconify from "@/components/Iconify";

const RootStyle = styled(Box)(({theme}) => ({
      overflow: 'hidden',
      position: 'relative',
      borderRadius: theme.spacing(0.5),
    })
)

const renderValue = (value) => {
  return '&nbsp;<span style="font-weight: 500; font-size: 13px; padding: 5px 8px; color: #1565C0; background-color: #E3F2FD">' + value + '</span>&nbsp;'
}

export default function EmailEditor({
      error,
      value,
      initialValue,
      placeholder,
      onChange,
      helperText,
      sx,
      showPreview,
      onOpenPreview,
      showUploadFile,
      handleFileChange,
      ...other
}) {

  const [loading, setLoading] = useState(true);

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
          {showUploadFile && !loading && <Button
              component="label"
              sx={{
                width: '128px',
                height: '39px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                right: '50px',
                top: '0',
                zIndex: '99 !important',
                padding: '0 !important',
                borderLeft: '1px solid #E7E9ED',
                borderRadius: 0,
                "&:hover": {
                  backgroundColor: 'transparent'
                }
              }}
          >
            <Iconify icon='eva:attach-fill' sx={{width: 20, height: 20}}/>
            <Typography component="span" sx={{color: '#455570', fontSize: 14, fontWeight: 600, ml: 0.5}}>Đình kèm file</Typography>
            <input hidden accept=".doc,.docx,.pdf,.xlsx,.xls" multiple type="file" onChange={handleFileChange}/>
          </Button>}

          <Editor
              onInit={() => {
                setLoading(false);
              }}
              apiKey={API_KEY_EDITOR}
              onEditorChange={onChange}
              value={value}
              initialValue={initialValue}
              id="textarea"
              init={{
                language: 'vi',
                height: sx?.minHeight || '370px',
                menubar: false,
                contextmenu: false,
                branding: false,
                placeholder: placeholder || '',
                selector: '#textarea',
                plugins: 'searchreplace preview autosave save directionality code image link media template pagebreak visualblocks nonbreaking anchor insertdatetime advlist lists wordcount charmap emoticons autolink',
                image_caption: true,
                toolbar: `menubutton selecttag | 
                      bold italic underline backcolor | 
                      alignleft aligncenter alignright alignjustify | 
                      numlist bullist checklist | 
                      image | 
                      ${showPreview && 'previewContent'} |
                      ${showUploadFile && 'insertFile'} |
                `,
                file_picker_types: 'image',
                file_browser_callback_types: 'image',
                file_picker_callback: function (callback, value, meta) {
                  if (meta.filetype === 'image') {
                    let input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');
                    input.onchange = function () {
                      let file = this.files[0];

                      let reader = new FileReader();
                      reader.onload = function () {
                        let id = 'blobid' + (new Date()).getTime();
                        let blobCache =  window.tinymce.activeEditor.editorUpload.blobCache;
                        let base64 = reader.result.split(',')[1];
                        let blobInfo = blobCache.create(id, file, base64);
                        blobCache.add(blobInfo);
                        callback(blobInfo.blobUri(), { title: file.name });
                      };
                      reader.readAsDataURL(file);
                    };
                    input.click();
                  }
                },
                content_style: "body { font-family:Inter,sans-serif; font-size:14px; }",
                setup: function (editor) {
                  editor.ui.registry.addIcon('selectButton', `
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3.33332 15.8334H16.6667V11.6667H18.3333V16.6667C18.3333 16.8878 18.2455 17.0997 18.0892 17.256C17.933 17.4123 17.721 17.5001 17.5 17.5001H2.49999C2.27898 17.5001 2.06701 17.4123 1.91073 17.256C1.75445 17.0997 1.66666 16.8878 1.66666 16.6667V11.6667H3.33332V15.8334Z" fill="#1565C0"/>
                      <path d="M9.28571 5.95246V1.66675H10.7143V5.95246H15V7.38103H10.7143V11.6667H9.28571V7.38103H5V5.95246H9.28571Z" fill="#1565C0"/>
                    </svg>
                  `);
                  editor.ui.registry.addIcon('groupIcon', `
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M9.08329 1.75L17.3325 2.92917L18.5108 11.1792L10.8508 18.8392C10.6945 18.9954 10.4826 19.0832 10.2616 19.0832C10.0407 19.0832 9.82873 18.9954 9.67246 18.8392L1.42246 10.5892C1.26623 10.4329 1.17847 10.221 1.17847 10C1.17847 9.77903 1.26623 9.56711 1.42246 9.41083L9.08329 1.75ZM11.44 8.82167C11.5948 8.97641 11.7785 9.09914 11.9807 9.18287C12.183 9.26659 12.3997 9.30967 12.6186 9.30963C12.8375 9.30959 13.0542 9.26644 13.2564 9.18264C13.4586 9.09885 13.6423 8.97605 13.797 8.82125C13.9518 8.66645 14.0745 8.4827 14.1582 8.28047C14.242 8.07824 14.285 7.8615 14.285 7.64262C14.285 7.42375 14.2418 7.20702 14.158 7.00482C14.0742 6.80262 13.9514 6.61891 13.7966 6.46417C13.6418 6.30943 13.4581 6.18669 13.2558 6.10296C13.0536 6.01924 12.8369 5.97617 12.618 5.97621C12.176 5.97629 11.7521 6.15196 11.4395 6.46458C11.127 6.77721 10.9515 7.20117 10.9516 7.64321C10.9517 8.08525 11.1273 8.50915 11.44 8.82167Z" fill="#A2AAB7"/>
                    </svg>
                  `);
                  editor.ui.registry.addIcon('previewIcon', `
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M9.99996 2.5C14.4933 2.5 18.2316 5.73333 19.0158 10C18.2325 14.2667 14.4933 17.5 9.99996 17.5C5.50663 17.5 1.7683 14.2667 0.984131 10C1.76746 5.73333 5.50663 2.5 9.99996 2.5ZM9.99996 15.8333C11.6995 15.833 13.3486 15.2557 14.6773 14.196C16.0061 13.1363 16.9357 11.6569 17.3141 10C16.9343 8.34442 16.0041 6.86667 14.6755 5.80835C13.3469 4.75004 11.6985 4.17377 9.99996 4.17377C8.30138 4.17377 6.65304 4.75004 5.32444 5.80835C3.99585 6.86667 3.0656 8.34442 2.6858 10C3.06421 11.6569 3.99386 13.1363 5.32258 14.196C6.65131 15.2557 8.30041 15.833 9.99996 15.8333ZM9.99996 13.75C9.0054 13.75 8.05158 13.3549 7.34831 12.6516C6.64505 11.9484 6.24996 10.9946 6.24996 10C6.24996 9.00544 6.64505 8.05161 7.34831 7.34835C8.05158 6.64509 9.0054 6.25 9.99996 6.25C10.9945 6.25 11.9484 6.64509 12.6516 7.34835C13.3549 8.05161 13.75 9.00544 13.75 10C13.75 10.9946 13.3549 11.9484 12.6516 12.6516C11.9484 13.3549 10.9945 13.75 9.99996 13.75ZM9.99996 12.0833C10.5525 12.0833 11.0824 11.8638 11.4731 11.4731C11.8638 11.0824 12.0833 10.5525 12.0833 10C12.0833 9.44747 11.8638 8.91756 11.4731 8.52686C11.0824 8.13616 10.5525 7.91667 9.99996 7.91667C9.44743 7.91667 8.91753 8.13616 8.52682 8.52686C8.13612 8.91756 7.91663 9.44747 7.91663 10C7.91663 10.5525 8.13612 11.0824 8.52682 11.4731C8.91753 11.8638 9.44743 12.0833 9.99996 12.0833Z" fill="#455570"/>
                    </svg>
                  `);
                  editor.ui.registry.addMenuButton('selecttag', {
                    text: '',
                    icon: 'selectButton',
                    fetch: function (callback) {
                      let items = [
                          // common
                        {
                          type: 'menuitem',
                          text: 'Chung',
                          onAction: function () {},
                        },
                        {
                          type: 'menuitem',
                          text: 'Tên ứng viên',
                          icon: 'groupIcon',
                          onAction: function () {
                            editor.insertContent(renderValue('Tên ứng viên'));
                          },
                        },
                        {
                          type: 'menuitem',
                          text: 'Vị trí công việc',
                          icon: 'groupIcon',
                          onAction: function () {
                            editor.insertContent(renderValue('Vị trí công việc'));
                          },
                        },
                        {
                          type: 'menuitem',
                          text: 'Hình thức làm việc',
                          icon: 'groupIcon',
                          onAction: function () {
                            editor.insertContent(renderValue('Hình thức làm việc'));
                          },
                        },
                        {
                          type: 'menuitem',
                          text: 'Quyền lợi',
                          icon: 'groupIcon',
                          onAction: function () {
                            editor.insertContent(renderValue('Quyền lợi'));
                          },
                        },
                        // company
                        {
                          type: 'menuitem',
                          text: 'Công ty',
                          onAction: function () {},
                        },
                        {
                          type: 'menuitem',
                          text: 'Tên công ty',
                          icon: 'groupIcon',
                          onAction: function () {
                            editor.insertContent(renderValue('Tên công ty'));
                          },
                        },
                        {
                          type: 'menuitem',
                          text: 'Địa chỉ công ty',
                          icon: 'groupIcon',
                          onAction: function () {
                            editor.insertContent(renderValue('Địa chỉ công ty'));
                          },
                        },
                        {
                          type: 'menuitem',
                          text: 'Email công ty',
                          icon: 'groupIcon',
                          onAction: function () {
                            editor.insertContent(renderValue('Email công ty'));
                          },
                        },
                        {
                          type: 'menuitem',
                          text: 'Số điện thoại công ty',
                          icon: 'groupIcon',
                          onAction: function () {
                            editor.insertContent(renderValue('Số điện thoại công ty'));
                          },
                        },
                        {
                          type: 'menuitem',
                          text: 'Website tuyển dụng công ty',
                          icon: 'groupIcon',
                          onAction: function () {
                            editor.insertContent(renderValue('Website tuyển dụng công ty'));
                          },
                        },
                        // organization
                        {
                          type: 'menuitem',
                          text: 'Công ty',
                          onAction: function () {},
                        },
                        {
                          type: 'menuitem',
                          text: 'Tên đơn vị',
                          icon: 'groupIcon',
                          onAction: function () {
                            editor.insertContent(renderValue('Tên đơn vị'));
                          },
                        },
                        {
                          type: 'menuitem',
                          text: 'Địa chỉ đơn vị',
                          icon: 'groupIcon',
                          onAction: function () {
                            editor.insertContent(renderValue('Địa chỉ đơn vị'));
                          },
                        },
                        {
                          type: 'menuitem',
                          text: 'Email đơn vị',
                          icon: 'groupIcon',
                          onAction: function () {
                            editor.insertContent(renderValue('Email đơn vị'));
                          },
                        },
                        {
                          type: 'menuitem',
                          text: 'Số điện thoại đơn vị',
                          icon: 'groupIcon',
                          onAction: function () {
                            editor.insertContent(renderValue('Số điện thoại đơn vị'));
                          },
                        },
                        // user
                        {
                          type: 'menuitem',
                          text: 'Cán bộ tuyển dụng',
                          onAction: function () {},
                        },
                        {
                          type: 'menuitem',
                          text: 'Họ và tên cán bộ tuyển dụng',
                          icon: 'groupIcon',
                          onAction: function () {
                            editor.insertContent(renderValue('Họ và tên cán bộ tuyển dụng'));
                          },
                        },
                        {
                          type: 'menuitem',
                          text: 'Email cán bộ tuyển dụng',
                          icon: 'groupIcon',
                          onAction: function () {
                            editor.insertContent(renderValue('Email cán bộ tuyển dụng'));
                          },
                        },
                        {
                          type: 'menuitem',
                          text: 'Số điện thoại cán bộ tuyển dụng',
                          icon: 'groupIcon',
                          onAction: function () {
                            editor.insertContent(renderValue('Số điện thoại cán bộ tuyển dụng'));
                          },
                        },
                      ];
                      callback(items);
                    }
                  });
                  editor.ui.registry.addButton('previewContent', {
                    icon: 'previewIcon',
                    text: '',
                    onAction: function () {
                      onOpenPreview();
                    },
                    onSetup: function () {

                    }
                  });
                },
              }}
              {...other}
          />
        </RootStyle>
        {helperText && helperText}
      </div>
  )
}
