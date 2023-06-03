import { memo } from "react";
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import '@/utils/highlight'
import { Editor } from "@tinymce/tinymce-react";
import { API_KEY_EDITOR } from "@/config";
import { useTheme } from "@mui/material";

const RootStyle = styled(Box)(({theme}) => ({
    overflow: 'hidden',
    position: 'relative',
    borderRadius: theme.spacing(0.5),
    '& .tox-editor-header': {
      boxShadow: "none !important",
      borderBottom: `1px solid ${theme.palette.common.neutral100} !important`,
    },
    '& .tox-tbtn': {
      borderRight: `1px solid ${theme.palette.common.neutral100} !important`,
      margin: "0px !important",
      padding: "20px !important"
    },
    '& .tox-statusbar__path-item': {
      display: 'none !important'
    }
  })
)

const renderValue = (value) => {
  return '&nbsp;<span class="tag">' + value + '</span>&nbsp;'
}

function TinyEditor({error, value, initialValue, placeholder, onChange, helperText, enableTags, sx, ...other}) {
  const theme = useTheme();
  return (
    <div>
      <RootStyle
        className='tiny-editor'
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
          init={{
            language: 'vi',
            height: '370px',
            menubar: false,
            contextmenu: false,
            branding: false,
            placeholder: placeholder || '',
            entity_encoding: 'raw',
            entities: '160,nbsp,38,amp,60,lt,62,gt',
            selector: '#tiny-editor',
            plugins: 'autosave link lists wordcount',
            toolbar: `bold italic underline link bullist numlist alignleft aligncenter alignright`,
            content_style: `body { font-family:Inter,sans-serif; font-size:14px; .tag {font-weight: 500; font-size: 13px; padding: 5px 8px; color: ${theme.palette.common.blue800}; background-color: ${theme.palette.common.blue50}}} body::before {color: ${theme.palette.common.neutral400} !important}`,
            relative_urls: false,
            remove_script_host: true,
            setup: function (editor) {
              editor.ui.registry.addIcon(
                "bold",
                `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_9208_43467)">
                            <path d="M4.51941 16.6667V16.0903L5.78742 15.7349C5.92191 15.7029 6.02757 15.6388 6.10442 15.5428C6.18127 15.4467 6.2197 15.3282 6.2197 15.1874V4.81272C6.2197 4.66543 6.17807 4.54375 6.09482 4.44769C6.01797 4.35162 5.9155 4.28758 5.78742 4.25556L4.51941 3.90974V3.33337H10.0045C11.3366 3.33337 12.358 3.47426 13.0689 3.75604C13.7797 4.03782 14.2664 4.40286 14.529 4.85114C14.798 5.29943 14.9325 5.77974 14.9325 6.29207C14.9325 7.131 14.6635 7.83545 14.1256 8.40542C13.594 8.96898 12.8736 9.36603 11.9642 9.59658V9.61579C12.7135 9.65422 13.3763 9.80792 13.9526 10.0769C14.529 10.3459 14.9805 10.7141 15.3071 11.1816C15.6401 11.6427 15.8066 12.1902 15.8066 12.8242C15.8066 13.5863 15.6465 14.2171 15.3263 14.7167C15.0061 15.2162 14.577 15.61 14.0391 15.8982C13.5076 16.18 12.912 16.3785 12.2524 16.4938C11.5991 16.6091 10.9363 16.6667 10.2639 16.6667H4.51941ZM8.62123 4.33241V9.34682H9.40894C10.5233 9.34682 11.2981 9.14189 11.7336 8.73203C12.1755 8.31576 12.3965 7.7458 12.3965 7.02213C12.3965 6.07433 12.1691 5.38909 11.7144 4.96642C11.2661 4.54375 10.5841 4.33241 9.6683 4.33241H8.62123ZM8.62123 10.2882V15.6677H10.4464C11.3622 15.6677 12.0474 15.4723 12.5021 15.0817C12.9568 14.6846 13.1842 14.0378 13.1842 13.1413C13.1842 12.091 12.9312 11.3545 12.4253 10.9318C11.9193 10.5028 11.1028 10.2882 9.9757 10.2882H8.62123Z" fill="#455570" />
                          </g>
                          <defs>
                            <clipPath id="clip0_9208_43467">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>`);
              editor.ui.registry.addIcon(
                "italic",
                `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_9208_43472)">
                            <path d="M12.5 16.6667H5.83337V15H8.27254L10.0359 5.00004H7.50004V3.33337H14.1667V5.00004H11.7275L9.96421 15H12.5V16.6667Z" fill="#455570" />
                          </g>
                          <defs>
                            <clipPath id="clip0_9208_43472">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>`);
              editor.ui.registry.addIcon(
                "underline",
                `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_9208_43477)">
                            <path d="M6.66671 2.5V10C6.66671 10.8841 7.0179 11.7319 7.64302 12.357C8.26814 12.9821 9.11599 13.3333 10 13.3333C10.8841 13.3333 11.7319 12.9821 12.3571 12.357C12.9822 11.7319 13.3334 10.8841 13.3334 10V2.5H15V10C15 11.3261 14.4733 12.5979 13.5356 13.5355C12.5979 14.4732 11.3261 15 10 15C8.67396 15 7.40219 14.4732 6.46451 13.5355C5.52682 12.5979 5.00004 11.3261 5.00004 10V2.5H6.66671ZM3.33337 16.6667H16.6667V18.3333H3.33337V16.6667Z" fill="#455570" />
                          </g>
                          <defs>
                            <clipPath id="clip0_9208_43477">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>`);
              editor.ui.registry.addIcon(
                "link",
                `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_9208_43482)">
                            <path d="M14.7142 12.3567L13.5358 11.1784L14.7142 10C15.0237 9.69051 15.2693 9.32303 15.4368 8.91861C15.6043 8.51418 15.6905 8.08071 15.6905 7.64296C15.6905 7.20521 15.6043 6.77175 15.4368 6.36732C15.2693 5.96289 15.0237 5.59541 14.7142 5.28588C14.4046 4.97634 14.0372 4.7308 13.6327 4.56328C13.2283 4.39576 12.7948 4.30954 12.3571 4.30954C11.9193 4.30954 11.4859 4.39576 11.0815 4.56328C10.677 4.7308 10.3095 4.97634 10 5.28588L8.82168 6.46421L7.64334 5.28588L8.82168 4.10754C9.76194 3.18248 11.0296 2.66642 12.3487 2.67179C13.6677 2.67717 14.9311 3.20352 15.8638 4.13622C16.7965 5.06891 17.3229 6.33238 17.3283 7.65139C17.3336 8.97041 16.8176 10.2381 15.8925 11.1784L14.7142 12.3567ZM12.3567 14.7142L11.1783 15.8925C10.7154 16.363 10.164 16.7372 9.55573 16.9935C8.94749 17.2498 8.29453 17.3832 7.6345 17.3859C6.97446 17.3886 6.32043 17.2605 5.71013 17.0092C5.09982 16.7579 4.54532 16.3882 4.0786 15.9215C3.61189 15.4547 3.24219 14.9002 2.99085 14.2899C2.73951 13.6796 2.61149 13.0256 2.61418 12.3656C2.61686 11.7055 2.75021 11.0526 3.00651 10.4443C3.26282 9.83608 3.63701 9.28461 4.10751 8.82171L5.28584 7.64338L6.46418 8.82171L5.28584 10C4.97631 10.3096 4.73077 10.6771 4.56325 11.0815C4.39573 11.4859 4.30951 11.9194 4.30951 12.3571C4.30951 12.7949 4.39573 13.2283 4.56325 13.6328C4.73077 14.0372 4.97631 14.4047 5.28584 14.7142C5.59538 15.0237 5.96285 15.2693 6.36728 15.4368C6.77171 15.6043 7.20518 15.6905 7.64293 15.6905C8.08068 15.6905 8.51414 15.6043 8.91857 15.4368C9.323 15.2693 9.69047 15.0237 10 14.7142L11.1783 13.5359L12.3567 14.7142ZM12.3567 6.46421L13.5358 7.64338L7.64334 13.535L6.46418 12.3567L12.3567 6.46504V6.46421Z" fill="#455570" />
                          </g>
                          <defs>
                            <clipPath id="clip0_9208_43482">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>`);
              editor.ui.registry.addIcon(
                "unordered-list",
                `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_9208_43487)">
                            <path d="M6.66667 3.33329H17.5V4.99996H6.66667V3.33329ZM3.75 5.41663C3.41848 5.41663 3.10054 5.28493 2.86612 5.05051C2.6317 4.81609 2.5 4.49815 2.5 4.16663C2.5 3.83511 2.6317 3.51716 2.86612 3.28274C3.10054 3.04832 3.41848 2.91663 3.75 2.91663C4.08152 2.91663 4.39946 3.04832 4.63388 3.28274C4.8683 3.51716 5 3.83511 5 4.16663C5 4.49815 4.8683 4.81609 4.63388 5.05051C4.39946 5.28493 4.08152 5.41663 3.75 5.41663ZM3.75 11.25C3.41848 11.25 3.10054 11.1183 2.86612 10.8838C2.6317 10.6494 2.5 10.3315 2.5 9.99996C2.5 9.66844 2.6317 9.3505 2.86612 9.11608C3.10054 8.88166 3.41848 8.74996 3.75 8.74996C4.08152 8.74996 4.39946 8.88166 4.63388 9.11608C4.8683 9.3505 5 9.66844 5 9.99996C5 10.3315 4.8683 10.6494 4.63388 10.8838C4.39946 11.1183 4.08152 11.25 3.75 11.25ZM3.75 17C3.41848 17 3.10054 16.8683 2.86612 16.6338C2.6317 16.3994 2.5 16.0815 2.5 15.75C2.5 15.4184 2.6317 15.1005 2.86612 14.8661C3.10054 14.6317 3.41848 14.5 3.75 14.5C4.08152 14.5 4.39946 14.6317 4.63388 14.8661C4.8683 15.1005 5 15.4184 5 15.75C5 16.0815 4.8683 16.3994 4.63388 16.6338C4.39946 16.8683 4.08152 17 3.75 17ZM6.66667 9.16663H17.5V10.8333H6.66667V9.16663ZM6.66667 15H17.5V16.6666H6.66667V15Z" fill="#455570" />
                          </g>
                          <defs>
                            <clipPath id="clip0_9208_43487">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>`);
              editor.ui.registry.addIcon(
                "ordered-list",
                `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_9208_43492)">
                            <path d="M6.66667 3.33333H17.5V5H6.66667V3.33333ZM4.16667 2.5V5H5V5.83333H2.5V5H3.33333V3.33333H2.5V2.5H4.16667ZM2.5 11.6667V9.58333H4.16667V9.16667H2.5V8.33333H5V10.4167H3.33333V10.8333H5V11.6667H2.5ZM4.16667 16.25H2.5V15.4167H4.16667V15H2.5V14.1667H5V17.5H2.5V16.6667H4.16667V16.25ZM6.66667 9.16667H17.5V10.8333H6.66667V9.16667ZM6.66667 15H17.5V16.6667H6.66667V15Z" fill="#455570" />
                          </g>
                          <defs>
                            <clipPath id="clip0_9208_43492">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>`);
              editor.ui.registry.addIcon(
                "align-left",
                `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_9208_43497)">
                            <path d="M2.5 3.33337H17.5V5.00004H2.5V3.33337ZM2.5 15.8334H14.1667V17.5H2.5V15.8334ZM2.5 11.6667H17.5V13.3334H2.5V11.6667ZM2.5 7.50004H14.1667V9.16671H2.5V7.50004Z" fill="#455570" />
                          </g>
                          <defs>
                            <clipPath id="clip0_9208_43497">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>`);
              editor.ui.registry.addIcon(
                "align-center",
                `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_9208_43502)">
                            <path d="M2.5 3.33337H17.5V5.00004H2.5V3.33337ZM4.16667 15.8334H15.8333V17.5H4.16667V15.8334ZM2.5 11.6667H17.5V13.3334H2.5V11.6667ZM4.16667 7.50004H15.8333V9.16671H4.16667V7.50004Z" fill="#455570" />
                          </g>
                          <defs>
                            <clipPath id="clip0_9208_43502">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>`);
              editor.ui.registry.addIcon(
                "align-center",
                `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_9208_43502)">
                            <path d="M2.5 3.33337H17.5V5.00004H2.5V3.33337ZM4.16667 15.8334H15.8333V17.5H4.16667V15.8334ZM2.5 11.6667H17.5V13.3334H2.5V11.6667ZM4.16667 7.50004H15.8333V9.16671H4.16667V7.50004Z" fill="#455570" />
                          </g>
                          <defs>
                            <clipPath id="clip0_9208_43502">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>`);
              editor.ui.registry.addIcon(
                "align-right",
                `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_9208_43507)">
                            <path d="M2.5 3.33337H17.5V5.00004H2.5V3.33337ZM5.83333 15.8334H17.5V17.5H5.83333V15.8334ZM2.5 11.6667H17.5V13.3334H2.5V11.6667ZM5.83333 7.50004H17.5V9.16671H5.83333V7.50004Z" fill="#455570" />
                          </g>
                          <defs>
                            <clipPath id="clip0_9208_43507">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>`);
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
              if (enableTags) {
                editor.ui.registry.addMenuButton('selecttag', {
                  text: '',
                  icon: 'selectButton',
                  fetch: function (callback) {
                    let items = [
                      {
                        type: 'menuitem',
                        text: 'Chung',
                        onAction: function () {
                        },
                      },
                      {
                        type: 'menuitem',
                        text: 'Vị trí ứng tuyển',
                        icon: 'groupIcon',
                        onAction: function () {
                          editor.insertContent(renderValue('Vị trí ứng tuyển'));
                        },
                      },
                      {
                        type: 'menuitem',
                        text: 'Giờ phỏng vấn',
                        icon: 'groupIcon',
                        onAction: function () {
                          editor.insertContent(renderValue('Giờ phỏng vấn'));
                        },
                      },
                    ];
                    callback(items);
                  }
                });
              }
            },
          }}
          {...other}
        />
      </RootStyle>
      {helperText && helperText}
    </div>
  )
}

export default memo(TinyEditor);
