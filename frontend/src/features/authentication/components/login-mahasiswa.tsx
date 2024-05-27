import { useState } from 'react';
import { Input, Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Schema untuk form mahasiswa
const mahasiswaSchema = z.object({
  type: z.literal('mahasiswa'),
  Nim: z.string().nonempty(),
  password: z.string().nonempty(),
});

// Schema untuk form admin
const adminSchema = z.object({
  type: z.literal('admin'),
  email: z.string().email(),
  password: z.string().nonempty(),
});

const formSchema = z.discriminatedUnion('type', [mahasiswaSchema, adminSchema]);

export function LoginMahasiswa() {
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: isAdminLogin
      ? { type: 'admin', email: "", password: "" }
      : { type: 'mahasiswa', Nim: "", password: "" },
  });

  // Define a submit handler
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.type === 'admin') {
      // Handle admin login
      console.log("Email:", values.email);
    } else {
      // Handle mahasiswa login
      console.log("Nim:", values.Nim);
    }
    console.log("Password:", values.password);
    // Reset form after submission
    form.reset();
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col px-6">
          {isAdminLogin ? (
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : (
            <>
              <FormField
                control={form.control}
                name="Nim"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nim</FormLabel>
                    <FormControl>
                      <Input placeholder="Nim" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Sign In</Button>
        </form>
        <div className='flex justify-center items-center '>
        <button onClick={() => setIsAdminLogin(!isAdminLogin)} className="mt-4 text-blue-500 text-sm">
        {isAdminLogin ? "Login sebagai Mahasiswa" : "Login sebagai Admin"}
      </button>
        </div>
      </Form>
    </div>
  );
}
