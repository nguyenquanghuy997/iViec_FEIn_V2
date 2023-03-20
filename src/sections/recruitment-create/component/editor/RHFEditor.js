import {Controller, useFormContext} from 'react-hook-form'
import {LabelStyle} from "@/components/hook-form/style";
import React from "react";
import Editor from "@/sections/recruitment-create/component/editor/Editor";

const RHFContentEditor = React.forwardRef((props, ref)  => {
  const {name, title, isRequired = false, ...other} = props;
  const {control} = useFormContext()

  return (
      <Controller
          name={name}
          control={control}
          render={({field, fieldState: {error}}) => (
              <>
                {title && (
                    <LabelStyle required={isRequired}>
                      {title}
                    </LabelStyle>
                )}
                <Editor
                    ref={ref}
                    id={name}
                    // value={field.value}
                    initialValue={field.value}
                    onChange={field.onChange}
                    error={error}
                    {...other}
                />
              </>
          )}
      />
  )
})

export default RHFContentEditor;
