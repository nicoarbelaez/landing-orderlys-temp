import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';

const schema = z.object({
  email: z.string().email('Por favor ingrese un correo electrónico válido'),
});

type FormData = z.infer<typeof schema>;

export const ContactForm = () => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    toast({
      title: '¡Suscripción exitosa!',
      description: 'Gracias por suscribirte a nuestro newsletter.',
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          {...register('email')}
          type="email"
          placeholder="Tu correo electrónico"
          className={`bg-white/5 border-white/10 ${
            errors.email ? 'border-red-500' : ''
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      <Button
        type="submit"
        className="w-full bg-red-500 hover:bg-red-600 transition-colors"
      >
        Suscribirse
      </Button>
    </form>
  );
};