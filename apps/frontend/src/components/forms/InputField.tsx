import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { FieldPath, FieldValues, ControllerProps } from 'react-hook-form';

interface InputFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> 
>
{
  control: ControllerProps<TFieldValues>["control"],
  name: TName,
  label: string,
  type: React.InputHTMLAttributes<HTMLInputElement>["type"]
}

export default function InputField<
  TFieldValues extends FieldValues, 
  TName extends FieldPath<TFieldValues>
>
({ control, name, label, type }: InputFieldProps<TFieldValues, TName> ) {
  return (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input type={type} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />);
}