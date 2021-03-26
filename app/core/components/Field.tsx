import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react"
import React, { ComponentPropsWithoutRef } from "react"
import { useFormContext } from "react-hook-form"

export interface FieldProps extends ComponentPropsWithoutRef<typeof Input> {
  label: string
  controlProps?: ComponentPropsWithoutRef<typeof FormControl>
}

export const Field = React.forwardRef<HTMLInputElement, FieldProps>(
  ({ label, controlProps, ...props }, ref) => {
    const {
      register,
      formState: { isSubmitting },
      errors,
    } = useFormContext()

    const error = Array.isArray(errors[props.name])
      ? errors[props.name].join(", ")
      : errors[props.name]?.message || errors[props.name]

    return (
      <FormControl id={props.id} {...controlProps} isInvalid={!!error}>
        <FormLabel htmlFor={props.id}>{label}</FormLabel>
        <Input isDisabled={isSubmitting} {...props} ref={register} />
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    )
  }
)
