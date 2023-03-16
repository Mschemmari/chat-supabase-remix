import { useLoaderData, Form } from "@remix-run/react";
import { json, LoaderArgs, ActionArgs } from "@remix-run/node";
import { createSupabaseServerClient } from "../utils/supabase.server";
import { Login } from '~/components/Login'
import { RealTimeMessages } from "~/components/RealTimeMessages";

export const loader = async ({ request }: LoaderArgs) => {
  const response = new Response()
  const supabase = createSupabaseServerClient({ request, response })
  const { data } = await supabase.from('messages').select()
  return json({ messages: data ?? [] }, { headers: response.headers })
}

export const action = async ({ request }: ActionArgs) => {
  const response = new Response()
  const supabase = createSupabaseServerClient({ request, response })

  const formData = await request.formData()
  const { message } = Object.fromEntries(formData)

  await supabase.from('messages').insert({ content: String(message) })
  return json({ message: 'ok' }, { headers: response.headers })
}

export default function Index() {
  const { messages } = useLoaderData<typeof loader>()

  return (
    <main>
      <h1>Chat Live</h1>
      <Login />
      <Form method="post">
        <input type="message" name="message"></input>
        <button type="submit">Enviar Mensaje</button>
      </Form>
      <RealTimeMessages serverMessages={messages} />
    </main>
  );
}
