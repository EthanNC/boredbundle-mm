import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { UseFormProps, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export const Route = createFileRoute("/game/prompts")({
  component: () => <GamePromptsScreen />,
});

const validationSchema = z.object({
  prompts: z
    .array(
      z.object({
        userId: z.string(),
        text: z
          .string()
          .min(1, { message: "You need to say something" })
          .refine((value) => /^[A-Za-z ]+$/.test(value), {
            message: "Only letters are allowed",
          }),
      })
    )
    .length(3, { message: "You need to write 3 prompts" }),
});

type Prompt = z.infer<typeof validationSchema>["prompts"][number];

function useZodForm<TSchema extends z.ZodType>(
  props: Omit<UseFormProps<TSchema["_input"]>, "resolver"> & {
    schema: TSchema;
  }
) {
  const form = useForm<TSchema["_input"]>({
    ...props,
    resolver: zodResolver(props.schema, undefined, {
      // This makes it so we can use `.transform()`s on the schema without same transform getting applied again when it reaches the server
      //   rawValues: true,
    }),
  });

  return form;
}

function GamePromptsScreen() {
  const { id, game } = useAuth();
  const promptsInitial: Prompt[] = [{ userId: id!, text: "water" }];

  const [prompts] = useState<Prompt[]>(() => promptsInitial);

  const addPrompt = useMutation(api.memelords.prompt_functions.addPrompt);

  const {
    handleSubmit,
    register,
    control,
    formState: { isValid, errors },
    reset,
  } = useZodForm({
    schema: validationSchema,
    defaultValues: { prompts },
    mode: "onChange",
  });

  const { fields, append } = useFieldArray({
    name: "prompts",
    control,
  });

  const navigation = useNavigate();
  const isSubmittable = !!isValid;

  return (
    <div className="text-center">
      <h2 className="text-xl  w-full space-y-6 px-28 py-8 ">
        Write Something <span className="font-bold"> MEME </span> Lord
      </h2>

      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(async (data) => {
          const promises = data.prompts.map((prompt, index) =>
            addPrompt({
              gameId: game as string,
              userId: id as string,
              stageNum: index + 1,
              prompt: prompt.text,
            })
          );

          try {
            //TDOD: handle error
            await Promise.all(promises);
            //if successful
          } catch (error) {
            console.error(error);
          }
          reset(data);
          void navigation({ to: "/game/start" });
        })}
        className="flex flex-col gap-3"
      >
        {fields.map((field, index) => {
          const errorForField = errors?.prompts?.[index]?.text;
          return (
            <div key={field.id}>
              <div className="flex h-16 items-center">
                <Input
                  {...register(`prompts.${index}.text` as const)}
                  defaultValue={field.text}
                />
                {/* <Button
                  disabled={fields.length === 1}
                  size="icon"
                  variant="outline"
                  onClick={() => remove(index)}
                >
                  <X />
                </Button> */}
              </div>
              {errorForField && <p>{errorForField?.message ?? <>&nbsp;</>}</p>}
            </div>
          );
        })}
        {fields.length < 3 && (
          <Button
            type="button"
            //   className="block rounded-lg mx-auto bg-blue-300 hover:bg-blue-400 p-4"
            onClick={() =>
              append({
                userId: id!,
                text: "",
              })
            }
          >
            Anotha One
          </Button>
        )}

        {fields.length === 3 && (
          <Button type="submit" disabled={!isSubmittable}>
            Submit
          </Button>
        )}
      </form>
    </div>
  );
}
