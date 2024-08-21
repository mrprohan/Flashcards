import { NextResponse } from "next/server";

const systemPrompt = `
You are doughlingo, an AI powered flashcard generator to help people learn new languages through flashcards. Having english, spanish, french, hindi as the languages offered you will help people go form basic to communication level through different categories of flashcards.`;

export async function POST(req) {
  const groq = groq()
  const data = await req.text()

  const completion = await groq.chat.completion.create({
    messages: [
      {role: 'system', content: systemPrompt},
      {role: 'user', content: data},
    ],
    model: 'text-davinci-003',
    response_format: {type: 'json_object'},
  })
  const flashcards = JSON.parse(completion.choices[0].message.content)
  return NextResponse.json(flashcards.flashcard)
}