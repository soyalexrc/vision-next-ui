'use client';
import { GeneralInformation as Data } from '@/../prisma/prisma-client';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {useFormContext} from "react-hook-form";

type Props = {
  data: Data;
};

export default function GeneralInformation({ data }: Props) {
  const { control, setValue } = useFormContext();

  setValue('generalInformation.code', data.code);

  return (
    <div>
      <FormField
        control={control}
        name="code"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Codigo</FormLabel>
            <FormControl>
              <Input placeholder="Codigo" {...field} />
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
